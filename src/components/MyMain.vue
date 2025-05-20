<script>
export default {
name: "MyMain",
  data() {
    return {
      tableData: [],
      pageNum: 1,
      pageSize: 2,
      total: 0,
      name:'',
      sex:'',
      sexs:[{
        value: '1',
        label: '男'
      }, {
        value: '0',
        label: '女'
      }
      ]
    }
  },
  methods: {
    resetParam(){
     this.sex=''
     this.name=''
      this.loadPost()
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.pageNum = 1;
      this.pageSize = val;
      this.loadPost()
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.pageNum = val;
      this.loadPost()
    },
  loadGet() {
    this.$axios.get(this.$httpUrl+'/user/list').then(res =>res.data).then((res) => {
      console.log(res)
    })
  },
    loadPost(){
    this.$axios.post( this.$httpUrl+'/user/listPageC1',{
      pageNum:this.pageNum,
      pageSize:this.pageSize,
      param:{
        name:this.name,
        sex:this.sex
      }
    }).then(res =>res.data).then((res) => {
      console.log(res)
      this.tableData = res
      if (res.code==200){
        this.tableData = res.data
        this.total = res.total
      }else
        alert('获取数据失败')
    })
    }
  },
  beforeMount() {
  //this.loadGet();
    this.loadPost();
  }
}
</script>

<template>
  <div>
    <div style="margin-bottom: 5px">
      <el-input v-model="name" placeholder="请输入名字" suffix-icon="el-icon-search" style="width: 200px"
      @keyup.enter.native="loadPost"></el-input>
      <el-select style="margin-left: 5px" v-model="sex" filterable placeholder="请选择性别">
        <el-option
            v-for="item in sexs"
            :key="item.value"
            :label="item.label"
            :value="item.value">
        </el-option>
      </el-select>
      <el-button type="primary" style="margin-left: 5px" @click="loadPost">查询</el-button>
      <el-button type="success" @click="resetParam">重置</el-button>
    </div>
  <el-table :data="tableData"
  :header-cell-style="{background: '#2fddfa'}"
            border
  >
    <el-table-column prop="id" label="ID" width="60">
    </el-table-column>
    <el-table-column prop="name" label="姓名" width="180">
    </el-table-column>
    <el-table-column prop="no" label="账号" width="180">
    </el-table-column>
    <el-table-column prop="age" label="年龄" width="180">
    </el-table-column>
    <el-table-column prop="phone" label="电话" width="180">
    </el-table-column>
    <el-table-column prop="sex" label="性别" width="180">
      <template slot-scope="scope">
        <el-tag
            :type="scope.row.sex === 1 ? 'primary' : 'success'"
            disable-transitions>{{scope.row.sex === 1 ? '男' : '女'}}</el-tag>
      </template>
    </el-table-column>
    <el-table-column prop="roleId" label="角色" width="180">
      <template slot-scope="scope">
        <el-tag
            :type="scope.row.roleId === 0 ? 'danger' : (scope.row.roleId === 1 ? 'primary' : 'success')"
            disable-transitions>{{scope.row.roleId === 0 ? '超级管理员' : (scope.row.roleId === 1 ? '管理员' : '普通用户')}}</el-tag>
      </template>
    </el-table-column>
    <el-table-column prop="operate" label="操作" width="180">
      <el-button size="small" type="success">编辑</el-button>
      <el-button size="small" type="danger">删除</el-button>
    </el-table-column>
  </el-table>
    <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pageNum"
        :page-sizes="[1, 2, 3, 5]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
    </el-pagination>
  </div>
</template>

<style scoped>

</style>