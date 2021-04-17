import request from '@/utils/request'

export default {

    //1.添加景区信息
    addScenicInfo(scenicInfo){
        return request({
            url: '/scenicservice/tScenicArea/addScenicInfo',
            method: 'post',
            data:scenicInfo
          })
    },
    //2.查询所有的管理员
    getListAdmin(){
        return request({
            url: '/scenicservice/admin/findAll',
            method: 'get'
        })
    },
    //3.根据景区id查询景区所有信息
    getScenicInfoById(scenicId){
        return request({
            url: '/scenicservice/tScenicArea/getScenicInfo/' + scenicId,
            method: 'get'
        })
    },
    //4.修改景区信息
    updateScenicInfoById(scenicInfo){
        return request({
            url: '/scenicservice/tScenicArea/updateScenicInfo',
            method: 'post',
            data: scenicInfo
        })
    },
    //5.景区确认信息显示
    getPublishScenicInfo(id){
        return request({
            url: '/scenicservice/tScenicArea/getPublishScenicInfo/' + id,
            method: 'get'
        })
    },
    //6.景区最终发布
    publishScenic(id){
        return request({
            url: '/scenicservice/tScenicArea/publishScenic/' + id,
            method: 'post'
        })
    },
    //7.课程列表
    getListScenic(current,limit,scenicQuery){
        return request({
            url: `/scenicservice/tScenicArea/pageScenic/${current}/${limit}`,
            method: 'post',
            data: scenicQuery
        })
    },
    //8.删除景区
    removeScenic(id){
        return request({
            url: '/scenicservice/tScenicArea/' + id,
            method: 'delete'
        })
    },
    
}

