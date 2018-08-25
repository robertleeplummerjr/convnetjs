const convnet = require('./build/convnet');

const v = new convnet.Vol(3,3,1);
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
  sy: 2,
  sx: 2,
  depth: 1,
  w: [1,2,3,4],
  dw: [1,2,3,4]
}];
const output = convnet.ConvLayer.prototype.backward.call({
  out_depth: 1,
  in_act: v,

  filters: filters,
  biases: {
    dw: [1,2,3,4]
  },
  stride: 1,
  pad: 0,
  in_sx: 2,
  in_sy: 2,
  sx: 2,
  sy: 2,
  get out_sx() {
    return Math.floor((this.in_sx + this.pad * 2 - this.sx) / this.stride + 1);
  },
  get out_sy() {
    return Math.floor((this.in_sy + this.pad * 2 - this.sy) / this.stride + 1);
  },
  out_act: {
    get_grad: function(x, y) {
      var i = ((y * 2) + x);
      return this.dw[i];
    },
    dw: [1,2,3,4]
  }
});

console.log(filters[0].dw.join(','));