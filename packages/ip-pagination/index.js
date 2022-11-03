import IpPagination from './src/pagination';
/* istanbul ignore next */
IpPagination.install = function(Vue) {
  Vue.component(IpPagination.name, IpPagination);
};

export default IpPagination;
