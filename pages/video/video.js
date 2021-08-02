// pages/video/video.js
import request from '../../utils/request'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    videoGroupList:[],//导航标签数据
    navId:'',//导航标识
    videoList:[],//视频数据
    videoIds:'',//视频标识
    videoUpadateTime:[],//记录播放时长
    istrueFresher:false,//标识下拉刷新是否触发
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getVideoGroupList();//获取导航
    
  },
  //获取导航标签列表
  async getVideoGroupList(){
    let  groupList = await request('/v1/tags/video');
    this.setData({
      videoGroupList:groupList.data.tags,
      navId:groupList.data.tags[0].tagId
    });
    this.getVideoList(this.data.navId);//获取视频列表
  },
  //点击切换导航回调
  changeNav(event){
    let navId = event.currentTarget.id;
    this.setData({
      navId:navId*1,
      videoList:[]
    })
    wx.showLoading({
      title:"加载中，请稍后"
    });//加载的交互效果
    this.getVideoList(this.data.navId);
  },
  // 获取视频播放列表
  async getVideoList(navId){
    let videoData = await request('/v1/list/videos',{tagId:navId});
    let index = 0;
    let videoList = videoData.data.videos.map(item =>{
      item.tagId =index++;
      return item;
    })
    this.setData({
      videoList,
      istrueFresher:false
    })
    wx.hideLoading();//加载完成
  },
  //点击播放及继续播放
  handerplay(event){
    let vid = event.currentTarget.id;
    //关闭上一个播放的视频
    this.vid !==vid && this.videoNew && this.videoNew.stop();
    this.vid = vid;
    //更新videoId的状态数据
    this.setData({
      videoIds:vid
    })
    //创建video实例对象
    this.videoNew = wx.createVideoContext(vid);
    //判断当前是否有播放记录
    let {videoUpadateTime} = this.data;
    //判断原先视频播放中是否有id
    let videoItem = videoUpadateTime.find(item =>
      item.vid === vid
  )
  if (videoItem) {
    this.videoNew.seek(videoItem.currentTime);
  }
    this.videoNew.play();
    // videoNew.stop();
  },
  //监听视频播放进度
  handleTime(event){
    let videoTimeObj = {vid:event.currentTarget.id,currentTime:event.detail.currentTime};
    let {videoUpadateTime} = this.data;
    //判断原先视频播放中是否有id
    let videoItem = videoUpadateTime.find(item =>
      item.vid === videoTimeObj.vid
  )
    if (videoItem) {
      videoItem.currentTime = event.detail.currentTime;
    } else {
      videoUpadateTime.push(videoTimeObj);
    }
    this.setData({
      videoUpadateTime
    })
  },
  //视频播放结束调用
  handleEnd(event){
    let {videoUpadateTime} = this.data;
    videoUpadateTime.splice( videoUpadateTime.findIndex(item => item.vid === event.currentTarget.id),1);
    this.setData({
      videoUpadateTime
    })
  },
  //下拉刷新
  handleReFresher(event){
    this.getVideoList(this.data.navId)
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