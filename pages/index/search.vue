<template>
	<view class="components-home">
		<view class="bgImg">
			<view class="bannerBox">
				<swiper style="height: 680rpx" class="swiper" @change="cardSwiper" circular="true" indicator-dots="true"
					autoplay="true" interval="4000" duration="600">
					<swiper-item class="swiper-list" v-for="(item, index) in bannerList" :key="index">
						<view class="swiper-item uni-bg-red">
							<image class="swiper-img radius shadow-warp" :src="item.imageUrl" mode="widthFix"></image>
						</view>
					</swiper-item>
				</swiper>
				<view class="indication">
					<block v-for="(item, index) in bannerList" :key="index">
						<view class="spot" :class="cardCur == index ? 'active' : ''"></view>
					</block>
				</view>
			</view>
		</view>
		<view class="mainBox flex justify-between">
			<view @click="uploadImage()"
				class="mainBtn shadow-warp radius bg-white padding-sm margin-xs radius text-center">
				<view style="text-align: center">
					<image src="https://cdn.zhoukaiwen.com/qdpz_kt1.svg" mode="widthFix"
						style="width: 125rpx; border-radius: 20rpx"></image>
				</view>
				<view class="text-bold text-black text-lg margin-top-sm text-shadow">点击上传图片</view>
				<view class="margin-top-sm text-gray text-sm text-shadow"><text
						class="text-orange margin-right-xs text-bold">❤️</text>
					菌棒在线识别服务</view>
			</view>

			<view class="mainBtn shadow-warp radius bg-white padding-sm margin-xs radius text-center">
				<view style="text-align: center">
					<image :src="ImageList.save_path" mode="widthFix" @click="previewImage(0)" style="width: 125rpx">
					</image>
				</view>
				<view class="text-bold text-black text-lg margin-top-sm text-shadow">
					识别结果：<text>{{ ImageList.result }}</text></view>
			</view>
		</view>

		<view class="padding">
			<view class="flex">
				<view @click="goBasic" class="flex-sub bg-white padding-sm margin-sm radius shadow-warp"
					style="line-height: 80rpx">
					<image class="fl margin-right-sm" src="https://cdn.zhoukaiwen.com/pic5.svg" mode="widthFix"
						style="width: 68rpx; margin-top: 8rpx"></image>
					<view class="text-shadow text-bold">病害治理方法：</view>
					<view class="methods">
						<view class="methods-item" v-for="
							(item, index) in methods" :key="index">
							{{index+1+"."}}{{ item }}</view>
					</view>
				</view>
			</view>
		</view>
		<view style="height: 120rpx; width: 1rpx"></view>
	</view>
</template>

