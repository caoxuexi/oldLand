
import {ClassicModel} from '../../models/classic'
import {LikeModel} from '../../models/like'
//使用时必须先实例化一下
let classicModel=new ClassicModel()
let likeModel=new LikeModel()
Page({

  data: {
    classic:null,
    latest:true,
    first:false,
    likeCount:0,
    likeStatus:false,
  },

  onLoad: function (options) {
    //发起请求获取最近一期期刊的内容
    classicModel.getLatest((res)=>{
      console.log(res)
      this.setData({
        classic:res,
        likeCount:res.data.fav_nums,
        likeStatus:res.data.like_status
      })
    })
  },

  //点赞组件点击函数
  onLike:function(event){
    console.log(event)
    let behavior=event.detail.behavior
    //根据在response里json的内容来写
    likeModel.like(behavior,this.data.classic.data.id,
      this.data.classic.data.type)
  },

  //获得期刊上一个下一个的综合函数
  _updateClassic:function(nextOrPrevious){
    let index=this.data.classic.data.index
    classicModel.getClassic(index,nextOrPrevious,(res)=>{
      this._getLikeStatus(res.data.id,res.data.type)
      this.setData({
        classic:res,   
        latest:classicModel.isLatest(res.data.index),
        first:classicModel.isFirst(res.data.index)
      })
    })
  },

  //期刊下一个 
  onNext:function(event){
    this._updateClassic('next')
  },
  
  //期刊上一个 
  onPrevious:function(event){
    this._updateClassic('previous')
  },

  _getLikeStatus:function(artID,category){
    likeModel.getClassicLikeStatus(artID,category,
      (res)=>{
        this.setData({
          likeCount:res.data.fav_nums,
          likeStatus:res.data.like_status
        }) 
      })
  }
})
