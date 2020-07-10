import React,{ useEffect } from 'react';
import { useHistory } from "react-router-dom";
import NavBarLayout from 'components/NavBarLayout.js'

function ListDetail(){
    const { location } = useHistory();
    useEffect(()=>{
        return ()=>{
            
        }
    },[])  
    
    return (
        <div className="serch_box">
            <NavBarLayout
                title="搜索列表详情"
                rightContent={<div></div>}
            />
            <div>{`姓名：${location.state.name}  年龄：${location.state.age}`}</div>
        </div>
    );
}

export default ListDetail