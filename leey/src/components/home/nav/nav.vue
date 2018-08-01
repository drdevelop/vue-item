<template>
	<div :class="['dk-nav-content', navOpen ? '' : 'toggle']" ref="dknav">
		<ul class="dk-nav"  @click="toggleNav">
			<li class="dk-nav-item nav-toggle">
				<a class="btn btn-primary" href="javascript:">
					<i class="fa fa-bars"></i> 
				</a>
			</li>
			<li class="dk-nav-item" :class="{'dk-parent-nav': obj.children.length > 0}" v-for="obj in menus" :key="obj.id">
				<!-- 无子菜单 -->
				<router-link :to="obj.path" v-if="obj.children.length < 1">
					<i :class="['fa', 'fa-' + obj.icon]"></i>
					<span>{{obj.name}}</span>
				</router-link>
				<!-- 有子菜单 -->
				<a href="javascript:"  v-if="obj.children.length > 0">
					<i :class="['fa', 'fa-' + obj.icon]"></i>
					<span>{{obj.name}}</span>
					<i class="fa fa-angle-left"></i>					
				</a>
				<!-- 子菜单 -->
				<ul class="dk-sub-nav" v-if="obj.children.length > 0">
					<li v-for="subobj in obj.children" :key="subobj.id">
						<router-link :to="subobj.path">{{subobj.name}}</router-link>
					</li>
				</ul>
			</li>
			<!-- 退出登录 -->
			<li class="dk-nav-item logout">
				<a href="javascript:">
					<i class="fa fa-sign-out"></i>
					<span>退出系统</span>
				</a>
			</li>					
		</ul>
	</div>	
</template>

<script type="text/javascript">
	import './nav.scss'
	import $ from 'jquery'
	import http from '../../../utils/HttpClient'

	export default {
		data(){
			return {
				navOpen: true,
				menus: []
			}
		},
		methods:{
			toggleNav(event){
				let self = $(event.target);
				//展开导航
				if(self.is('.btn-primary') || self.is('.fa-bars')){
					this.navOpen = !this.navOpen;
					$('.dk-nav-item').removeClass('active');
					$('.dk-content').css({left: this.navOpen ? '229px' : '50px'});
				} else if(self.is('.dk-nav-item') || self.closest('.dk-nav-item')[0]){
					//展开子菜单
					if(!this.navOpen){
						this.navOpen = true;
					}
					$('.dk-content').css({left: this.navOpen ? '229px' : '50px'});

					self = self.is('.dk-parent-nav') ? self : self.closest('.dk-parent-nav');
					if(self[0]){
						$('.dk-parent-nav').removeClass('active');
						self.addClass('active')
					} else {
						$('.dk-parent-nav').removeClass('active');
					}
					//退出登录
					if($(event.target).is('.logout') || $(event.target).closest('.logout')[0]){
						window.localStorage.removeItem('access_token');
						window.localStorage.removeItem('access_name');
						this.$router.push({name: 'login'});
					}			
				}
			}
		},
		mounted(){
			http.get('Module/GetRoleMenuList').then((res) => {
				if(res.code == 0){
					this.menus = res.data;
				}
			})
		}
	}
</script>