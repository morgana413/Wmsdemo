<script>
export default {
  name: "RecordManage",
  data() {
    return {
      goodstypeData:[],
      storageData:[],
      tableData: [],
      storage:'',
      goodstype:'',
      pageNum: 1,
      pageSize: 5,
      total: 0,
      name: '',
      centerDialogVisible: false,
      form: {
        id:'',
        name: '',
        storage:'',
        goodsType:'',
        count:'',
        remark: ''
      },
    }
  },
  methods: {
    formatStorage(row) {
      let temp = this.storageData.find(item => {
        return item.id == row.storage;
      })
      return temp && temp.name;
    },
    formatGoodsType(row) {
      let temp = this.goodstypeData.find(item => {
        return item.id == row.goodsType;
      })
      return temp && temp.name;
    },
    resetForm() {
      this.$refs.form.resetFields();
    },
    add() {
      this.centerDialogVisible = true
      this.$nextTick(() => {
        this.resetForm()
        this.form.id = ''
      })
    },
    resetParam() {
      this.name = ''
      this.storage = ''
      this.goodstype = ''
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
    loadStorage() {
      this.$axios.get(this.$httpUrl + '/storage/list').then(res => res.data).then((res) => {
        console.log(res)
        if (res.code == 200) {
          this.storageData = res.data
        } else
          alert('获取数据失败')
      })
    },
    loadGoodsType() {
      this.$axios.get(this.$httpUrl + '/goodstype/list').then(res => res.data).then((res) => {
        console.log(res)
        if (res.code == 200) {
          this.goodstypeData = res.data
        } else
          alert('获取数据失败')
      })
    },
    loadPost() {
      this.$axios.post(this.$httpUrl + '/record/listPage', {
        pageNum: this.pageNum,
        pageSize: this.pageSize,
        param: {
          name: this.name,
          goodstype: this.goodstype + '',
          storage: this.storage + ''
        }
      }).then(res => res.data).then((res) => {
        console.log(res)
        this.tableData = res
        if (res.code == 200) {
          this.tableData = res.data
          this.total = res.total
        } else
          alert('获取数据失败')
      })
    }
  },
  beforeMount(){
    this.loadPost()
    this.loadStorage()
    this.loadGoodsType()
  }
}
</script>

<template>
  <div>
    <div style="margin-bottom: 5px">
      <el-input v-model="name" placeholder="请输入物品名" suffix-icon="el-icon-search" style="width: 200px"
                @keyup.enter.native="loadPost"></el-input>
      <el-select v-model="storage" placeholder="请选择仓库" style="margin-left: 5px">
        <el-option
            v-for="item in storageData"
            :key="item.id"
            :label="item.name"
            :value="item.id">
        </el-option>
      </el-select>
      <el-select v-model="goodstype" placeholder="请选择商品种类" style="margin-left: 5px">
        <el-option
            v-for="item in goodstypeData"
            :key="item.id"
            :label="item.name"
            :value="item.id">
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
      <el-table-column prop="goodsname" label="物品名" width="180">
      </el-table-column>
      <el-table-column prop="storagename" label="仓库" width="180">
      </el-table-column>
      <el-table-column prop="goodstypename" label="分类" width="180">
    </el-table-column>
      <el-table-column prop="adminname" label="操作人" width="180">
      </el-table-column>
      <el-table-column prop="username" label="申请人" width="180">
      </el-table-column>
      <el-table-column prop="count" label="数量" width="180">
    </el-table-column>
      <el-table-column prop="createtime" label="操作时间" width="180">
      </el-table-column>
      <el-table-column prop="remark" label="备注" width="180">
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