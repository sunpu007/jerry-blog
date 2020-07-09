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
          <div class="list-context">
            <p>{{item.Introduce}}</p>
          </div>
          <p class="list-go">
            <nuxt-link to="/detail/123" title="查看全文">查看全文<i class="el-icon-arrow-right" /></nuxt-link>
          </p>
        </li>
        <el-divider :key="item.Id" v-if="index!=list.length-1" />
      </template>
    </ul>
  </div>
</template>

<script>
export default {
  async asyncData({ app: { $axios } }) {
    const data = await $axios.get('http://127.0.0.1:7001/blog/article/list')
    return data.data.data
  }
}
</script>

<style lang="scss" scoped>
@import '~/assets/css/list.scss';
</style>
