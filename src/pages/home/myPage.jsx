import React from 'react';
import { useHistory } from "react-router-dom";
import './static/index.less';
import { Button } from 'antd-mobile';
import { removeUserToken } from 'utils/userMethod'
function MyPage() {
	let history = useHistory();
	function loginOut() {
		history.push({
			pathname: '/user/login',
		})
		//如果退出登录 设置除了某些router配置的页面可以进行浏览器左上角回退按钮回退外其他页面均无法回退 防止回退到其他主页面
		window.setLocalStorage('isRouterBack', false)
		//清除token
		removeUserToken()
		//清除导航菜单数据
		window.removeLocalStorage('navMenuBarDataPage')
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