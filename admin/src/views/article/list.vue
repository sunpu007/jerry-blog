<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input placeholder="用户ID" clearable class="filter-item" style="width: 130px" />
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-plus" @click="handlEdit(null)">新增文章</el-button>
    </div>
    <el-table v-loading="listLoading" :data="list" border fit highlight-current-row style="width: 100%">
      <el-table-column align="center" prop="Id" label="ID" width="50px" />
      <el-table-column prop="Title" label="标题" />
      <el-table-column prop="Summary" show-overflow-tooltip label="摘要" />
      <el-table-column align="center" prop="ViewCount" label="浏览量" width="80px" />
      <el-table-column align="center" prop="Status" label="状态" width="80px">
        <template slot-scope="{row}">
          {{ row.Status | statusFilter }}
        </template>
      </el-table-column>
      <el-table-column align="center" prop="CreatedTime" label="创建时间" width="140px">
        <template slot-scope="{row}">
          {{ row.CreatedTime | dateTimeFilter('yyyy-MM-dd hh:mm:ss') }}
        </template>
      </el-table-column>
      <el-table-column align="center" prop="UpdatedTime" label="修改时间" width="140px">
        <template slot-scope="{row}">
          {{ row.UpdatedTime | dateTimeFilter('yyyy-MM-dd hh:mm:ss') }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作" width="140px">
        <template slot-scope="{row}">
          <el-button type="text" @click="handlEdit(row.Id)">编辑</el-button>
          <el-button v-if="row.Status == 0" type="text" @click="updateStatus(row.Id, 1)">下架</el-button>
          <el-button v-if="row.Status == 1" type="text" @click="updateStatus(row.Id, 0)">发布</el-button>
          <el-button v-if="row.Status != -1" type="text" @click="updateStatus(row.Id, -1)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.size" @pagination="getList" />
  </div>
</template>

<script>
import Pagination from '@/components/Pagination'
import waves from '@/directive/waves'
import { articleList, articleStatus } from '@/api/article'
export default {
  components: { Pagination },
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
    handlEdit(Id) {
      if (Id) {
        this.$router.push({ path: '/article/edit', query: { Id }})
      } else {
        this.$router.push({ path: '/article/edit' })
      }
    },
    async updateStatus(Id, Status) {
      const { code } = await articleStatus({ Id, Status })
      if (code === 0) {
        const message = Status === -1 ? '删除成功' : Status === 0 ? '发布成功' : '下架成功'
        this.$message({
          message,
          type: 'success'
        })
        this.getList()
      }
    }
  }
}
</script>
