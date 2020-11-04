import React from 'react';
import { PullToRefresh, ListView,Icon } from 'antd-mobile';
import './index.less';
let isAddData = true;
class Index extends React.Component {
	static defaultProps = {
		list:[],//数据源 Array 每一行的数据源 必传
		total:0,//数据总数 用于判断分页数据是否加载完毕 number 必传 
		isRefresh: true,//是否需要下拉刷新 Boolean
		direction:'down',//下拉刷新方向 string ( down or up )
		refreshing: false,// 是否显示刷新状态 Boolean
		distanceToRefresh:50,//下拉刷新触发回调的距离	 number
		threshold:50,//离底部多少距离触发 onEndReached回调 number
		pageSize:10,//每次事件循环（每帧）渲染的行数 number
		className:'',//额外的类名 string
		onRefresh:()=>{console.log('请传入刷新函数')},//下拉刷新触发的回调 必传
		rowData:()=>{console.log('请传入接受row数据回调')},//每行数据触发的回调，可接收当前row数据 必传
		onEndReached:()=>{console.log('请传入上拉加载到底触发回调')},//上拉滚动到底触发回调 必传
		listIndicatorNoData:<div className="refresh-footer-desc">暂无数据</div>,//列表底部提示 没有数据的ReactNode 
		listIndicatorAdd:<div className="refresh-footer-desc">上拉加载更多</div>,//列表底部提示 数据未加载完毕的ReactNode 
		listIndicatorFinish:<div className="refresh-footer-desc">数据已全部加载</div>,//列表底部提示 数据加载完毕的ReactNode 
		listIndicatorLoading:<div className="refresh-footer-desc"><Icon type='loading'/>&nbsp;&nbsp;加载中...</div>,//列表底部提示 数据加载中的ReactNode 
		refreshIndicatorActivate:<div>松开立即刷新</div>,//下拉刷新提示 下拉到触发距离时 ReactNode 
		refreshIndicatorDeactivate:<div>下拉可以刷新</div>,//下拉刷新提示 下拉时ReactNode 
		refreshIndicatorFinish:<div>刷新完成</div>,//下拉刷新提示 下拉刷新状态为true时ReactNode 
	}
	constructor(props) {
		super(props);
		this.listDom = React.createRef();
		const dataSource = new ListView.DataSource({
			rowHasChanged: (row1, row2) => {
				return row1 !== row2
			}
		});
		this.state = {
			renderFooterType: '',
			dataSource,
			scrollTop: 0
		}

	}
	componentDidMount() {
		this.setState({
			dataSource: this.state.dataSource.cloneWithRows([]),
		});
	}
	componentDidUpdate(prevProps) {
		if (this.props.list !== prevProps.list) {
			//这里用宏任务的原因是 如果你设置props的total在设置props list后 会无法获取正确的total
			setTimeout(() => {
				this.setState({
					dataSource: this.state.dataSource.cloneWithRows(this.props.list),
				})
				isAddData = true;
				this.setEndDataType();
			})
		}

	}
	setEndDataType = () => {
		const { total, list } = this.props;
		let renderFooterType = '';
		if (total === list.length && total > 0) {
			renderFooterType = 'finish'
		} else if (total > list.length) {
			renderFooterType = 'add'
		} else if (total === 0 && list.length === 0) {
			renderFooterType = 'no'
		}
		if (renderFooterType) {
			this.setState({ renderFooterType: renderFooterType })
		}
	}
	onEndReached = () => {
		//防止重复进行请求 发送第一次请求后禁止 等数据回填回来再放开
		if (isAddData === false) return;
		const { renderFooterType } = this.state
		const { onEndReached } = this.props;
		if (renderFooterType === 'add') {
			isAddData = false;
			this.setState({renderFooterType:'loading'})
			onEndReached && onEndReached()
		}
	}
	renderFooter = () => {
		const { renderFooterType } = this.state;
		const { listIndicatorNoData,listIndicatorAdd,listIndicatorFinish,listIndicatorLoading } = this.props;
		if (renderFooterType === 'add') {
			return listIndicatorAdd
		}
		if (renderFooterType === 'no') {
			return listIndicatorNoData
		}
		if (renderFooterType === 'finish') {
			return listIndicatorFinish
		}
		if (renderFooterType === 'loading') {
			return listIndicatorLoading
		}
	}
	setScoll = (top = 0) => {
		this.listDom.current.scrollTo(0, this.state.scrollTop || top)
	}
	onScroll = (e) => {
		this.setState({
			scrollTop: e.target.scrollTop
		})
	}
	render() {
		const { className,isRefresh,distanceToRefresh,direction,refreshing,threshold,pageSize} = this.props;
		const { refreshIndicatorActivate,refreshIndicatorDeactivate,refreshIndicatorFinish } = this.props
		const { rowData,onRefresh } = this.props;
		return (
			<ListView
				ref={this.listDom}
				dataSource={this.state.dataSource}
				renderRow={row => (rowData(row))}
				style={{ overflow: 'auto', height: '100%' }}
				className={`pull-to-refresh-box ${className}`}
				onScroll={this.onScroll}
				pullToRefresh={
					isRefresh ? <PullToRefresh
						distanceToRefresh={distanceToRefresh}
						direction={direction}
						refreshing={refreshing}
						onRefresh={onRefresh}
						indicator={{
							activate: refreshIndicatorActivate,
							deactivate: refreshIndicatorDeactivate,
							finish: refreshIndicatorFinish,
						}}
					/> : null
				}
				renderFooter={this.renderFooter}
				onEndReached={this.onEndReached}
				onEndReachedThreshold={threshold}
				pageSize={pageSize}
			/>
		)
	}
}
export default Index