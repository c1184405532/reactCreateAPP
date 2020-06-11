import axions from 'axios';
import { Toast } from 'antd-mobile';
const baseClearToastTime = 1600;
//const baseURL = 'http://192.168.0.103:9999';
//const baseURL = 'http://192.168.8.38:9999';
const baseURL = 'http://localhost:9999';
const instance = axions.create({
    //baseURL:'https://api.github.com/users',//basePort + baseURL,
    baseURL:baseURL,
    timeout:2000,
})


instance.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    const token = window.getToken() 
    //const token = 888
    if(token){
        config.headers['X-Access-Token'] = token;
    }
    //console.log('在发送请求之前做些什么',config)
    if(instance.toastConfig.beforeRequestToastType){
       
        Toast.loading( config.toastmessage || instance.toastConfig.message,0);
    }
    console.log(config)
    return config;
}, function (error) {
    //对请求错误做些什么
    //console.log(error)
    return Promise.reject(error);
});
// 添加响应拦截器
instance.interceptors.response.use(function (response) {
    //对响应数据做点什么

    //清除响应前的toast
    Toast.hide();
    if(instance.toastConfig.successRequestToastType && response.data.status === 200){
        Toast.info(response.data.message,2)
        setTimeout(()=>{
            Toast.hide()
            //Toast.hide();
        },baseClearToastTime)
    }
    if(instance.toastConfig.errorRequestToastType && response.data.status !== 200){
        Toast.fail(response.data.message)
        setTimeout(()=>{
            Toast.hide();
        },baseClearToastTime)
    }
    //console.log('response',response)
    //console.log('instance',instance.toastConfig)
    
    return response.data;
}, function (error) {
    // 对响应错误做点什么

    Toast.hide();
    //console.log('响应错误',error)
    const config = error.config;
    //console.log(config)
    //是否配置请求错误重连
    if(config && config.shouldRetry && config.retry){
        if(config.retry === 1 && config.lastRetryUrl){
            config.baseURL = config.lastRetryUrl
        }
        config.retry -= 1;
        config.toastmessage = config.message

        const backoff = new Promise(function(resolve){
            setTimeout(()=>{
                resolve()
            },config.retryDelay || 16)
        })
        return backoff.then(()=>{
            return instance(config)
        })
        
    }else{
        if(error.response){
            // Toast({
            //     message:error.response.data.message,
            //     duration:2500,
            //     icon:'warning-o'
            // });
            let status = error.response.status;
            setTimeout(()=>{
                switch(status){
                    case 500:
                        // window.vm.$router.push({
                        //     name:'user/login'
                        // })
                        // window.removeLocalStorage('routerIsBack')
                        
                        break;
                    default:
                        console.log(error.response)

                }
            },1000)
            
        }else{
            // Toast({
            //     message:error.message,
            //     duration:2500,
            //     icon:'warning-o'
            // });  
        }
        return Promise.reject(error);
    }
});
export default instance;