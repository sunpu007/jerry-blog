<template>
  <div class="pages">
    <ul>
      <template v-for="(item, index) in list">
        <li :key="item.Id">
          <h4 class="list-title">
            <nuxt-link :to="`/detail/${item.Id}`" :title="item.Title">{{item.Title}}</nuxt-link>
          </h4>
          <div class="list-icon">
            <span>
              <i class="el-icon-date" />
              {{item.CreatedTime | dateTimeFilter('yyyy-MM-dd')}}
            </span>
            <span>
              <i class="el-icon-view" />
              {{item.ViewCount}}
            </span>
          </div>
          <div class="list-context" v-html="item.Summary" />
          <p class="list-go">
            <nuxt-link :to="`/detail/${item.Id}`" title="查看全文">查看全文<i class="el-icon-arrow-right" /></nuxt-link>
          </p>
        </li>
        <el-divider :key="item.Id" v-if="index!=list.length-1" />
      </template>
    </ul>
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
  tables: true,
  breaks: false,
  smartLists: true,
  smartypants: false,
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
