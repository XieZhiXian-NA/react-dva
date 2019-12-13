 import request from '../utils/request'
 import {routerRedux} from 'dva/router'
 import {Tooltip} from 'react-bootstrap'
 let teacher={
     namespace:'teacher',
     state:{
         isLogin:false,
         teachers:[],
         total:0,
         editingTeacher:{}
        },
     effects:{
        *updateTeachers({payload},{select,call,put}){
           
            let res =yield call (request('/teachers/edit',{
                method:'post',
                data:payload.teacher
            }))
              yield put(routerRedux.push('/home/list'))
        },
        *showTeacher({payload},{select,put,call}){
             let res = yield call(request('/teachers/edit',{
                 params:payload
             }))
             yield put({type:'saveEditTeacher',payload:{teacher:res.data.teacher}})
             yield put(routerRedux.push('/home/edit'))
        },
        *search({payload},{select,put,call}){
            let res = yield call(request('/teachers/search',{
              params:payload  
            }))
            console.log(res)
            yield put({type:'update',payload:{teachers:res.data.teachers,total:res.data.total}})
        },
         *updateTeacher({payload},{select,put,call}){
            try {
                let res = yield call (request('/teachers',{
                params:payload
               }))
               yield put({type:'update',payload:{teachers:res.data.teachers,total:res.data.total}})
            } catch (error) {
                alert(error)//error 未登录 请求拦截
                yield put(routerRedux.push('/signin'))
            }
         },

         *doLogin({payload},{select,put,call}){
          let res =  yield call(request('/signin',{
              method:'post',
              data:payload
          }))
         // 本地存储session localstorage
         if(res.data.errcode != 0){
            
            return 
         }
            window.localStorage.setItem('user',JSON.stringify(res.data.user))
            window.localStorage.setItem('TOKEN_KEY',res.data.token)
            // 保存登录状态
            yield put({type:'changeLogin',payload:{isLogin:true}})
            // 登录成功 页面跳转
            yield put(routerRedux.push('/home/list'))
         },

         *signout({payload},{select,put,call}){
            let res= yield call(request('/signout',{
                method:'post'
            }))
            if(res.data.errcode==0){
                  yield put({type:'changeLogin',payload:{isLogin:false}})
                  window.localStorage.clear()
                
                        yield put(routerRedux.push('/signin'))
                       
                  return 
            }
           
         }

     },
     reducers:{
        saveEditTeacher(state,{payload}){
            return {
                teacher:payload.teacher
            }
        },
        update(state,{payload}){
            return {
                teachers:payload.teachers,
                total:payload.total
            }
        },
         changeLogin(state,{payload}){
             return {
                 isLogin:payload.isLogin
             }
         }

     }
 }

 export default teacher