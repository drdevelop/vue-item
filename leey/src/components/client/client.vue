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
                    api: `Customer/GetDetail/${this.$route.params.id}`,
                    name: 'client',
                    cols: 'name,abbreviation,area,industry,address,contacts,phone,tel,fax,email,legal,payment,goodsAddress,delivery,salesId,remark',
                    hideCols: 'id',
                    request: this.$route.params.id != '-1',
                    unrequireds: 'remark',
                    colAttributes: {
                        payment: {
                            type: 'list',
                            datasource: [{value: 1, text: '现金'}, {value: 2, text: '支票'}, {value: 3, text: '转账'}],
                            value: 'value',
                            text: 'text'
                        },
                        delivery: {
                            type: 'list',
                            datasource: [{value: 1, text: '快递'}, {value: 2, text: '物流'}, {value: 3, text: '同城'}],
                            value: 'value',
                            text: 'text'
                        },
                        salesId: {
                            type: 'list-ajax',
                            api: 'Position/GetUserList?name=销售',
                            value: 'id',
                            text: 'name'
                        }
                    },
                    key: 'id',
                    tools: {
                        add: {
                            text: '保存',
                            api: 'Customer/Save',
                            method: 'post',
                            success: () => {
                                this.$router.push({name: 'clients'})
                            }
                        },
                        back: {
                            text: '返回',
                            class: 'btn-goback',
                            event: () => {
                                this.$router.push({name: 'clients'})
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