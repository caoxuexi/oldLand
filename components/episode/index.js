Component({
  properties: {
    index:{
      type:Number,
      //当我们改变值的时候，wx会调用这个函数
      observer:function(newVal,oldVal,changedPath){
        let val=newVal<10?'0'+newVal:newVal
        this.setData({
          _index:val
        })
      }
    }
  },


  data: {
    months:[
      '一月', '二月', '三月', '四月',
      '五月','六月','七月','八月',
      '九月','十月','十一月','十二月'
    ],
    year:0,
    month:"七月",
    /**定义这个变量用于解决observer里不能修改
    变量自身的问题*/
    _index:''
  },

  attached:function(){
    let date=new Date()
    let year=date.getFullYear()
    // 因为英文环境的原因，month的值会比真实值少1
    let month=date.getMonth()
    this.setData({
      year:year,
      month:this.data.months[month]
    })
  },

  methods: {

  }
})
