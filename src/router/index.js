
import asyncComponent from 'components/asyncComponent.js'

// import Login from 'pages/user/Login.js'
// import Home from 'pages/LayoutHomePage/Home.js'
// import HomeIndex from 'pages/home/IndexPage.js'
// import SearchPage from 'pages/home/SearchPage.js'
// import MyPage from 'pages/home/MyPage.js'
import searchRouter from './search.js'
const AsyncLogin = asyncComponent(() => import("pages/user/Login.js"));
const AsyncHome = asyncComponent(() => import("pages/LayoutHomePage/Home.js"));
const AsyncHomeIndex = asyncComponent(() => import("pages/home/IndexPage.js"));
const AsyncSearchPage = asyncComponent(() => import("pages/home/SearchPage.js"));
const AsyncMyPage = asyncComponent(() => import("pages/home/MyPage.js"));
//isRouterBack 是否可以不需要登录进入
//isToken 是否需要token校验
const router = [
    {
        meta:{isRouterBack:true},
        path:'/user/login',
        name:'/user/login',
        components: AsyncLogin
    } ,
    {
        //meta type === home会默认此配置文件下的children路由为tabbar嵌套的路由
        meta:{type:'home',isToken:true},
        path:'/home',
        name:'/home',
        components: AsyncHome,
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
                components: AsyncHomeIndex,
            },
            {
                meta:{
                    title:"搜索",
                   
                    defaultIcon:require('assets/default_search.png'),
                    activeIcon:require('assets/active_search.png'),
                    
                },
                path:'/search',
                name:'/search',
                components: AsyncSearchPage,
            },
            {
                meta:{
                    title:"我的",
                    
                    defaultIcon:require('assets/default_my.png'),
                    activeIcon:require('assets/active_my.png'),
                    
                },
                path:'/my',
                name:'/my',
                components: AsyncMyPage,
            }
        ],
    },
    ...searchRouter
    
]
export default router;