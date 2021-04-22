import request from '@/utils/request'

export default{
    //1.列表查询banner
    getListBanner(page,limit){
        return request({
            url: `/cmsservice/banneradmin/pageBanner/${page}/${limit}`,
            method: 'get'
        })
    },
    //2.添加banner
    addBannerInfo(banner){
        return request({
            url: '/cmsservice/banneradmin/addBanner',
            method: 'post',
            data:banner
          })
    },
    //3.根据id查询banner
    getBannerById(id){
        return request({
            url: '/cmsservice/banneradmin/getBanner/' + id,
            method: 'get'
          })
    },
    //4.修改banner
    updateBannerById(banner){
        return request({
            url: '/cmsservice/banneradmin/updateBanner',
            method: 'put',
            data:banner
          })
    },
    //5.删除banner
    removeBanner(id){
        return request({
            url: '/cmsservice/banneradmin/removeBanner/' + id,
            method: 'delete'
        })
    }
}