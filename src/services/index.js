import Axios from 'request/Axios'
import { removeUserToken } from 'utils/userMethod'
//用户登录
export const userLogin = (payload) => {
  return Axios.post('api/login',payload)
}

//退出登录
export const logOut = () => {
  //如果退出登录 设置除了某些router配置的页面可以进行浏览器左上角回退按钮回退外其他页面均无法回退 防止回退到其他主页面
  window.setLocalStorage('isRouterBack', false)
  //清除token
  removeUserToken()
  //清除导航菜单数据
  window.removeLocalStorage('navMenuBarDataPage')
}