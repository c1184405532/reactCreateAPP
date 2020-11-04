
import asyncComponent from 'components/asyncComponent'

const AsyncSearchList = asyncComponent(() => import("pages/search/list"));
const AsyncSearchListDetail = asyncComponent(() => import("pages/search/detail"));
//isRouterBack 是否可以不需要登录进入
//isToken 是否需要token校验
//keepAlive 组件是否需要缓存
const searchRouter = [
	{
		meta: { isToken: true, keepAlive: true },
		path: '/search/list',
		name: '/search/list',
		components: AsyncSearchList,
	},
	{
		meta: { isToken: true, },
		path: '/search/list/detail',
		name: '/search/list/detail',
		components: AsyncSearchListDetail,
	},

]
export default searchRouter;