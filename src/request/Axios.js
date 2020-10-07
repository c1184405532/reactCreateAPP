import axios from './axiosIntercept.js';
import { retry,retryDelay,shouldRetry,lastRetryUrl,defaultRequestToastConfig } from './config.js';
/*
Axios下的函数接受多个参数
参数1 请求地址 String
参数2 请求数据 Object
{
	data: 给后台传递的参数 ,
	requestToastConfig: Object,
	custom:Object 自定义参数携带在请求config字段里 会和自定义默认重连字段进行合并
}
requestToastConfig toast请求配置 Object
	{
		message:String//请求前toast提示文字
		successMessage:String//请求成功后toast提示文字
		startType:true,//是否显示请求前toast加载框 默认true  Boolean
		endType:false,//是否显示请求后请求成功 状态status === 200 toast加载框 默认false Boolean
		errorType:true,//是否显示请求后请求成功 状态 status !== 200 toast加载框提示加载错误失败原因 取message字段 默认true Boolean
		networkErrorType:true,//网络错误  是否显示toast加载框提示错误 默认true Boolean
	}  
*/
const Axios = {};
Axios.get = (url, data) => {
	initAxiosConfig(data.requestToastConfig)
	return axios.get(url, {
		params: data.data,
		...initDefaults(data.custom)
	})

}
Axios.post = (url, data) => {
	initAxiosConfig(data.requestToastConfig)
	return axios.post(url, data.data, { ...initDefaults(data.custom) })

}
Axios.put = (url, data) => {
	initAxiosConfig(data.requestToastConfig)
	return axios.put(url, data.data, { ...initDefaults(data.custom) })
}
Axios.delete = (url, data) => {
	initAxiosConfig(data.requestToastConfig)
	return axios.delete(url, {
		data: data.data,
		...initDefaults(data.custom)
	})
}
function initAxiosConfig(requestToastConfig = {}) {
	axios.toastConfig = Object.assign({...defaultRequestToastConfig}, requestToastConfig);
}
//初始化自定义配置
function initDefaults(custom = {}) {
	let defaultOpations = {
		//报错重发请求次数
		retry,
		//重试间隔多久去发送请求
		retryDelay,
		//重试的条件判断
		shouldRetry,
		//请求重试最后一次url 在有多个备用链接时可配置
		lastRetryUrl,
	}
	Object.assign(defaultOpations, custom)
	return defaultOpations
}
export default Axios;