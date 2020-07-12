<template>
  <div class="app-container">
    <div class="filter-container">
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-plus" @click="handlEdit(null)">新建配置</el-button>
    </div>
    <el-table v-loading="listLoading" :data="list" border fit highlight-current-row style="width: 100%">
      <el-table-column align="center" prop="CfgName" label="配置名" />
      <el-table-column align="center" prop="CfgValue" label="配置值" />
      <el-table-column align="center" prop="Remark" label="备注" />
      <el-table-column align="center" prop="Ts" label="创建时间">
        <template slot-scope="{row}">
          {{ row.Ts | dateTimeFilter('yyyy-MM-dd hh:mm:ss') }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作" width="80px">
        <template slot-scope="{row}">
          <el-button type="text" @click="handlEdit(row)">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog :visible.sync="dialogVisible" :title="dialogType==='edit'?'编辑版本':'新增版本'" width="500px">
      <el-form ref="editForm" :rules="rules" :model="sysConfig" label-width="80px" label-position="right">
        <el-form-item label="配置名" prop="cfgName">
          <el-input v-model="sysConfig.cfgName" placeholder="请输入配置名" />
        </el-form-item>
        <el-form-item label="配置值" prop="cfgValue">
          <el-input v-model="sysConfig.cfgValue" placeholder="请输入配置值" />
        </el-form-item>
        <el-form-item label="备注">
          <el-input v-model="sysConfig.remark" type="textarea" placeholder="请输入备注" />
        </el-form-item>
      </el-form>
      <div style="text-align:right;">
        <el-button type="danger" @click="dialogVisible=false">取消</el-button>
        <el-button type="primary" @click="confirm">提交</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import waves from '@/directive/waves'
import { configList } from '@/api/config'
export default {
  directives: { waves },
  data() {
    return {
      listLoading: false,
      list: [],

      dialogVisible: false,
      dialogType: 'new',
      sysConfig: {},
      rules: {
        cfgName: { required: true, message: '请输入配置名', trigger: 'blur' },
        cfgValue: { required: true, message: '请输入配置值', trigger: 'blur' }
      }
    }
  },
  mounted() {
    this.getList()
  },
  methods: {
    async getList() {
      this.listLoading = true
      const { code, data } = await configList()
      this.listLoading = false
      if (code === 0) {
        this.list = data.list
      }
    },
    handlEdit(row) {
      this.sysConfig = {}
      if (row) {
        this.sysConfig = JSON.parse(JSON.stringify(row))
        this.dialogType = 'edit'
      } else {
        this.dialogType = 'new'
      }
      this.dialogVisible = true
    },
    confirm() {}
  }
}
</script>
