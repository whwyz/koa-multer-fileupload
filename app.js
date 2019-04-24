const Koa = require('koa');
const Router = require('koa-router');
const multer = require('koa-multer');
const {join} = require('path')

const app = new Koa;
const router = new Router;
    // 仓库            磁盘储存仓库
const storage = multer.diskStorage({
    //储存的路径
    destination:join(__dirname,'upload'),
    //修改储存文件的名字
    filename(req,file,cb){
        const filename = file.originalname.split('.');
        cb(null,`${Date.now()}.${filename[filename.length-1]}`)
    }
})
const upload = multer({storage})


        //single下的值要与前段的input name属性值一致
router.post('/upload',upload.single('files'),async ctx=>{
    ctx.body = '上传成功'
})

app
  .use(router.routes())
  .use(router.allowedMethods());

app.listen(3001,function(){
    console.log('3001端口启动')
})