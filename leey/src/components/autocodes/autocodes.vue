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
                    name: 'autocode',
                    api: 'Code/GetCodeConfig',
                    cols: 'name,module,prefix,length,lastNo',
                    key: 'module',
                    tools: {
                        add: {
                            text: '添加编码',
                            event: () => {
                                this.$router.push({name: 'autocode', params: {id: '-1'}});
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