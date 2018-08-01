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
                    api: `Vendor/GetDetail/${this.$route.params.id}`,
                    cols: 'name,phone,tel,address,remark',
                    hideCols: 'id',
                    unrequireds: 'remark',
                    request: this.$route.params.id != '-1',
                    key: 'id',
                    tools: {
                        add: {
                            text: '保存',
                            api: 'Vendor/Save',
                            method: 'post',
                            success: () => {
                                this.$router.push({name: 'suppliers'})
                            }
                        },
                        back: {
                            text: '返回',
                            class: 'btn-goback',
                            event: () => {
                                this.$router.push({name: 'suppliers'})
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