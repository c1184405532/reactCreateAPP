import React from 'react';
import { PullToRefresh, ListView } from 'antd-mobile';
let isAddData = true;
class ListComponents extends React.Component {
	static defaultProps = {
		//是否需要下拉刷新
		isRefresh: true,
		refreshing: false,
		//列表底部提示 
		listIndicator: {
			no: <div style={{ textAlign: 'center' }}>暂无数据</div>,
			add: <div style={{ textAlign: 'center' }}>上拉加载更多</div>,
			finish: <div style={{ textAlign: 'center' }}>数据已全部加载</div>,
		},
		//下拉刷新提示
		refreshIndicator: {
			activate: <div>松开立即刷新</div>,
			deactivate: <div>下拉可以刷新</div>,
			finish: <div>刷新完成</div>,
		}
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
			renderFooterType: 'init',
			dataSource,
			password: '',
			isLoading: false,
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
		if (renderFooterType === 'add') {
			isAddData = false;
			this.props.onEndReached && this.props.onEndReached()
		}

		//console.log('onEndReached')
	}
	renderFooter = () => {
		if (this.state.renderFooterType === 'add') {
			return this.props.listIndicator.add
		}
		if (this.state.renderFooterType === 'no') {
			return this.props.listIndicator.no
		}
		if (this.state.renderFooterType === 'finish') {
			return this.props.listIndicator.finish
		}
	}
	// setDataSource = (data)=>{
	//     isAddData = true;
	//     if(data.type === 'error'){
	//         return
	//     }
	//     currentTotal = data.total;
	//     if(data.type === 'init'){
	//         currentData = data.data
	//         this.setState({
	//             dataSource: this.state.dataSource.cloneWithRows(data.data),
	//         });
	//     }
	//     if(data.type === 'add'){
	//         this.setState({
	//             dataSource: this.state.dataSource.cloneWithRows([...currentData,...data.data]),
	//         },()=>{
	//             currentData = [...currentData,...data.data]
	//             //console.log(currentData)
	//         });

	//     }   
	// }
	// getAllRowData = ()=>{
	//     //这里必须深拷贝一次 否则rowHasChanged中对数据进行判断的时候获取的是同一引用对象数据源 每次更改都会匹配false 导致视图不更新
	//     return JSON.parse(JSON.stringify(currentData));
	// }
	// upDateRowData = (newAllRowData)=>{
	//     this.setState({
	//         dataSource: this.state.dataSource.cloneWithRows([...newAllRowData]),
	//     },()=>{
	//         currentData = [...newAllRowData];
	//     });
	// }
	setScoll = (top) => {
		//console.log(this.state.scrollTop )
		this.listDom.current.scrollTo(0, this.state.scrollTop || top)
	}
	onScroll = (e) => {
		this.setState({
			scrollTop: e.target.scrollTop
		})
	}
	render() {
		return (
			<ListView
				ref={this.listDom}
				dataSource={this.state.dataSource}
				renderRow={rowData => (this.props.rowData(rowData))}
				style={{ overflow: 'auto', height: '100%' }}
				className={this.props.className}
				onScroll={this.onScroll}
				pullToRefresh={
					this.props.isRefresh ? <PullToRefresh
						distanceToRefresh={this.props.distanceToRefresh || 25}
						direction={this.props.direction || 'down'}
						refreshing={this.props.refreshing}
						onRefresh={this.props.onRefresh || (() => (console.log('请传入刷新函数')))}
						indicator={{
							activate: this.props.refreshIndicator.activate,
							deactivate: this.props.refreshIndicator.deactivate,
							finish: this.props.refreshIndicator.finish,
						}}
					/> : null
				}
				renderFooter={this.renderFooter}
				onEndReached={this.onEndReached}
				onEndReachedThreshold={50}
				pageSize={10}
			/>
		)
	}

}
export default ListComponents