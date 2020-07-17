import React from 'react';
import {
    Route,
    withRouter,
} from "react-router-dom";
import KeepAlive from 'react-activation'
class AuthRoute extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            
        }
        
    }
    componentDidMount() {
        
        //进入路由时回调函数
        if(this.props.onEnter){
            this.props.onEnter(this.props)
        }
        //判断 是否可以进入页面 
        let isRouterBack = window.getLocalStorage('isRouterBack')
        if(isRouterBack === false && this.props.meta.isRouterBack !== true){
            this.props.history.replace({
                pathname:'/user/login',
            })
            return
        }
        //判断是否需要token校验的页面
        let token = window.getToken()
        if(this.props.meta.isToken && !token){
            this.props.history.replace({
                pathname:'/user/login',
            })
            return 
        }
    }
    
    render() {
        const {component: Component,...rest } = this.props
        
        let isKeepAlive = false;
        if(rest.meta && rest.meta.keepAlive){
            isKeepAlive = true
            //console.log('isKeepAlive',rest)
        }
        return (
            isKeepAlive?<Route
                            {...rest}
                            render={routeProps=>(
                                <KeepAlive  name={rest.path}>
                                    
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