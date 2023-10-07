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
						imageUrl: "https://cdn.zhoukaiwen.com/qh_banner8.jpg",
					},
					{
						imageUrl: "https://cdn.zhoukaiwen.com/qh_banner8.jpg",
					},
				],
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
			goBasic() {
				console.log('1')
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
</style>