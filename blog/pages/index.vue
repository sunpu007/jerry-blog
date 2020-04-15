<template>
  <el-row class="container">
    <el-col :xs="0" :sm="7" :md="6" :lg="5" :xl="4" class="left">
      <div class="avatar">
        <el-image src="http://img.books.myjerry.cn/blog/blog-avatar.jpg?e=1586963898&token=Ri2kmIh6VvWWJGiShCgGogDeMax9auovBxSCAGsY:w8M6PSTDS6Zik-FV35c1FswOyjM="
          fit="cover"  lazy />
      </div>
      <h4 class="name">Jerry-全栈工程师</h4>
      <ul>
        <li v-for="item in 4" :key="item" :title="`标题${item}`">标题{{ item }}</li>
      </ul>
      <p class="view-count" title="访问量">
        <i class="el-icon-view" /> 1000+
      </p>
    </el-col>
    <el-col :xs="24" :sm="17" :md="18" :lg="19" :xl="20" class="right">
      <el-row>
        <el-col :xs="24" :sm="24" :md="18" :lg="17" :xl="18">
          <nuxt-child />
          <p class="icp"><a href="http://www.beian.miit.gov.cn">陕ICP备17007879号</a></p>
        </el-col>
      </el-row>
    </el-col>
  </el-row>
</template>

<script>
export default {
}
</script>

<style lang="scss" scoped>
@import '~/assets/css/index.scss';
</style>
