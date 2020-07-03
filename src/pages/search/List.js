import React,{ useState, useEffect,useRef } from 'react';
import { useHistory } from "react-router-dom";
import NavBarLayout from 'components/NavBarLayout.js'
import ListComponents from 'components/ListComponents.js'
import Axios from 'request/Axios.js'
// import { useHistory } from "react-router-dom";
 import './index.css';
// import { Button} from 'antd-mobile';

function SearchList(){
    let page = 1;
    const ListComponentsRef = useRef(null);
    let history = useHistory();
    const [refreshing,setRefreshing] = useState(false)
    useEffect(()=>{
        getList({
            type:'init'
        })
        return ()=>{
            page = 1;
            setRefreshing(false)
        }
    },[])
    function onRefresh(){
        setRefreshing(true)
        page = 1;
        getList({
            type:'init'
        });
    }
    function rowData(rowData){
        return  <div className="list_item" onClick={gotoDetail}>姓名: {rowData.name}----年龄：{rowData.age}</div>
    }
    function gotoDetail(rowData){
        console.log('跳转')
        history.push({
            pathname:'/search/list/detail',
        })
    }
    function onEndReached(){
        page +=1
        getList({
            type:'add'
        });
    }
    
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
            //console.log('刷新成功',ListComponentsRef)  
            if(res.success){
                //传递数据给列表 type：'add'等于添加 'init'等于初始化
                ListComponentsRef.current.setDataSource({
                    type:getDataType.type,
                    data:res.data.list,
                    total:res.data.total
                })
                setRefreshing(false)
                //console.log(res.data.list)
            }else{
                page -= 1;
                setRefreshing(false)
                ListComponentsRef.current.setDataSource({
                    type:'error',
                    
                })
            }
            
           
            
        },error=>{
            page -= 1;
            setRefreshing(false)
            ListComponentsRef.current.setDataSource({
                type:'error',
                
            })
        })
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
                    isRefresh={true}
                    refreshing={refreshing}
                    rowData={rowData}
                    onRefresh={onRefresh}
                    onEndReached={onEndReached}
                    listIndicator={{
                        no:<div style={{textAlign:'center'}}>暂无数据</div>,
                        add:<div style={{textAlign:'center'}}>上拉加载更多</div>,
                        finish:<div style={{textAlign:'center'}}>数据已全部加载</div>,   
                    }}
                    refreshIndicator={{
                        activate:<div>松开刷新</div>,
                        deactivate: <div>下拉刷新</div>,
                        finish: <div>刷新完成</div>, 
                    }}
                />
            </div> 
        </div>
    );
}

export default SearchList