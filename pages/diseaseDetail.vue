<!-- 查看视频 -->
<template>
	<view class="container">
		<view class="MainBox">

			<view class="cssBox" style="position: relative;">

				<view class="leftBox">
					<view class="margin-bottom-sm">
						<text class="text-bold text-xl">{{getData.name}}</text>
					</view>
				</view>

			</view>

			<view class="cssBox">
				<view class="margin-bottom-sm">
					<text class="text-bold text-lg">简介：</text>
				</view>
				<text class="text-df">{{getData.brief}}</text>
			</view>
			<view class="cssBox">
				<view class="margin-bottom-sm">
					<text class="text-bold text-lg">治理方法</text>
				</view>
				<view class="cu-card article no-card">

					<view class="cu-item shadow" v-for="(item,index) in getData.content.methods">
						<view class="content" style="padding: 0;">
							<view class="list_content"> {{item}}</view>
						</view>
					</view>
				</view>



			</view>
		</view>
	</view>
	</view>


	</view>
</template>

<script>
	export default {
		components: {

		},
		data() {
			return {
				videoUrl: 'x3032spkh1m',
				getData: {
					"brief": "香菇生产中危害最大的竞争性杂菌。初期菌丝为白斑，逐渐生成浅绿色，菌落中央为深绿，边缘呈白色，后期变为深绿色，严重时可使菌袋全部变成墨绿色。",
					"content": {
						"methods": [
							"①用2%甲醛和石碳酸混合液或用克霉灵、除霉剂注射受害部位;亦可用“厌氧发菌”法防治绿霉：将感染严重的菌袋单层平放，上覆盖潮细*3～5厘米，待香菇菌丝布满菌袋后取出，此期间须遮阴，常检查，防高温。",
							"②也可利用温差进行控制，根据香菇菌丝和绿霉菌丝所需温度不同，把感染后的菌袋处理后运出培养室，置于20℃以下阴凉通风的环境中，可抑制绿霉的扩散，香菇菌丝亦能正常生长。"
						]
					},
					"id": 1,
					"name": "绿霉菌",
				}
			}
		},
		onShow() {
			try {
				const value = uni.getStorageSync('illitem');
				if (value) {
					this.getData = value
				}
			} catch (e) {
				// error
			}
		},
		onLoad() {

		},
		methods: {

		}
	}
</script>

<style lang="scss" scoped>
	page {
		background-color: #f2f5f9;
	}

	.MainBox {
		width: 750rpx;

		video {
			width: 750rpx;
		}
	}

	.cssBox {
		padding: 20rpx 30rpx;
		background-color: #FFFFFF;
		margin-bottom: 15rpx;
	}

	.rightBox {
		width: 150rpx;
		height: 100%;
		position: absolute;
		right: 20rpx;
		top: 0;
		text-align: center;
		line-height: 120rpx;
		padding: 0;
		background: none;
	}

	.list_title {
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 1;
		overflow: hidden;
		font-size: 30rpx;
		font-weight: 600;
		color: #333333;
	}

	.list_content {
		display: -webkit-box;
		// -webkit-box-orient: vertical;
		// -webkit-line-clamp: 2;
		// overflow: hidden;
		text-indent: 2em;
		word-break: break-all;
		font-size: 28rpx;
		color: #888;
	}

	.courseBox {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		margin-left: -10px;

		view {
			width: 240rpx;
			height: 58rpx;
			border: 2rpx solid #909399;
			text-align: center;
			line-height: 58rpx;
			-webkit-border-radius: 6px;
			border-radius: 12rpx;
			margin: 10rpx 0 20rpx;
			display: -webkit-box;
			-webkit-box-orient: vertical;
			-webkit-line-clamp: 1;
			overflow: hidden;
			word-break: break-all;
			font-size: 24rpx;
			color: #909399;
			padding: 0 6rpx;
		}

		.active {
			border: 2rpx solid #2979ff;
			background-color: #2979ff;
			color: #FFFFFF;
		}
	}

	.courseBox::after {
		content: "";
		flex: auto;
	}

	.courseBox>view {
		margin-left: 10px;
		margin-bottom: 10px;
		width: -webkit-calc((100% - 10px*3)/ 3);
		width: calc((100% - 10px*3)/ 3);
	}

	button::after {
		border: none;
		padding: 0;
	}
</style>