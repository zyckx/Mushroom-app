<!-- 首页 -->
<template>
	<view>
		<cu-custom bgColor="bg-gradual-blue" :isBack="false">
			<!-- <block slot="backText">返回</block> -->
			<block slot="content">首页</block>
		</cu-custom>
		<!-- banner图 -->
		<view class="uni-padding-wrap">
			<view class="page-section swiper">
				<view class="page-section-spacing">
					<swiper class="swiper" circular="true" indicator-dots="true" autoplay="true" interval="3500"
						duration="600">
						<swiper-item class="swiper-list" v-for="(item, index) in bannerList" :key="index">
							<view class="swiper-item uni-bg-red">
								<image class="swiper-img" :src="item.imageUrl" mode=""></image>
							</view>
						</swiper-item>
					</swiper>
				</view>
			</view>
		</view>

		<!-- 导航栏 -->
		<view class="cu-list grid solids-bottom col-4 no-border">
			<view class="cu-item" v-for="(item, index) in categories" :key="index"
				:style="[{ animation: 'show ' + ((index + 1) * 0.2 + 1) + 's 1' }]" @click="goCategorieslist"
				:data-mid="item.mid">
				<view :class="['cuIcon-' + item.cuIcon, 'text-' + item.color]">
					<view class="cu-tag badge" v-if="item.count != 0">
						<block v-if="item.badge != 1">{{ item.badge > 99 ? '99+' : item.badge }}</block>
					</view>
				</view>
				<text>{{ item.name }}</text>
			</view>
		</view>

		<view class="disease-wrap">
			<view class="disease-title">
				<text style="color: #41A9CC;">常见病害</text>
			</view>
			<view class="diseases">
				<div class="disease-box" v-for="item in diseaseLists">
					<div class="title">{{item.name}}</div>
					<div class="brief">简介{{item.brief}}</div>
					<div class="btn">

						<button @click="goToDetail(item.id-1)">了解详情</button>
					</div>
				</div>
			</view>
		</view>

	</view>
</template>

<script>
	import request from '@/common/request.js';

	export default {
		data() {
			return {
				tip: '点击「添加小程序」，下次访问更便捷',
				duration: 1,
				scrollTop: 0,
				old: {
					scrollTop: 0
				},

				bannerList: [{
						imageUrl: 'https://s1.ax1x.com/2023/03/21/ppaZQ0O.jpg'
					},
					{
						imageUrl: 'https://s1.ax1x.com/2023/03/21/ppaZ3Ae.png'
					},
					{
						imageUrl: 'https://s1.ax1x.com/2023/03/21/ppaZMnK.jpg'
					},
				],
				categories: [{
						cuIcon: 'hotfill',
						color: 'red',
						badge: '',
						mid: '1',
						name: ' 项目介绍'
					},
					{
						cuIcon: 'colorlens',
						color: 'orange',
						badge: 1,
						mid: '2',
						name: '在线识别'
					},
					{
						cuIcon: 'goodsnewfill',
						color: 'yellow',
						badge: 12,
						mid: '3',
						name: '在线论坛'
					},
					{
						cuIcon: 'calendar',
						color: 'cyan',
						badge: 22,
						mid: '4',
						name: '个人中心'
					}
				],
				diseaseLists: [{
						id: 1,
						name: "绿霉菌",
						brief: "香菇生产中危害最大的竞争性杂菌。初期菌丝为白斑，逐渐生成浅绿色，菌落中央为深绿，边缘呈白色，后期变为深绿色，严重时可使菌袋全部变成墨绿色。",
						content: {
							methods: [
								"①用2%甲醛和石碳酸混合液或用克霉灵、除霉剂注射受害部位;亦可用“厌氧发菌”法防治绿霉：将感染严重的菌袋单层平放，上覆盖潮细*3～5厘米，待香菇菌丝布满菌袋后取出，此期间须遮阴，常检查，防高温。",
								"②也可利用温差进行控制，根据香菇菌丝和绿霉菌丝所需温度不同，把感染后的菌袋处理后运出培养室，置于20℃以下阴凉通风的环境中，可抑制绿霉的扩散，香菇菌丝亦能正常生长。",
							],
						},
					},
					{
						id: 2,
						name: "褐斑病",
						brief: "又称细菌斑点病，病原菌为托兰氏假单孢杆菌，菌落形状大小各异，一般呈灰色。当病菌侵染子实体时，会使菇体畸形、腐烂，菇盖产生褐色斑点，纵向凹陷形成凹斑。若培养基受到浸染，基料会发黏变臭。",
						content: {
							methods: [
								"将侵染子实体立即摘除，并喷施1：600倍次氯酸钙溶液(漂白粉)进行消毒。",
							],
						},
					},
					{
						id: 3,
						name: "褐腐病",
						brief: "病原菌为荧光假单孢杆菌，在香菇的组织细胞间隙中繁殖，使受害子实体停止生长，菌盖、菌柄和菌褶变褐色，最后腐烂发臭。",
						content: {
							methods: [
								"①搞好菇场及工具的消毒，及早清除病变的菇体。",
								"②用链霉素1：50倍喷洒菌袋，杀灭蕴藏在菌袋中的病菌，防止第二茬复发。",
							],
						},
					},
					{
						id: 4,
						name: "褐腐病",
						brief: "病原菌为荧光假单孢杆菌，在香菇的组织细胞间隙中繁殖，使受害子实体停止生长，菌盖、菌柄和菌褶变褐色，最后腐烂发臭。",
						content: {
							methods: [
								"①搞好菇场及工具的消毒，及早清除病变的菇体。",
								"②用链霉素1：50倍喷洒菌袋，杀灭蕴藏在菌袋中的病菌，防止第二茬复发。",
							],
						},
					},
				],
			};
		},
		methods: {
			scroll: function(e) {
				console.log(e);
				this.old.scrollTop = e.detail.scrollTop;
			},
			goToDetail(index) {
				uni.setStorageSync('illitem', this.diseaseLists[index])
				uni.navigateTo({
					url: "/pages/diseaseDetail"
				})
			}




		},
	};
