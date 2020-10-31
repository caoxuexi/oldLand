// pages/book/book.js
import{
  BookModel
}from '../../models/book'

import{
  random
}from '../../utils/common'

const bookModel =new BookModel()
Page({
  data: {
    books:[],
    searching:false,
    more:''
  },

  async onLoad(options){
    const hotList=await bookModel.getHotList()
    this.setData({
      books:hotList
    })
      // .then(res=>{
      //   this.setData({
      //     books:res
      //   })
      // })
  },

  onReachBottom(){
    this.setData({
      more:random(16)
    })
  },

  onSearching:function(event){
    this.setData({
      searching:true
    })
  },

  onCancel(event){
    this.setData({
      searching:false
    })
  }


}) 