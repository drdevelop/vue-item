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
                    api: `User/GetDetail/${this.$route.params.id}`,
                    cols: 'account,password,name,sex,phone,idCard,address,positionId,status,erp',
                    hideCols: 'id',
                    request: this.$route.params.id != '-1',
                    colAttributes: {
                        sex: {
                            type: 'list',
                            datasource: [{value: 1, text: '男'}, {value: 0, text: '女'}],
                            value: 'value',
                            text: 'text'
                        },
                        status: {
                            type: 'list',
                            datasource: [{value: 1, text: '在职'}, {value: 0, text: '离职'}],
                            value: 'value',
                            text: 'text'
                        },
                        erp: {
                            type: 'checkbox'
                        },
                        positionId: {
                            type: 'list-ajax',
                            api: 'Position/GetList',
                            value: 'id',
                            text: 'name'
                        }
                    },
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
                                this.$router.push({name: 'users'})
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