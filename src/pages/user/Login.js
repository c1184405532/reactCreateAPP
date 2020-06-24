import React from 'react';
import { List, InputItem, Toast ,Button} from 'antd-mobile';
import Axions from 'request/Axios.js'
import './index.css'
class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            account:'',
            password:''
        }
        this.clickLogin = this.clickLogin.bind(this)
    }
    inputChange(event,type){
        if(type === '账号'){
            this.setState({
                account:event
            })
        }else if(type === '密码'){
            this.setState({
                password:event
            })
        }

        //console.log(event,type)
    }
    clickLogin(){
        if(this.state.account === '' ){
            Toast.info('请输入账号 admin', 2);
            return 
        }else if(this.state.password === ''){
            Toast.info('请输入密码 123456', 2);
            return 
        }
        Axions.post('api/login',{
            data:{
                userName:this.state.account,
                passWord:this.state.password,
            },
            requestToastConfig:{
                successRequestToastType:true,
                successMessage:'登录成功',
                message:'正在登陆......',
            },
            
        }).then((res)=>{
            
            if(res.success){
                //如果登录成功设置所有页面可以存在点击浏览器回退按钮
                window.setLocalStorage('isRouterBack',true)
                window.setToken(res.data.token)
                // this.$router.replace({
                //     name:'homePage/layout',
                // })
                this.props.history.replace({
                    pathname:'/home/index',
                })
               
                console.log(this.props.history)
            }else if(res.message === '密码错误'){
                Toast.fail('密码错误，请重新输入',2)
                
            }
            //console.log(res)
        })
        console.log('登录')
    }
    componentDidMount() {

    }
    componentWillUnmount() {

    }
    render() {
        return (
            <div className="login_box">
                <div className="title">
                    react-app 模板 基于react-ant-mobile <br/>
                    <a href="https://mobile.ant.design/" target="_blank" rel="noopener noreferrer">进入官网</a>
                </div>
                {console.log('首longin')}
                <List>
                    <InputItem 
                        className="input_item" 
                        value={this.state.account} 
                        placeholder="请输入账号"
                        onChange={(e)=>{this.inputChange(e,'账号')}}
                    >
                        账号：
                    </InputItem>
                    <InputItem 
                        className="input_item" 
                        type={'password'} 
                        placeholder="请输入密码"
                        value={this.state.password} 
                        onChange={(e)=>{this.inputChange(e,'密码')}}
                    >
                        密码：
                    </InputItem>
                </List>
                <Button className="button_box" type="primary" onClick={this.clickLogin}>登录</Button>
            </div>
        );
    }
}
export default Login