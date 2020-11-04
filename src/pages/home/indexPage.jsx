import React, { useEffect } from 'react';
import './static/index.less'
function Index() {
	useEffect(() => {
		window.$on('rightLayoutMenuClick', (data) => {
			console.log('菜单点击', data)
		})
		return () => {
			window.$off('rightLayoutMenuClick')
		}
	});
	return (
		<div className="home_page">
			首页下的首页
		</div>
	);
}
export default Index