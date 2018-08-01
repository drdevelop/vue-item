//http://visionmedia.github.io/superagent/
import request from 'superagent'
import router from '../router/index'
import $ from 'jquery'

// import jsonp from 'superagent-jsonp';

const LOCAL_SERVER = 'http://localhost:81/cloudapi/';

const DEV_SERVER = 'http://api-lybz.jcebing.com:8089/api/';
const PRO_SERVER = 'http://www.dk-lan.com/cloudapi/';

const requestResultCode = {
    '0': '请求成功',
    '1': '找不到指定数据',
    '-1': '系统错误',
    '4001': '登录超时'

}

function getUrl(path) {
    if (path.startsWith('http')) {
        return path;
    }
    return `${DEV_SERVER}${path}`;
}

const errorHandler = (data) => {
    if(data.code == 40001){
        router.push({name: 'login'});
        return false;
    }    
    $.alert(data.message, '请求错误');
}

const HttpClient = {
    get: (path, query) => new Promise((resolve, reject) => {
        if(!window.localStorage.getItem('access_token')){
            router.push({name: 'login'});
            return false;
        }
        $('.dk-spinner.dk-spinner-three-bounce, dk-spinner-mask').parent('div').show()
        var req = request
            .get(getUrl(path))
            .query(query)
            .set('Authorization',  window.localStorage.getItem('access_token'))
            .end((err, res) => {
                $('.dk-spinner.dk-spinner-three-bounce, dk-spinner-mask').parent('div').hide()
                if(res.body.code == 0){
                    resolve(res.body);
                } else {
                    errorHandler(res.body)
                    reject(res.body);
                }
            });
    }),

    post: (path, formdata, query) => new Promise((resolve, reject) => {
        if(path.toLowerCase().indexOf('login') < 0 && !window.localStorage.getItem('access_token')){
            router.push({name: 'login'});
            return false;            
        }        
        $('.dk-spinner.dk-spinner-three-bounce, dk-spinner-mask').parent('div').show()
        request
            .post(getUrl(path))
            .set('Content-Type', 'application/json; charset=UTF-8')
            .set('Authorization',  window.localStorage.getItem('access_token'))
            .query(query)
            .send(formdata)
            .end((err, res) => {
                $('.dk-spinner.dk-spinner-three-bounce, dk-spinner-mask').parent('div').hide()
                if(res.body.code == 0){
                    if(path.toLowerCase().indexOf('login') > -1){
                        window.localStorage.setItem('access_token',  'Bearer ' + res.body.data.result.access_token)
                        window.localStorage.setItem('access_name',  res.body.data.userName)
                    }
                    resolve(res.body);
                } else {
                    errorHandler(res.body)
                    reject(res.body);
                }                    
            });
    }),

    upload: (path, formdata, query) => new Promise((resolve, reject) => {
        if(path.toLowerCase().indexOf('login') < 0 && !window.localStorage.getItem('access_token')){
            router.push({name: 'login'});
            return false;            
        }        
        $('.dk-spinner.dk-spinner-three-bounce, dk-spinner-mask').parent('div').show()
        request
            .post(getUrl(path))
            .set({
                'Accept': 'application/json',
                'Authorization': window.localStorage.getItem('access_token')
            })
            .query(query)
            .send(formdata)
            .end((err, res) => {
                $('.dk-spinner.dk-spinner-three-bounce, dk-spinner-mask').parent('div').hide()
                if(res.body.code == 0){
                    if(path.toLowerCase().indexOf('login') > -1){
                        window.localStorage.setItem('access_token',  'Bearer ' + res.body.data.result.access_token)
                        window.localStorage.setItem('access_name',  res.body.data.userName)
                    }
                    resolve(res.body);
                } else {
                    errorHandler(res.body)
                    reject(res.body);
                }                    
            });
    }),

    delete: (path, formdata, query) => new Promise((resolve, reject) => {
        if(path.toLowerCase().indexOf('login') < 0 && !window.localStorage.getItem('access_token')){
            router.push({name: 'login'});
            return false;            
        }        
        $('.dk-spinner.dk-spinner-three-bounce, dk-spinner-mask').parent('div').show()
        request
            .delete(getUrl(path))
            .set('Content-Type', 'application/json; charset=UTF-8')
            .set('Authorization',  window.localStorage.getItem('access_token'))
            .query(query)
            .send(formdata)
            .end((err, res) => {
                $('.dk-spinner.dk-spinner-three-bounce, dk-spinner-mask').parent('div').hide()
                if(res.body.code == 0){
                    if(path.toLowerCase().indexOf('login') > -1){
                        window.localStorage.setItem('access_token',  'Bearer ' + res.body.data.result.access_token)
                        window.localStorage.setItem('access_name',  res.body.data.userName)
                    }
                    resolve(res.body);
                } else {
                    errorHandler(res.body)
                    reject(res.body);
                }                    
            });
    })
};

export default HttpClient;
