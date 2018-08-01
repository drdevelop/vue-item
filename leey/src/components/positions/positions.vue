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
                config: {
                    name: 'position',
                    api: 'Position/GetPageList',
                    cols: 'name',
                    key: 'id',
                    edit(router, item){
                        router.push({name: 'position', params: {'id': item.id}});
                    },
                    delete: (router, item) => {
                        
                        this.$http.delete(`Position/Delete/${item.id}`).then((res) => {
                            if(res.code == 0){
                                this.$jq.alert('删除成功');
                                this.$refs.datagrid.refresh();
                            }
                        })
                    },
                    del: true,
                    method: 'post',
                    tools: {
                        add: {
                            text: '添加职位',
                            event: () => {
                                this.$router.push({name: 'position', params: {id: '-1'}});
                            }
                        }
                    }
                }
            }
        },
        components: {
            datagrid
        }
    }
</script>