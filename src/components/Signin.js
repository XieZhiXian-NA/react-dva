import React, { Component } from 'react'
import {connect} from 'dva'
//手动告知webpack图片的加载路径
import avatar from '../assets/img/monkey.png'
class Signin extends Component {
    constructor(props){
        super(props)
        this.state={
            username:'',
            password:''
        }
    }
    doSignin(e){
        e.preventDefault();
        let {username,password} = this.state
        let {isLogin} = this.props
        //调用dispatch传递参数
        this.props.dispatch({type:'teacher/doLogin',payload:{username,password}})
    }
    render() {
        let {username,password} =this.state
        return (
            <React.Fragment>
                <div className="login">
                    <div className="login-wrap">
                        <div className="avatar">
                            <img src={avatar} className="img-circle" alt="" />
                        </div>
                        <form className="col-xs-offset-1 col-xs-10" onSubmit={e=>this.doSignin(e)}>
                            <div className="input-group input-group-lg">
                                <span className="input-group-addon">
                                    <i className="fa fa-user"></i>
                                </span>
                                <input id="name" type="text" className="form-control" placeholder="用户名" 
                                  value={username}
                                  onChange={e=>this.setState({username:e.target.value})}
                                />
                            </div>
                            <div className="input-group input-group-lg">
                                <span className="input-group-addon">
                                    <i className="fa fa-key"></i>
                                </span>
                                <input id="pass" type="password" className="form-control" placeholder="密码"
                                 value={password}
                                 onChange={e=>this.setState({password:e.target.value})} />
                            </div>
                            <button type="submit" className="btn btn-lg btn-primary btn-block"
                              
                            >登 录</button>
                        </form>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}
export default connect(state=>{
    return{
        isLogin:state.teacher.isLogin
    }
})(Signin)