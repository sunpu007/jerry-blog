<template>
  <div class="app-container">
    <el-form ref="postForm" :model="postForm" :rules="rules" class="form-container" label-position="top">
      <el-row>
        <el-col :span="24">
          <el-form-item prop="title">
            <MDinput v-model="postForm.Title" :maxlength="100" name="name" required>文章标题</MDinput>
          </el-form-item>
          <el-row :gutter="20">
            <el-col :span="6">
              <el-form-item label-width="80px" label="文章类别:" prop="TypeId">
                <el-select v-model="postForm.TypeId" placeholder="请选择" style="width: 100%;">
                  <el-option v-for="item in typeList" :key="item.Id" :label="item.TypeName" :value="item.Id">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item label-width="80px" label="文章类别:" prop="Tags">
                <el-select v-model="postForm.Tags" multiple filterable remote reserve-keyword allow-create default-first-option :remote-method="filterTag" placeholder="请选择" style="width: 100%;">
                  <el-option v-for="item in tags" :key="item.TagName" :label="item.TagName" :value="item.TagName">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-form-item label-width="80px" label="文章摘要:" prop="Summary">
            <markdown-editor v-model="postForm.Summary" height="200px" />
          </el-form-item>
          <el-form-item label-width="80px" label="文章内容:" prop="Content">
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
import { articleInfo, articleEdit, typeList, tagList } from '@/api/article'
import { debounce, equalsObj } from '@/utils'
export default {
  components: {
    MDinput,
    MarkdownEditor
  },
  data() {
    return {
      postForm: {},
      rules: {
        title: { required: true, message: '请输入文章标题', trigger: 'blur' },
        TypeId: { required: true, message: '请选择文章类别', trigger: 'blur' },
        Tags: { required: true, message: '请选择文章标签', trigger: 'blur' },
        Summary: { required: true, message: '请输入文章摘要', trigger: 'blur' },
        Content: { required: true, message: '请输入文章内容', trigger: 'blur' }
      },

      typeList: [],
      tagList: [],
      tags: []
    }
  },
  watch: {
    postForm: {
      handler(val, old) {
        this.autoSave(val, old)
      },
      deep: true
    }
  },
  created() {
    this.loadTypeList()
    this.loadTagList()
  },
  mounted() {
    if (this.$route.query.Id) this.loadInfo()
  },
  methods: {
    autoSave: debounce(async function(val, old) {
      if (!equalsObj(val, old)) {
        // const { code } = await articleEdit(this.postForm)
        // if (code === 0) {
        //   this.$message({
        //     message: '自动保存成功',
        //     type: 'success'
        //   })
        // }
      }
    }, 30000),
    async loadTypeList() {
      const { code, data } = await typeList()
      if (code === 0) {
        this.typeList = data.list
      }
    },
    async loadTagList() {
      const { code, data } = await tagList()
      if (code === 0) {
        this.tagList = data.list
        this.tags = data.list
      }
    },
    filterTag(query) {
      if (query != '') {
        this.tags = this.tagList.filter(item => {
          return item.TagName.toLowerCase().indexOf(query.toLowerCase()) > -1
        })
      } else {
        this.tags = []
      }
    },
    async loadInfo() {
      const { code, data } = await articleInfo(this.$route.query.Id)
      if (code === 0) {
        this.postForm = data.info
      }
    },
    async onSubmit() {
      this.$refs.postForm.validate(async valid => {
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
          // this.$router.back(-1)
        }
      })
    }
  }
}
</script>
