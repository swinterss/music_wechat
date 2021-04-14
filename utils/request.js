
// 请求接口的封装
export default (url,data={},method='get')=>{
  return new Promise((resolve,reject)=>{
    wx.request({
      url,
      data,
      method,
      success:(res)=>{
       console.log('请求成功',res) 
       resolve(res.data)
      },
      fail:(res)=>{
        console.log('请求失败',res)
        reject(res.data)
      }
    })
  })

}