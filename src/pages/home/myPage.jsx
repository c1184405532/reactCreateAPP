import React from 'react';
import { useHistory } from "react-router-dom";
import './static/index.less';
import { Button } from 'antd-mobile';
import { logOut } from 'services'
function MyPage() {
	let history = useHistory();
	function loginOut() {
		history.push({
			pathname: '/user/login',
		})
		logOut();
	}
	return (
		<div >
			<Button
				type={"primary"}
				size="small"
				className="btn_class"
				children="退出登录"
				onClick={loginOut}
			/>
		</div>
	);
}

export default MyPage