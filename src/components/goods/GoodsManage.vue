<script>
import SelectUser from "@/components/user/SelectUser.vue";
export default {
  name: "GoodsManage",
  components: {SelectUser},
  data() {
    let checkCount = (rule, value, callback) => {
      if (value > 9999) {
        callback(new Error('数量输入过大'));
      } else {
        callback()
      }
    };
    return {
      user:JSON.parse(sessionStorage.getItem("CurUser")),
      goodstypeData: [],
      storageData: [],
      tableData: [],
      storage: '',
      goodstype: '',
      pageNum: 1,
      pageSize: 5,
      total: 0,
      name: '',
      centerDialogVisible: false,
      inDialogVisible: false,
      innerVisible: false,
      currentRow:{},
      tempUser:{},
      form: {
        id: '',
        name: '',
        storage: '',
        goodsType: '',
        count: '',
        remark: ''
      },
      form1:{
        goods:'',
        goodsname:'',
        count:'',
        userId:'',
        username:'',
        adminId:'',
        remark:'',
        action:'1',
      },
      rules1:{},
      rules: {
        name: [
          { required: true, message: '请输入物品名', trigger: 'blur' },
        ],
        storage: [
          { required: true, message: '请选择仓库', trigger: 'blur' },
        ],
        goodsType: [
          { required: true, message: '请选择种类', trigger: 'blur' },
        ],
        count: [
          { required: true, message: '请输入数量', trigger: 'blur' },
          { pattern: /^([1-9][0-9]*){1,4}$/, message: '数量必须为正整数', trigger: 'blur' },
          { validator: checkCount, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    doSelectUser(val) {
    console.log(val)
      this.tempUser = val
    },
    confirmUser(){
    this.form1.userId = this.tempUser.id;
    this.form1.username = this.tempUser.name;
    this.innerVisible = false;
    },
    selectUser(){
    this.innerVisible = true;
    },
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
    resetInForm(){
      this.$refs.form1.resetFields();
    },
    mod(row) {
      this.centerDialogVisible = true
      this.$nextTick(() => {
        this.form.id = row.id;
        this.form.name = row.name;
        this.form.count = row.count;
        this.form.goodsType = row.goodsType;
        this.form.storage = row.storage;
        this.form.remark = row.remark;
      })
    },
    del(id) {
      this.$axios.get(this.$httpUrl + '/goods/del?id=' + id).then(res => res.data).then(res => {
        console.log(res)
        this.tableData = res
        if (res.code == 200) {
          this.$message({
            message: '操作成功！',
            type: 'success'
          });
          this.loadPost()
        } else
          this.$message({
            message: '操作失败',
            type: 'error'
          });
      })
    },
    doSave() {
      this.$axios.post(this.$httpUrl + '/goods/save', this.form).then(res => res.data).then(res => {
        console.log(res)
        this.tableData = res
        if (res.code == 200) {
          this.$message({
            message: '操作成功！',
            type: 'success'
          });
          this.centerDialogVisible = false
          this.loadPost()
          this.resetForm()
        } else
          this.$message({
            message: '操作失败',
            type: 'error'
          });
      })
    },
    doinGoods() {
      this.$axios.post(this.$httpUrl + '/record/save', this.form1).then(res => res.data).then(res => {
        console.log(res)
        this.tableData = res
        if (res.code == 200) {
          this.$message({
            message: '操作成功！',
            type: 'success'
          });
          this.inDialogVisible = false
          this.loadPost()
          this.resetInForm()
        } else
          this.$message({
            message: '操作失败',
            type: 'error'
          });
      })
    },
    doMod() {
      this.$axios.post(this.$httpUrl + '/goods/update', this.form).then(res => res.data).then(res => {
        console.log(res)
        this.tableData = res
        if (res.code == 200) {
          this.$message({
            message: '操作成功！',
            type: 'success'
          });
          this.centerDialogVisible = false
          this.loadPost()
          this.resetForm()
        } else
          this.$message({
            message: '操作失败',
            type: 'error'
          });
      })
    },
    save() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          if (this.form.id) {
            this.doMod();
          } else {
            this.doSave();
          }
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    inGoods() {
      if (!this.currentRow.id) {
        alert('请选择商品');
        return;
      }
      this.inDialogVisible = true
      this.$nextTick(() => {
        this.resetInForm()
      })
      this.form1.goodsname = this.currentRow.name;
      this.form1.goods = this.currentRow.id;
      this.form1.adminId = this.user.id;
      this.form1.action ='1';
    },
    outGoods() {
      if (!this.currentRow.id) {
        alert('请选择商品');
        return;
      }
      this.inDialogVisible = true
      this.$nextTick(() => {
        this.resetInForm()
      })
      this.form1.goodsname = this.currentRow.name;
      this.form1.goods = this.currentRow.id;
      this.form1.adminId = this.user.id;
      this.form1.action ='2';
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
    selectCurrentChange(val) {
      this.currentRow = val;
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.pageNum = val;
      this.loadPost()
    },
    loadPost() {
      this.$axios.post(this.$httpUrl + '/goods/listPage', {
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
    }
  },
  beforeMount() {
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
      <el-button type="warning" @click="add" v-if="user.roleId!=2">新增</el-button>
      <el-button type="warning" @click="inGoods" v-if="user.roleId!=2">入库</el-button>
      <el-button type="warning" @click="outGoods" v-if="user.roleId!=2">出库</el-button>
    </div>
    <el-table :data="tableData"
              :header-cell-style="{background: '#2fddfa'}"
              border
              highlight-current-row
              @current-change="selectCurrentChange"
    >
      <el-table-column prop="id" label="ID" width="60">
      </el-table-column>
      <el-table-column prop="name" label="物品名" width="180">
      </el-table-column>
      <el-table-column prop="storage" label="仓库" width="180" :formatter="formatStorage">
      </el-table-column>
      <el-table-column prop="goodsType" label="分类" width="180" :formatter="formatGoodsType">
      </el-table-column>
      <el-table-column prop="count" label="数量" width="180">
      </el-table-column>
      <el-table-column prop="remark" label="备注" width="180">
      </el-table-column>
      <el-table-column prop="operate" label="操作" width="180" v-if="user.roleId!=2">
        <template slot-scope="scope">
          <el-button size="small" type="success" @click="mod(scope.row)">编辑</el-button>
          <el-popconfirm
              title="确定删除吗？"
              @confirm="del(scope.row.id)"
          >
            <el-button slot="reference" size="small" type="danger" style="margin-left: 5px">删除</el-button>
          </el-popconfirm>
        </template>
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
    <el-dialog
        title="新增"
        :visible.sync="centerDialogVisible"
        width="30%"
        center>
      <el-form ref="form" :rules="rules" :model="form" label-width="80px">
        <el-form-item label="物品名" prop="name">
          <el-col :span="20"><el-input v-model="form.name"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="仓库" prop="storage">
          <el-col :span="20">
            <el-select v-model="form.storage" placeholder="请选择仓库" style="margin-left: 5px">
              <el-option
                  v-for="item in storageData"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id">
              </el-option>
            </el-select>
          </el-col>
        </el-form-item>
        <el-form-item label="分类" prop="goodsType">
          <el-col :span="20">
            <el-select v-model="form.goodsType" placeholder="请选择商品种类" style="margin-left: 5px">
              <el-option
                  v-for="item in goodstypeData"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id">
              </el-option>
            </el-select>
          </el-col>
        </el-form-item>
        <el-form-item label="数量" prop="count">
          <el-col :span="20"><el-input v-model="form.count"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-col :span="20"><el-input type="textarea" v-model="form.remark"></el-input>
          </el-col>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
    <el-button @click="centerDialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="save">确 定</el-button>
  </span>
    </el-dialog>
    <el-dialog
        title="出入库"
        :visible.sync="inDialogVisible"
        width="30%"
        center>
      <el-dialog
          width="90%"
          title="用户选择"
          :visible.sync="innerVisible"
          append-to-body>
        <SelectUser @doSelectUser="doSelectUser"></SelectUser>
        <span slot="footer" class="dialog-footer">
    <el-button @click="innerVisible = false">取 消</el-button>
    <el-button type="primary" @click="confirmUser">确 定</el-button>
  </span>
      </el-dialog>
      <el-form ref="form1" :rules="rules1" :model="form1" label-width="80px">
        <el-form-item label="物品名" prop="name">
          <el-col :span="20"><el-input v-model="form1.goodsname" readonly></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="申请人" prop="name">
          <el-col :span="20"><el-input v-model="form1.username" readonly @click.native="selectUser"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="数量" prop="count">
          <el-col :span="20"><el-input v-model="form1.count"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-col :span="20"><el-input type="textarea" v-model="form1.remark"></el-input>
          </el-col>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
    <el-button @click="inDialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="doinGoods">确 定</el-button>
  </span>
    </el-dialog>
  </div>
</template>

<style scoped>

</style>