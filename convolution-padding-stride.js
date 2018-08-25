const convnet = require('./build/convnet');

const v = new convnet.Vol(10,10,1);
v.set(0, 0, 0, 1);
v.set(1, 0, 0, 2);
v.set(2, 0, 0, 3);
v.set(0, 1, 0, 4);
v.set(1, 1, 0, 5);
v.set(2, 1, 0, 6);
v.set(0, 2, 0, 7);
v.set(1, 2, 0, 8);
v.set(2, 2, 0, 9);

const filters = [{
  sy: 10,
  sx: 10,
  depth: 1,
  w: [1,2,3,4,5,6,7,8,9,1,2,3,4,5,6,7,8,9,1,2,3,4,5,6,7,8,9,1,2,3,4,5,6,7,8,9],
  dw: [1,2,3,4,5,6,7,8,9,1,2,3,4,5,6,7,8,9,1,2,3,4,5,6,7,8,9,1,2,3,4,5,6,7,8,9]
}];

/**
 deltasDepth 16
 deltasHeight 14
 deltasWidth 14
 filterCount 16
 filterHeight 5
 filterWidth 5
 inputDepth 8
 inputHeight 14
 inputWidth 14
 paddingX 2
 paddingY 2
 strideX 1
 strideY 1
 */

const instance = {
  out_depth: 1,
  in_act: v,

  filters: filters,
  biases: {
    dw: [1,2,3,4]
  },
  stride: 2,
  pad: 1,
  in_sx: 20,
  in_sy: 20,
  sx: 10,
  sy: 10,
  get out_sx() {
    return Math.floor((this.in_sx + this.pad * 2 - this.sx) / this.stride + 1);
  },
  get out_sy() {
    return Math.floor((this.in_sy + this.pad * 2 - this.sy) / this.stride + 1);
  },
  out_act: {
    get_grad: function(x, y) {
      var i = ((y * instance.out_sx) + x);
      return this.dw[i];
    },
    dw: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25]
  }
};
const output = convnet.ConvLayer.prototype.backward.call(instance);

console.log(filters[0].dw.join(','));