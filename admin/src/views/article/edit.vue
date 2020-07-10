<template>
  <div class="app-container">
    <el-form ref="postForm" :model="postForm" :rules="rules" class="form-container" label-position="top">
      <el-row>
        <el-col :span="24">
          <el-form-item style="margin-bottom: 40px;" prop="title">
            <MDinput v-model="postForm.Title" :maxlength="100" name="name" required>
              Title
            </MDinput>
          </el-form-item>
          <el-form-item style="margin-bottom: 40px;" label-width="80px" label="Summary:" prop="Summary">
            <markdown-editor v-model="postForm.Summary" height="300px" />
          </el-form-item>
          <el-form-item style="margin-bottom: 40px;" label-width="80px" label="Content:" prop="Content">
            <markdown-editor v-model="postForm.Content" height="500px" :options="{hideModeSwitch:true,previewStyle:'tab'}" />
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script>
import MDinput from '@/components/MDinput'
import MarkdownEditor from '@/components/MarkdownEditor'
import { articleInfo } from '@/api/article'
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
        Content: { required: true, message: 'Please enter a title', trigger: 'blur' },
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
    }
  }
}
</script>
