// components/classic/music/index.js
import {
  classicBeh
} from '../classic-beh.js'

//获取全景音乐播放器
const mMgr = wx.getBackgroundAudioManager()

Component({
  behaviors: [classicBeh],

  properties: {
    src: String,
    title:String
  },

  data: {
    title: '',
    plFying: false,
    pauseSrc: 'images/player@pause.png',
    playSrc: 'images/player@play.png'
  },

  //生命周期函数
  attached: function (event) {
    this._recoverStatus()
    this._monitorSwitch()
  },

  methods: {
    onPlay: function (event) {
      //图片要切换
      if (!this.data.playing) {
        this.setData({
          playing: true
        })
        //新版音乐播放，只要设置了src就会自动播放
        mMgr.title = this.properties.title
        mMgr.src = this.properties.src
      } else {
        this.setData({
          playing: false
        })
        mMgr.pause()
      }
    },

    _recoverStatus: function () {
      if (mMgr.paused) {
        this.setData({
          playing: false
        })
        return
      }
      if (mMgr.src == this.properties.src) {
        this.setData({
          playing: true
        })
      }
    },

    _monitorSwitch: function () {
      mMgr.onPlay(() => {
        this._recoverStatus()
      })
      mMgr.onPause(() => {
        this._recoverStatus()
      })
      mMgr.onStop(() => {
        this._recoverStatus()
      })
      mMgr.onEnded(() => {
        this._recoverStatus()
      })
    }
  },

})