<template>
  <div class="app-container">
    <el-form ref="postForm" :model="postForm" :rules="rules" class="form-container" label-position="top">
      <el-row>
        <el-col :span="24">
          <el-form-item prop="title">
            <MDinput v-model="postForm.Title" :maxlength="100" name="name" required>
              Title
            </MDinput>
          </el-form-item>
          <el-form-item label-width="80px" label="Summary:" prop="Summary">
            <markdown-editor v-model="postForm.Summary" height="200px" />
          </el-form-item>
          <el-form-item label-width="80px" label="Content:" prop="Content">
            <markdown-editor v-model="postForm.Content" height="400px" />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">保存</el-button>
            <el-button @click="$router.back(-1)">取消</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script>
import MDinput from '@/components/MDinput'
import MarkdownEditor from '@/components/MarkdownEditor'
import { articleInfo, articleEdit } from '@/api/article'
export default {
  components: {
    MDinput,
    MarkdownEditor
  },
  data() {
    return {
      postForm: {},
      rules: {
        title: { required: true, message: 'Please enter a title', trigger: 'blur' },
        Summary: { required: true, message: 'Please enter a title', trigger: 'blur' },
        Content: { required: true, message: 'Please enter a title', trigger: 'blur' }
      }
    }
  },
  mounted() {
    if (this.$route.query.Id) this.loadInfo()
  },
  methods: {
    async loadInfo() {
      const { code, data } = await articleInfo(this.$route.query.Id)
      if (code === 0) {
        this.postForm = data.info
      }
    },
    async onSubmit() {
      const loading = this.$loading({
        lock: true,
        text: 'Loading',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      })
      const { code } = await articleEdit(this.postForm)
      loading.close()
      if (code === 0) {
        this.$message({
          message: '保存成功',
          type: 'success'
        })
        this.$router.back(-1)
      }
    }
  }
}
</script>
