<template>

  <div class="app-container">

    <h2 style="text-align: center;">发布新景区</h2>

    <el-steps :active="2" process-status="wait" align-center style="margin-bottom: 40px;">
      <el-step title="填写景区基本信息"/>
      <el-step title="填写景区景点"/>
      <el-step title="最终发布"/>
    </el-steps>

    <el-button type="text" @click="openSpotDialog()">添加景点</el-button>

    <ul class="chanpterList">
      <li
        v-for="spot in spotVideoList"
        :key="spot.id">
        <p>
            {{ spot.title }}

            <span class="acts">
                <el-button type="text" @click="openVideo(spot.id)">添加视频</el-button>
                <el-button style="" type="text" @click="openEditSpot(spot.id)">编辑</el-button>
                <el-button type="text" @click="deleteSpot(spot.id)">删除</el-button>
            </span>
        </p>

        <!-- 视频 -->
        <ul class="chanpterList videoList">
            <li
                v-for="video in spot.children"
                :key="video.id">
                <p>{{ video.title }}
                    <span class="acts">
                        <el-button type="text" @click="editVideo(video.id)">编辑</el-button>
                        <el-button type="text" @click="deleteVideo(video.id)">删除</el-button>
                    </span>
                </p>
            </li>
        </ul>
      </li>
    </ul>
<div>
    <el-button @click="previous">上一步</el-button>
    <el-button :disabled="saveBtnDisabled" type="primary" @click="next">下一步</el-button>
</div>

      <!-- 添加和修改景点表单 -->
    <el-dialog :visible.sync="dialogSpotFormVisible" title="添加景点">
        <el-form :model="spot" label-width="120px">
            <el-form-item label="景点标题">
                <el-input v-model="spot.title"/>
            </el-form-item>
            <el-form-item label="景点描述">
                <el-input type="textarea" :rows="2" v-model="spot.content"/>
            </el-form-item>
            <el-form-item label="景点排序">
                <el-input-number v-model="spot.sort" :min="0" controls-position="right"/>
            </el-form-item>
            <!-- 景区封面-->
            <el-form-item  label="景点封面" >

            <el-upload
                style="text-align: left"
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload"
                :action="BASE_API+'/traveloss/fileoss'"
                class="avatar-uploader">
                <img style="width: 50%"
                    :src="spot.cover"
                    :fit="fit">
            </el-upload>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="dialogSpotFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="saveOrUpdate">确 定</el-button>
        </div>
    </el-dialog>


        <!-- 添加和修改景点表单 -->
    <el-dialog :visible.sync="dialogVideoFormVisible" title="添加景点">
    <el-form :model="video" label-width="120px">
        <el-form-item label="景点标题">
        <el-input v-model="video.title"/>
        </el-form-item>
        <el-form-item label="景点排序">
        <el-input-number v-model="video.sort" :min="0" controls-position="right"/>
        </el-form-item>
        <el-form-item label="是否免费">
        <el-radio-group v-model="video.isFree">
            <el-radio :label="true">免费</el-radio>
            <el-radio :label="false">默认</el-radio>
        </el-radio-group>
        </el-form-item>

        <el-form-item label="上传视频">
            <el-upload
                :on-success="handleVodUploadSuccess"
                :on-remove="handleVodRemove"
                :before-remove="beforeVodRemove"
                :on-exceed="handleUploadExceed"
                :file-list="fileList"
                :action="BASE_API+'/tVod/video/uploadVideo'"
                :limit="1"
                class="upload-demo">
            <el-button size="small" type="primary">上传视频</el-button>
            <el-tooltip placement="right-end">
                <div slot="content">最大支持1G，<br>
                    支持3GP、ASF、AVI、DAT、DV、FLV、F4V、<br>
                    GIF、M2T、M4V、MJ2、MJPEG、MKV、MOV、MP4、<br>
                    MPE、MPG、MPEG、MTS、OGG、QT、RM、RMVB、<br>
                    SWF、TS、VOB、WMV、WEBM 等视频格式上传</div>
                <i class="el-icon-question"/>
            </el-tooltip>
            </el-upload>
        </el-form-item>

    </el-form>
    <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVideoFormVisible = false">取 消</el-button>
        <el-button :disabled="saveVideoBtnDisabled" type="primary" @click="saveOrUpdateVideo">确 定</el-button>
    </div>
    </el-dialog>

  </div>
</template>

<script>

import spot from '@/api/travel/spot'
import video from '@/api/travel/video'

