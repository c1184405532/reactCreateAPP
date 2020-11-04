/**
 * 和用户信息有关的函数
 */

export const setUserToken = (token) => {
  if(token){
    localStorage.setItem('userToken',JSON.stringify(token))
  }
}

export const getUserToken = () => {
  return localStorage.getItem('userToken')
}

export const removeUserToken = () => {
  return localStorage.removeItem('userToken')
}