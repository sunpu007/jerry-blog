<template>
  <div class="login-container">
    <el-form ref="form" :model="form" class="login-form" label-width="80px">
      <el-form-item>
        <el-input />
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {}
    }
  }
}
</script>

<style lang="scss" scoped>
/* 登录页 */
.login-container {
  width: 100%;
  height: 100%;
  background: #2d3a4b;
  overflow: hidden;
  .login-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 160px 35px 0;
    margin: 0 auto;
    overflow: hidden;
    
    .el-input {
      display: inline-block;
      height: 47px;
      width: 85%;

      input {
        background: transparent;
        border: 0px;
        -webkit-appearance: none;
        border-radius: 0px;
        padding: 12px 5px 12px 15px;
        color: #fff;
        height: 47px;
        caret-color: #fff;

        &:-webkit-autofill {
          box-shadow: 0 0 0px 1000px #283443 inset !important;
          -webkit-text-fill-color: #fff !important;
        }
      }
    }

    .el-form-item {
      border: 1px solid rgba(255, 255, 255, 0.1);
      background: rgba(0, 0, 0, 0.1);
      border-radius: 5px;
      color: #454545;
    }

  }
}
</style>
