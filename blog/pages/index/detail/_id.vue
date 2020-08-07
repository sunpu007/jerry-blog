<template>
  <div class="pages">
    <el-row>
      <el-col :xs="24" :sm="24" :md="22" :lg="20" :xl="17">
        <h4 class="title">{{info.Title}}</h4>
        <p class="icon">
          <span>
            <i class="el-icon-date" />
            {{info.CreatedTime | dateTimeFilter('yyyy-MM-dd')}}
          </span>
          <span>
            <i class="el-icon-view" />
            {{info.ViewCount}}
          </span>
          <!-- <span>
            <i class="el-icon-star-off" />
            1125
          </span> -->
        </p>
        <div class="context" v-html="summary"></div>
        <div class="context" v-html="content"></div>
      </el-col>
    </el-row>
    <el-backtop target=".pages" />
  </div>
</template>

<script>
import marked from 'marked'
import hljs from "highlight.js";
import 'highlight.js/styles/monokai-sublime.css';
const rendererMD = new marked.Renderer()
marked.setOptions({
  renderer: rendererMD,
  gfm: true,
  pedantic: false,
  sanitize: false,
  tables: true,
  breaks: true,
  smartLists: true,
  smartypants: false,
  highlight(code) {
    return hljs.highlightAuto(code).value;
  }
})
export default {
  async asyncData({ params, app: { $axios } }) {
    const data = await $axios.get(`/article/info/${params.id}`)
    return data.data.data
  },
  data() {
    return {}
  },
  computed: {
    summary() {
      return marked(this.info.Summary)
    },
    content() {
      return marked(this.info.Content)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~/assets/css/detail.scss';
</style>
