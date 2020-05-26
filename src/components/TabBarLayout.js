import React from 'react';
import {withRouter} from "react-router-dom";
import { TabBar , Icon } from 'antd-mobile';
class TabBarLayout extends React.Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        console.log('props',this.props)
    }
    gotoPage(path){
        console.log(this.props)
        this.props.history.push({
            pathname:path
        })
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
                        icon={<Icon type='search'/>}
                        onPress={()=>{this.gotoPage(route.jumpPath)}}
                    /> 
                ))}
                
                 
            </TabBar>
        );
    }
}
export default withRouter(TabBarLayout)