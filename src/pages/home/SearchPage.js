import React,{ useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import './static/index.css';
import { Button} from 'antd-mobile';

function SearchPage(){
    let history = useHistory();
    useEffect(()=>{
        window.$on('rightLayoutMenuClick',(data)=>{
            console.log('搜索页面',data)
        })
        return ()=>{
            window.$off('rightLayoutMenuClick')  
        }
    })

    function gotoPage(){
        history.push({
            pathname:'/search/list',
        })

    }
    return (
        <div >
            <Button 
                type={"primary"} 
                size="small" 
                className="btnClass" 
                children="跳转搜索列表页"
                onClick={gotoPage}
            />
            
        </div>
    );
}

export default SearchPage