import React,{ useState, useEffect } from 'react';
import NavBarLayout from 'components/NavBarLayout.js'
// import { useHistory } from "react-router-dom";
 import './index.css';
// import { Button} from 'antd-mobile';

function SearchList(){

    return (
        <div >
            <NavBarLayout
                title="搜索列表"
            />
            <div className="block_style"></div>
           搜索列表
            
        </div>
    );
}

export default SearchList