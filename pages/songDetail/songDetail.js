// pages/songDetail/songDetail.js
import request from "../../utils/request"
// 获取全局实例
const appInstance = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isrotate:false,//控制摇杆的抬起/落下
    song:{},//歌曲详情对象,
    musicId:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let musicId = options.songId;
    this.setData({
      musicId
    })
    this.getMusicInfo(musicId);//获取音乐详情

    // 判断当前音乐是否在播放
    if (appInstance.globalData.isMusicPlay && appInstance.globalData.musicId === musicId) {
      this.setData({
        isrotate:true
      })
    }
     // 创建音乐实例对象
      this.backgroundAudioManager = wx.getBackgroundAudioManager();
      // 监视播放/暂停情况
      this.backgroundAudioManager.onPlay(()=>{
        this.changePlayState(true);
        appInstance.globalData.musicId = musicId;
      });
      this.backgroundAudioManager.onPause(()=>{
        this.changePlayState(false);
      })
      this.backgroundAudioManager.onStop(()=>{
        this.changePlayState(false);
      })
  },
  // 修改播放状态
  changePlayState(state){
     this.setData({
          isrotate:state
        })
        //修改全局状态
        appInstance.globalData.isMusicPlay = state;
  },
  // 获取音乐播放详情
  async getMusicInfo(musicId){
    let songData = await request(`/v1/song/${musicId}`);
    this.setData({
      song:songData.data
    })
    // 动态设置页面导航栏标题
    wx.setNavigationBarTitle({
      title:this.data.song.title
    })
  },
  // 处理播放/暂停
  handleMusicPlay(event){
    let isrotate = !this.data.isrotate;
    // this.setData({
    //   isrotate:isPlay
    // })
    this.musicControl(isrotate);
  },
  // 控制音乐播放/暂停功能实现
  musicControl(isrotate){
    if (isrotate) {//音乐播放
      this.backgroundAudioManager.src = this.data.song.url;
      this.backgroundAudioManager.title = this.data.song.title;
    } else {
      this.backgroundAudioManager.pause();
    }
  },
  // 点击切换歌曲
  handleSwitch(event){
    let pre = event.currentTarget.id;
    
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