import React from 'react';
import { Button, } from 'antd-mobile';
import { useHistory } from "react-router-dom";
import './index.less'
export default function Page404() {
	const { replace } = useHistory()
	const goHome = ()=> {
		const { removeLocalStorage } = window;
		removeLocalStorage('navMenuBarDataPage')
		replace({ pathname: '/home/index'})
	}
	return (
		<div className="page_404_box">
			<div className="title">您好，当前页面消失啦，请再找找吧！</div>
			<Button type="primary" className="btn" onClick={goHome}>回到首页</Button>
		</div>
	)
}