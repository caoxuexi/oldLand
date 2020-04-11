import {HTTP} from '../utils/http'
class LikeModel extends HTTP{
    //behavior是like组件状态，artId是点赞对象id，category是类别(type)
    like(behavior,artId,category){
        let url=behavior=='like'?'like':'like/cancel'
        this.request({
            url:url,
            method:'POST',
            data:{
                art_id:artId,
                type:category
            }
        })
    }

    getClassicLikeStatus(artID,category,sCallback){
        this.request({
            //获取喜欢相关信息的单独url
            url:'classic/'+category+'/'+artID+'/favor',
            success:sCallback
        })
    }
}

export {LikeModel}