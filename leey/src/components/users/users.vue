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
                    name: 'user',
                    api: 'User/GetPageList',
                    cols: 'userNo,account,name,sexDesc,phone,idCard,positionDesc,statusDesc,erp',
                    key: 'id',
                    pagination: true,
                    edit(router, item){
                        router.push({name: 'user', params: {'id': item.id}});
                    },
                    delete: (router, item) => {
                        this.$http.delete(`User/Delete/${item.id}`).then((res) => {
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
                            text: '添加员工',
                            event: () => {
                                this.$router.push({name: 'user', params: {id: '-1'}});
                            }
                        }
                    },
                    search: {
                        cols: 'code,name',
                        unrequireds: 'code,name',
                        name: 'user'
                    }
                }
            }
        },
        components: {
            datagrid
        }
    }
</script>