<script>
	import request from "@/common/request.js";

	export default {
		data() {
			return {
				ImageList: {
					result: "请上传图片",
					save_path: "https://cdn.zhoukaiwen.com/qdpz_pic1.svg",
				},
				cardCur: 0,
				bannerList: [{
						imageUrl: "https://z1.ax1x.com/2023/10/09/pPvRQPI.png",
					},
					{
						imageUrl: "https://z1.ax1x.com/2023/10/09/pPvRQPI.png",
					},
	
				],

				methodsList: [{
						id: 1,
						name: "绿霉菌",
						e_name:'chloromyces',
						methods: [
							"①用2%甲醛和石碳酸混合液或用克霉灵、除霉剂注射受害部位;亦可用“厌氧发菌”法防治绿霉：将感染严重的菌袋单层平放，上覆盖潮细*3～5厘米，待香菇菌丝布满菌袋后取出，此期间须遮阴，常检查，防高温。",
							"②也可利用温差进行控制，根据香菇菌丝和绿霉菌丝所需温度不同，把感染后的菌袋处理后运出培养室，置于20℃以下阴凉通风的环境中，可抑制绿霉的扩散，香菇菌丝亦能正常生长。",
						],

					},
					{
						id: 2,
						name: "黄曲霉",
						e_name:'aflatoxin',
						methods: [
							"黄曲霉通常在潮湿的环境中繁殖。确保蘑菇房的湿度保持在适宜的水平，通常应控制在85%以下",
							"提供良好的通风，以减少空气中的湿度，帮助蘑菇干燥并减少霉菌生长的机会。",
							"可以用5%漂白粉清洗后+水洗；放置过久的粮食作物可在阳光下暴晒以减少黄曲霉。"
						],

					},
					{
						id: 3,
						name: "链霉菌",
						e_name:'streptomyces',
						methods: [
							"袋口、颈圈、报纸上污染的，去掉污染颈圈、报纸放入 500 倍甲醛液中，并用 0.1% 高锰酸钾或 0.1% 克霉灵溶液，洗净袋口换上经消毒的颈圈、报纸，继续发菌；",
							"菌袋内出现链孢霉的，可用 500 倍甲醛液或 5% 可湿性甲基托布津液，用注射器注入感染部位后用胶布封住针孔，可控制为害；",
							"发生链孢霉的大棚内地面上、棚内膜及其它菌袋上应及时喷上石灰水和 0.1% 的洁霉净，杀灭棚内空气中的孢子，并在棚内造成碱性条件，抑制链孢霉传播扩散。"
						],

					},
					{
						id: 4,
						name: "正常",
						e_name:'nomal',
						methods: [
							"①搞好菇场及工具的消毒，及早清除病变的菇体。",
							"②用链霉素1：50倍喷洒菌袋，杀灭蕴藏在菌袋中的病菌，防止第二茬复发。",
						],

					},
				]
			};
		},
		onShow() {},
		mounted() {},
		methods: {
			cardSwiper(e) {
				this.cardCur = e.detail.current;
			},

			uploadImage() {
				uni.chooseImage({
					count: 1,
					success: (res) => {
						const tempFilePaths = res.tempFilePaths;
						uni.showLoading({
							mask: true,
							title: "正在识别中",
						});
						uni.uploadFile({
							url: "http://101.42.229.5:5000/upload", //post请求的地址
							filePath: tempFilePaths[0],
							name: "file",
							// formData: {
							// 	'username': this.userInfo.username //formData是指除了图片以外，额外加的字段
							// },
							success: (uploadFileRes) => {
								//这里要注意，uploadFileRes.data是个String类型，要转对象的话需要JSON.parse一下
								var obj = JSON.parse(uploadFileRes.data);
								var url = obj.data[0].save_path.replace(/\\/g, "/");

								if (obj) {
									this.ImageList = obj.data[0]
									this.ImageList.save_path = url
									uni.hideLoading();
									uni.showToast({
										title: "识别成功",
									});
								}
							},
						});
					},
				});
			},
			// 多张 图片预览
			previewImage(index) {
				let imagePreList = []
				imagePreList.push(this.ImageList.save_path)
				imagePreList[0] = imagePreList[0].replace(/\\/g, "/");
				console.log(imagePreList[0])
				uni.previewImage({
					current: index, // 当前显示图片的索引值
					urls: imagePreList, // 需要预览的图片列表，photoList要求必须是数组
					loop: true, // 是否可循环预览
				});
			},
		},
		computed: {
			// 计算属性
			methods() {
				let methods = this.methodsList.filter((item) => {
					return item.e_name == this.ImageList.result
				})
				if (methods.length > 0) {
					return methods[0].methods
				} else {
					return []
				}
			}
		},
	};
</script>

<style lang="scss" scoped>
	.swiper-item {
		height: 100%;
	}

	/* 轮播指示点 start*/
	.indication {
		z-index: 9999;
		width: 100%;
		height: 36rpx;
		position: absolute;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
	}

	.spot {
		background-color: #ffffff;
		opacity: 0.6;
		width: 10rpx;
		height: 10rpx;
		border-radius: 20rpx;
		top: -130rpx;
		margin: 0 8rpx !important;
		position: relative;
	}

	.spot.active {
		opacity: 1;
		width: 30rpx;
		background-color: #0081ff;
	}

	.bgImg {
		position: relative;
		margin-bottom: 10rpx;

		.left_box {
			position: absolute;
			height: 130rpx;
			width: 60%;
			background: #ffffff;
			bottom: -55rpx;
			left: 5%;
			border-radius: 15rpx;
		}

		.right_box {
			text-align: center;
			position: absolute;
			height: 130rpx;
			width: 25%;
			background: #ffffff;
			bottom: -55rpx;
			right: 5%;
			border-radius: 15rpx;
		}
	}

	.mainBox {
		width: 750rpx;
		height: 300rpx;
		padding: 0 5%;
		margin-bottom: 10rpx;

		.mainBtn {
			width: 45%;
		}
	}

	.radius {
		border-radius: 18rpx !important;
	}

	// 弹窗
	.cu-dialog {
		background: #ffffff;
		overflow: visible;
	}

	.modal_bg {
		width: 100%;
		height: 400rpx;
		position: absolute;
		top: -100rpx;
		background-image: url(https://zhoukaiwen.com/img/qdpz/modal_bg.png);
		background-size: 100%;
		background-repeat: no-repeat;
	}

	.modal_main {
		text-align: left;
		background-color: #ffffff;
	}

	.title-header {
		position: absolute;
		bottom: 0;
		width: 100%;
		display: flex;
		height: 120rpx;
		font-size: 40rpx;
		align-items: center;
		justify-content: center;
		font-weight: bold;
		background-image: url(https://cdn.zhoukaiwen.com/wccswF.png);
		background-size: cover;
	}

	.title-text {
		background-image: -webkit-linear-gradient(0deg, #ff8a34, #fbbd12);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
	}
	.methods-item{
		margin-top: 10rpx;
		text-indent: 2em;
	}
</style>