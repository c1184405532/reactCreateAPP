import React from 'react';
import { NavBar, Icon } from 'antd-mobile';
import { withRouter } from 'react-router-dom'
class NavBarLayout extends React.Component {
	static defaultProps = {
		//可接受props
		title: '导航栏',//导航栏title
		leftContent: false,//导航栏左侧内容
		rightContent: false,//导航栏右侧内容
		isShowNavBar: true,//是否显示导航栏
		leftCallBack: undefined,//导航栏点击左侧回调
		rightCallBack: undefined,//导航栏点击右侧回调
	}
	constructor(props) {
		super(props);
		this.state = {

		}
	}
	componentDidMount() {

	}
	componentWillUnmount() {

	}
	leftClick = () => {
		//console.log('返回',this.props.history)
		this.props.leftCallBack && this.props.leftCallBack()
		this.props.history.go(-1)
	}
	rightClick = () => {
		//console.log('右侧点击')
	}
	render() {
		return (
			this.props.isShowNavBar ?
				<NavBar
					mode="dark"
					leftContent={this.props.leftContent || <Icon type="left" onClick={this.leftClick} />}
					rightContent={this.props.rightContent || <Icon type="ellipsis" onClick={this.props.rightCallBack || this.rightClick} />}
				>
					{this.props.title}
				</NavBar>
				: null
		);
	}
}
export default withRouter(NavBarLayout)