<template>
    <div class="app-container">
      <h2 style="text-align: center;">管理员列表</h2>
          <!--查询表单-->
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item>
        <el-input v-model="adminQuery.name" placeholder="管理员名称"/>
      </el-form-item>



      <el-form-item label="添加时间">
        <el-date-picker
          v-model="adminQuery.begin"
          type="datetime"
          placeholder="选择开始时间"
          value-format="yyyy-MM-dd HH:mm:ss"
          default-time="00:00:00"
        />
      </el-form-item>
      <el-form-item>
        <el-date-picker
          v-model="adminQuery.end"
          type="datetime"
          placeholder="选择截止时间"
          value-format="yyyy-MM-dd HH:mm:ss"
          default-time="00:00:00"
        />
      </el-form-item>

      <el-button type="primary" icon="el-icon-search" @click="getList()">查询</el-button>
      <el-button type="default" @click="resetData()">清空</el-button>
    </el-form>

            <!-- 表格 -->
    <el-table
      :data="list"
      element-loading-text="数据加载中"
      border
      fit
      highlight-current-row>

      <el-table-column
        label="序号"
        width="70"
        align="center">
        <template slot-scope="scope">
          {{ (page - 1) * limit + scope.$index + 1 }}
        </template>
      </el-table-column>

      <el-table-column prop="name" label="名称"  />

      <el-table-column prop="mobile" label="电话号" width="120" />

      <el-table-column prop="gmtCreate" label="添加时间" width="160"/>

      <el-table-column prop="sort" label="排序" width="60" />

      <el-table-column label="操作" width="200" align="center">
        <template slot-scope="scope">
          <router-link :to="'/admin/edit/'+scope.row.id">
            <el-button type="primary" size="mini" icon="el-icon-edit">修改</el-button>
          </router-link>
          <el-button type="danger" size="mini" icon="el-icon-delete" @click="removeDataById(scope.row.id)">删除</el-button>
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

//引入调用admin.js的文件
import admin from '@/api/travel/admin'
export default {
    //写核心代码的位置
    data(){//定义数据变量和初始值
        return{
            page:1,
            limit:5,
            adminQuery:{}, //条件封装对象
            total:0, //总记录数
            list:null //查询之后接口返回集合
        }
    },
    created(){//在页面渲染之前执行，一般调用methods定义的方法
        this.getList()
    },
    methods:{//创建具体的方法，调用admin.js定义的方法
        //管理员列表
        getList(page = 1){
            this.page = page
            admin.getAdminListPage(this.page,this.limit,this.adminQuery)
                .then(response =>{ //请求成功
                    //console.log(response)
                    this.list = response.data.rows
                    this.total = response.data.total
                    console.log(response)
                })
                .catch(error =>{
                    console.log(error)
                }) //请求失败
        },
        resetData(){
          //表单输入项清空
          this.adminQuery = {}
          //查询所有管理员数据
          this.getList()
        },
        removeDataById(id){//删除管理员方法
        this.$confirm('是否删除数据?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {

          admin.deleteAdminId(id)
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