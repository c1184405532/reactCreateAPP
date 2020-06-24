import React from 'react';
import { useHistory } from "react-router-dom";
import './static/index.css';
import { Button} from 'antd-mobile';

function MyPage(){
    let history = useHistory();
    // useEffect(()=>{
    //     window.$on('rightLayoutMenuClick',(data)=>{
    //         console.log('搜索页面',data)
    //     })
    //     return ()=>{
    //         window.$off('rightLayoutMenuClick')  
    //     }
    // })

    function LoginOut(){
        history.push({
            pathname:'/user/login',
        })
        //如果退出登录 设置除了某些router配置的页面可以进行浏览器左上角回退按钮回退外其他页面均无法回退 防止回退到其他主页面
        window.setLocalStorage('isRouterBack',false)
        //清除token
        window.removeToken()
        //清除导航菜单数据
        window.removeLocalStorage('navMenuBarDataPage')
    }
    return (
        <div >
            <Button 
                type={"primary"} 
                size="small" 
                className="btnClass" 
                children="退出登录"
                onClick={LoginOut}
            />
            
        </div>
    );
}

export default MyPage