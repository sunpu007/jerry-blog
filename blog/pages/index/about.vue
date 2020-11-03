<template>
  <div class="pages">
    <el-divider content-position="left">about me</el-divider>
    <ul class="about-ul">
      <li>
        <span>姓名：</span>
        孙谱
      </li>
      <li>
        <span>专业：</span>
        计算机应用技术
      </li>
      <li>
        <span>坐标：</span>
        西安市
      </li>
      <li>
        <span>Github: </span>
        <a href="https://github.com/sunpu007" target="_blank"><svg-icon icon-class="link" /> https://github.com/sunpu007</a>
      </li>
      <li>
        <span>开源项目：</span>
        <!-- <ul>
          <li> -->
            <a href="https://www.npmjs.com/package/egg-google-auth" target="_blank"><svg-icon icon-class="link" /> egg-google-auth</a>
          <!-- </li>
        </ul> -->
      </li>
      <li>
        <span>技能点：</span>
      </li>
      <li>
        <span>其他：</span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
}
</script>

<style lang="scss" scoped>
@import '~/assets/css/about.scss';
</style>
