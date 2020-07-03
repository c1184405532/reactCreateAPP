import React,{ useState, useEffect,useRef } from 'react';
import { useHistory } from "react-router-dom";
import NavBarLayout from 'components/NavBarLayout.js'
import ListComponents from 'components/ListComponents.js'
import Axios from 'request/Axios.js'
// import { useHistory } from "react-router-dom";
 import './index.css';
// import { Button} from 'antd-mobile';

function ListDetail(){
    
    useEffect(()=>{
        console.log('详情页')
        return ()=>{
            
        }
    },[])
    
   
   
    
    
    
    return (
        <div className="serch_box">
            <NavBarLayout
                title="搜索列表详情"
                rightContent={<div></div>}
            />
            <div>详情详情</div>
        </div>
    );
}

export default ListDetail