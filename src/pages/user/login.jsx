import React,{ Component } from 'react';
import { List, InputItem, Toast, Button } from 'antd-mobile';
import { userLogin } from 'services/index'
import { setUserToken } from 'utils/userMethod'
import './index.less'
class Login extends Component {
	constructor(props) {
		super(props);
		this.state = {
			account: '',
			password: ''
		}
		this.clickLogin = this.clickLogin.bind(this)
	}
	componentDidMount() {

	}
	componentWillUnmount() {

	}
	inputChange(value, type) {
		if (type === '账号') {
			this.setState({account: value	})
		} else if (type === '密码') {
			this.setState({	password: value	})
		}
	}
	clickLogin() {
		const { account,password } = this.state;
		if (account === '') {
			Toast.info('请输入账号 admin', 2);
			return
		} else if (password === '') {
			Toast.info('请输入密码 123456', 2);
			return
		}
		userLogin({
			data: {
				userName: account,
				passWord: password,
			},
			requestToastConfig: {
				message: '正在登陆...',
				successMessage: '登录成功',
				startType: true,
				endType: true,
				errorType: true,
				networkErrorType:true,
			}
		}).then((res) => {
			const { setLocalStorage, removeLocalStorage } = window;
			const { history } = this.props;
			if (res.success) {
				//如果登录成功设置所有页面可以存在点击浏览器回退按钮
				setLocalStorage('isRouterBack', true)
				setUserToken(res.data.token)
				//清除导航菜单数据 默认进入首页
				removeLocalStorage('navMenuBarDataPage')
				history.replace({ pathname: '/home/index',})
			}
		})
	}
	render() {
		return (
			<div className="login_box">
				<div className="title">
					react-app 模板 基于react-ant-mobile <br />
					<a href="https://mobile.ant.design/" target="_blank" rel="noopener noreferrer">进入官网</a>
				</div>
				<List>
					<InputItem
						className="input_item"
						value={this.state.account}
						placeholder="请输入账号"
						onChange={(e) => { this.inputChange(e, '账号') }}
					>
						账号：
          </InputItem>
					<InputItem
						className="input_item"
						type={'password'}
						placeholder="请输入密码"
						value={this.state.password}
						onChange={(e) => { this.inputChange(e, '密码') }}
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