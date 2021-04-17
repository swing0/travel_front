import request from '@/utils/request'

export default {

    //1.课程分类
    getCategoryList(){
        return request({
            url: '/scenicservice/category/getAllCategory',
            method: 'get'
          })
    }
}

