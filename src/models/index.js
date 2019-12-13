import request from "../utils/request"

let index = {
    namespace:'index',
    state:{num:0},
    effects:{
        *changeNum({payload},{select,put,call}){
            //发请求 call接受一个函数(不调用 )该函数返回一个promise
            let res = yield call(request('/teachers/search'))
            console.log(res)
            yield put({type:'addNum',payload})
        }
    },
    reducers:{
        addNum(state,{payload}){
            return {//返回一个新值，值不可变性
                num:state.num + payload.num
            }
        },
        doLogin(){
            
        }
    }
}
export default index