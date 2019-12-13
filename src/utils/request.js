import Axios from "axios";
import serverHost from '../config'
import {browserHistory} from 'dva/router'
//封装一个axios
//创建不同的实例
const  r = Axios.create({
    baseURL:'/api',
   
})
//发请求之前 自动添加头信息 并没有实现的拦截
r.interceptors.request.use(config=>{
    let token = localStorage.getItem('TOKEN_KEY')
        if(token){  
            config.headers.Authorization = "Bearer "+token;
        }
        return config
    },
    error =>{
        alert(error)
        return Promise.reject(error);
    } 
)

r.interceptors.response.use(res=>{
    if(res.data.errcode===10001){
        alert(res.data.errmsg)
        window.location.href='/signin'
    }
     return res
})

let request = function(url='',options={}){
 return function(){
   //在这里实现不能拦截请求 当没有登录时 直接拦截 不能发请求
   if(!url.includes('signin' || 'signout')){
       let isLogin = JSON.parse(localStorage.getItem('user') || 'false')
       if(!isLogin){
           return Promise.reject('没有登录，不能发起请求')
       }
   }
 if(url === '') return Promise.reject('必须传递url')
  //是一个promise对象
  return  r({
      //将请求头放在这里，有与检测头 还是放在请求拦截器里
    // headers: {
    //     'Authorization': 'Bearer ' + token,
    // },
      url,
      method:'get',
      ...options //options有method会覆盖get
  })
}}
export default request