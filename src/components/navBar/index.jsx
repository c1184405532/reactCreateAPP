import React from 'react';
import { NavBar, Icon } from 'antd-mobile';
import { withRouter } from 'react-router-dom'
class Index extends React.Component {
	static defaultProps = {
		//可接受props
		title: '导航栏',//导航栏title
		leftContent: false,//导航栏左侧内容
		rightContent: false,//导航栏右侧内容
		isShowNavBar: true,//是否显示导航栏
		leftCallBack: ()=>{},//导航栏点击左侧回调
		rightCallBack: ()=>{},//导航栏点击右侧回调
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
		const { leftCallBack,history } = this.props;
		leftCallBack()
		history.go(-1);
	}
	render() {
		const { rightCallBack,isShowNavBar,title,leftContent,rightContent } = this.props;
		return (
			isShowNavBar ?
				<NavBar
					mode="dark"
					leftContent={leftContent || <Icon type="left" onClick={this.leftClick} />}
					rightContent={rightContent || <Icon type="ellipsis" onClick={rightCallBack} />}
				>
					{title}
				</NavBar>
				: null
		);
	}
}
export default withRouter(Index)