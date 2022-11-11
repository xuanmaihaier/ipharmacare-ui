import IpTopbar from './src/topbar';
/* istanbul ignore next */
IpTopbar.install = function(Vue) {
  Vue.component(IpTopbar.name, IpTopbar);
};

export default IpTopbar;
