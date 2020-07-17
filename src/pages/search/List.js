import React,{ useState, useEffect,useRef } from 'react';
import { useHistory } from "react-router-dom";
import NavBarLayout from 'components/NavBarLayout.js'
import ListComponents from 'components/ListComponents.js'
import Axios from 'request/Axios.js'
import{  useAliveController ,useActivate, useUnactivate,} from 'react-activation'
// import { useHistory } from "react-router-dom";
 import './index.less';
// import { Button} from 'antd-mobile';
let removeKeepAlive = false;
function SearchList(props){
    let page = 1;
    let history = useHistory();
    const { dropScope, } = useAliveController();
    const ListComponentsRef = useRef(null);
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
    useActivate(()=>{
        //console.log('useActivate',ListComponentsRef)
        if(ListComponentsRef.current){
            ListComponentsRef.current.setScoll()
            //获取所有行数据
            let allRowData = ListComponentsRef.current.getAllRowData()
            allRowData.forEach((rowData,index)=>{
                if(index === 5){
                    rowData.name = '修改后的数据'
                }
                //console.log(rowData)
            })
            //更新行数据
            ListComponentsRef.current.upDateRowData(allRowData)
            //console.log(allRowData)
        }
        
    })
    useUnactivate(()=>{
        if(removeKeepAlive){
            setTimeout(()=>{
                //console.log('props.match.path',props.match.path)
                dropScope(props.match.path)
            },100)
        }
        //console.log('useUnactivate')
    })
    function navReturnCallBack(){
        //清除keep alive组件缓存
        removeKeepAlive = true;
    }
    function onRefresh(){
        setRefreshing(true)
        page = 1;
        getList({
            type:'init'
        });
    }
    function rowData(rowData){
        return  <div className="list_item" onClick={()=>{gotoDetail(rowData)}}>姓名: {rowData.name}----年龄：{rowData.age}</div>
    }
    function gotoDetail(rowData){
        //console.log(rowData)
        removeKeepAlive = false;
        history.push({
            pathname:'/search/list/detail',
            state:rowData,
        })
    }
    function onEndReached(){
        page +=1
        getList({
            type:'add',
            beforeRequestToastType:false
        });
    }
    
    function getList(getDataType){
        
        Axios.get('api/list',{
            //当前页数
            data:{
                page:page,
            },
            //此配置详见Axios.js配置
            requestToastConfig:{
                
                beforeRequestToastType:getDataType.beforeRequestToastType=== false ?false: true
            }
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
                leftCallBack={navReturnCallBack}
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
                    // listIndicator={{
                    //     no:<div style={{textAlign:'center'}}>暂无数据2</div>,
                    //     add:<div style={{textAlign:'center'}}>上拉加载更多2</div>,
                    //     finish:<div style={{textAlign:'center'}}>数据已全部加载2</div>,   
                    // }}
                    // refreshIndicator={{
                    //     activate:<div>松开刷新2</div>,
                    //     deactivate: <div>下拉刷新2</div>,
                    //     finish: <div>刷新完成2</div>, 
                    // }}
                />
            </div> 
        </div>
    );
}

export default SearchList