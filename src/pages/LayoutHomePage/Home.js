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
            return null
        })[0].children
        
        homeRouteData.forEach(route=>{
            //这里拼写this.props.match.path 的原因是因为这是嵌套路由 如果要拿到完整的路由路径就要加上父路由的路径w
            route.jumpPath = this.props.match.path + route.path;
        })
        this.state = {
            navBarTitle:"",
            showNavBar:true,
            checkItem:''
        }
        //console.log('homeRouteData',homeRouteData)
    }
    componentDidMount() {
        //console.log('componentDidMount',navMenuBarDataPage)
        let navMenuBarDataPage = window.getLocalStorage('navMenuBarDataPage')
        //如果存在当前选中页面 那么使用当前选中页面的数据
        if(navMenuBarDataPage){
            //console.log('componentDidMount',navMenuBarDataPage)
            this.tabCallback(
                {
                    title:navMenuBarDataPage.navBarTitle,
                    showNavBar:navMenuBarDataPage.showNavBar,
                    checkItem:navMenuBarDataPage.checkItem
                },
            )
        }else{
            //如果没有 默认设置router/index.js下的第一个页面
            this.tabCallback({
                ...homeRouteData[0].meta,
                checkItem:homeRouteData[0].jumpPath
            })
        }
        
    }
    componentWillUnmount() {
    }
    leftCallBack = ()=>{
        console.log('左侧点击',this.state.navBarTitle)
    }
    rightCallBack = ()=>{
        window.$emit('rightLayoutMenuClick',{
            title:this.state.navBarTitle
        })
        console.log('右侧点击',this.state.navBarTitle)
    }
    tabCallback = (routeMeta)=>{
        this.setState({
            navBarTitle:routeMeta.title,
            showNavBar:routeMeta.showNavBar !== undefined ? routeMeta.showNavBar : true,
            checkItem:routeMeta.checkItem
        },()=>{
            //存储当前信息 用于跳转其他路由后回退 显示当前页面
            window.setLocalStorage('navMenuBarDataPage',this.state)
            //console.log('tabCallback',routeMeta)
        })
    }
    render() {
        return (
            <div className="home_page_layout_box">
                <NavBarLayout 
                    isShowNavBar={this.state.showNavBar}
                    leftContent={true}
                    title={this.state.navBarTitle}
                    leftCallBack={this.leftCallBack}
                    rightCallBack={this.rightCallBack}
                />
                <div className="home_content_box">
                    {homeRouteData.map(roureParams=>(
                        <Route key={roureParams.name} path={`${this.props.match.path+roureParams.path}`} component={roureParams.components} />
                    ))}
                </div>
                <div className="tab_bar_box">
                    <TabBarLayout tabData={homeRouteData} checkItem={this.state.checkItem} tabCallback={this.tabCallback}/>
                </div>     
            </div>
        );
    }
}
export default Home