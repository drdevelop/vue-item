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
                    api: `Position/GetDetail/${this.$route.params.id}`,
                    cols: 'name',
                    hideCols: 'id',
                    request: this.$route.params.id != '-1',
                    key: 'id',
                    tools: {
                        add: {
                            text: '保存',
                            api: 'Position/Save',
                            method: 'post',
                            success: () => {
                                this.$router.push({name: 'positions'})
                            }
                        },
                        back: {
                            text: '返回',
                            class: 'btn-goback',
                            event: () => {
                                this.$router.push({name: 'positions'})
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