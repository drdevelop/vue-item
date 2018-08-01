<template>
    <div>
        <dataform :config="config"></dataform>
    </div>
</template>

<script>
    import dataform from '../dataform/dataform.vue'

    export default {
        data(){
            return{
                config: {
                    api: `Code/GetCode?code=${this.$route.params.id}`,
                    cols: 'name,module,prefix,length,lastNo',
                    hideCols: 'id',
                    request: this.$route.params.id != '-1',
                    key: 'id',
                    tools: {
                        add: {
                            text: '保存',
                            api: 'User/Save',
                            method: 'post',
                            success: () => {
                                this.$router.push({name: 'users'})
                            }
                        },
                        back: {
                            text: '返回',
                            class: 'btn-goback',
                            event: () => {
                                this.$router.push({name: 'autocodes'})
                            }
                        }
                    }
                }
            }
        },
        components: {
            dataform
        }
    }
</script>