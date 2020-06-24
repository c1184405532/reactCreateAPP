
import asyncComponent from 'components/asyncComponent.js'

const AsyncSearchList= asyncComponent(() => import("pages/search/List.js"));
//isRouterBack 是否可以不需要登录进入
//isToken 是否需要token校验
const searchRouter = [
    {
        meta:{isToken:true},
        path:'/search/list',
        name:'/search/list',
        components: AsyncSearchList,
    },
    
]
export default searchRouter;