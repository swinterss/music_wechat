// pages/recommondSongs/recommondSongs.js

import request from '../../utils/request'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    day:"",
    month:"",
    year:"",
    songList:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      day:new Date().getDate(),
      month:new Date().getMonth()+1,
      year:new Date().getFullYear(),
    })
    //获取音乐列表
    this.getSongList();
  },
  //音乐列表
  async getSongList(){
    let songList = await request('/v1/list/songs/tag',{tag_id:1});
    this.setData({
      songList:songList.data.songs
    })
  },


  // 跳转歌曲页面
  toSongDetail(event){
    let songs = event.currentTarget.dataset.song;
    //路由query传参
    wx.navigateTo({
      // 不能直接传对象，小程序限制
      url: '/pages/songDetail/songDetail?songId='+songs,
    })
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