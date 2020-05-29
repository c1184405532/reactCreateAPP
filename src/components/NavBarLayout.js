import React from 'react';
import { NavBar, Icon } from 'antd-mobile';
class NavBarLayout extends React.Component {
    static defaultProps = {
        leftContent:false,
        rightContent:false,
        isShowNavBar:true,
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
            this.props.isShowNavBar?<NavBar
                mode="dark"
                leftContent={this.props.leftContent || <Icon type="left" onClick={()=>{this.leftClick()}}/>}
                rightContent={this.props.rightContent || <Icon type="ellipsis" onClick={this.props.rightCallBack}/>}
            >{this.props.title}</NavBar>:null
            
            
        );
    }
}
export default NavBarLayout