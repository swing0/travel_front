<template>
    <div class="app-container">
        <h2 style="text-align: center;">添加banner</h2>
        <el-form label-width="120px">
            <el-form-item label="banner标题">
                <el-input v-model="banner.title"/>
            </el-form-item>

            <el-form-item label="banner排序">
                <el-input-number v-model="banner.sort" :min="0" controls-position="right"/>
            </el-form-item>

            <el-form-item  label="banner图片" >
            <el-upload
                style="text-align: left"
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload"
                :action="BASE_API+'/traveloss/fileoss'"
                class="avatar-uploader">
                <img style="width: 50%"
                    :src="banner.imageUrl"
                    :fit="fit">
            </el-upload>
            </el-form-item>


            <el-form-item>
                <el-button :disabled="saveBtnDisabled" type="primary" @click="saveOrUpdate">保存</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>

import banner from '@/api/travel/banner'

export default {
    data(){
        return{
            bannerId:'',
            banner:{
                title:'',
                imageUrl:'',
                sort:''
            },
            saveBtnDisabled:false,
            imageUrl:'',
            BASE_API: process.env.BASE_API // 接口API地址
        }
    },
    created(){
        if(this.$route.params && this.$route.params.id){
            this.bannerId = this.$route.params.id
            this.getBannerInfo()
        }else{
            this.banner.imageUrl = '/static/defaultBanner.png'
        }
    },
    methods:{
        saveOrUpdate(){
            //判断是添加还是修改
            if(!this.banner.id){
                this.addBanner()
            }else{
                this.updateBanner()
            }
        },
        addBanner(){
            banner.addBannerInfo(this.banner)
                .then(response => {
                    //提示
                    this.$message({
                    type: 'success',
                    message: '添加景区信息成功!'
                    });
                    //跳转到list
                    this.$router.push({path:'/banner/list'})
                })
        },
        updateBanner(){
            banner.updateBannerById(this.banner)
                .then(response => {
                    //提示
                    this.$message({
                    type: 'success',
                    message: '修改banner信息成功!'
                    });
                    //跳转到第二步
                    this.$router.push({path:'/banner/list'})
                })
        },
        //banner数据回显
        getBannerInfo(){
            banner.getBannerById(this.bannerId)
                .then(response => {
                    this.banner = response.data.item
                })
        },
        //上传成功调用的方法
        handleAvatarSuccess(res,file){
            this.banner.imageUrl = res.data.url
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
    }
}
</script>

<style scoped>
::v-deep .el-upload {
    text-align: left;
}
</style>