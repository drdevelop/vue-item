<template>
    <div>
        <datagrid :config="config" ref="datagrid"></datagrid>
    </div>
</template>

<script>
    import datagrid from '../datagrid/datagrid.vue'
    import $ from 'jquery'

    export default {
        data(){
            return{
                config: {
                    name: 'supplier',
                    api: 'Vendor/GetPageList',
                    cols: 'code,name,phone,tel,address',
                    key: 'id',
                    pagination: true,
                    edit(router, item){
                        router.push({name: 'supplier', params: {'id': item.id}});
                    },
                    delete: (router, item) => {
                        this.$http.delete(`Vendor/Delete/${item.id}`).then((res) => {
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
                            text: '添加供应商',
                            event: () => {
                                this.$router.push({name: 'supplier', params: {id: '-1'}});
                            }
                        },
                        import: {
                            text: '导入供应商',
                            event: () => {
                                this.$jq.confirm({
                                    title: '',
                                    keyboardEnabled: true,
                                    content: '<input type="file" placeholder="typing a or b will close the modal"/>',
                                    confirmKeys: [65],
                                    cancelKeys: [66],
                                    confirm: () => {
                                        let fd = new FormData();
                                        let files = document.querySelector('[type=file]').files;
                                        fd.append("file", files[0]); 
                                        this.$http.upload('Common/Import?type=2', fd).then((res) => {
                                            if(res.code == 0 && res.data.insertCount + res.data.updateCount > 0){
                                                this.$jq.alert('导入成功');
                                                this.$refs.datagrid.refresh();
                                            }
                                        })
                                    }
                                });                                
                            }
                        }                    
                    },
                    search: {
                        cols: 'code,name',
                        unrequireds: 'code,name',
                        name: 'supplier'
                    }
                }
            }
        },
        components: {
            datagrid
        }
    }
</script>