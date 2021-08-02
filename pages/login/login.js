// pages/login/login.js
import request from '../../utils/request'
/**
 * 登录流程
 * 1.收集表单项数据
 * 2.前端验证
 *  ）验证用户信息是否合法
 *  ）前端验证不通过提示用户
 *  ）验证通过发送请求
 */
Page({

  /**
   * 页面的初始数据
   */
  data: {
    username:'',
    password:''

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  // 点击事件绑定
  handleInput(event){
   let type = event.currentTarget.id;//取值：username / password
   this.setData({
     [type]:event.detail.value
   })
  },
  //登录
  async login(){
    //1.收集信息
    let {username,password} = this.data;
    //2.验证
    /**
     * 手机号验证：1.内容为空 2.格式不正确 3.正确，通过
     */
    if(!username){
      wx.showToast({
        title: '邮箱为空，请重新输入',
        icon:'none'
      })
      return;
    }
    //验证格式 定义正则表达式
    let usernameReg = /^([a-zA-Z0-9._-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/;
    if (!usernameReg.test(username)) {
      wx.showToast({
        title: '邮箱错误，请重新输入',
        icon:'none'
      })
      return;
    }
    if (!password) {
      wx.showToast({
        title: '密码为空，请重新输入',
        icon:'none'
      })
      return;
    }

    //验证是否登录成功
    let result = await request('/v1/login',{username,password},"post");
    console.log(result.data)
    if (result.statusCode === 200) {
      wx.showToast({
        title: '登录成功',
      })
     
      // 用户信息存贮至本地
      wx.setStorageSync('userInfo', JSON.stringify(result.data))
      //跳转至个人中心页
      wx.reLaunch({
        url: '/pages/peopleCenter/peopleCenter',
      })
    }else  {
      wx.showToast({
        title: '登录失败，请重新登录',
        icon:'none'
      })
    }

  },


  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})