
import asyncComponent from 'components/asyncComponent'
import searchRouter from './search'
const AsyncLayoutHome = asyncComponent(() => import("components/layoutHome"));
const AsyncLogin = asyncComponent(() => import("pages/user/login"));
const AsyncHomeIndex = asyncComponent(() => import("pages/home/indexPage"));
const AsyncSearchPage = asyncComponent(() => import("pages/home/searchPage"));
const AsyncMyPage = asyncComponent(() => import("pages/home/myPage"));
//isRouterBack 是否可以不需要登录进入
//isToken 是否需要token校验
const router = [
	{
		meta: { isRouterBack: true },
		path: '/user/login',
		name: '/user/login',
		components: AsyncLogin
	},
	{
		//meta type === home会默认此配置文件下的children路由为tabbar嵌套的路由
		meta: { type: 'home', isToken: true },
		path: '/home',
		name: '/home',
		components: AsyncLayoutHome,
		children: [
			//这里path的路径不用拼写父组件路径 使用时会直接带上
			{
				meta: {
					title: "首页",
					defaultIcon: require('assets/default_index.png'),
					activeIcon: require('assets/active_index.png'),
				},
				path: '/index',
				name: '/index',
				components: AsyncHomeIndex,
			},
			{
				meta: {
					title: "搜索",

					defaultIcon: require('assets/default_search.png'),
					activeIcon: require('assets/active_search.png'),

				},
				path: '/search',
				name: '/search',
				components: AsyncSearchPage,
			},
			{
				meta: {
					title: "我的",

					defaultIcon: require('assets/default_my.png'),
					activeIcon: require('assets/active_my.png'),

				},
				path: '/my',
				name: '/my',
				components: AsyncMyPage,
			}
		],
	},
	...searchRouter

]
export default router;