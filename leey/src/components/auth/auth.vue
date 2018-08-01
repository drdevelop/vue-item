<template>
    <div>
        <datagrid :config="config" ref="datagrid"></datagrid>
    </div>
</template>

<script>
    import datagrid from '../datagrid/datagrid.vue'

    export default {
        data(){
            return{
                ds: 0,
                config: {
                    name: 'auth',
                    datasource: null,
                    cols: 'name,',
                    key: 'id',
                    multiple: {
                        datasource: null
                    },
                    toolbar: {
                        add: {
                            text: '保存',
                            success: () => {
                                this.$router.push({name: 'users'})
                            },
                            event: () => {
                                this.$http.post('Module/SaveAuth', {userId: this.$route.params.id, modules: this.$refs.datagrid.selecteds}).then((res) => {
                                    if(res.code == 0){
                                        this.$router.push({name: 'auths'})
                                    }
                                })
                            }
                        },
                        back: {
                            text: '返回',
                            class: 'btn-goback',
                            event: () => {
                                this.$router.push({name: 'auths'})
                            }
                        }
                    }
                }
            }
        },    
        mounted(){
            this.$http.get('Module/GetAllMenuList').then((response) => {
                let ds = [];
                for(let item of response.data){
                    if(!item.children[0]){
                        ds.push(item)
                    } else {
                        ds.push(item);
                        for(let obj of item.children){
                            ds.push(obj)
                        }
                    }
                }
                this.config.datasource = ds;
            })              
            this.$http.get('Module/GetAuthList', {userId: this.$route.params.id}).then((response) => {
                for(let item of response.data){
                    this.$refs.datagrid.selecteds.push(item.id)
                }
            })        
        },    
        components: {
            datagrid
        }
    }
</script>
