
import Login from 'pages/user/Login.js'
import Home from 'pages/homePage/Home.js'
const router = [
    {
        path:'/user/login',
        name:'/user/login',
        components: Login
    } ,
    {
        path:'/home/home',
        name:'/home/home',
        components: Home
    },
    
]
export default router;