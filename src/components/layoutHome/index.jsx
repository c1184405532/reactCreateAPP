import React from 'react';
import NavBar from 'components/navBar'
import TabBar from 'components/tabBar'
import Page404 from 'components/page404'
import routerData from 'router/index'
import './index.less';
import {
	Route,
	Switch
} from "react-router-dom";
let homeRouteData = []
class Index extends React.Component {
	constructor(props) {
		super(props)
		//初始化主页面子路由数据
		homeRouteData = routerData.filter((roure) => {
			if (roure.meta && roure.meta.type === 'home') {
				return roure
			}
			return null
		})[0].children
		homeRouteData.forEach(route => {
			//这里拼写this.props.match.path 的原因是因为这是嵌套路由 如果要拿到完整的路由路径就要加上父路由的路径
			route.jumpPath = this.props.match.path + route.path;
		})
		this.state = {
			navBarTitle: "",
			showNavBar: true,
			checkItem: ''
		}
	}
	componentDidMount() {
		let navMenuBarDataPage = window.getLocalStorage('navMenuBarDataPage')
		//如果存在当前选中页面 那么使用当前选中页面的数据
		if (navMenuBarDataPage) {
			const { navBarTitle,showNavBar,checkItem } = navMenuBarDataPage;
			this.tabCallback({
				title: navBarTitle,
				showNavBar: showNavBar,
				checkItem: checkItem
			})
		} else {
			//如果没有 默认设置router/index.js下的第一个页面
			this.tabCallback({
				...homeRouteData[0].meta,
				checkItem: homeRouteData[0].jumpPath
			})
		}
	}
	componentWillUnmount() {
	}
	rightCallBack = () => {
		window.$emit('rightLayoutMenuClick', {
			title: this.state.navBarTitle
		})
	}
	tabCallback = (routeMeta) => {
		this.setState({
			navBarTitle: routeMeta.title,
			showNavBar: routeMeta.showNavBar !== undefined ? routeMeta.showNavBar : true,
			checkItem: routeMeta.checkItem
		}, () => {
			//存储当前信息 用于跳转其他路由后回退 显示当前页面
			window.setLocalStorage('navMenuBarDataPage', this.state)
		})
	}
	render() {
		const { showNavBar,navBarTitle,checkItem } = this.state;
		const { match:{ path } } = this.props;
		return (
			<div className="layout_home_page_layout_box">
				<NavBar
					isShowNavBar={showNavBar}
					leftContent={true}
					title={navBarTitle}
					rightCallBack={this.rightCallBack}
				/>
				<div className="layout_home_content_box">
					<Switch>
						{homeRouteData.map(roureParams => (
							<Route key={roureParams.name} exact={true} path={`${path + roureParams.path}`} component={roureParams.components} />
						))}
						{
							/* 
								页面路径没有匹配时进入此页面 必须放在最后 
								因为Switch 一旦匹配就会停止下面的路由匹配机制
							*/
							<Route exact path="*" component={Page404} />
						}
					</Switch>
				</div>
				<div className="ignore_tab_bar_box">
					<TabBar tabData={homeRouteData} checkItem={checkItem} tabCallback={this.tabCallback} />
				</div>
			</div>
		);
	}
}
export default Index;