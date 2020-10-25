/**
 * 和用户信息有关的函数
 */

export const setUserToken = (token) => {
  if(token){
    localStorage.setItem('userToken',JSON.stringify(token))
  }
}

export const getUserToken = () => {
  return JSON.parse(localStorage.getItem('userToken'))
}