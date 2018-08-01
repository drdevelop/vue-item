<template>
	<div class="dk-container">
		<dk-header></dk-header>
		<div class="dk-body">
			<dk-nav></dk-nav>
			<div class="dk-content">
				<router-view class="dk-viewer"></router-view>
			</div>
		</div>
		<div class="dk-footer">@LEEY</div>
	</div>	
</template>

<script type="text/javascript">
	import './home.scss'
	import nav from './nav/nav.vue'
	import header from './header/header.vue'
	import http from '../../utils/HttpClient'

	export default {
		components: {
			'dk-nav': nav,
			'dk-header': header
		},
		data(){
			return {
				toolList: null
			}
		},
		methods: {
			addTool(arg){
				this.toolList = arg
			},
			click(arg){
				if(arg.event){
					arg.event()
				}
			}
		}
	}
</script>