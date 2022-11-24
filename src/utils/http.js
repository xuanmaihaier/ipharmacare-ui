import axios from 'axios';
import { debounce } from 'vue-debounce';
let baseURL = '';
import Loading from 'web-vue2-front-end-lib/packages/loading';
import Message from 'web-vue2-front-end-lib/packages/message';
// if(process.env.NODE_ENV === 'production'){  //生产环境
//     baseURL = 'http://10.1.1.247:9999'
// }else if(process.env.NODE_ENV === 'development'){  //开发环境
//     baseURL = ''
// }

const urlList = [
  // 'api/v1/case/operation/all',
  'api/v1/case/operation/add',
  'api/v1/case/operation/drugAllergy/all',
  'api/v1/case/operation/patientDrug/add',
  'api/v1/prescription/optn/optRecipeSummary/update',
  'api/v1/prescription/optn/optRecipeDrug/add',
  'api/v1/report/addDrug',
  'api/v1/report/updateSummary',
  'api/v1/dict/operation/compareFun',
  'api/v1/dict/diagnosis/compareFun',
  'api/v1/dict/dept/compareFun',
  'api/v1/report/updateDrug'

];
const Axios = axios.create({
  baseURL: baseURL,
  timeout: 20000,
  headers: { 'Content-type': 'application/json' }
});

let loading = null; // loading对象
let needLoadingRequestCount = 0; // 当前正在请求的数量

const startLoading = (headers) => {
  if (needLoadingRequestCount === 0) {
    loading = Loading.service({
      lock: false,
      text: '正在加载中...',
      fullscreen: false
    });
  }
};

const showScreenLoading = (headers) => {
  if (needLoadingRequestCount == 0 && !loading) {
    startLoading(headers);
  }
  needLoadingRequestCount++;
};

// 关闭loading状态
const endLoading = debounce(() => {
  loading.close();
  loading = null;
}, 1000);

const hideScreenLoading = () => {
  if (needLoadingRequestCount <= 0) return;
  needLoadingRequestCount--;
  needLoadingRequestCount = Math.max(needLoadingRequestCount, 0);
  if (needLoadingRequestCount === 0) {
    endLoading();
  }
};
// 请求拦截器
Axios.interceptors.request.use(config => {
  // const token = store.state.token
  // config.headers.cookie = ""
  // config.headers.token = sessionStorage.getItem("token")
  // config.headers.refreshToken = sessionStorage.getItem("token")
  let flag = false;
  flag = urlList.some(value => {
    return config.url.indexOf(value) != -1;
  });
  if (flag) {
    showScreenLoading();
  }
  return config;
}, err => {
  hideScreenLoading();
  return window.Promise.reject(err);
});

Axios.interceptors.response.use(
  response => {
    hideScreenLoading();
    const res = response.data;
    if (res.code != 200) {
      if (res.code == 405 || res.code == 401 || res.code == 999 || res.code == 402) {
        window.open('/syscenter/login?destination=' + btoa(encodeURIComponent((location.href))), '_self');
      } else {
        if (res.code != '1111') {
          if (res.message) {
            Message({
              message: res.message || 'Error',
              type: 'error',
              duration: 1000
            });
          }
        }
      }
    }
    return res;
  },
  error => {
    hideScreenLoading();
    console.log('err' + error); // for debug
    Message({
      message: error.message,
      type: 'error',
      duration: 1000
    });
    return window.Promise.reject(error);
  }
);

export function get(url, params) {
  return new window.Promise((resolve, reject) => {
    Axios.get(url, {
      params: params
    }).then(res => {
      resolve(res);
    }).catch(err => {
      reject(err);
    });
  });
}

export function post(url, data) {
  return new window.Promise((resolve, reject) => {
    Axios.post(url, data)
      .then(res => {
        resolve(res);
      })
      .catch(err => {
        reject(err);
      });
  });
}

export default Axios;
