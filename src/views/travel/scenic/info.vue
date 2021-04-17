<template>

  <div class="app-container">

    <h2 style="text-align: center;">发布新景区</h2>

    <el-steps :active="1" process-status="wait" align-center style="margin-bottom: 40px;">
      <el-step title="填写景区基本信息"/>
      <el-step title="填写景区景点"/>
      <el-step title="最终发布"/>
    </el-steps>

    <el-form label-width="120px">

        <el-form-item label="景区标题">
            <el-input v-model="scenicInfo.title" placeholder=" 示例：龙门石窟"/>
        </el-form-item>

        <!-- 景区分类-->
        <el-form-item label="景区分类">
            <el-select
                v-model="scenicInfo.categoryParentId" placeholder="一级分类" @change="categotyOneChanged">
                <el-option
                v-for="category in categoryOneList"
                :key="category.id"
                :label="category.title"
                :value="category.id"/>
            </el-select>            
        <!-- 二级分类 -->
            <el-select 
                v-model="scenicInfo.categoryId" placeholder="二级分类">
                <el-option
                v-for="category in categoryTwoList"
                :key="category.value"
                :label="category.title"
                :value="category.id"/>
            </el-select>
        </el-form-item>


        <!-- 景区管理员-->
        <el-form-item label="景区管理员">
            <el-select
                v-model="scenicInfo.adminId"
                placeholder="管理员">
                <el-option
                v-for="admin in adminList"
                :key="admin.id"
                :label="admin.name"
                :value="admin.id"/>
            </el-select>
        </el-form-item>

        <el-form-item label="游玩时长">
            <el-input-number :min="0" v-model="scenicInfo.tourNum" controls-position="right" placeholder="请填写推荐游玩时长"/>
        </el-form-item>

        <!-- 景区简介-->
        <el-form-item label="景区简介">
            <tinymce :height="300" v-model="scenicInfo.description"/>
        </el-form-item>

        <!-- 景区封面-->
        <el-form-item  label="景区封面" >

        <el-upload
            style="text-align: left"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
            :action="BASE_API+'/traveloss/fileoss'"
            class="avatar-uploader">
            <img style="width: 50%"
                 :src="scenicInfo.cover"
                 :fit="fit">
        </el-upload>

        </el-form-item>

        <el-form-item label="景区价格">
            <el-input-number :min="0" v-model="scenicInfo.price" controls-position="right" placeholder="免费课程请设置为0元"/> 元
        </el-form-item>

        <el-form-item>
            <el-button :disabled="saveBtnDisabled" type="primary" @click="saveOrUpdate">保存并下一步</el-button>
        </el-form-item>
    </el-form>
  </div>
</template>

<script>
import scenic from '@/api/travel/scenic'
import category from '@/api/travel/category'
import Tinymce from '@/components/Tinymce'

export default {
    components: { Tinymce },
    data(){
        return{
            scenicId:'',
            saveBtnDisabled:false,
            scenicInfo:{
                title: '',
                categoryId: '',
                categoryParentId: '',
                adminId: '',
                spotNum: 0,
                tourNum: 0,
                description: '',
                cover: '',
                price: 0
            },
            adminList:[],//封装所有的管理员
            categoryOneList:[],//封装所有的一级分类
            categoryTwoList:[],//封装所有的二级分类
            BASE_API: process.env.BASE_API // 接口API地址
        }
    },
    created(){
        //获取路由的id
        if(this.$route.params && this.$route.params.id){
            this.scenicId = this.$route.params.id
            this.getScenicInfo()
        }else{
            //初始化所有管理员
            this.getListAdmin()
            //初始化一级分类
            this.getOneCategory()
            this.scenicInfo.cover = '/static/defaultScenicImage.png'
        }
    },
    watch: {//监听
        $route(to, from) {//路由变化方式，路由发生变化，方法就会执行
        this.init()
        }
    },
    methods:{
        //根据景区id查询信息
        getScenicInfo(){
            scenic.getScenicInfoById(this.scenicId)
                .then(response => {
                    this.scenicInfo = response.data.scenicInfoVo
                    category.getCategoryList()
                        .then(response => {
                            this.categoryOneList = response.data.list

                            for(var i=0;i<this.categoryOneList.length;i++){
                                var oneCategory = this.categoryOneList[i]
                                if(this.scenicInfo.categoryParentId == oneCategory.id){
                                    this.categoryTwoList = oneCategory.children
                                }
                            }
                        })
                        //初始化所有管理员
                        this.getListAdmin()
                })
        },
        //上传成功调用的方法
        handleAvatarSuccess(res,file){
            this.scenicInfo.cover = res.data.url
        },
        //上传之前调用的方法
        beforeAvatarUpload(file){
            const isJPG = file.type === 'image/jpeg'
            const isLt2M = file.size / 1024 / 1024 < 2

            if (!isJPG) {
                this.$message.error('上传头像图片只能是 JPG 格式!')
            }
            if (!isLt2M) {
                this.$message.error('上传头像图片大小不能超过 2MB!')
            }
            return isJPG && isLt2M
        },
        //点击某个一级分类，触发change，显示二级分类
        categotyOneChanged(value){
            //value就是id值
            for (var i = 0; i < this.categoryOneList.length; i++) {
                if (this.categoryOneList[i].id === value) {
                    this.categoryTwoList = this.categoryOneList[i].children
                    this.scenicInfo.categoryId = ''
            }
    }
        },
        //查询所有的一级分类
        getOneCategory(){
            category.getCategoryList()
                .then(response => {
                    this.categoryOneList = response.data.list
                })
        },
        //查询所有的管理员
        getListAdmin(){
            scenic.getListAdmin()
                .then(response => {
                    this.adminList = response.data.items
                })
        },
        addCategory(){
            scenic.addScenicInfo(this.scenicInfo)
                .then(response => {
                    //提示
                    this.$message({
                    type: 'success',
                    message: '添加景区信息成功!'
                    });
                    //跳转到第二步
                    this.$router.push({path:'/scenic/spot/' + response.data.scenicId})
                })
        },
        updateCategory(){
            scenic.updateScenicInfoById(this.scenicInfo)
                .then(response => {
                    //提示
                    this.$message({
                    type: 'success',
                    message: '修改景区信息成功!'
                    });
                    //跳转到第二步
                    this.$router.push({path:'/scenic/spot/' + this.scenicId})
                })
        },
        saveOrUpdate(){
            //判断是添加还是修改
            if(!this.scenicInfo.id){
                this.addCategory()
            }else{
                this.updateCategory()
            }
        }
    }
}
</script>

<style scoped>
.tinymce-container {
  line-height: 29px;
}
::v-deep .el-upload {
    text-align: left;
}
</style>