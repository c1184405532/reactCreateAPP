import React from 'react';
import RouterData from 'router/index.js' 
import './index.css';
import NavBarLayout from 'components/NavBarLayout.js'
import TabBarLayout from 'components/TabBarLayout.js'
import {
	Route,
  } from "react-router-dom";
let homeRouteData = []
class Home extends React.Component {
    constructor(props) {
        super(props)
        //初始化主页面子路由数据
        homeRouteData = RouterData.filter((roure)=>{
            if(roure.meta && roure.meta.type === 'home'){ 
                return roure
            }
        })[0].children
        homeRouteData.forEach(route=>{
            route.jumpPath = this.props.match.path + route.path;
        })
        //console.log('homeRouteData',homeRouteData)
    }
    componentDidMount() {
       // console.log(this.props.history)
    }
    componentWillUnmount() {
    }
    render() {
        return (
            <div className="home_page_layout_box">
                <NavBarLayout/>
                <div className="home_content_box">
                    {homeRouteData.map(roureParams=>(
                        <Route key={roureParams.name} path={`${this.props.match.path+roureParams.path}`} component={roureParams.components} />
                    ))}
                </div>
                <div className="tab_bar_box">
                    <TabBarLayout tabData={homeRouteData}/>
                </div>     
            </div>
        );
    }
}
export default Home