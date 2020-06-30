import React,{ useState, useEffect } from 'react';
import { PullToRefresh, ListView, Button } from 'antd-mobile';
class ListComponents extends React.Component {
    static defaultProps = {
        isRefresh:true,
        refreshing:false,
    }
    constructor(props) {
        super(props);
        const dataSource = new ListView.DataSource({
            rowHasChanged: (row1, row2) => row1 !== row2,
        });
        this.state = {
            refreshing:false,
            dataSource,
            password:'',
            isLoading:false
        }
        
    }
    onRefresh = ()=>{
        this.setState({
            refreshing:false
        })
        setTimeout(()=>{
            this.setState({
                refreshing:false
            })
        },3000)
        console.log('刷新了')
    }
    componentDidMount(){
        this.setState({
            dataSource: this.state.dataSource.cloneWithRows([]),
        });
    }
    onEndReached = ()=>{
        console.log('onEndReached')
    }
    setDataSource = (data)=>{
        if(data.type === 'init'){
            this.setState({
                dataSource: this.state.dataSource.cloneWithRows(data.data),
            });
        }
        console.log('sedatasource')
    }
    render() {
        return (
            // this.props.isRefresh?<PullToRefresh
            //     style={{overflow:'auto',height:'100%'}}
            //     distanceToRefresh={this.props.distanceToRefresh || 25}
            //     indicator={{
            //         activate:<div>松开刷新</div>,
            //         deactivate:<div>下拉刷新</div>,
            //         finish:<div>刷新成功</div>,
                    
            //     }}
            //     direction={this.props.direction || 'down'}
            //     className={this.props.className}
            //     refreshing={this.props.refreshing}
            //     onRefresh={this.props.onRefresh || (()=>(console.log('请传入刷新函数')))}
            //     children={this.props.children}
            // />
            // :<div style={{overflow:'auto',height:'100%'}}>{this.props.children}</div>
            <ListView 
                dataSource={this.state.dataSource}
                renderRow={rowData =>(this.props.rowData(rowData))}        
                style={{overflow:'auto',height:'100%'}}
                // pullToRefresh={
                //     <PullToRefresh
                //         refreshing={this.state.refreshing}
                //         onRefresh={this.onRefresh}
                //     />
                // }
                onEndReached={this.onEndReached}
                pageSize={5}
            />
        )
    }   

}
export default ListComponents