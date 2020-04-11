// pages/book-detail/book-detail.js
import{
  BookModel
} from '../../models/book'
import{
  LikeModel
}from '../../models/like'

const likeModel=new LikeModel()
const bookModel=new BookModel()
Page({
  data: {
    comments:[],
    book:null,
    likeStatus:false,
    likeCount:0,
    posting:false
  },

  onLoad: function (options) {
    const bid=options.bid
    const detail=bookModel.getDetail(bid)
    const comments=bookModel.getComments(bid)
    const likeStatus=bookModel.getLikeStatus(bid)
    detail.then(res=>{
      this.setData({
        book:res
      })
      console.log(res)
    })

    comments.then(res=>{
      this.setData({
        comments:res.comments
      })
      console.log(res)
    })

    likeStatus.then(res=>{
      this.setData({
        likeStatus:res.like_status,
        likeCount:res.fav_nums
      })
      console.log(res)
    })
  },

  onLike(event){
    const like_or_cancel =event.detail.behavior
    likeModel.like(like_or_cancel,this.data.book.id,400)
  },

  onFakePost(event){
    this.setData({
      posting:true
    })
  },

  onCancel(event){
    this.setData({
      posting:false
    })
  }


})