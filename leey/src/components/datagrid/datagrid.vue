<template>
    <div>
        <div class="dk-toolbar" style="background: #fff;" v-if="config.toolbar">
            <a href="javascript:" class="btn btn-primary btn-sm" v-for="(obj, key) in config.toolbar" :class="obj.class" @click="toolsEvent(obj)" :key="key">{{obj.text || key}}</a>
        </div>         
        <div class="dk-toolbar" style="background: #fff; padding: 0;" v-if="config.search">
            <dataform :config="config.search" search="true" @searchEvent="refresh"></dataform>
        </div>
        <div class="dk-toolbar dk-grid-toolbar" v-if="config.tools">
            <a href="javascript:" class="btn btn-primary btn-sm" v-for="(obj, key) in config.tools" @click="toolsEvent(obj)" :key="key">{{obj.text || key}}</a>
        </div>
        <div class="dk-datagrid-content">
            <table class="table dk-datagrid">
                <thead>
                    <tr>
                        <th class="row-first"></th>
                        <th v-if="config.multiple">
                            <input type="checkbox" :checked="selecteds.length > 0 && selecteds.length == (this.config.datasource || datasource ).length" @click="trEvent('*')">
                        </th>
                        <th class="row-controller" v-if="config.edit || config.del"></th>
                        <th v-for="(key, idx) in  columns[0] ? columns : (this.config.datasource || datasource )[0]" v-show="!hideColumns.includes(key)" :key="idx">
                            {{config.name && $store.state.dic.cn.modules[config.name] && $store.state.dic.cn.modules[config.name][key] || $store.state.dic.cn.common[key] || key}}
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item, index) in (this.config.datasource || datasource )" :key="config.key ? item[config.key] : index" @click="trEvent(item, $event)" :class="{'row-selected': selecteds.includes(item[config.key])}">
                        <td class="row-first">{{index + 1}}</td>
                        <td v-if="config.multiple">
                            <input type="checkbox" :checked="selecteds.includes(item[config.key])">
                        </td>                    
                        <td class="row-controller" v-if="config.edit || config.del">
                            <i class="fa fa-edit" v-if="config.edit"></i>
                            <i class="fa fa-times" v-if="config.del"></i>
                        </td>
                        <td v-for="(key, idx) in columns[0] ? columns : item" v-show="!hideColumns.includes(key)" :key="idx">{{item[key]}}</td>
                    </tr>
                </tbody>
            </table>
            <navigation v-if="config.pagination" :pages="pages" :current.sync="currpage" @navpage="pageList"></navigation>
        </div>
    </div>
</template>

<script type="text/javascript">
	import './datagrid.scss'
    import http from '../../utils/HttpClient'
    import dataform from '../dataform/dataform.vue'
    import $ from 'jquery'

	export default {
		name: 'datagrid',
        props: ['tools', 'toolbar', 'config'],
        components: {
            dataform
        },
		data(){
			return {
                datasource: [],
                columns: [],
                hideColumns: [],
                pages: 1, //总页数
                currpage: 1,
                selecteds: [],
                searchCondition: null
            }
        },
        mounted(){
            this.refresh();
        },
        methods: {
            toolsEvent: function(evt){
                if(evt && evt.event){
                    evt.event()
                }
            },
            refresh(_condition){
                this.searchCondition = _condition;
                if(this.config){
                    let {api, method = 'get', params, cols, hidecols, filtercols, datasource} = this.config;
                    this.columns = cols ? cols.split(',') : [];
                    this.hideColumns = hidecols ? hidecols.split(',') : [];

                    if(!params){
                        params = {pageSize: 10, page: this.currpage}
                    }
                    if(this.searchCondition){
                        params.condition = this.searchCondition;
                    }
                    if(api){
                        http[method](api, params).then(response => {
                            this.datasource = response.data.data || response.data;
                            this.currpage = response.data.page;
                            this.pages = Math.ceil(response.data.totalCount / response.data.pageSize);
                        })  
                    }              
                }
            },
            pageList:function(curPage) {
                //根据当前页获取数据
                this.currpage = curPage;
                this.refresh(this.searchCondition);
                // console.log("当前页：" + this.pageNo);
            },
            trEvent(item, event){
                //全选
                if(item == '*'){
                    if(this.selecteds.length == (this.config.datasource || this.datasource).length){
                        this.selecteds = [];
                    } else {
                        for(let d of (this.config.datasource || this.datasource)){
                            if(!this.selecteds.includes(d[this.config.key])){
                                this.selecteds.push(d[this.config.key]);
                            }
                        }
                    }
                    return false;
                }
                if($(event.target).is('.fa-edit')){
                    //编辑按钮
                    this.config.edit(this.$router, item);
                } else if($(event.target).is('.fa-times')){
                    //删除按钮
                    $.confirm({
                        title: '删除',
                        content: '确定要删除吗？',
                        confirm: () => {
                            this.config.delete(this.$router, item);
                        }
                    })
                }
                if(this.config.multiple){
                    //表格要支持多选
                    if(this.selecteds.includes(item[this.config.key])){
                        this.selecteds.splice(this.selecteds.indexOf(item[this.config.key]), 1);
                    } else {
                        this.selecteds.push(item[this.config.key]);
                    }
                } else {
                    //表格单选
                    this.selecteds = [item[this.config.key]];
                }
            }
        }
	}
</script>