import IpSidebar from './src/sidebar';
/* istanbul ignore next */
IpSidebar.install = function(Vue) {
  Vue.component(IpSidebar.name, IpSidebar);
};

export default IpSidebar;