</script>
<style lang="scss" scoped>
	.swiper-box {
		flex: 1;
	}

	.swiper-item {
		height: 100%;
	}

	.jn_img {
		width: 700rpx;
		display: block;
		margin: 15rpx auto;
		border-radius: 20rpx;
	}

	.message-box {
		width: 100%;
		height: 120rpx;
		background: url(https://zhoukaiwen.com/img/icon/clock.gif) #FFFFFF;
		background-repeat: no-repeat;
		background-size: 100rpx 100rpx;
		background-position: 15rpx 10rpx;
		margin: 0rpx 0rpx 10rpx 0rpx;
		padding-left: 130rpx;

		.message-tltle {
			height: 65rpx;
			line-height: 70rpx;
			font-weight: 600;
			font-size: 28rpx;
		}

		.message-content {
			color: #0081ff;

			span {
				background-color: #0081ff;
				color: #FFFFFF;
				padding: 2rpx 8rpx;
				border-radius: 8rpx;
				margin-right: 8rpx;
			}
		}
	}

	/*scroll-view外层*/
	.skill-sequence-panel-content-wrapper {
		position: relative;
		white-space: nowrap;
		padding: 10rpx 0 10rpx 10rpx;
	}

	/*左右渐变遮罩*/
	.hide-content-box {
		position: absolute;
		top: 0;
		height: 100%;
		width: 10px;
		z-index: 2;
	}

	.hide-content-box-left {
		left: 0;
		background-image: linear-gradient(to left, rgba(255, 255, 255, 0), #f3f3f3 60%);
	}

	.hide-content-box-right {
		right: 0;
		background-image: linear-gradient(to right, rgba(255, 255, 255, 0), #f3f3f3 60%);
	}

	.kite-classify-scroll {
		width: 100%;
		height: 700rpx;
		overflow: hidden;
		white-space: nowrap;
	}

	.kite-classify-cell {
		display: inline-block;
		width: 300rpx;
		height: 600rpx;
		margin-right: 20rpx;
		background-color: #ffffff;
		border-radius: 10rpx;
		overflow: hidden;
		box-shadow: 2px 2px 3px rgba(26, 26, 26, 0.2);
	}

	.nav-li {
		padding: 40rpx 30rpx;
		width: 100%;
		background-image: url(https://s1.ax1x.com/2020/06/27/NyU04x.png);
		background-size: cover;
		background-position: center;
		position: relative;
		z-index: 1;
	}

	.nav-name {
		font-size: 28upx;
		text-transform: Capitalize;
		margin-top: 20upx;
		position: relative;
	}

	.nav-name::before {
		content: '';
		position: absolute;
		display: block;
		width: 40rpx;
		height: 6rpx;
		background: #fff;
		bottom: 0;
		right: 0;
		opacity: 0.5;
	}

	.nav-name::after {
		content: '';
		position: absolute;
		display: block;
		width: 100rpx;
		height: 1px;
		background: #fff;
		bottom: 0;
		right: 40rpx;
		opacity: 0.3;
	}

	.nav-content {
		width: 100%;
		padding: 15rpx;
		display: inline-block;
		overflow-wrap: break-word;
		white-space: normal;
	}

	.nav-btn {
		width: 200rpx;
		height: 60rpx;
		margin: 8rpx auto;
		text-align: center;
		line-height: 60rpx;
		border-radius: 10rpx;
	}

	.bg-index1 {
		background-color: #19cf8a;
		color: #fff;
	}

	.bg-index2 {
		background-color: #954ff6;
		color: #fff;
	}

	.bg-index3 {
		background-color: #5177ee;
		color: #fff;
	}

	.bg-index4 {
		background-color: #f49a02;
		color: #fff;
	}

	.bg-index5 {
		background-color: #ff4f94;
		color: #fff;
	}

	.bg-index6 {
		background-color: #7fd02b;
		color: #fff;
	}

	.item-name {
		margin-bottom: 15rpx;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 1;
		overflow: hidden;
	}

	.disease-wrap {
		padding: 5%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		// align-items: center;

		.disease-title {
			font-size: 40rpx;
		}

		.diseases {
			width: 100%;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			margin-bottom: 100rpx;

			.disease-box {
				width: 100%;
				background: #fff;
				display: flex;
				flex-direction: column;
				border-radius: 10rpx;
				margin-bottom: 20rpx;



				.title {
					background: #19cf8a;
					padding: 3%;
					color: #fff;
					font-size: 35rpx;
					font-weight: 700;
					border-radius: 10rpx;
				}

				.brief {
					background: #fff;
					padding: 3%;
					border-radius: 10rpx;
					text-indent: 2em;
				}

				.btn {
					margin: 0 auto;
					width: 40%;

					button {
						background: #3B92EC;
						outline: #0081ff;
						border-radius: 10rpx;
						color: #FFFFFF;
						margin-bottom: 10rpx;
					}
				}
			}
		}
	}
</style>