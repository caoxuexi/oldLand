// pages/my/my.js
import {
  ClassicModel
} from '../../models/classic'
import {
  BookModel
} from '../../models/book'

const classicModel = new ClassicModel()
const bookModel = new BookModel()

Page({
  data: {
    authorized: false,
    userInfo: null,
    bookCount: 0,
    classics:null
  },

  onLoad: function (options) {
    this.userAuthorized()
    this.getMyBookCount()
    this.getMyFavor()
  },

  getMyBookCount() {
    bookModel.getMyBookCount()
      .then(res => {
        this.setData({
          bookCount: res.count
        })
      })
  },

  getMyFavor(){
    classicModel.getMyFavor(res=>{
      this.setData({
        classics:res.data
      })
    })
  },

  userAuthorized() {
    wx.getSetting({
      success: data => {
        if (data.authSetting['scope.userInfo']) {
          wx.getUserInfo({
            success: data => {
              this.setData({
                authorized: true,
                userInfo: data.userInfo
              })
            }
          })
        } else {
          console.log('err')
        }
      }
    })
  },

  getUserInfo(event) {

  },

  onGetUserInfo(event) {
    const userInfo = event.detail.userInfo
    if (userInfo) {
      this.setData({
        userInfo,
        authorized: true
      })
    }
  },

  onJumpToAbout(event) {
    wx.navigateTo({
      url: '/pages/about/about',
    });
  },

  onJumpToDetail(event){
    const cid = event.detail.cid
    const type = event.detail.type
    // wx.navigateTo
    wx.navigateTo({
      url:`/pages/classic-detail/classic-detail?cid=${cid}&type=${type}`
    })
  },

  onStudy(event) {
    wx.navigateTo({
      url: '/pages/course/course',
    })
  },

})