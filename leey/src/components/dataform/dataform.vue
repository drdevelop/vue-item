<template>
    <div>
        <div class="dk-toolbar" style="background: #fff;" v-if="config.tools">
            <a href="javascript:" class="btn btn-primary btn-sm" v-for="(obj, key) in config.tools" :class="obj.class" @click="toolsEvent(obj)" :key="key">{{obj.text || key}}</a>
        </div>        
        <div class="dk-form">
            <form ref="clientForm" role="form" class="form-horizontal">
                <div class="form-group" v-for="(item, idx) in columns" :key="idx">
                    <div v-for="(col, index) in item" :key="index">
                        <div class="col-sm-1" style="padding: 10px;">
                            <span class="col-sm-12 control-label" style="padding: 0;">
                                {{unrequireds.includes(col) ? '' : '*'}}
                                {{config.name && $store.state.dic.cn.modules[config.name] && $store.state.dic.cn.modules[config.name][col] || $store.state.dic.cn.common[col] || col}}
                            </span>
                        </div>
                        <!-- 普通 text -->
                        <div class="col-sm-2" v-if="!config.colAttributes || !config.colAttributes[col]">
                            <input type="text" v-model="dataform[col]" :name="col" class="form-control" :class="{required: !unrequireds.includes(col)}">
                        </div>  
                         <!-- list -->
                        <div class="col-sm-2" v-if="config.colAttributes && config.colAttributes[col] && config.colAttributes[col].type == 'list'">
                            <select v-model="dataform[col]"  :name="col" class="form-control required">
                                <option :value="obj[config.colAttributes[col].value]" v-for="obj in config.colAttributes[col].datasource" :key="obj[config.colAttributes[col].value]">{{obj[config.colAttributes[col].text]}}</option>
                            </select>
                        </div> 
                         <!-- list-ajax -->
                        <div class="col-sm-2" v-if="config.colAttributes && config.colAttributes[col] && config.colAttributes[col].type == 'list-ajax'">
                            <select v-model="dataform[col]"  :name="col" class="form-control required" v-list-ajax="{col, attr: config.colAttributes[col]}">
                                <option :value="obj[config.colAttributes[col].value]" v-for="obj in ajaxDatasource[col]" :key="obj[config.colAttributes[col].value]">{{obj[config.colAttributes[col].text]}}</option>
                            </select>
                        </div>  
                         <!-- checkbox -->
                        <div class="col-sm-2" v-if="config.colAttributes && config.colAttributes[col] && config.colAttributes[col].type == 'checkbox'">
                            <div class="checkbox">
                                <label>
                                    <input type="checkbox" v-model="dataform[col]" @change="dataform[col] = dataform[col] ? 1 : 0;">
                                </label>
                            </div>                            
                        </div> 
                                                                                     
                    </div>
                    <div class="col-sm-1" v-if="search">
                        <a href="javascript:" class="btn btn-primary btn-sm" @click="$emit('searchEvent', dataform)">搜索</a>
                    </div>  
                </div>                 
            </form>
        </div>
    </div>
</template>

<script type="text/javascript">
    import router from '../../router'
    import http from '../../utils/HttpClient'
    import $ from 'jquery'

    export default {
        data(){
            return {
                columns: [],
                hideColumns: [],
                unrequireds: [],
                ajaxDatasource: {},
                dataform: {}
            }
        },
        props: ['config', 'search'],
        created(){
            let {colAttributes = {}, key = 'id'} = this.config;
            let cols = this.config.cols ? this.config.cols.split(',') : [];

            let temp_cols = [];
            for(let item of cols){
                if(colAttributes[item] && colAttributes[item].colspan){
                    temp_cols = [item];
                    this.columns.push(temp_cols);
                    temp_cols = [];
                }
                if(temp_cols.length < 3){
                    temp_cols.push(item);
                }
                if(temp_cols.length >= 3 || cols.indexOf(item) + 1 >= cols.length) {
                    this.columns.push(temp_cols)
                    temp_cols = [];
                }
                if(this.$route.params[key] == -1){
                    this.$set(this.dataform, item, '');
                }
            }
            this.hideColumns = this.config.hideCols ? this.config.hideCols.split(',') : [];
            this.unrequireds = this.config.unrequireds ? this.config.unrequireds.split(',') : [];

            let {api, method = 'get', request} = this.config;
            if(request){
                http[method](api).then((res) => {
                    if(res.code == 0){
                        this.dataform = res.data;
                    }
                })
            }            
        },
        methods: {
            toolsEvent(obj){
                let {api, method = 'get', success, event} = obj;
                if(event){
                    event()
                } else if(api){
                    if(!$(this.$refs.clientForm).valid()){
                        return false;
                    }
                    http[method](api, this.dataform).then((res) => {
                        if(res.code == 0){
                            $.alert('保存成功');
                            if(success){
                                success();
                            }
                        }
                    })
                }
            }
        },
        directives: {
            listAjax: function(element, binding, vnode){
                if(vnode.context.ajaxDatasource[binding.value.col]){
                    return false;
                }
                let {api, method = 'get'} = binding.value.attr;
                http[method](api).then((res) => {
                    vnode.context.$set(vnode.context.ajaxDatasource, binding.value.col, res.data)
                })
            }
        }
    }
</script>