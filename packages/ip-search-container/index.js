import IpSearchContainer from './src/searchContainer';

/* istanbul ignore next */
IpSearchContainer.install = function(Vue) {
  Vue.component(IpSearchContainer.name, IpSearchContainer);
};

export default IpSearchContainer;
