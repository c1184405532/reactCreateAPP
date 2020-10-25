import React from 'react';
import {
	Route,
	withRouter,
} from "react-router-dom";
import KeepAlive from 'react-activation'
class AuthRoute extends React.Component {
	static defaultProps = {
		onEnter:()=>{},
	}
	componentDidMount() {
		const { onEnter,meta:{ isRouterBack,isToken },history } = this.props;
		//进入路由时回调函数
		onEnter(this.props)
		
		//判断 是否可以进入页面 
		let globaleRouterBack = window.getLocalStorage('isRouterBack')
		if (globaleRouterBack === false && isRouterBack !== true) {
			history.replace({pathname: '/user/login'})
			return
		}
		//判断是否需要token校验的页面
		let token = window.getToken()
		if (isToken && !token) {
			history.replace({	pathname: '/user/login',})
			return
		}
	}

	render() {
		const { component: Component, ...rest } = this.props
		let isKeepAlive = false;
		if (rest.meta && rest.meta.keepAlive) {
			isKeepAlive = true
		}
		return (
			isKeepAlive ? 
			<Route
				{...rest}
				render={routeProps => (
					<KeepAlive name={rest.path}>
						<Component {...routeProps} />
					</KeepAlive>
				)}
			>
			</Route>
			:
			<Route
				{...rest}
				render={routeProps => (
					<Component {...routeProps} />
				)}
			/>
		);
	}
}
export default withRouter(AuthRoute)