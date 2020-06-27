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
    withRouter
  } from "react-router-dom";
import RouterData from 'router/index.js' 
import Error404 from 'pages/Error404.js'
import AuthRoute from 'components/AuthRoute.js'
import 'globaleStyle/animations.css'
function routeGoPage(e){
    console.log('进入路由',e)    
}
function App() {
    //let location = useLocation();
	return (
		<Router>
            <AnimationApp/>
    	</Router>
		
	);
}
let oldLocation = null;
function AnimationApp(){
    let location = useLocation();
    let history = useHistory();
    let classNames = '';
    if(history.action === 'PUSH') {
        classNames = 'in';
    } else if(history.action === 'POP' && oldLocation) {
        classNames = 'out'
    }

    // 更新旧location
    oldLocation = location;
    console.log('history',history)
    return (
            <TransitionGroup
                className={classNames}
            >
                <CSSTransition
                    key={location.pathname}
                    classNames="animation"
                    onEnter={()=>{console.log('onEnter')}}
                    onEntered={()=>{console.log('onEntered')}}
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
                                                component={routeParams.components}
                                            />
                                })

                            }
                            <Route exact path="/">
                                <Redirect to="/user/login" />
                            </Route>
                            {
                                /* 
                                    页面路径没有匹配时进入此页面 必须放在最后 
                                    因为Switch 一旦匹配就会停止下面的路由匹配机制
                                */
                                <Route exact  path="*" component={Error404}/> 
                            }
                        </Switch>
                    </div>
                </CSSTransition>
            </TransitionGroup>
    	
		
	);
}
export default App;
