import React from 'react';
import {withRouter} from "react-router-dom";
import { TabBar , Icon } from 'antd-mobile';
class TabBarLayout extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            checkItem:this.props.tabData[0].jumpPath,
        }
        
    }
    componentDidMount() {
        console.log('props',this.props)
        this.props.tabCallback(this.props.tabData[0].meta.title)
    }
    gotoPage(routeData){
        //console.log(this.props)
        this.setState({
            checkItem:routeData.jumpPath
        })
        this.props.tabCallback(routeData.meta.title)
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
                
                {this.props.tabData.map(route=>(
                    <TabBar.Item 
                        key={route.name}
                        title={route.meta.title} 
                        icon={this.ImgIcon(route.meta.defaultIcon)}
                        selectedIcon={this.ImgIcon(route.meta.activeIcon)}
                        selected={this.state.checkItem === route.jumpPath}
                        onPress={()=>{this.gotoPage(route)}}
                    /> 
                ))}
                
                 
            </TabBar>
        );
    }
}
export default withRouter(TabBarLayout)