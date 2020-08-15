<template>
  <div class="pages">
    <el-row>
      <el-col :xs="24" :sm="24" :md="22" :lg="20" :xl="17">
        <ul>
          <template v-for="item in list">
            <el-card shadow="hover" :key="item.Id" style="margin-bottom: 20px;">
              <li>
                <h4 class="list-title">
                  <nuxt-link :to="`/detail/${item.Id}`" :title="item.Title">{{item.Title}}</nuxt-link>
                </h4>
                <div class="list-icon">
                  <span class="list-icon-date">
                    <i class="el-icon-date" />
                    {{item.CreatedTime | dateTimeFilter('yyyy-MM-dd')}}
                  </span>
                  <!-- <i>|</i> -->
                  <span>
                    <i class="el-icon-view" />
                    {{item.ViewCount}}
                  </span>
                  <!-- <i>|</i>
                  <span>开发</span>
                  <i>|</i>
                  <span>web</span>
                  <span>Vue</span>
                  <span>Javascript</span> -->
                </div>
                <div class="list-context" v-html="item.Summary" />
                <p class="list-go">
                  <nuxt-link :to="`/detail/${item.Id}`" title="查看全文">查看全文<i class="el-icon-arrow-right" /></nuxt-link>
                </p>
              </li>
            </el-card>
            <!-- <el-divider :key="item.Id" v-if="index!=list.length-1" /> -->
          </template>
        </ul>
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
  sanitize:false,
  xhtml: false,
  highlight(code) {
    return hljs.highlightAuto(code).value;
  }
})
export default {
  async asyncData({ app: { $axios } }) {
    const data = await $axios.get('/article/list')
    const list = data.data.data.list;
    list.forEach(item => {
      item.Summary = marked(item.Summary)
    });
    return { list }
  }
}
</script>

<style lang="scss" scoped>
@import '~/assets/css/list.scss';
</style>
