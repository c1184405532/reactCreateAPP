import React,{ useState, useEffect,useRef } from 'react';
import NavBarLayout from 'components/NavBarLayout.js'
import ListComponents from 'components/ListComponents.js'
import Axios from 'request/Axios.js'
// import { useHistory } from "react-router-dom";
 import './index.css';
// import { Button} from 'antd-mobile';

function SearchList(){
    let page = 1;
    let listTotal = 0;
    const ListComponentsRef = useRef(null);
    const [listData,setListData] = useState([])
    const [refreshing,setRefreshing] = useState(false)
    useEffect(()=>{
        getList({
            type:'init'
        })
        return ()=>{
            
        }
    },[])
    function getList(getDataType){
        Axios.get('api/list',{
            //当前页数
            data:{
                page:page,
            },
            //此配置详见Axios.js配置
            // requestToastConfig:{
                
            //     beforeRequestToastType:getDataType ? getDataType.beforeRequestToastType : true
            // }
        }).then((res)=>{
            console.log('刷新成功',ListComponentsRef)  
            if(res.success){
                
                //数据合并
                
                ListComponentsRef.current.setDataSource({
                    type:getDataType.type,
                    data:res.data.list
                })
                listTotal = res.data.total;
                setRefreshing(false)
                console.log(res.data.list)
                //如果数据全部加装完毕 设置滚动到底状态为完成
                //滚动到底文字为没有更多了
                // if(this.listData.length >= this.listTotal ){
                //     this.finishedText = '没有更多了';
                //     this.$refs.ListComponentsRef.listFinished(true)
                // }else{
                //     this.$refs.ListComponentsRef.listFinished(false)
                // }
                // //如果没有数据 设置滚动到底的提示文字为暂无数据
                // if(this.listData.length === 0){
                //     this.finishedText = '暂无数据';
                // }
            }
            //如果是下拉刷新 重置下拉刷新状态
            if(getDataType && getDataType.clearRefresh){
                //如果没有数据 设置下拉刷新成功文字 为空 避免和暂无数据两个提示重叠
                if(this.listData.length === 0){
                    this.successText = '';
                }else{
                    this.successText = '刷新成功';
                }
                this.$refs.ListComponentsRef.refreshSuccess()
            }
            //如果是滚动到底请求 重置滚动到底状态
            if(getDataType && getDataType.clearListLoad){
                this.$refs.ListComponentsRef.listSuccess()
            }
            //如果是报错之后点击底部提示文字重新发起请求
            //重置状态
            // if(this.isListError){
            //     this.$refs.ListComponentsRef.listError(false)
            //     this.isListError = false
            // }
        },error=>{
            //console.log(error)
            //如果是下拉刷新请求报错 也重置下拉刷新状态
            if(getDataType && getDataType.clearRefresh){
                this.$refs.ListComponentsRef.refreshSuccess()
            }
            if(getDataType && getDataType.clearListLoad){
                //当请求报错的时候 会出现底部点击文字提示重新发起请求
                //虽然上一次请求结果没成功 但是page的页数也会同样加一
                //所以报错需要重复请求时page页数设置减一
                this.isListError = true; 
                this.$refs.ListComponentsRef.listError(true)
                this.page -= 1;
                this.$refs.ListComponentsRef.listSuccess()
            }
        })
    }
    function onRefresh(){
        listData.splice(0,listData.length)
        setRefreshing(true)
        page = 1;
        listTotal = 0;
        getList({
            type:'init'
        });
    }
    function rowData(rowData){
        return  <div className="list_item">{rowData.name}</div>
    }
    return (
        <div className="serch_box">
            <NavBarLayout
                title="搜索列表"
                rightContent={<div></div>}
            />
            <div className="am_list_box">
                <ListComponents
                    ref={ListComponentsRef}
                    distanceToRefresh={50}
                    onRefresh={onRefresh}
                    refreshing={refreshing}
                    rowData={rowData}
                    dataSource={listData}
                    children={
                        listData.length > 0 ?<div className="">
                            {listData.map((element,index)=>(
                                <div className="list_item" key={index}>{element.name}</div>
                            ))}
                            
                        </div>:'暂无数据'
                    }
                />
            </div>
            
            
           
            
        </div>
    );
}

export default SearchList