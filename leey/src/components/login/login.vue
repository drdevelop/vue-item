<template>
	<div class="login-box">
		<div class="col-sm-12 b-r">
			<h3 class="m-t-none m-b">登录</h3>
			<form role="form">
			    <div class="form-group text-left">
			        <label>用户名：</label>
			        <input type="text" v-model="username" name="username" placeholder="请输入用户名" class="form-control required">
			    </div>
			    <div class="form-group  text-left">
			        <label>密码：</label>
			        <input type="password" v-model="pwd" name="password" placeholder="请输入密码" class="form-control required">
			    </div>
			    <div>
			    	<input type="button" class="btn btn-primary pull-right m-t-n-xs" value="登录" @click="login">
			    </div>
			</form>
		</div>
		<div class="copyright">© LEEY</div>
	</div>
</template>

<script type="text/javascript">
	import './Login.scss'
	import { mapGetters, mapActions } from 'vuex'
	import $ from 'jquery'
	import http from '../../utils/HttpClient'

	export default {
		data: function(){
			return {
				username: '',
				pwd: ''
			}
		},
		methods: {
			login: function(event){				
				if($('form').valid()){
					http.post('User/Login', {username: this.username, password: this.pwd}).then(response => {
						if(response.code == 0){
							this.$router.push({name: 'home'})
						}
					})
				}
			}
			// ...mapActions(['login'])
		}
	}
</script>