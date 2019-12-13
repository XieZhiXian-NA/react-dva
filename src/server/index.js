const Koa = require('koa')
const Router = require('koa-router')
const bodyparser = require('koa-bodyparser')
const path = require('path')
const teachers = require('./teacher')
const app = new Koa()
const route = new Router()
const jwtAuth= require('koa-jwt')
const jwt = require('jsonwebtoken')

const secret = 'i love xlx'


route.get('/teachers/edit',async ctx=>{
    let {_id} = ctx.request.query
    
    let t = teachers.filter(t=>{
        return t.id == _id
    })
    t[0].joinDate='2019-07-15T00:00:00.000Z'
    t[0].type=0
    teachers.forEach(ts=>{
        if(ts.id==_id){
            ts.joinDate=t[0].joinDate,
            ts.type=t[0].type
        }
    })
    ctx.body={
        errcode:0,
        errmsg:'获取编辑教师信息成功',
        teacher:t[0],
        total:1
    }
})

route.post('/teachers/edit',async ctx=>{
   let {id,type,gender,joinDate,username} = ctx.request.body
   teachers.forEach(t=>{
       if(t.id == id){
           t.type=type;
           t.gender=gender,
           t.username=username,
           t.joinDate=joinDate
       }
   })
   console.log(teachers)
   ctx.body={
       errcode:0,
       errmsg:'编辑成功',
       teachers:teachers,
   }
})

route.get('/teachers/search',async ctx=>{
    let {q}= ctx.request.query
    let t=[]
    if(q === ''){
       t = teachers
    }else{
       t = teachers.filter(t=>{
                return t.username === q
            })
    }
     
    let total=t.length
    ctx.body={
       errcode:1,
       errmsg:'搜索成功',
       teachers:t,
       total
    }
})
route.post('/signin',async ctx=>{
    let {username,password} = ctx.request.body;
    if(username ==='xlx' && password==='123456'){
        const token = jwt.sign({
            data:{username},
            exp:Math.floor(Date.now()/1000)+60*60
           },
           secret
         )
        let user={
            id:'1111', 
            username,
            avatar:'/img/avatar.jpg'
        }
        ctx.body={
            errcode:0,
            errmsg:'ok',
            user,
            token
        }
    }else{
        ctx.body={
            errcode:10001,
            errmsg:'用户名或密码错误'
        }
    }
})
route.get('/teachers',async ctx=>{
   let {count,page} = ctx.request.query
   let t = teachers.slice((page-1)*count,(page-1)*count+count)
   let total = teachers.length
    ctx.body={
        errcode:0,
        errmsg:'ok',
        teachers:t,
        total:total
    }
})

route.post('/signout',async ctx=>{
    ctx.body={
        errcode:0,
        errmsg:'已退出登录'
    }
})

app.use((ctx,next)=>{
    return next().catch((err)=>{
        if(401 == err.status){
            //status=401 则无法返回数据
            ctx.status = 200;
            ctx.body = {
                errcode:10001,
                errmsg:'登录过期，请重新登录'
            }
        }else{
            throw err;
        }
    })
})
app.use(jwtAuth({
    secret
}).unless({
    path:['/signin','/img/avatar.jpg']
})
)
app.use(bodyparser())
app.use(require('koa-static')(path.join(__dirname+'/public/')))
app.use(route.routes())
app.listen(3001,()=>{
    console.log('服务器启动在3001端口')
})
