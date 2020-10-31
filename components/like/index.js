// components/like/index.js
Component({
  properties: {
    like:{
      type:Boolean,
      valu:false,//默认值
    },
    count:{
      type:Number,
    },
    readOnly:{
      type:Boolean
    }
  },

  data: {
    //数据绑定
    like:true,
    count:9,
    yesSrc:'images/like.png',
    noSrc: 'images/like@dis.png'
  },

  methods: {
    onLike:function(event){
      if(this.properties.readOnly){
        return
      }
      let like=this.properties.like
      let count=this.properties.count
      count=like?count-1:count+1
      this.setData({
        count:count,
        like:!like
      })
      // 新加的用来确认组件在页面点击时的状态--激活
      let behavior=this.properties.like?'like':'cancel'
      this.triggerEvent('like',{
        behavior:behavior
      },{})
    }
  }
})
