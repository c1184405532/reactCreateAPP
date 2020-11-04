import React from 'react';
import { withRouter } from "react-router-dom";
import { TabBar } from 'antd-mobile';
class Index extends React.Component {
	static defaultProps = {
		tabData:[],
		checkItem:'',
		tabCallback:()=>{},
	}
	constructor(props) {
		super(props);
		this.state = {

		}
	}
	componentDidMount() {

	}
	gotoPage(routeData) {
		const { tabCallback,history } = this.props;
		//设置当前选中项
		tabCallback({
			...routeData.meta,
			checkItem: routeData.jumpPath
		})

		history.push({
			pathname: routeData.jumpPath
		})
	}
	imgIcon(url) {
		return <img src={url} alt="" style={{ width: 24, height: 24 }} />
	}
	render() {
		const { tabData,checkItem } = this.props;
		return (
			<TabBar
				unselectedTintColor="#949494"
				tintColor="#33A3F4"
				barTintColor="white"
			>
				{tabData.map((route) => (
					<TabBar.Item
						key={route.name}
						title={route.meta.title}
						icon={this.imgIcon(route.meta.defaultIcon)}
						selectedIcon={this.imgIcon(route.meta.activeIcon)}
						selected={checkItem === route.jumpPath}
						onPress={() => { this.gotoPage(route) }}
					/>
				))}
			</TabBar>
		);
	}
}
export default withRouter(Index)