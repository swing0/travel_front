import request from '@/utils/request'

export default {

    //1.根据景区id获得景点信息
    getAllSpotVideo(scenicId){
        return request({
            url: '/scenicservice/spot/getSpotVideo/' + scenicId,
            method: 'get'
          })
    },

    //2.添加景点
    addSpot(spot){
        return request({
            url: '/scenicservice/spot/addSpot',
            method: 'post',
            data: spot
          })
    },
    //3.根据id查询景点
    getSpotById(spotId){
        return request({
            url: '/scenicservice/spot/getSpotInfo/' + spotId,
            method: 'get'
          })
    },
    //4.修改景点
    updateSpot(spot){
        return request({
            url: '/scenicservice/spot/updateSpot',
            method: 'post',
            data: spot
          })
    },
    //5.删除景点
    deleteSpot(spotId){
        return request({
            url: '/scenicservice/spot/' + spotId,
            method: 'delete'
          })
    },
}