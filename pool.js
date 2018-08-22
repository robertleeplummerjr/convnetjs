const convnet = require('./build/convnet');

const v = new convnet.Vol(2,2,1);
v.set(0, 0, 0, 1);
v.set(1, 0, 0, 2);
v.set(0, 1, 0, 3);
v.set(1, 1, 0, 4);

// const output = convnet.SoftmaxLayer.prototype.forward.call({
//   out_depth: 4,
//   num_inputs: 4,
// }, v);
// console.log(output);

// pool({filters: 8, filterWidth: 2, filterHeight: 2, filterCount: 8, stride: 2});

const output = convnet.PoolLayer.prototype.backward.call({
  out_depth: 1,
  in_act: v,

  // switchx: [0,0,1,1],
  // switchy: [0,1,0,1],
  // 1,2,3,4

  // switchx: [1,1,0,0],
  // switchy: [1,0,1,0],
  // 4,3,2,1

  // switchx: [1,1,1,0],
  // switchy: [1,0,1,0],
  // 4,3,0,3

  // switchx: [1,1,0,0],
  // switchy: [1,0,0,0],
  // 6,3,0,1

  switchx: [1,1,1,1],
  switchy: [1,1,1,1],
  // 4,0,2,4

  stride: 0,
  pad: 0,
  out_sx: 2,
  out_sy: 2,
  out_act: {
    get_grad: function(x, y) {
      var i = ((y * 2) + x);
      return this.dw[i];
    },
    dw: [1,2,3,4]
  }
}, 3);

console.log(v.dw.join(','));