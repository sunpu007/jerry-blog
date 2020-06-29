<template>
  <div class="app-container">
    <div class="filter-container">
    <el-input placeholder="用户ID" clearable class="filter-item" style="width: 130px" />
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-plus">新增文章</el-button>
    </div>
    <el-table v-loading="listLoading" :data="list" border fit highlight-current-row style="width: 100%">
      <el-table-column align="center" prop="Id" label="ID" width="50px" />
      <el-table-column align="center" prop="Title" label="标题" />
      <el-table-column align="center" prop="Introduce" show-overflow-tooltip label="简介" />
      <!-- <el-table-column align="center" prop="Content" label="内容" /> -->
      <el-table-column align="center" prop="ViewCount" label="浏览量" width="80px" />
      <el-table-column align="center" prop="Status" label="状态" width="80px">
        <template slot-scope="{row}">
          {{row.Status | statusFilter}}
        </template>
      </el-table-column>
      <el-table-column align="center" prop="CreatedTime" label="创建时间" width="140px">
        <template slot-scope="{row}">
          {{row.CreatedTime | dateTimeFilter('yyyy-MM-dd hh:mm:ss')}}
        </template>
      </el-table-column>
      <el-table-column align="center" prop="UpdatedTime" label="修改时间" width="140px">
        <template slot-scope="{row}">
          {{row.UpdatedTime | dateTimeFilter('yyyy-MM-dd hh:mm:ss')}}
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作" width="80px">
        <el-button type="text">编辑</el-button>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import waves from '@/directive/waves'
import { articleList } from '@/api/article'
export default {
  directives: { waves },
  filters: {
    statusFilter(val) {
      switch (val) {
        case -1:
          return '删除'
        case 0:
          return '正常'
        case 1:
          return '发布'
      }
    }
  },
  data() {
    return {
      listLoading: false,
      list: [],
      total: 0,
      listQuery: {
        page: 1,
        size: 20
      }
    }
  },
  mounted() {
    this.getList()
  },
  methods: {
    async getList() {
      this.listLoading = true
      const { code, data } = await articleList(this.listQuery)
      this.listLoading = false
      if (code === 0) {
        this.list = data.list
        this.total = data.total
      }
    },
    handlEdit(id) {

    }
  }
}
</script>