export default {
    data(){
        return{
            saveBtnDisabled:false,
            scenicAreaId:'',
            spotVideoList:[],
            spot:{
                title:'',
                sort:0,
                content:'',
                cover:''
            },
            video:{
                title:'',
                sort:0,
                isFree:0,
                videoSourceId:'',
                videoOriginalName:''
            },
            dialogSpotFormVisible: false, //景点弹窗
            dialogVideoFormVisible: false, //小节弹窗
            fileList: [],//上传文件列表
            BASE_API: process.env.BASE_API // 接口API地址
        }
    },
    created(){
        //获取路由的id
        if(this.$route.params && this.$route.params.id){
            this.scenicAreaId = this.$route.params.id
            //根据景区id查询景点
            this.getSpotVideo()
        }
    },
    methods:{

        //点击x会调用
        beforeVodRemove(file,fileList){
            return this.$confirm(`确定移除 ${file.name}?`)
        },
        //点击确定会调用
        handleVodRemove(){
            video.deleteVideoById(this.video.videoSourceId)
                .then(response => {
                    this.$message({
                    type: 'success',
                    message: '删除成功!'
                    });
                    this.fileList = []
                    this.video.videoSourceId = ''
                    this.video.videoOriginalName = ''
                })
        },
        //上传视频成功时
        handleVodUploadSuccess(response, file, fileList) {
            this.video.videoSourceId = response.data.videoId
            this.video.videoOriginalName = file.name
        },
        //上传视频之前
        handleUploadExceed() {
            this.$message.warning('想要重新上传视频，请先删除已上传的视频')
        },
        
        //上传成功调用的方法
        handleAvatarSuccess(res,file){
            this.spot.cover = res.data.url
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
        //小节操作==================

        editVideo(videoId){
            this.video = {}
            this.dialogVideoFormVisible = true
            video.getVideoById(videoId)
                .then(response => {
                    this.video = response.data.video
                })
        },

        deleteVideo(videoId){
            this.$confirm('是否删除数据?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                video.deleteVideo(videoId)
                    .then(response => {//删除成功
                    this.$message({
                    type: 'success',
                    message: '删除成功!'
                });
                this.getSpotVideo()
            })
            })
        },

        openVideo(spotId){
            this.video = {}
            this.fileList = []
            this.dialogVideoFormVisible = true
            this.video.scenicSpotId = spotId
        },
        openEditSpot(spotId){
            this.video = {}
            this.dialogVideoFormVisible = true
            this.video.scenicSpotId = spotId
        },
        
        updateVideo(){
            this.video.scenicAreaId = this.scenicAreaId
            video.updateVideo(this.video)
                .then(response => {
                    this.dialogVideoFormVisible = false
                    //提示
                    this.$message({
                        type: 'success',
                        message: '修改小节信息成功!'
                    });
                    this.getSpotVideo()
                })
        },

        addVideo(){
            this.video.scenicAreaId = this.scenicAreaId
            video.addVideo(this.video)
                .then(response => {
                    this.dialogVideoFormVisible = false
                    //提示
                    this.$message({
                        type: 'success',
                        message: '添加小节信息成功!'
                    });
                    this.getSpotVideo()
                })
        },

        saveOrUpdateVideo(){
            if(!this.video.id){
                this.addVideo()
            }else{
                this.updateVideo()
            }
        },

        //景点操作==================
        //删除景点
        deleteSpot(spotId){
            this.$confirm('是否删除数据?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
        }).then(() => {

            spot.deleteSpot(spotId)
                .then(response => {//删除成功
                this.$message({
                type: 'success',
                message: '删除成功!'
            });
              this.getSpotVideo()
          })
        })
        },
        //编辑景点弹框做数据回显
        openEditSpot(spotId){
            this.dialogSpotFormVisible = true
            
            spot.getSpotById(spotId)
                .then(response => {
                    this.spot = response.data.spot
                })
        },

        openSpotDialog(){
            this.dialogSpotFormVisible = true
            this.spot.title = ''
            this.spot.sort = 0
            this.spot.content = ''
            this.spot.cover = '/static/defaultSpot.png'
        },

        //添加景点
        addSpot(){
            this.spot.scenicAreaId = this.scenicAreaId

            spot.addSpot(this.spot)
                .then(response => {
                    this.dialogSpotFormVisible = false
                    //提示
                    this.$message({
                        type: 'success',
                        message: '添加景点信息成功!'
                    });
                    this.getSpotVideo()
                })
        },
        //修改景点信息
        updateSpot(){
            spot.updateSpot(this.spot)
                .then(response => {
                    this.dialogSpotFormVisible = false
                    //提示
                    this.$message({
                        type: 'success',
                        message: '修改景点信息成功!'
                    });
                    this.getSpotVideo()
                })
        },
        saveOrUpdate(){
            if(!this.spot.id){
                this.addSpot()
            }else{
                this.updateSpot()
            }
        },

        //根据景区id查询景点数据列表
        getSpotVideo(){
            spot.getAllSpotVideo(this.scenicAreaId)
              .then(response => {
                  this.spotVideoList = response.data.allSpotVideo
              })
        },
        previous(){
            //跳转到第一步
            this.$router.push({path:'/scenic/info/' + this.scenicAreaId})
        },
        next(){
            //跳转到第二步
            this.$router.push({path:'/scenic/publish/' + this.scenicAreaId})
        }
    }
}
</script>

<style scoped>
.chanpterList{
    position: relative;
    list-style: none;
    margin: 0;
    padding: 0;
}
.chanpterList li{
  position: relative;
}
.chanpterList p{
  float: left;
  font-size: 20px;
  margin: 10px 0;
  padding: 10px;
  height: 70px;
  line-height: 50px;
  width: 100%;
  border: 1px solid #DDD;
}
.chanpterList .acts {
    float: right;
    font-size: 14px;
}

.videoList{
  padding-left: 50px;
}
.videoList p{
  float: left;
  font-size: 14px;
  margin: 10px 0;
  padding: 10px;
  height: 50px;
  line-height: 30px;
  width: 100%;
  border: 1px dotted #DDD;
}

</style>