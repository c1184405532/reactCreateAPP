import axions from 'axios';
import { baseURL,timeOut,baseClearToastTime } from './config.js';
import { Toast } from 'antd-mobile';
const instance = axions.create({
	baseURL: baseURL,
	timeout: timeOut,
})

instance.interceptors.request.use(function (config) {
	// 在发送请求之前做些什么
	const token = window.getToken();
	const { toastConfig } = instance;
	if (token) {
		config.headers['X-Access-Token'] = token;
	}
	if (toastConfig.startType) {
		Toast.loading(toastConfig.message, 0);
	}
	return config;
}, function (error) {
	//对请求错误做些什么
	Toast.fail(error);
	return Promise.reject(error);
});
// 添加响应拦截器
instance.interceptors.response.use(function (response) {
	const { toastConfig } = instance;
	const { data } = response;
	//清除响应前的toast
	Toast.hide();
	if (toastConfig.endType && data.status === 200) {
		Toast.info(toastConfig.successMessage || data.message, baseClearToastTime)
	}
	if (toastConfig.errorType && data.status !== 200) {
		Toast.fail(data.message,baseClearToastTime)
	}
	return data;
}, function (error) {
	// 对响应错误做点什么
	Toast.hide();
	const { config ,response} = error;
	const { toastConfig } = instance;
	//是否配置请求错误重连
	if (config && config.shouldRetry && config.retry) {
		if (config.retry === 1 && config.lastRetryUrl) {
			config.baseURL = config.lastRetryUrl
		}
		config.retry -= 1;
		const backoff = new Promise(function (resolve) {
			setTimeout(() => {
				resolve()
			}, config.retryDelay || 16)
		})
		return backoff.then(() => {
			return instance(config)
		})

	} else {
		if (response && response.data) {
			if(toastConfig.networkErrorType){
				Toast.fail(response.data.message || response.statusText)
			}
			let status = response.status;
			setTimeout(() => {
				//这里可以做特殊判断对应的请求status 进行你想要的操作
				switch (status) {
					case 500:
						// window.removeLocalStorage('routerIsBack')
						break;
					default:
				}
			}, 1000)
		} else {
			Toast.fail(response)
		}
		return Promise.reject(error);
	}
});
export default instance;