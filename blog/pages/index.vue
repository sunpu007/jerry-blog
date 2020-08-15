<template>
  <el-row class="container">
    <el-col :xs="0" :sm="7" :md="6" :lg="5" :xl="4" class="left">
      <div class="avatar">
        <el-image :src="initData.Avatar" fit="cover" lazy>
          <!-- <i slot="placeholder" class="el-icon-loading" /> -->
        </el-image>
      </div>
      <h4 class="name">Jerry-全栈工程师</h4>
      <el-input placeholder="请输入搜索内容" size="mini" />
      <ul>
        <li title="首页">
          <nuxt-link to="/"><svg-icon icon-class="home" />首页</nuxt-link>
        </li>
        <!-- <li title="标签">
          <nuxt-link to="/tags"><svg-icon icon-class="tags" />标签</nuxt-link>
        </li> -->
        <li title="个人简介">
          <a :href="initData.resume" target="_blank"><svg-icon icon-class="link" />个人简介</a>
        </li>
      </ul>
      <div class="social-account">
        <el-divider>社交账号</el-divider>
        <el-tooltip class="item" :content="`GitHub: https://github.com/${initData.GitHub}`" placement="top">
          <el-avatar size="small">
            <a :href="`https://github.com/${initData.GitHub}`" target="_blank"><svg-icon icon-class="GitHub" /></a>
          </el-avatar>
        </el-tooltip>
        <el-tooltip class="item" :content="`QQ: ${initData.QQ}`" placement="top">
          <el-avatar size="small">
            <a :href="`tencent://message/?uin=${initData.QQ}&Site=Sambow&Menu=yes`"><svg-icon icon-class="QQ" /></a>
          </el-avatar>
        </el-tooltip>
        <el-tooltip class="item" content="WeChat: s731238433" placement="top">
          <div slot="content">
            <img :src="initData.WeChat" width="150px" height="150px" alt="">
          </div>
          <el-avatar size="small">
            <svg-icon icon-class="wechat" />
          </el-avatar>
        </el-tooltip>
      </div>
      <div class="left-footer">
        <p class="view-count" title="访问量"><i class="el-icon-view" /> {{initData.SystemVisits}}+</p>
        <p>系统由 Vue+Node+Element UI驱动</p>
        <p class="icp"><a href="http://www.beian.miit.gov.cn" target="_blank">{{initData.ICP}}</a></p>
      </div>
    </el-col>
    <el-col :xs="24" :sm="17" :md="18" :lg="19" :xl="20" class="right" id="main">
      <!-- <el-row>
        <el-col :xs="24" :sm="24" :md="22" :lg="20" :xl="17"> -->
          <nuxt-child />
        <!-- </el-col>
      </el-row> -->
    </el-col>
  </el-row>
</template>

<script>
export default {
  async asyncData({ app: { $axios } }) {
    const data = await $axios.get('/init')
    return { initData: data.data.data.initData }
  }
}
</script>

<style lang="scss" scoped>
@import '~/assets/css/index.scss';
</style>
