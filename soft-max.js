const convnet = require('./build/convnet');

const v = new convnet.Vol(2,2,1);
v.set(0, 0, 0, 1);
v.set(1, 1, 0, 2);
v.set(1, 0, 0, 3);
v.set(1, 1, 0, 4);


// const output = convnet.SoftmaxLayer.prototype.forward.call({
//   out_depth: 4,
//   num_inputs: 4,
// }, v);
// console.log(output);

const filters = [
  { w: [1,2,3,4], dw: [0,0,0,0] },
  { w: [5,6,7,8], dw: [0,0,0,0] },
  { w: [9,10,11,12], dw: [0,0,0,0] },
  { w: [13,14,15,16], dw: [0,0,0,0] },
];
const biases = { w: [0.2, 0.2, 0.2, 0.2], dw: [0,0,0,0] };
const output = convnet.SoftmaxLayer.prototype.backward.call({
  out_depth: 4,
  num_inputs: 4,
  in_act: v,
  biases: biases,
  filters: filters,
  es: [1,2,3,4],
  out_act: {
    dw: [1,2,3,4]
  }
}, 3);

console.log(filters);
console.log(biases);
console.log(v.dw);