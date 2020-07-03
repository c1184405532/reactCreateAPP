import React from 'react';
import {
    TransitionGroup,
    CSSTransition
  } from "react-transition-group";
import {
	BrowserRouter as Router,
	Switch,
	Route,
    Redirect,
    useLocation,
    useHistory,
  } from "react-router-dom";
import RouterData from 'router/index.js' 
import Error404 from 'pages/Error404.js'
import AuthRoute from 'components/AuthRoute.js'
import 'globaleStyle/animations.css'
function routeGoPage(e){
    //console.log('进入路由',e)    
}
function App() {
	return (
		<Router>
            <AnimationApp/>
    	</Router>
		
	);
}
let oldLocation = null;
let homeRoute = RouterData.filter((element)=>{
    return element.meta && element.meta.type === 'home'
})[0]
function AnimationApp(){
    let location = useLocation();
    let history = useHistory();
    let classNames = '';
    if(history.action === 'PUSH') {
        classNames = 'in';
    } else if(history.action === 'POP' && oldLocation) {
        classNames = 'out'
    }
    if(oldLocation && history.action === 'PUSH'){
        homeRoute.children.forEach(element => {
            //jumpPath 是在LayoutHomePage/Home中定义的 因为是同一数据源的引用所以那边赋值了这边也能获取到
            if(element.jumpPath === location.pathname){
                classNames = 'none_animation'
            }
        });
        
    }
    //console.log(homeRoute)
    // 更新旧location
    oldLocation = location;
    //console.log('history',location)
    return (
            <TransitionGroup
                className={classNames}
            >
                <CSSTransition
                    key={location.pathname}
                    classNames="animation"
                    timeout={300}
                    enter={false}
                    exit={false}
                >
                    <div className="App">
                        <Switch >		
                            {
                                RouterData.map(routeParams => {
                                    return  <AuthRoute 
                                                meta={routeParams.meta||{}}
                                                onEnter={routeGoPage}
                                                key={routeParams.name} 
                                                path={routeParams.path} 
                                                exact={routeParams.meta && routeParams.meta.type === 'home'? false:true}
                                                component={routeParams.components}
                                            />
                                })
                            }
                            <Route exact path="/">
                                <Redirect to="/user/login" />
                            </Route>
                            { /* 页面路径没有匹配时进入此页面 必须放在最后 因为Switch 一旦匹配就会停止下面的路由匹配机制*/}
                            <Route exact  path="*" component={Error404}/> 
                        </Switch>
                    </div>
                </CSSTransition>
            </TransitionGroup>		
	);
}
export default App;
