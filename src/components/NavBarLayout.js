import React from 'react';
import { NavBar, Icon } from 'antd-mobile';
class NavBarLayout extends React.Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        
    }
    componentWillUnmount() {
    }
    render() {
        return (
            <NavBar
                mode="dark"
                leftContent={<Icon type="left" />}
                rightContent={[
                    <Icon key="0" type="search" style={{ marginRight: '16px' }} />,
                    <Icon key="1" type="ellipsis" />,
                ]}
            >头部导航</NavBar>
        );
    }
}
export default NavBarLayout