// pages/book-detail/book-detail.js
import {
  BookModel
} from '../../models/book'
import {
  LikeModel
} from '../../models/like'

const likeModel = new LikeModel()
const bookModel = new BookModel()
Page({
  data: {
    comments: [],
    book: null,
    likeStatus: false,
    likeCount: 0,
    posting: false
  },

  onLoad: function (options) {
    wx.showLoading({
      title: "正在加载数据",
      mask: true,
    });
    const bid = options.bid
    const detail = bookModel.getDetail(bid)
    const comments = bookModel.getComments(bid)
    const likeStatus = bookModel.getLikeStatus(bid)

    Promise.all([detail, comments, likeStatus])
      .then(res => {
        this.setData({
          book: res[0],
          comments: res[1].comments,
          likeStatus: res[2].likeStatus,
          likeCount: res[2].fav_nums
        })
        wx.hideLoading();
      })

    //   detail.then(res=>{
    //     this.setData({
    //       book:res
    //     })
    //     console.log(res)
    //   })

    //   comments.then(res=>{
    //     this.setData({
    //       comments:res.comments
    //     })
    //     console.log(res)
    //   })

    //   likeStatus.then(res=>{
    //     this.setData({
    //       likeStatus:res.like_status,
    //       likeCount:res.fav_nums
    //     })
    //     console.log(res)
    //   })
  },

  onLike(event) {
    const like_or_cancel = event.detail.behavior
    likeModel.like(like_or_cancel, this.data.book.id, 400)
  },

  onFakePost(event) {
    this.setData({
      posting: true
    })
  },

  onCancel(event) {
    this.setData({
      posting: false
    })
  },

  onPost(event) {
    const comment = event.detail.text || event.detail.value
    if (!comment) {
      return //防止用户提交空字符串
    }
    if (comment.length > 12) {
      wx.showToast({
        title: '短评最多12个字',
        icon: 'none'
      })
      return
    }
    bookModel.postComment(this.data.book.id, comment)
      .then(res => {
        wx.showToast({
          title: '已选评论+1',
          icon: "none"
        })
        // unshift可以把元素添加到数组的第一个
        this.data.comments.unshift({
          content: comment,
          nums: 1
        })
        this.setData({
          comments: this.data.comments,
          posting: false
        })
      })
  }


})