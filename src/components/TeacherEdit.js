import React, { Component } from 'react';
import { connect } from 'dva';

function mapStateToProps(state) {
    return {
        teacher:state.teacher.teacher
    };
}

class TeacherEdit extends Component {
    changeHandler(propname,value){
         this.props.teacher[propname] = value
         this.setState({})
    }
    save(){
        this.props.dispatch({type:'teacher/updateTeachers',payload:{teacher:this.props.teacher}})
    }
    render() {
        if(!this.props.teacher) return null
        const { gender,type,username,joinDate,id } = this.props.teacher
        return (
            <div className="body teacher">
                <ol className="breadcrumb">
                    <li><a href="javascript:;">讲师管理</a></li>
                    <li className="active">讲师添加</li>
                </ol>
                <div className="teacher-add">
                    <form action="" className="form-horizontal col-xs-offset-2">
                        <div className="form-group">
                            <label htmlFor="" className="col-xs-3 control-label">姓名</label>
                            <div className="col-xs-4">
                                <input
                                type="text" className="form-control input-sm" value={username} onChange={e=>this.changeHandler('username',e.target.value)} />
                            </div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="" className="col-xs-3 control-label">入职时间</label>
                            <div className="col-xs-4">
                                <input
                                type="text" className="form-control input-sm" value={joinDate} onChange={e=>this.changeHandler('joinDate',e.target.value)} />
                            </div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="" className="col-xs-3 control-label">类型</label>
                            <div className="col-xs-2">
                                <select value={type} onChange={e=>this.changeHandler('type',e.target.value)}
                                name="" className="form-control input-sm">
                                    <option value="0">讲师</option>
                                    <option value="1">管理员</option>
                                </select>
                            </div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="" className="col-xs-3 control-label">性别</label>
                            <div className="col-xs-4">
                                <label className="radio-inline">
                                    <input
                                    type="radio" checked={ gender==0 } onChange={e=>this.changeHandler('gender',0)} /> 男
                                </label>
                                <label className="radio-inline">
                                    <input
                                    type="radio"checked={ gender==1 }  onChange={e=>this.changeHandler('gender',1)}/> 女
                                </label>
                            </div>
                        </div>
                        <div className="form-group">
                            <div className="col-xs-7">
                                <a
                                className="btn btn-success btn-sm pull-right" onClick={e=>this.save()}> 保 存 </a>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

export default connect(
    mapStateToProps,
)(TeacherEdit);