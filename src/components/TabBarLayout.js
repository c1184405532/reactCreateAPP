import React from 'react';
import {withRouter} from "react-router-dom";
import { TabBar  } from 'antd-mobile';
class TabBarLayout extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            
        }
    }
    componentDidMount() {
      
    }
    gotoPage(routeData){
      
        //设置当前选中项
        this.props.tabCallback({
            ...routeData.meta,
            checkItem:routeData.jumpPath
        })
        
        this.props.history.push({
            pathname:routeData.jumpPath
        })
    }
    ImgIcon(url){
        //console.log(url)
        return <img src={url} alt="" style={{width:24,height:24}}/>
    }
    componentWillUnmount() {
    }
    render() {
        return (
            <TabBar
                unselectedTintColor="#949494"
                tintColor="#33A3F4"
                barTintColor="white"
            >
                
                {this.props.tabData.map((route,index)=>(
                    <TabBar.Item 
                        key={route.name}
                        title={route.meta.title} 
                        icon={this.ImgIcon(route.meta.defaultIcon)}
                        selectedIcon={this.ImgIcon(route.meta.activeIcon)}
                        selected={this.props.checkItem === route.jumpPath}
                        onPress={()=>{this.gotoPage(route)}}
                    /> 
                ))}
                
                 
            </TabBar>
        );
    }
}
export default withRouter(TabBarLayout)