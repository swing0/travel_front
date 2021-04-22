<template>
    <div class="app-container">
    <h2 style="text-align: center;">banner列表</h2>

    <el-table
      :data="list"
      element-loading-text="数据加载中"
      border
      fit
      highlight-current-row>

      <el-table-column
        label="序号"
        width="60"
        align="center">
        <template slot-scope="scope">
          {{ (page - 1) * limit + scope.$index + 1 }}
        </template>
      </el-table-column>

      <el-table-column  label="图片" >
      　　<template slot-scope="scope">
      　　　　<img :src="scope.row.imageUrl" width="400" height="200" class="head_pic"/>
      　　</template>
      </el-table-column>


      <el-table-column prop="title" label="banner名称" width="200" />

      <el-table-column label="操作" width="300" align="center">
        <template slot-scope="scope">
          <router-link :to="'/banner/save/'+scope.row.id">
            <el-button type="primary"  icon="el-icon-edit">编辑banner</el-button>
          </router-link>
          <el-button type="danger"  icon="el-icon-delete" @click="removeDataById(scope.row.id)">删除banner</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination
      background
      :current-page="page"
      :page-size="limit"
      :total="total"
      style="padding: 30px 0; text-align: center;"
      layout="total, prev, pager, next, jumper"
      @current-change="getList"
    />

    </div>
</template>

<script>

import banner from '@/api/travel/banner'

export default {
    data(){
        return{
            page:1,
            limit:5,
            banner:{},
            total:0, //总记录数
            list:null, //查询之后接口返回集合
        }
    },
    created(){
        this.getList()
    },
    methods:{
        //banner列表
        getList(page = 1){
            this.page = page
            banner.getListBanner(this.page,this.limit)
                .then(response => {
                    this.list = response.data.items
                    this.total = response.data.total
                })
                .catch(error =>{
                    console.log(error)
                }) //请求失败
        },
        //删除banner方法
        removeDataById(id){
        this.$confirm('是否删除数据?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {

          banner.removeBanner(id)
          .then(response => {//删除成功
              this.$message({
              type: 'success',
              message: '删除成功!'
          });
              this.getList()
          })
        })
        }
    }
}
</script>