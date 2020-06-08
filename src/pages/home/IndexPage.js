import React,{ useState, useEffect } from 'react';

function Index(){
    useEffect(() => {
        window.$on('rightLayoutMenuClick',(data)=>{
            console.log('菜单点击',data)
        })
        return ()=>{
            window.$off('rightLayoutMenuClick') 
        }
    });
    return (
        <div >
            
            首页下的首页
        </div>
    );
}
// class Index extends React.Component {
//     constructor(props) {
//         super(props);
//     }
//     componentDidMount() {
//         window.$on('rightLayoutMenuClick',(data)=>{
//             console.log('菜单点击',data)
//         })
//     }
//     componentWillUnmount() {

//     }
//     render() {
//         return (
//             <div >
                
//                 首页下的首页
//             </div>
//         );
//     }
// }
export default Index