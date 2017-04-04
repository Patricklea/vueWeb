<template>
  <div class="login-form">
    <div class="g-form">
      <div class="g-form-line">
        <span class="g-form-label">用户名：</span>
        <div class="g-form-input">
          <input v-model="usernameModel" type="text" placeholder="请输入用户名">
        </div>
        <span class="g-form-error">{{ userErrors.errorText }}</span>
      </div>
      <div class="g-form-line">
        <span class="g-form-label">密码：</span>
        <div class="g-form-input">
          <input v-model="passwordModel" type="password" placeholder="请输入密码">
        </div>
        <span class="g-form-error">{{ passwordErrors.errorText }}</span>
      </div>
      <div class="g-form-line">
        <div class="g-form-btn">
          <a class="button" @click="onLogin">登录</a>
        </div>
      </div>
      <p>{{logHint}}</p>
    </div>
  </div>
</template>

<script>
	export default {
		data() {
			return {
				usernameModel: '',
				passwordModel: '',
				logHint: ''
			}
		},
		computed: {
			userErrors() {
				let status,errorText
				if (!/@/g.test(this.usernameModel)) {
					status = false
					errorText = '未包含@符号'
				} else {	
					status = true;
					errorText = '';
				}
				// tips:通过声明一个flag来判断是否第一次进入，进入之后再更改其状态，解决一打开就报错的问题
				if (!this.userFlag) {
					errorText = '';
					this.userFlag = true;
				}
				return {
					// status: status,
					// errorText: 
					status,
					errorText
				}
			},
			passwordErrors() {
				let status,errorText
				if (!/^\w{1,6}$/g.test(this.passwordModel)) {
					status = false;
					errorText = '长度请在1-6位之间';
				} else {
					status = true;
					errorText = '';
				} 
				if (!this.passwordFlag) {
					errorText = '';
					this.passwordFlag = true;
				}
				return {
					status,
					errorText
				}
			}
		},
		methods: {
			onLogin() {
				// console.log(this.usernameModel+this.passwordModel);
				if (!this.userErrors.status || !this.passwordErrors.status) {
					this.logHint = '部分选项未通过';
				} else {
					this.logHint = '';
					this.$http.get('api/login').then((res) => {
						// 把成功请求到的data数据通过has-log事件传到父组件，父组件监听这个事件，然后执行相应的方法
						console.log(res);
						this.$emit('has-log',res.data);
						
					},(err) =>{
						console.log(err);
					});
				}
			}
		}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>