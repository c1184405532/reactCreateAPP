
import asyncComponent from 'components/asyncComponent.js'

const AsyncSearchList= asyncComponent(() => import("pages/search/List.js"));
const searchRouter = [
    {
        path:'/search/list',
        name:'/search/list',
        components: AsyncSearchList,
    },
    
]
export default searchRouter;