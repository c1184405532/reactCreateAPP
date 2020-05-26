
import Login from 'pages/user/Login.js'
import Home from 'pages/LayoutHomePage/Home.js'
import HomeIndex from 'pages/home/IndexPage.js'
import SearchPage from 'pages/home/SearchPage.js'
const router = [
    {
        path:'/user/login',
        name:'/user/login',
        components: Login
    } ,
    {
        //meta type === home会默认此配置文件下的children路由为tabbar嵌套的路由
        meta:{type:'home'},
        path:'/home',
        name:'/home',
        components: Home,
        children:[
            //这里path的路径不用拼写父组件路径 使用时会直接带上
            {
                meta:{title:"首页"},
                path:'/index',
                name:'/index',
                components: HomeIndex,
            },
            {
                meta:{title:"搜索"},
                path:'/search',
                name:'/search',
                components: SearchPage,
            }
        ],
    },
    
]
export default router;