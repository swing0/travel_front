<template>

  <div class="app-container">

    <h2 style="text-align: center;">发布新景区</h2>

    <el-steps :active="3" process-status="wait" align-center style="margin-bottom: 40px;">
      <el-step title="填写景区基本信息"/>
      <el-step title="填写景区景点"/>
      <el-step title="最终发布"/>
    </el-steps>

    <div class="ccInfo">
      <img :src="publishScenic.cover">
      <div class="main">
        <h2>{{ publishScenic.title }}</h2>
        <p class="gray"><span>推荐游玩时长: {{ publishScenic.tourNum }}</span></p>
        <p><span>所属分类：{{ publishScenic.categoryLevelOne }} — {{ publishScenic.categoryLevelTwo }}</span></p>
        <p>景区管理员：{{ publishScenic.adminName }}</p>
        <h3 class="red">￥{{ publishScenic.price }}</h3>
      </div>
    </div>

    <div>
      <el-button @click="previous">返回修改</el-button>
      <el-button :disabled="saveBtnDisabled" type="primary" @click="publish">发布景区</el-button>
    </div>
  </div>
</template>

<script>

import scenic from '@/api/travel/scenic'

export default {
  data() {
    return {
      saveBtnDisabled: false, // 保存按钮是否禁用
      scenicId:'',
      publishScenic:{}
    }
  },

  created() {
      //获取路由里的id
      if(this.$route.params && this.$route.params.id){
          this.scenicId = this.$route.params.id
      }
      this.getScenicPublishId()
  },

  methods: {
    //根据景区id查询景区确认信息
    getScenicPublishId(){
      scenic.getPublishScenicInfo(this.scenicId)
        .then(response => {
          this.publishScenic = response.data.publishScenic
        })
    },

    previous() {
      this.$router.push({ path: '/scenic/spot/1' })
    },

    publish() {
      scenic.publishScenic(this.scenicId)
        .then(response => {
          this.$message({
                    type: 'success',
                    message: '景区发布成功!'
                });
        })
      this.$router.push({ path: '/scenic/list' })
        
    }
  }
}
</script>

<style scoped>
.ccInfo {
    background: #f5f5f5;
    padding: 20px;
    overflow: hidden;
    border: 1px dashed #DDD;
    margin-bottom: 40px;
    position: relative;
}
.ccInfo img {
    background: #d6d6d6;
    width: 500px;
    height: 278px;
    display: block;
    float: left;
    border: none;
}
.ccInfo .main {
    margin-left: 520px;
}

.ccInfo .main h2 {
    font-size: 28px;
    margin-bottom: 30px;
    line-height: 1;
    font-weight: normal;
}
.ccInfo .main p {
    margin-bottom: 10px;
    word-wrap: break-word;
    line-height: 24px;
    max-height: 48px;
    overflow: hidden;
}

.ccInfo .main p {
    margin-bottom: 10px;
    word-wrap: break-word;
    line-height: 24px;
    max-height: 48px;
    overflow: hidden;
}
.ccInfo .main h3 {
    left: 540px;
    bottom: 20px;
    line-height: 1;
    font-size: 28px;
    color: #d32f24;
    font-weight: normal;
    position: absolute;
}
</style>