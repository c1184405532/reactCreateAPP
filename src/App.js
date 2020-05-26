import React from 'react';
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Link,
	Redirect
  } from "react-router-dom";
import RouterData from 'router/index.js' 
import Error404 from 'pages/Error404.js'
let token = '';
function App() {
	return (
		<Router>
			<div className="App">
				<Switch>
					{
						//初始化重定向路径
						token ? <Redirect exact from='/' to='/home/index'/> : <Redirect exact from="/" to='/user/login' />
					}
					{
						RouterData.map(routeParams => {
                            return <Route 
                            
                                        key={routeParams.name} 
                                        path={routeParams.path} 
                                        component={routeParams.components}
                                    /> 		
						})

					}
					{/* 
						页面路径没有匹配时进入此页面 必须放在最后 
						因为Switch 一旦匹配就会停止下面的路由匹配机制
						如果token不存在 进入没有匹配的页面路径就跳转到登录
					*/}
					{
						token ? <Route  path="*" component={Error404}/>  : <Redirect  to='/user/login' />
					}
				</Switch>

			</div>
    	</Router>
		
	);
}

export default App;
