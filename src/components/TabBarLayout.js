import React from 'react';
import { TabBar , Icon } from 'antd-mobile';
class TabBarLayout extends React.Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        
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
                <TabBar.Item title={'首页'} icon={<Icon type='home-o'/>}> 54646</TabBar.Item>   
                <TabBar.Item title={'搜索'} icon={<Icon type='search'/>}>6666 </TabBar.Item>       
            </TabBar>
        );
    }
}
export default TabBarLayout