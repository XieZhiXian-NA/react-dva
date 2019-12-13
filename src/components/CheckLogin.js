import React,{Component} from 'react'
import {routerRedux} from 'dva/router'
import {connect} from 'dva'
export function CheckLogin(TeacherList){
    //高阶组件
    class Tmp extends Component{
        render(){
           // 判断用户是否登录
            if(!this.props.isLogin){
                this.props.dispatch(routerRedux.push('/sigin'))
            }

        //    let isLogin = JSON.parse(localStorage.getItem('user') || 'false')
        //    if(!isLogin){
        //        alert('没有登录')
        //        window.location.href = '/signin'
        //    }
            return <TeacherList/>
        }
     }
     //将容器组件return出去
 return connect (state=>{
            return {
                isLogin:state.teacher.isLogin
            }
        })(Tmp)       
}
export default CheckLogin
