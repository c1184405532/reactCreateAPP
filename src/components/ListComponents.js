import React from 'react';
import { PullToRefresh, ListView } from 'antd-mobile';
let currentData = [];
let currentTotal = 0;
let isAddData = true;
class ListComponents extends React.Component {
    static defaultProps = {
        //是否需要下拉刷新
        isRefresh:true,
        refreshing:false,
    }
    constructor(props) {
        super(props);
        const dataSource = new ListView.DataSource({
            rowHasChanged: (row1, row2) => row1 !== row2,
        });
        
        this.state = {
            renderFooterType:'init',
            dataSource,
            password:'',
            isLoading:false
        }
        
    }
    componentDidMount(){
        this.setState({
            dataSource: this.state.dataSource.cloneWithRows([]),
        });
    }
    onEndReached = ()=>{
        if(isAddData === false)return;
        if(currentTotal === currentData.length){
            this.setState({
                renderFooterType:'finish'
            })
            return 
        }
        
        if(currentTotal === 0 || currentData.length === 0){
            this.setState({
                renderFooterType:'no'
            })
            return 
        }
        if(currentTotal > currentData.length){
            this.setState({
                renderFooterType:'add'
            })
             
        }
        //防止重复进行请求 发送第一次请求后禁止 等数据回填回来再放开
        isAddData = false;
        this.props.onEndReached && this.props.onEndReached()
        //console.log('onEndReached')
    }
    renderFooter = ()=>{
        if(this.state.renderFooterType === 'init'){
            return ''
        }
        if(this.state.renderFooterType === 'add'){
            return this.props.listIndicator.add
        }
        if(this.state.renderFooterType === 'no'){
            return this.props.listIndicator.no
        }
        if(this.state.renderFooterType === 'finish'){
            return this.props.listIndicator.finish
        }
    }
    setDataSource = (data)=>{
        isAddData = true;
        if(data.type === 'error'){
            return
        }
        currentTotal = data.total;
        if(data.type === 'init'){
            currentData = data.data
            this.setState({
                dataSource: this.state.dataSource.cloneWithRows(data.data),
            });
        }
        if(data.type === 'add'){
            this.setState({
                dataSource: this.state.dataSource.cloneWithRows([...currentData,...data.data]),
            },()=>{
                currentData = [...currentData,...data.data]
                //console.log(currentData)
            });
            
        }   
    }
    render() {
        return (
            <ListView 
                dataSource={this.state.dataSource}
                renderRow={rowData =>(this.props.rowData(rowData))}        
                style={{overflow:'auto',height:'100%'}}
                className={this.props.className}
                pullToRefresh={
                    this.props.isRefresh?<PullToRefresh
                        distanceToRefresh={this.props.distanceToRefresh || 25}
                        direction={this.props.direction || 'down'}
                        refreshing={this.props.refreshing}
                        onRefresh={this.props.onRefresh || (()=>(console.log('请传入刷新函数')))}
                        indicator={{
                            activate:this.props.refreshIndicator.activate || <div>松开立即刷新</div>,
                            deactivate:this.props.refreshIndicator.deactivate || <div>下拉可以刷新</div>,
                            finish:this.props.refreshIndicator.finish || <div>刷新完成</div>, 
                        }}
                    />:null
                }
                renderFooter={this.renderFooter}
                onEndReached={this.onEndReached}
                onEndReachedThreshold={200}
                pageSize={10}
            />
        )
    }   

}
export default ListComponents