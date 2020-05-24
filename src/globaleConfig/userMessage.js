window.getToken = function(){
    return localStorage.getItem('userToken')
}
window.setToken = function(token){
    localStorage.setItem('userToken',token)
}
window.removeToken = function(){
    localStorage.removeItem('userToken')
}
window.getLocalStorage = function(key){
    return JSON.parse(localStorage.getItem(key))
}
window.setLocalStorage = function(key,val){
    localStorage.setItem(key,JSON.stringify(val))
}
window.removeLocalStorage = function(key){
    localStorage.removeItem(key)
}
window.getSessionStorage = function(key){
    return JSON.parse(sessionStorage.getItem(key))
}
window.setSessionStorage = function(key,val){
    sessionStorage.setItem(key,JSON.stringify(val))
}
window.removeSessionStorage = function(key){
    sessionStorage.removeItem(key)
}