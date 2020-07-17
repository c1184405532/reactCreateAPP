import React,{ useEffect } from 'react';
import { useHistory } from "react-router-dom";
import NavBarLayout from 'components/NavBarLayout.js'

function ListDetail(){
    const { location } = useHistory();
    let propsRouteParams = location.state || {}
    useEffect(()=>{
        
        return ()=>{
           
        }
    },[location])  
    
    return (
        <div className="serch_box">
            <NavBarLayout
                title="搜索列表详情"
                rightContent={<div></div>}
            />
            {<div>{`姓名：${propsRouteParams.name}  年龄：${propsRouteParams.age}`}</div>}
        </div>
    );
}

export default ListDetail