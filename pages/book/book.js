// pages/book/book.js
import{
  BookModel
}from '../../models/book'

const bookModel =new BookModel()
Page({
  data: {
    books:[],
    searching:false,
    more:''
  },

  onLoad:function(options){
    const hotList=bookModel.getHotList()
      .then(res=>{
        this.setData({
          books:res
        })
      })
  }
}) 