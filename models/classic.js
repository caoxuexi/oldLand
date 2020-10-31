import {HTTP} from "../utils/http"
class ClassicModel extends HTTP{
    //获得最近一期期刊的内容
    getLatest(sCallback){
        this.request({
            url:'classic/latest',
            success:(res)=>{
                sCallback(res)
                this._setLatestIndex(res.data.index)
                //可能因为服务器数据变更，最进一期的index也会改变
                let key =this._getKey(res.data.index)
                wx.setStorageSync(key,res)
            }
        })
    }

    //设置最近一期期刊号
    _setLatestIndex(index){
        wx.setStorageSync('latest', index);
    }

    //获取最近一期期刊号
    _getLatestIndex(){
        let index=wx.getStorageSync('latest');
        return index
    }

    //用来返回用于拼接的url片段(主要用于设置缓存)
    _getKey(index){
        let key = 'classic-' +index
        return key
    }

    isFirst(index){
        return index==1?true:false
    }

    isLatest(index){
        let latestIndex=this._getLatestIndex()
        return index==latestIndex?true:false
    }

    getPrevious(index,sCallback){
        this.request({
            url:'classic/'+index+'/previous',
            success:(res)=>{
                sCallback(res)
            }
        })
    }

    getNext(index,sCallback){
        this.request({
            url:'classic/'+index+'/next',
            success:(res)=>{
                sCallback(res)
            }
        })
    }

    // 综合获取前一个和后一个期刊的方法
    getClassic(index,nextOrPrevious,sCallback){
        //缓存中寻找 or API 写入到缓存中
        let key= nextOrPrevious == 'next'?
            this._getKey(index+1):this._getKey(index-1)
        let classic =wx.getStorageSync(key)
        //若缓存中没有找到就发送http请求，同时写入缓存
        if(!classic){
            this.request({
                url:`classic/${index}/${nextOrPrevious}`,
                success:(res)=>{
                    wx.setStorageSync(
                        this._getKey(res.data.index),res)
                    sCallback(res)
                }
            })
        }else{
            sCallback(classic)
        }      
    }

    getMyFavor(success) {
        const params = {
            url: 'classic/favor',
            success: success
        }
        this.request(params)
    }
}

export {ClassicModel}