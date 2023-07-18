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

		<view class="message-box">
			<view class="page-section swiper">
				<view class="page-section-spacing">
					<swiper style="height: 120rpx;" class="swiper" vertical="ture" circular="true"
						indicator-dots='false' indicator-color="rgba(0,0,0,.0)" indicator-active-color="rgba(0,0,0,.0)"
						autoplay="true" interval="4000">
						<swiper-item class="swiper-list" v-for="(item, index) in messageData" :key="index">
							<view class="message-tltle">{{item.title}}</view>
							<view class="message-content"><span>{{item.tag}}</span>{{item.content}}</view>
						</swiper-item>
					</swiper>
				</view>
			</view>
		</view>


		<image @click="goAboutUs" class="jn_img" src="https://s1.ax1x.com/2023/03/21/ppaeM2n.jpg" mode="widthFix">
		</image>

		<view class="cu-bar bg-white margin-top-xs">
			<view class="action sub-title">
				<text class="text-xl text-bold text-blue text-shadow">热门推荐</text>
				<text class="text-ABC text-blue">curriculum</text>
			</view>
			<view class="action" @click="goVideo"><text class="text-lg text-grey text-shadow">更多</text></view>
		</view>

		<view class="skill-sequence-panel-content-wrapper">
			<!--左边虚化-->
			<view class="hide-content-box hide-content-box-left"></view>
			<!--右边虚化-->
			<view class="hide-content-box hide-content-box-right"></view>
			<scroll-view scroll-x="true" class="kite-classify-scroll">
				<view class="kite-classify-cell shadow" v-for="(item, index) in curriculum" :key="index">
					<view :class="'nav-li bg-index' + (index + 1)">
						<view class="nav-name">{{ item.name }}</view>
					</view>
					<view class="nav-content">{{ item.brief }}</view>
					<view @click="goVideo(item)" class="nav-btn shadow" :class="'bg-index' + (index + 1)">立即学习</view>
				</view>
			</scroll-view>
		</view>


		<view style="height: 140rpx;width: 1rpx;"></view>
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
				messageData: [{
						title: '这是一条test数据',
						tag: 'test',
						content: '这是一条test数据'
					},
					{
						title: '这是一条test数据',
						tag: 'test',
						content: '这是一条test数据'
					}
				],
				curriculum: [{
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
				projectList: [{
						"id": 1,
						"type": 2,
						"title": "数据可视化大屏电子沙盘集合",
						"img": "https://cdn.zhoukaiwen.com/Fpa3guHx6xxL5EFAVpmmjlx1uaDr",
						"content": "【PC端】数据可视化大屏电子沙盘集合，基于：html/dataV/Echarts等等，包含行业：区块链金融行业、智慧社区、智慧物业、智慧政务、智慧交通、通用模板等，包含功能：自定义字体、Css动画、WebSocket实时数据、K线折线等各种图表，iframe嵌套H5/App，替换js数据即可，满足您会议展览、业务监控、风险预警、数据分析展示等多种展示需求，Gitee点个 Star 关注更新，笔芯♥️～&是否商用：可商用&项目价格：0元&链接地址：https://gitee.com/kevin_chou/dataVIS",
						"author": "kevin",
						"createdAt": 1664309170029,
						"state": 1,
						"seeNum": 4328,
						"likesNum": 344,
						"commentNum": 281,
						"imgList": "https://cdn.zhoukaiwen.com/Fpa3guHx6xxL5EFAVpmmjlx1uaDr,https://cdn.zhoukaiwen.com/Fm1-N1gYEL6bx0MQual5-M0pDoB3,https://cdn.zhoukaiwen.com/Fonph27MToUMEy70Or2aaY-2WqYj,https://cdn.zhoukaiwen.com/FhQ9Lv-5rwU6WnNi0gqr-0gH6Yvb,https://cdn.zhoukaiwen.com/Fk7Bpc46SXNuGFJLyxbBrOQSdPAc,https://cdn.zhoukaiwen.com/FqPj-5Nr4l1pORBoyJDrdOmzIkxt"
					},
					{
						"id": 2,
						"type": 2,
						"title": "「易凯商城」电子商城纯前端，易上手～",
						"img": "https://cdn.zhoukaiwen.com/FlR8wkoy8CpUab4wTajXd5gNEgfQ",
						"content": "H5版本纯前端商城，页面清晰易上手、部署简单、H5灵活可广泛应用（可App嵌套/微信公众号/H5端），包含：商品展示、商品分类、分销（暂时移除）购物车、地址管理、售后管理、投诉建议、个人中心等页面；&如帮助到您，麻烦Gitee点个 Star 关注版本更新；&是否商用：可商用；&项目价格：0元；&项目链接：https://gitee.com/kevin_chou/ykShop",
						"author": "Kevin",
						"createdAt": 1664384780317,
						"state": 1,
						"seeNum": 2965,
						"likesNum": 348,
						"commentNum": 152,
						"imgList": "https://cdn.zhoukaiwen.com/FmQUu_zzkFPgfD9mW_s6VUPRfrOu,https://cdn.zhoukaiwen.com/FggyNz97y1XRbqvgGLy8TlHqrk9S,https://cdn.zhoukaiwen.com/FoCAcPkAr33sfNyEIxcqjnpTTWxc,https://cdn.zhoukaiwen.com/FplP6uDupEtz52EY2TSH9driQMDH"
					}
				]
			};
		},
		watch: {},
		mounted() {
			console.log(this.projectList);
			// this.getData();

		},
		methods: {
			getData() {
				console.log('数据加载');
				let opts = {
					url: 'api/project/list',
					method: 'get'
				};
				uni.showLoading({
					title: '加载中'
				});
				request.httpRequest(opts).then(res => {
					console.log(res);
					uni.hideLoading();
					if (res.statusCode == 200) {
						this.projectList = res.data.data;
					} else {
						this.projectList = [];
					}
				});
			},
			scroll: function(e) {
				console.log(e);
				this.old.scrollTop = e.detail.scrollTop;
			},
			goCategorieslist: function(e) {
				// console.log(e.currentTarget.dataset.mid)
				if (e.currentTarget.dataset.mid == 1 || e.currentTarget.dataset.mid == 2) {
					uni.navigateTo({
						url: '../timeline?mid=' + e.currentTarget.dataset.mid
					});
				} else if (e.currentTarget.dataset.mid == 3) {
					uni.navigateTo({
						url: '../../os_project/index'
					});
				} else if (e.currentTarget.dataset.mid == 4) {
					this.$emit('ShowNews', 'news')
					console.log('文章资讯')

				}
			},
			goProjectList() {
				uni.navigateTo({
					url: '../project/list'
				});
			},
			goProject(id) {
				uni.navigateTo({
					url: '../project/project?id=' + id
				});
			},
			goVideo(item) {

				try {
					uni.setStorageSync('illitem', item);
				} catch (e) {
					// error
				}
				uni.navigateTo({
					url: '../video'
				});
			},
			goAboutUs() {
				uni.navigateTo({
					url: '../me/about_us'
				})
			}
		},
		filters: {
			formatDate(value) {
				if (value == undefined) {
					return;
				}
				// let date = new Date(value * 1000);
				let date = new Date(value);
				//时间戳为10位需*1000，时间戳为13位的话不需乘1000
				let y = date.getFullYear();
				let MM = date.getMonth() + 1;
				MM = MM < 10 ? ('0' + MM) : MM; //月补0
				let d = date.getDate();
				d = d < 10 ? ('0' + d) : d; //天补0
				let h = date.getHours();
				h = h < 10 ? ('0' + h) : h; //小时补0
				let m = date.getMinutes();
				m = m < 10 ? ('0' + m) : m; //分钟补0
				let s = date.getSeconds();
				s = s < 10 ? ('0' + s) : s; //秒补0
				// return y + '-' + MM + '-' + d; //年月日	 + ' ' + h + ':' + m
				return y + '-' + MM + '-' + d; //年月日时分秒
			},
			typeF(value) {
				if (!value) {
					return;
				}
				if (value == 2) {
					return 'Gitee开源'
				}
				if (value == 3) {
					return '可商用'
				}
				if (value == 4) {
					return '商业项目'
				}
				if (value == 5) {
					return '付费模板'
				}
				if (value == 6) {
					return '仅供参考'
				}
				if (value == 7) {
					return '其他类型'
				}
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
</style>