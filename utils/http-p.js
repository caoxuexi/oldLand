import {config} from "../config.js"
//给错误码对应消息
const tips={
  1:'抱歉,出现了一个错误',
  1005:'appkey无效',
  3000:'期刊不存在'
}
class HTTP{
  //url,data,method
  request({url,data={},method='GET'}){
    return new Promise((resolve,reject)=>{
      this._request(url,resolve,reject,data,method)
    })
  }

  //设置一下默认值
  _request(url,resolve,reject,data={}, method='GET'){
    wx.request({
      url: config.api_base_url+url,
      method:method,
      data:data,
      header:{
        'content-type':'application/json',
        'appkey':config.appkey
      },
      success:(res)=>{
          const code=res.statusCode.toString()
          if(code.startsWith('2')){
              //这句代码用于判断参数中是否有传入success回调，有则执行
             resolve(res.data)
          }else{
            //这边是服务器错误
            reject()
            let error_code=res.data.error_code
            this._show_error(error_code)
          }
      },
      //这边是任务调用失败
      fail:(err)=>{
        reject()
        this._show_error(1)
      }
    })
  }
  //加_提示我们这是个私有方法(实际上外部还是能访问)
  _show_error(error_code) {
    if(!error_code){
      error_code=1
    }
    const tip=tips[error_code]
    wx.showToast({
      title:tip?tip:tips[1],
      icon:'none',
      duration:2000
    })
  } 
}

export {HTTP}