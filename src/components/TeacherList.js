import React,{Component, Fragment} from 'react'
import {connect} from 'dva'
import Dialog from './Dialog'

class TeacherList extends Component{
    constructor(props){
        super(props)
        this.state={
            page:1,
            count:5,
            q:'',
            isShow:false,
            teacher:{}
        }
    }

    componentDidMount(){
        this.loadByPage(this.state.page)
    }
    loadByPage(num){
        const {page,count} = this.state
        this.props.dispatch({type:'teacher/updateTeacher',payload:{
            count,
            page:num
        }})
        this.state.page = num
    }
    search(e){
        e.preventDefault();
        this.props.dispatch({type:'teacher/search',payload:{q:this.state.q}})
    }
    showDialog(teacher){
       // 编辑状态 查看 通过组件来实现
        this.setState({
            isShow:true,
            teacher
        })
    }
    setEdit(t){
        this.props.dispatch({type:'teacher/showTeacher',payload:{_id:t.id}})
    }
    render(){
        let {teachers,total} =this.props
        //total是数据的总数
        total = Math.ceil(total/this.state.count) 
        const {page,q}=this.state
        const {isShow,teacher} = this.state
        return (
            <React.Fragment>
                 <div className="body teacher-list">
                {/* Dialog 是一个组件  将数据传递过去 */}
                 <Dialog isShow={isShow} teacher={teacher}>
                 </Dialog>
                <ol className="breadcrumb">
                    <li><a href="javascript:;">讲师管理</a></li>
                    <li className="active">讲师列表</li>
                </ol>
                <div className="page-title">
                    <a className="btn btn-success btn-sm pull-right">添加讲师</a>
                </div>
                <div className="panel panel-default">
                    <div className="panel-body">
                        <form action="" className="form-inline" onSubmit={e=>{this.search(e)}}>
                            <div className="input-group">
                                <input type="text" className="form-control input-sm" value={q} onChange={e=>this.setState({q:e.target.value})} />
                                <span className="input-group-btn">
                                    <button className="btn btn-success btn-sm"  onClick={e=>{this.search(e)}}>搜索</button>
                                </span>
                            </div>
                        </form>
                    </div>
                    <table className="table table-striped table-bordered table-hover">
                        <thead>
                            <tr>
                                <th>编号</th>
                                <th>姓名</th>
                                <th>昵称</th>
                                <th>年龄</th>
                                <th>性别</th>
                                <th>手机号码</th>
                                <th>操作</th>
                            </tr>
                        </thead>
                        <tbody id="list">
                              {teachers && teachers.map((t,i)=>{
                                  return (
                                      <tr key = {i}>
                                          <td>{t.id}</td>
                                          <td>{t.username}</td>
                                          <td>{t.nickname}</td>
                                          <td>{t.age}</td>
                                          <td>{t.gender ==1?'女':'男'}</td>
                                          <td>{t.phone}</td>
                                          <td>
                                              <a className='btn btn-info btn-xs' onClick={e=>{this.showDialog(t)}}>查 看</a>
                                              <a className='btn btn-info btn-xs' onClick={e=>{this.setEdit(t)}}>编 辑</a>
                                              <a href="javascript:;" className='btn btn-warning btn-xs'>启用</a>
                                          </td>
                                      </tr>
                                  )
                              })}
                        </tbody>
                            
                    </table>
                    <button disabled={page === 1 }  className="btn btn-primary" onClick={e=>{this.loadByPage(page-1)}}>上一页</button>
                    <button disabled ={page === total }   className="btn btn-primary" onClick={e=>{this.loadByPage(page+1)}}>下一页</button>

                </div>
      </div>
            </React.Fragment>
        )
    }
}
export default connect(state=>{
    return {
        teachers:state.teacher.teachers,
        total:state.teacher.total
    }
})(TeacherList)