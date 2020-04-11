// components/navi/index.js
Component({
  properties: {
    title:String,
    // 判断是否是第一个或最后一个
    first:Boolean,
    latest:Boolean
  },

  /**
   * 组件的初始数据
   */
  data: {
    disLeftSrc: 'images/triangle.dis@left.png',
    leftSrc: 'images/triangle@left.png',
    disRightSrc: 'images/triangle.dis@right.png',
    rightSrc: 'images/triangle@right.png'
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onLeft:function(event){
      if(!this.properties.latest){
        this.triggerEvent('left',{},{})
      }
    },
    onRight:function(event){
      if(!this.properties.first){
        this.triggerEvent('right',{},{})
      } 
    }
  }
})
