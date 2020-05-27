
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
                meta:{
                    title:"首页",
                    defaultIcon:require('assets/default_index.png'),
                    activeIcon:require('assets/active_index.png'),
                },
                path:'/index',
                name:'/index',
                components: HomeIndex,
            },
            {
                meta:{
                    title:"搜索",
                    defaultIcon:require('assets/default_search.png'),
                    activeIcon:require('assets/active_search.png'),
                },
                path:'/search',
                name:'/search',
                components: SearchPage,
            },
            {
                meta:{
                    title:"我的",
                    defaultIcon:require('assets/default_my.png'),
                    activeIcon:require('assets/active_my.png'),
                },
                path:'/my',
                name:'/my',
                components: SearchPage,
            }
        ],
    },
    
]
export default router;