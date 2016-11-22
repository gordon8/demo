requirejs.config({
    //设置根路径
    baseUrl : "./js",
    //设置依赖项目化名
    paths : {
        "jquery" : "lib/jquery-3.1.0.min"
    }
});
//加载入口模块
requirejs(["app"]);