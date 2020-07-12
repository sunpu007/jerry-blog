<template>
  <div class="app-container">
    <div class="filter-container">
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-plus" @click="handlEdit(null)">新建配置</el-button>
    </div>
    <el-table v-loading="listLoading" :data="list" border fit highlight-current-row style="width: 100%">
      <el-table-column align="center" prop="CfgName" label="配置名" />
      <el-table-column align="center" prop="CfgValue" label="配置值" />
      <el-table-column align="center" prop="Remark" label="备注" />
      <el-table-column align="center" prop="Ts" label="创建时间" />
      <el-table-column align="center" label="操作" />
    </el-table>
  </div>
</template>

<script>
import waves from '@/directive/waves'
export default {
  directives: { waves },
  data() {
    return {
      listLoading: false,
      list: []
    }
  },
  methods: {
    handlEdit() {}
  }
}
</script>
