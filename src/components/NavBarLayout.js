import React from 'react';
import { NavBar, Icon } from 'antd-mobile';
class NavBarLayout extends React.Component {
    static defaultProps = {
        leftContent:false,
        rightContent:false
    }
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        
    }
    componentWillUnmount() {
        
    }
    leftClick(){
        this.props.leftCallBack && this.props.leftCallBack()
    }
    
    render() {
        return (
            <NavBar
                mode="dark"
                leftContent={this.props.leftContent || <Icon type="left" onClick={()=>{this.leftClick()}}/>}
                rightContent={this.props.rightContent || <Icon type="ellipsis" onClick={this.props.rightCallBack}/>}
            >{this.props.title}</NavBar>
        );
    }
}
export default NavBarLayout