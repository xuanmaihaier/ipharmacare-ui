import IpTree from './src/tree';

/* istanbul ignore next */
IpTree.install = function(Vue) {
  Vue.component(IpTree.name, IpTree);
};

export default IpTree;
