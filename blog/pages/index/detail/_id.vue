<template>
  <div class="pages">
    <h4 class="title">React Router 免费文字视频教程（共9集）</h4>
    <p class="icon">
      <span>
        <i class="el-icon-date" />
        2020-04-16
      </span>
      <span>
        <i class="el-icon-view" />
        17834
      </span>
      <!-- <span>
        <i class="el-icon-star-off" />
        1125
      </span> -->
    </p>
    <div class="context" v-html="compiledMarkdown"></div>
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
  breaks: false,
  smartLists: true,
  smartypants: false,
  highlight(code) {
    return hljs.highlightAuto(code).value;
  }
})
export default {
  data() {
    return {}
  },
  computed: {
    compiledMarkdown() {
      return marked('# Marked in browser\n\nRendered by **marked**.\n```bash\nwerwer\n```', { sanitize: true })
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~/assets/css/detail.scss';
</style>
