
import asyncComponent from 'components/asyncComponent.js'

const AsyncSearchList= asyncComponent(() => import("pages/search/List.js"));
const AsyncSearchListDetail= asyncComponent(() => import("pages/search/detail.js"));
//isRouterBack 是否可以不需要登录进入
//isToken 是否需要token校验
//keepAlive 组件是否需要缓存
const searchRouter = [
    {
        meta:{isToken:true,keepAlive:true},
        path:'/search/list',
        name:'/search/list',
        components: AsyncSearchList,
    },
    {
        meta:{isToken:true,},
        path:'/search/list/detail',
        name:'/search/list/detail',
        components: AsyncSearchListDetail,
    },
    
]
export default searchRouter;