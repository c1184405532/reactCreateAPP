import Axios from 'request/Axios'

//用户登录
export const userLogin = (payload) => {
  return Axios.post('api/login',payload)
}

// //获取
// export const userLogin = (payload) => {
//   return Axios.post('api/login',payload)
// }