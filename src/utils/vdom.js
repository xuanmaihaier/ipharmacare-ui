import { hasOwn } from 'web-vue2-front-end-lib/src/utils/util';

export function isVNode(node) {
  return node !== null && typeof node === 'object' && hasOwn(node, 'componentOptions');
};
