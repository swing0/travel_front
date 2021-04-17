import request from '@/utils/request'

export default {

    //1.管理员列表(条件查询分页)pageAdminCondition/{current}/{limit}
    //current当前页 limit每页记录数 //adminQuery条件对象
    getAdminListPage(current,limit,adminQuery){
        return request({
            url: `/scenicservice/admin/pageAdminCondition/${current}/${limit}`,
            method: 'post',
            //后端使用requestBody来获取,data表示把对象转换成json来传递数据
            data: adminQuery
          })
    },
    //删除管理员
    deleteAdminId(id){
        return request({
            url: `/scenicservice/admin/${id}`,
            method: 'delete'
          })
    },
    //添加管理员
    addAdmin(admin){
        return request({
            url: `/scenicservice/admin/addAdmin`,
            method: 'post',
            data: admin
          })
    },
    //根据id查询管理员
    getAdminInfo(id){
        return request({
            url: `/scenicservice/admin/getAdmin/${id}`,
            method: 'get'
          })
    },
    //修改管理员
    updateAdminInfo(admin){
        return request({
            url: `/scenicservice/admin/updateAdmin`,
            method: 'post',
            data:admin
          })
    }
}

