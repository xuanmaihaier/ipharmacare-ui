import IpFileDownload from './src/file-download.vue';
/* istanbul ignore next */
IpFileDownload.install = function(Vue) {
  Vue.component(IpFileDownload.name, IpFileDownload);
};

export default IpFileDownload;
