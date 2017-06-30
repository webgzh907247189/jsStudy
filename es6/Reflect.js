name in obj  === delete obj[name]      (Reflect.has和in运算符都会报错)


(如果删除成功，或者被删除的属性不存在，返回true；删除失败，被删除的属性依然存在，返回false)
Reflect.has(obj, name) === Reflect.deleteProperty(obj, name)  



Reflect对象的方法与Proxy对象的方法一一对应，只要是Proxy对象的方法，就能在Reflect对象上找到对应的方法。
这就让Proxy对象可以方便地调用对应的Reflect方法，完成默认行为，作为修改行为的基础。



var aa = new Proxy(target, {
  set: function(target, name, value, receiver) {
    var success = Reflect.set(target,name, value, receiver);
    if (success) {
      log('property ' + name + ' on ' + target + ' set to ' + value);
    }
    return success;
  }
});
aa.name = '111';
property name on {"name":"111"} set to 111
log(target)  //{"name":"111"}




Reflect.apply(Math.floor, undefined, [1.75]) // 1





var myObject = {
  foo: 1,
  bar: 2,
  get baz() {
    return this.foo + this.bar;
  },
};
var myReceiverObject = {
  foo: 4,
  bar: 4,
};
Reflect.get(myObject, 'foo') // 1
Reflect.get(myObject, 'bar') // 2
Reflect.get(myObject, 'baz', myReceiverObject) // 8




如果第一个参数不是对象，Reflect.get方法会报错。
Reflect.get(1, 'foo') // 报错
Reflect.get(false, 'foo') // 报错





var myObject = {
  foo: 1,
  set bar(value) {
    return this.foo = value;
  },
}
myObject.foo // 1
Reflect.set(myObject, 'foo', 2);
myObject.foo // 2
Reflect.set(myObject, 'bar', 3)
myObject.foo // 3
console.log(myObject);  //{myObject}




var myObject = {
  foo: 4,
  set bar(value) {
    return this.foo = value;
  },
};
var myReceiverObject = {
  foo: 0,
};
Reflect.set(myObject, 'bar', 1, myReceiverObject);
myObject.foo // 4
myReceiverObject.foo // 1



如果第一个参数不是对象，Reflect.set会报错。
Reflect.set(1, 'foo', {}) // 报错
Reflect.set(false, 'foo', {}) // 报错






Reflect.set会触发Proxy.defineProperty拦截。
let p = {
  a: 'a'
};
let handler = {
  set(target,key,value,receiver) {
    console.log('set');
    Reflect.set(target,key,value,receiver)
  },
  defineProperty(target, key, attribute) {
    console.log('defineProperty');
    Reflect.defineProperty(target,key,attribute);
  }
};
let obj = new Proxy(p, handler);
obj.a = 'A';
console.log(p);  //{a: "A"}
// set
// defineProperty




function Greeting(name) {
  this.name = name;
}
// new 的写法
const instance = new Greeting('张三');
// Reflect.construct 的写法
const instance = Reflect.construct(Greeting, ['张三']);  log(instance);  //{name: "张三"}







Reflect.getPrototypeOf和Object.getPrototypeOf的一个区别是，如果参数不是对象，
Object.getPrototypeOf会将这个参数转为对象，然后再运行，而Reflect.getPrototypeOf会报错。

const myObj = new FancyThing();
// 旧写法
Object.getPrototypeOf(myObj) === FancyThing.prototype;
// 新写法
Reflect.getPrototypeOf(myObj) === FancyThing.prototype;


Reflect.getPrototypeOf和Object.getPrototypeOf的一个区别是，如果参数不是对象，
Object.getPrototypeOf会将这个参数转为对象，然后再运行，而Reflect.getPrototypeOf会报错。
Object.getPrototypeOf(1) // Number {[[PrimitiveValue]]: 0}
Reflect.getPrototypeOf(1) // 报错




function FancyThing(){}
function OtherThing(){}
const myObj = new FancyThing();
// 新写法
Reflect.setPrototypeOf(myObj, OtherThing.prototype);
log(myObj);



如果第一个参数不是对象，Object.setPrototypeOf会返回第一个参数本身，而Reflect.setPrototypeOf会报错。
Object.setPrototypeOf(1, {})
// 1
Reflect.setPrototypeOf(1, {})
// TypeError: Reflect.setPrototypeOf called on non-object



如果第一个参数是undefined或null，Object.setPrototypeOf和Reflect.setPrototypeOf都会报错。
Object.setPrototypeOf(null, {})
// TypeError: Object.setPrototypeOf called on null or undefined
Reflect.setPrototypeOf(null, {})
// TypeError: Reflect.setPrototypeOf called on non-object





一般来说，如果要绑定一个函数的this对象，可以这样写fn.apply(obj, args)，但是如果函数定义了自己的apply方法，
就只能写成Function.prototype.apply.call(fn, obj, args)，采用Reflect对象可以简化这种操作。
const ages = [11, 33, 12, 54, 18, 96];
const youngest = Reflect.apply(Math.min, Math, ages); log(youngest);    //11
const oldest = Reflect.apply(Math.max, Math, ages);  log(oldest);       //96
const type = Reflect.apply(Object.prototype.toString, youngest, []);   log(type);  //[object Number]





如果Reflect.defineProperty的第一个参数不是对象，就会抛出错误，比如Reflect.defineProperty(1, 'foo')。
var MyDate = {}
Reflect.defineProperty(MyDate, 'now', {
  value: () => Date.now()
});
console.log(MyDate);    //{value(){Date.now()}}




Object.getOwnPropertyDescriptor(1, 'foo')不报错，返回undefined，
而Reflect.getOwnPropertyDescriptor(1, 'foo')会抛出错误，表示参数非法。
var myObject = {};
Object.defineProperty(myObject, 'hidden', {
  value: true,
  enumerable: false,
});
// 新写法
var theDescriptor = Reflect.getOwnPropertyDescriptor(myObject, 'hidden');





如果参数不是对象，Object.isExtensible会返回false，因为非对象本来就是不可扩展的，而Reflect.isExtensible会报错。
const myObject = {};
// 旧写法
Object.isExtensible(myObject) // true
// 新写法
Reflect.isExtensible(myObject) // true


如果参数不是对象，Object.isExtensible会返回false，因为非对象本来就是不可扩展的，而Reflect.isExtensible会报错。
Object.isExtensible(1) // false
Reflect.isExtensible(1) // 报错





var myObject = {};
// 旧写法
Object.preventExtensions(myObject) // Object {}
// 新写法
Reflect.preventExtensions(myObject) // true

// ES5 环境
Object.preventExtensions(1) // 报错
// ES6 环境
Object.preventExtensions(1) // 1
// 新写法
Reflect.preventExtensions(1) // 报错






Reflect.ownKeys方法用于返回对象的所有属性，基本等同于Object.getOwnPropertyNames与Object.getOwnPropertySymbols之和。
var myObject = {
  foo: 1,
  bar: 2,
  [Symbol.for('baz')]: 3,
  [Symbol.for('bing')]: 4,
};
// 旧写法
Object.getOwnPropertyNames(myObject)         // ['foo', 'bar']
Object.getOwnPropertySymbols(myObject)       //[Symbol.for('baz'), Symbol.for('bing')]
// 新写法
Reflect.ownKeys(myObject)                    // ['foo', 'bar', Symbol.for('baz'), Symbol.for('bing')]

Reflect.ownKeys方法用于返回对象的所有属性，基本等同于Object.getOwnPropertyNames与Object.getOwnPropertySymbols之和。






