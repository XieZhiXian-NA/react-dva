import React from 'react'

//配置路由规则
import {Router,Route,NavLink,Switch,Redirect} from 'dva/router'
import Home from '../components/Home'
import Signin from '../components/Signin'
import TeacherList from '../components/TeacherList'
import TeacherEdit from '../components/TeacherEdit'

const MyRoute = Route
const homeSubRouters =[
   {
     path:'/home/list',component:TeacherList
   },
   {
      path:'/home/edit',component:TeacherEdit
   }
]


let fn = function ({history,app}){
   return (
       <Router history={history}>
               {/* 横向只匹配一个路由 */}
               <Switch>
                  {/* <Route path='/' component={Signin}></Route> */}
                  <Route path="/home"  component={Home}></Route>
                  <Route path="/signin" exact component={Signin}></Route>
               </Switch>
             
       </Router>
   )
}

export default fn

export {homeSubRouters,MyRoute}