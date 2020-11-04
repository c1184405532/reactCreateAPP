import React from 'react';
import {
	TransitionGroup,
	CSSTransition
} from "react-transition-group";
import {
	Router,
	Switch,
	Route,
	Redirect,
	useLocation,
	useHistory,
} from "react-router-dom";
import { createBrowserHistory } from 'history';
import { AliveScope } from 'react-activation'
import routerData from 'router/index'
import Page404 from 'components/page404'
import AuthRoute from 'components/authRoute/index'
const createHistory = createBrowserHistory();
console.log('createHistory',createHistory)
function App() {
	return (
		<Router history={createHistory}>
			<AliveScope>
				<AnimationApp />
			</AliveScope>
		</Router>
	);
}
let oldLocation = null;
let homeRoute = routerData.filter((element) => {
	return element.meta && element.meta.type === 'home'
})[0]
function AnimationApp() {
	const location = useLocation();
	const history = useHistory();
	let classNames = '';
	if (history.action === 'PUSH') {
		classNames = 'in';
	} else if (history.action === 'POP' && oldLocation) {
		classNames = 'out'
	}
	if (oldLocation && history.action === 'PUSH') {
		homeRoute.children.forEach(element => {
			//jumpPath 是在components/layoutHome/index.js中定义的 因为是同一数据源的引用所以那边赋值了这边也能获取到
			//如果进入的页面是layout首页布局下的的子路由暂时不需要动画
			if (element.jumpPath === location.pathname) {
				classNames = 'none_animation'
			}
		});
	}
	// 更新旧location
	oldLocation = location;
	return (
		<Route
			render={({ location }) => {
				return (
					<TransitionGroup className={classNames}>
						<CSSTransition
							key={location.pathname}
							classNames="animation"
							timeout={300}
							mountOnEnter
							unmountOnExit
							enter={false}
							exit={false}
						>
							<div className="App">
								<Switch location={location}>
									{
										routerData.map(routeParams => {
											return (
												<AuthRoute
													meta={routeParams.meta || {}}
													onEnter={routeGoPage}
													key={routeParams.name}
													path={routeParams.path}
													exact={routeParams.meta && routeParams.meta.type === 'home' ? false : true}
													component={routeParams.components}
												/>
											)
										})
									}
									<Route exact path="/">
										<Redirect to="/user/login" />
									</Route>
									{ /* 页面路径没有匹配时进入此页面 必须放在最后 因为Switch 一旦匹配就会停止下面的路由匹配机制*/}
									<Route exact path="*" render={() => (<Page404 />)} />
								</Switch>
							</div>
						</CSSTransition>
					</TransitionGroup>
				)
			}}
		/>

	);
}
function routeGoPage(e) {
	//console.log('进入路由',e)    
}
export default App;
