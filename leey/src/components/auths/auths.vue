<template>
    <div>
        <datagrid :config="config"></datagrid>
    </div>
</template>

<script>
    import datagrid from '../datagrid/datagrid.vue'

    export default {
        data(){
            return{
                config: {
                    api: 'User/GetPageList',
                    cols: 'userNo,account,name,sexDesc,phone,idCard,positionDesc,statusDesc,erp',
                    key: 'id',
                    pagination: true,
                    edit(router, item){
                        router.push({name: 'auth', params: {'id': item.id}});
                    },
                    method: 'post'
                }
            }
        },
        components: {
            datagrid
        }
    }
</script>