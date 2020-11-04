import React, { useState, useEffect, useRef } from 'react';
import { useHistory } from "react-router-dom";
import NavBar from 'components/navBar'
import PullToRefresh from 'components/pullToRefresh'
import Axios from 'request/Axios'
import { useAliveController, useActivate, useUnactivate, } from 'react-activation'
// import { useHistory } from "react-router-dom";
import './index.less';
import { Toast } from 'antd-mobile';
// import { Button} from 'antd-mobile';
let removeKeepAlive = false;
let page = 1;
function SearchList(props) {
	let history = useHistory();
	const { dropScope, } = useAliveController();
	const refreshRef = useRef(null);
	const [refreshing, setRefreshing] = useState(false)
	const [list, setList] = useState([])
	const [listTotal, setListTotal] = useState(0)

	useEffect(() => {
		getList()
		return () => {
			page = 1;
			removeKeepAlive = false;
			setList([])
			setRefreshing(false)
		}
	}, [])

	useActivate(() => {
		if (refreshRef.current) {
			const { setScoll } = refreshRef.current
			//设置滚动位置
			setScoll();
			//拿到原先的数据比对
			let newData = list.map((rowData, index) => {
				if (index === 5) {
					rowData.name = '修改后的数据'
				}
				return {
					...rowData
				}
			})
			//更新行数据
			setList(newData)
		}

	})
	
	useUnactivate(() => {
		if (removeKeepAlive) {
			setTimeout(() => {
				//console.log('props.match.path',props.match.path)
				//去除当前缓存的路由路径
				dropScope(props.match.path)
			}, 100)
		}
	})
	
	function navReturnCallBack() {
		//清除keep alive组件缓存
		removeKeepAlive = true;
	}
	
	function onRefresh() {
		setRefreshing(true)
		page = 1;
		getList({type:'reset',startType:true});
	}
	
	function rowData(rowData) {
		return <div className="list_item" onClick={() => { gotoDetail(rowData) }}>姓名: {rowData.name}----年龄：{rowData.age}</div>
	}
	
	function gotoDetail(rowData) {
		history.push({
			pathname: '/search/list/detail',
			state: rowData,
		})
	}
	
	function onEndReached() {
		page += 1
		getList({startType:false});
	}

	function getList(getDataType = {startType:true}) {
		Axios.get('api/list', {
			//当前页数
			data: {
				page: page,
			},
			//此配置详见Axios.js配置
			requestToastConfig: {
				startType:getDataType.startType
			}
		}).then((res) => {
			//如果是重置先清空 不在重置函数清空的原因是
			//如果直接清空dom结构会瞬间没有 界面展示不友好
				if (res.success) {
					if(getDataType.type === 'reset'){
						setList([...res.data.list])
					}else{
						setList([...list, ...res.data.list])
					}
					setListTotal(res.data.total)
					setRefreshing(false)
				} else {
					page -= 1;
					setRefreshing(false)
				}
		},error => {
			page -= 1;
			setRefreshing(false)
			Toast.fail(error && error.message || '请求出错啦！')
		})
	}
	return (
		<div className="serch_box">
			<NavBar
				title="搜索列表"
				rightContent={<div></div>}
				leftCallBack={navReturnCallBack}
			/>
			<div className="am_list_box">
				<PullToRefresh
					ref={refreshRef}
					list={list}
					total={listTotal}
					distanceToRefresh={50}
					isRefresh={true}
					refreshing={refreshing}
					rowData={rowData}
					onRefresh={onRefresh}
					onEndReached={onEndReached}
				/>
			</div>
		</div>
	);
}
export default SearchList