import IpMessage from './src/message';
/* istanbul ignore next */
IpMessage.install = function(Vue) {
  Vue.component(IpMessage.name, IpMessage);
};

export default IpMessage;
