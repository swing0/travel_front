<template>
    <div class="app-container">
    <h2 style="text-align: center;">景区列表</h2>
          <!--查询表单-->
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item>
        <el-input v-model="scenicQuery.title" placeholder="景区名称"/>
      </el-form-item>

      <el-form-item>
        <el-select v-model="scenicQuery.status" filterable placeholder="景区状态">
          <el-option 
            v-for="item in options"
            :key="item.key"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
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
        width="60"
        align="center">
        <template slot-scope="scope">
          {{ (page - 1) * limit + scope.$index + 1 }}
        </template>
      </el-table-column>

      <el-table-column prop="title" label="景区名称"  />

      <el-table-column label="景区状态" width="80">
        <template slot-scope="scope">
          {{scope.row.status==="Normal"?'开放':'关闭'}}
        </template>
      </el-table-column>

      <el-table-column prop="price" label="景区价格" width="80" />

      <el-table-column prop="gmtCreate" label="添加时间" width="160"/>

      <el-table-column prop="tourNum" label="推荐游玩时长" width="120" />

      <el-table-column prop="buyCount" label="购买量" width="80" />

      <el-table-column prop="viewCount" label="查看量" width="80" />

      <el-table-column label="操作" width="200" align="center">
        <template slot-scope="scope">
          <router-link :to="'/scenic/info/'+scope.row.id">
            <el-button type="primary" size="mini" icon="el-icon-edit">编辑景区</el-button>
          </router-link>
          <router-link :to="'/scenic/spot/'+scope.row.id">
            <el-button type="primary" size="mini" icon="el-icon-edit">编辑景点</el-button>
          </router-link>
          <el-button type="danger" size="mini" icon="el-icon-delete" @click="removeDataById(scope.row.id)">删除景区</el-button>
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

//引入调用scenic.js的文件
import scenic from '@/api/travel/scenic'
export default {
    //写核心代码的位置
    data(){//定义数据变量和初始值
        return{
            page:1,
            limit:5,
            scenicQuery:{}, //条件封装对象
            total:0, //总记录数
            list:null, //查询之后接口返回集合
            options:[{
              value: 'Normal',
              label: '开放'
            },{
              value: 'Draft',
              label: '关闭'
            }]
        }
    },
    created(){//在页面渲染之前执行，一般调用methods定义的方法
        this.getList()
    },
    methods:{//创建具体的方法，调用admin.js定义的方法
        //景区列表
        getList(page = 1){
            this.page = page
            scenic.getListScenic(this.page,this.limit,this.scenicQuery)
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
          this.scenicQuery = {}
          //查询所有管理员数据
          this.getList()
        },
        removeDataById(id){//删除管理员方法
        this.$confirm('是否删除数据?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {

          scenic.removeScenic(id)
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