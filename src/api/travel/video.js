import request from '@/utils/request'

export default {

    //1.添加小节
    addVideo(video){
        return request({
            url: '/scenicservice/tVideo/addVideo',
            method: 'post',
            data: video
          })
    },
    //2.修改小节
    updateVideo(video){
        return request({
            url: '/scenicservice/tVideo/updateVideo',
            method: 'post',
            data: video
          })
    },
    //3.删除小节
    deleteVideo(videoId){
        return request({
            url: '/scenicservice/tVideo/' + videoId,
            method: 'delete'
          })
    },
    //4.根据id查询小节
    getVideoById(videoId){
        return request({
            url: '/scenicservice/tVideo/' + videoId,
            method: 'get'
          })
    },
    //5.根据id删除视频
    deleteVideoById(id){
        return request({
            url: '/tVod/video/removeVideo/' + id,
            method: 'delete'
          })
    },
}