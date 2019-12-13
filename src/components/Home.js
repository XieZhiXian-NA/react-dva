import React, { Component } from 'react'
import { connect } from 'dva'
import {homeSubRouters,MyRoute as Route} from '../routers' 
import TeacherLoading from './common/TeacherLoading'
import CheckLogin from './CheckLogin'

class Home extends Component {
    constructor(props){
      super(props)
        // 将json字符串转化为对象
      let {avatar} = JSON.parse(window.localStorage.getItem('user') || '{"avatar":" "}')
      this.state={
         //拼接服务器端的图片路径 img是自动的ajax请求
          avatar:'http://localhost:3001'+avatar
      }
    }
    signout(){
        // 调用dispatch处理退出
        // 服务器已经将登录状态清空
        // 页面跳转到登录
        this.props.dispatch({type:'teacher/signout',payload:{}})
    }
    render() {
        let {avatar} =this.state
        console.log(avatar)
        return (
            <React.Fragment>
                <div>
                    <div className="aside">

                        <div className="profile">

                            <div className="avatar img-circle">
                                <img src={avatar} />
                            </div>
                            <h4></h4>
                        </div>
                        <div className="navs">
                            <ul className="list-unstyled">
                                <li>
                                    <a>
                                        <i className="fa fa-home"></i>
                                        仪表盘
                    </a>

                                </li>
                                <li>
                                    <a href="../user/list.html">
                                        <i className="fa fa-bell"></i>
                                        用户管理
                    </a>
                                </li>
                                <li>
                                    <a>
                                        <i className="fa fa-bell"></i>
                                        讲师管理
                     </a>
                                </li>
                                <li>
                                    <a>
                                        <i className="fa fa-cog"></i>
                                        课程管理
                        <i className="arrow fa fa-angle-right"></i>
                                    </a>

                                </li>
                                <li>
                                    <a href="../advert/list.html">
                                        <i className="fa fa-bell"></i>
                                        广告管理
                    </a>
                                </li>
                                <li>
                                    <a>
                                        <i className="fa fa-cog"></i>
                                        系统设置
                        <i className="arrow fa fa-angle-right"></i>
                                    </a>
                                    <ul className="list-unstyled">
                                        <li>
                                            <a href="javascript:;">
                                                网站设置
                                </a>
                                        </li>
                                        <li>
                                            <a href="javascript:;">
                                                权限管理
                                </a>
                                        </li>
                                    </ul>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="main">
                        <div className="container-fluid">

                            <div className="header">
                                <nav className="navbar navbar-custom">
                                    <div className="navbar-header">
                                        <a href="javascript:;" className="navbar-brand">
                                            <i className="fa fa-navicon"></i>
                                        </a>
                                    </div>
                                    <ul className="nav navbar-nav navbar-right">
                                        <li>
                                            <a href="javascript:;">
                                                <i className="fa fa-bell"></i>
                                                <span className="badge">8</span>
                                            </a>
                                        </li>
                                        <li>
                                            <a href="../index/settings.html">
                                                <i className="fa fa-user"></i>
                                                个人中心
                            </a>
                                        </li>
                                        <li>

                                            <a href="javascript:;" onClick={e=>{this.signout()}}>
                                                <i className="fa fa-sign-out"></i>
                                                退出
                                            </a>
                                        </li>
                                        <li>
                                            <a href="javascript:;">
                                                <i className="fa fa-tasks"></i>
                                            </a>
                                        </li>
                                    </ul>
                                </nav>
                            </div>
                            <TeacherLoading/>
                        { homeSubRouters.map((route,i)=>{
                            return <Route key={i} path={route.path} component={route.component}></Route>
                        })}
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}
export default connect(state => {
    return {
        num: state.index.num
    }
})(Home) 