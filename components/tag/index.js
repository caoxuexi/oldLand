// components/tag/index.js
Component({
  options:{
    multipleSlots:true
  },

  externalClasses:['tag-class'],

  properties: {
    text:String,
  },

  data: {

  },

  methods: {
    onTap(event){
      this.triggerEvent('tapping',{
        text:this.properties.text
      })
    }
  }
})
