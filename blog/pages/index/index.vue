<template>
  <div class="pages">
    <ul>
      <template v-for="(item, index) in 10">
        <li :key="item">
          <h4 class="list-title">
            <nuxt-link to="/detail/123" title="React Router 免费文字视频教程（共9集）">React Router 免费文字视频教程（共9集）</nuxt-link>
          </h4>
          <div class="list-icon">
            <span>
              <i class="el-icon-date" />
              2020-04-16
            </span>
            <span>
              <i class="el-icon-view" />
              17834
            </span>
          </div>
          <div class="list-context">
            <p>2019年React Hooks是React生态圈里边最火的新特性了。它改变了原始的React类的开发方式，改用了函数形式;它改变了复杂的状态操作形式，让程序员用起来更轻松;它改变了一个状态组件的复用性，让组件的复用性大大增加。如果你是React的粉丝者或者正在使用React开发项目，你可以用1个小时时间看一下这篇文章（视频），你一定会有所收获，并在工作种能熟练的使用React Hooks。目前的大部分Hooks知识点，文章都涉及到。我想想你学完并使用Hooks后，会颠覆你现在的React开发方式，并爱上它。</p>
          </div>
          <p class="list-go">
            <nuxt-link to="/detail/123" title="查看全文">查看全文<i class="el-icon-arrow-right" /></nuxt-link>
          </p>
        </li>
        <el-divider :key="item" v-if="index!=9" />
      </template>
    </ul>
  </div>
</template>

<script>
export default {
  async asyncData({ params }) {
    console.log(11111);
    return { title: 'test' }
  },
  mounted() {
    console.log(2222222);
  }
}
</script>

<style lang="scss" scoped>
@import '~/assets/css/list.scss';
</style>
