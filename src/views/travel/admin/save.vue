<template>
    <div class="app-container">
        <h2 style="text-align: center;">管理员表单</h2>
        <el-form label-width="120px">
            <el-form-item label="管理员名称">
                <el-input v-model="admin.name"/>
            </el-form-item>
            <el-form-item label="管理员排序">
                <el-input-number v-model="admin.sort" controls-position="right" min="0"/>
            </el-form-item>
            <el-form-item label="管理员电话">
                <el-input v-model="admin.mobile"/>
            </el-form-item>

            

            <el-form-item>
                <el-button :disabled="saveBtnDisabled" type="primary" @click="saveOrUpdate">保存</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import adminApi from '@/api/travel/admin'
import ImageCropper from '@/components/ImageCropper'
import PanThumb from '@/components/PanThumb'
export default {
    components: { ImageCropper, PanThumb },
    data(){
        return{
            admin:{},
            imagecropperShow:false,
            imagecropperKey:0,
            BASE_API:process.env.BASE_API,
            saveBtnDisabled:false //保存按钮是否禁用
        }
    },
    created(){
        this.init()
    },
    watch: {//监听
        $route(to, from) {//路由变化方式，路由发生变化，方法就会执行
        this.init()
        }
    },
    methods:{   
        //关闭上传弹窗
        close(){
            this.imagecropperShow = false
            //上传组件初始化
            this.imagecropperKey = this.imagecropperKey + 1
        },
        //上传成功之后的方法
        cropSuccess(data){
            this.imagecropperShow = false
            this.admin.avatar = data.url
            this.imagecropperKey = this.imagecropperKey + 1
        },
        init(){
            if (this.$route.params && this.$route.params.id) {
                const id = this.$route.params.id
                this.getInfo(id)
            }else{
                this.admin = {}
            }
        },
        //根据管理员id查询信息
        getInfo(id){
            adminApi.getAdminInfo(id)
            .then(response =>{
                this.admin = response.data.admin
            })
        },

        saveOrUpdate(){
            //判断是修改还是添加
            if(!this.admin.id){
                //添加
                this.saveAdmin()
            }else{
                //修改
                this.updateAdmin()
            }
        },
        //修改管理员的方法
        updateAdmin(){
            adminApi.updateAdminInfo(this.admin)
            .then(response => {
                //提示信息
                this.$message({
                type: 'success',
                message: '修改成功!'
                });
                //回到列表页面 路由跳转
                this.$router.push({path:'/admin/table'})
            })
        },
        //添加管理员的方法
        saveAdmin(){
            adminApi.addAdmin(this.admin)
            .then(response => {//添加成功
                //提示信息
                this.$message({
                type: 'success',
                message: '添加成功!'
                });
                //回到列表页面 路由跳转
                this.$router.push({path:'/admin/table'})
            })
        }
    }
}
</script>