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