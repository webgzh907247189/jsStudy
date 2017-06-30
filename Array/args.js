/******    margin具有重叠机智(上下),左右不具有       padding(不具有上下重叠机制,左右也不具有)     **********/
function f() {
  console.log('aaa');
  return  4;
}
let [x = f()] = [undefined];
console.log(x); //4
如果默认值是一个表达式，那么这个表达式是惰性求值的，即只有在用到的时候，才会求值。




let obj = {};
let arr = [];
({ foo: obj.prop, bar: arr[0] } = { foo: 123, bar: true });
obj // {prop:123}
arr // [true]



let arr = [1, 2, 3];
let {0 : first, [arr.length - 1] : last} = arr;
first // 1
last // 3





let {length } = 'hello';
console.log(length);  //5





console.log(...[1, 2, 3])   //1  2  3
 
console.log(1, ...[2, 3, 4], 5)  // 1  2  3  4  5



function add(x, y) {  
  console.log(x,y);
return x + y;  
}  
var numbers = [4, 38];  
add(...numbers) // 42



var args = [0, 1];  
f(-1, ...args, 2, ...[3]);    
function f(v, w, x, y, z) {console.log(v, w, x, y, z) }  //-1 0 1 2 3 



// ES5 的写法  
Math.max.apply(null, [14, 3, 77])            Reflect.apply(Math.max,undefined,[14, 3, 77]) //77
// ES6 的写法  
Math.max(...[14, 3, 77])  
//  等同于  
Math.max(14, 3, 77);  



var arr1 = [0, 1, 2];  
var arr2 = [3, 4, 5];  
var a = [...arr1,...arr2]
console.log(a);    //0,1,2,3,4,5



[...'hello']  
// [ "h", "e", "l", "l", "o" ]  


new Date(...[2015, 1, 1]);                  //Sun Feb 01 2015 00:00:00 GMT+0800 (中国标准时间)
Reflect.constructor(new Date,[2015, 1, 1])  //Tue Jun 27 2017 14:56:50 GMT+0800 (中国标准时间)
Reflect.construct(Date, [2015, 1, 1]);      //Sun Feb 01 2015 00:00:00 GMT+0800 (中国标准时间)


var go = function*(){  
yield 1;  
yield 2;  
yield 3;  
};  
[...go()] // [1, 2, 3] 


http://blog.csdn.net/qq_30100043/article/details/53391308
http://blog.csdn.net/qq_30100043/article/details/53391308
















//对象的解构
const { a, ...noA } = { a: 1, b: 2, c: 3 }
console.log(noA);   // {b: 2, c: 3}
//对象的解构








null对象和undefined无法被解构， 因为null和undefined没有构造函数；

"use strict";
let [a,b,c,d,e ] = "abcde";
console.log(a+b+c+d+e);  //abcde

let {valueOf} = "s";
console.log(valueOf); //[Function: valueOf]

null对象和undefined无法被解构， 因为null和undefined没有构造函数；








function* run() {
    let a = 0;
    while (true) {
        yield a;
        a++;
    }
}
 var [first, second, third, fourth, fifth, sixth] = run();
 console.log(first+"_"+second+"_"+third+"_"+fourth+"_"+fifth+"_"+sixth);  //0_1_2_3_4_5




let [x, y] = [1, 2];
[x, y] = [y, x];
console.log(x, y);  //2  1




基本类型的转换可以这样：x = [y, y=x][0];
let [x, y] = [1, 2];
x = [y, y=x][0];
console.log(x,y);





var user = {
    id: 42,
    displayName: "jdoe",
    fullName: {
        firstName: "John",
        lastName: "Doe"
    }
};
function userId({id}) {
    return id;
}
console.log("userId: " + userId(user)); // "userId: 42"













var array = ['name', 'age', 'sex'];
 
var arrayLike = {
    0: 'name',
    1: 'age',
    2: 'sex',
    length: 3
};
console.log(array[0]); // name
console.log(arrayLike[0]); // name

console.log(array.length); // 3
console.log(arrayLike.length); // 3





var arrayLike = {0: 'name', 1: 'age', 2: 'sex', length: 3 } 
Array.prototype.join.call(arrayLike, '&'); // name&age&sex


Array.prototype.map.call(arrayLike, function(item){
    return item.toUpperCase();
});
// ["NAME", "AGE", "SEX"]




var arrayLike = {
    0: 'name',
    1: 'age',
    2: 'sex',
    length: 3
};
Array.prototype.slice.call(arrayLike); // ["name", "age", "sex"]
Array.prototype.slice.call(arrayLike,0,2); // ["name", "age"]		//slice(start,end)  包含start位置。不包含结束位置  





var arrayLike = {0: 'name', 1: 'age', 2: 'sex', length: 3 }
// 1. slice
Array.from(arrayLike); // ["name", "age", "sex"]   会重新被赋值(需要注意，赋值给变量，变量才是真的数组)
// 2.concat
Array.prototype.concat.apply([], arrayLike) // ["name", "age", "sex"]









function foo(b, c, d){
    console.log("实参的长度为：" + arguments.length)
}
 
console.log("形参的长度为：" + foo.length)
foo(1)
// 形参的长度为：3
// 实参的长度为：1






/****************传入的参数，实参和 arguments 的值会共享，当没有传入时，实参与 arguments 值不会共享
除此之外，以上是在非严格模式下，如果是在严格模式下，实参和 arguments 是不会共享的。**********/

function foo(name, age, sex, hobbit) {
    console.log(name, arguments[0]); // name name
    // 改变形参
    name = 'new name';
    console.log(name, arguments[0]); // new name new name
    // 改变arguments
    arguments[1] = 'new age';
    console.log(age, arguments[1]); // new age new age
    // 测试未传入的是否会绑定
    console.log(sex); // undefined
    sex = 'new sex';
    console.log(sex, arguments[2]); // new sex undefined
    arguments[3] = 'new hobbit';
    console.log(hobbit, arguments[3]); // undefined new hobbit
}
foo('name', 'age')

/****************传入的参数，实参和 arguments 的值会共享，当没有传入时，实参与 arguments 值不会共享
除此之外，以上是在非严格模式下，如果是在严格模式下，实参和 arguments 是不会共享的。**********/





function foo() {
    bar.apply(this, arguments);
}
function bar(a, b, c) {
   console.log(a, b, c);	//1 2 3
}
foo(1, 2, 3)



/*********		使用ES6的 … 运算符，我们可以轻松转成数组。		***********/
function func(...arguments) {
    console.log(arguments); // [1, 2, 3]
}
func(1, 2, 3);









/**********   JavaScript 深入之参数按值传递      ***********/
var value = 1;
function foo(v) {
    v = 2;
    console.log(v); //2
}
foo(value);
console.log(value) // 1


/*********    所以修改 o.value，可以通过引用找到原值，但是直接修改 o，并不会修改原值。
所以第二个和第三个例子其实都是按共享传递。(共享传递是指，在传递对象的时候，传递对象的引用的副本。)        ************/
//共享传递
var obj = {
    value: 1
};
function foo(o) {
    o.value = 2;
    console.log(o.value); //2
}
foo(obj);
console.log(obj.value) // 2



var obj = {
    value: 1
};
function foo(o) {
    o = 2;
    console.log(o); //2
}
foo(obj);
console.log(obj.value) // 1

/*********    所以修改 o.value，可以通过引用找到原值，但是直接修改 o，并不会修改原值。
所以第二个和第三个例子其实都是按共享传递。 (共享传递是指，在传递对象的时候，传递对象的引用的副本。)         ************/















/*******      内存泄漏
http://mp.weixin.qq.com/s?__biz=MzAwNjI5MTYyMw==&mid=2651494298&idx=1&sn=c1b0f2159311a09a70152de54e07d607&chksm=80f19e52b7861744836684a3b3e2adb7c5dd7d540a6fc094ec0caf317589d883fc131df5e4dd&scene=0#rd
      **********/





//默认值的问题
/*************** 1）默认值可以访问外层作用域变量，2）默认值可以是调用函数返回的结果(1、2都可以归并访问外层作用域变量)3）参数默认值从左到右进行计算  ************************/
function bar(val) {  
    return y + val;  
}  
              
function foo(x = y + 3, z = bar( x )) {  
    console.log( x + " " + z + "\n");  
}  
              
var y = 5;  //外层作用域变量

foo();      // 8 13
foo( 10 );  // 10 15  

y = 6;  
foo( undefined, 10 ); // 9 10  
/*************** 1）默认值可以访问外层作用域变量，2）默认值可以是调用函数返回的结果，3）参数默认值从左到右进行计算  ************************/






//对象的解构
const { a, ...noA } = { a: 1, b: 2, c: 3 }
console.log(noA);   // {b: 2, c: 3}
//对象的解构







var { policyPeriod:[beginTime,endTime]=[] } = {policyPeriod:[1,2]};
console.log(beginTime,endTime);  //1 2 
var obj = {a:'21321321'}
var obj1 = {
    ...obj,
    beginTime,
    endTime
};
console.log(obj1);   //{a: "21321321", beginTime: 1, endTime: 2}




//http://blog.csdn.net/i10630226/article/details/52431562(深拷贝浅拷贝)

//https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/assign#Example:_Merging_objects(需要fixed)

/************           关于深拷贝(浅拷贝指的是拷贝基本数据类型)          ***********/
let a = { b: {c:4} , d: { e: {f:1}} }

let g = {...a};    //let g = Object.assign({},a) 效果相同(均是<<引用传递？？>>)

let h = JSON.parse(JSON.stringify(a));
//console.table(a);     //{ b: {c:4} , d: { e: {f:1}} }
//console.table(g)      //{ b: {c:4} , d: { e: {f:1}} }
g.d.e = 32

console.table(g) // { b: { c: 4 }, d: { e: 32 } }
console.table(a) // { b: { c: 4 }, d: { e: 32 } }
console.table(h) // { b: { c: 4 }, d: { e: { f: 1 } } }




/****    Object.assign() 拷贝的是属性值。假如源对象的属性值是一个指向对象的引用，它也只拷贝那个引用值。(浅拷贝是指拷贝基本数据类型)     ****/



/******     此例证明其浅复制      *******/
var obj1 = {a:1,b:2,c:{d:1,f:2}};
var obj={...obj1,e:'ge'}  //var obj = Object.assign({},obj1,{e:'ge'}) 效果相同(均是<<引用传递？？>>)
var h = JSON.parse(JSON.stringify(obj))
obj.c.d=33;
console.table(obj1);  //{a:1,b:2,c:{d:33,f:2}};
console.table(obj);  //{a:1,b:2,c:{d:33,f:2},e:'ge'};
console.table(h);    //{a:1,b:2,c:{d:1,f:2},e:'ge'}



var obj1 = {a:['aaa','bbb','ccc','ddd'],b:2,c:{d:1,f:2}};
var obj={...obj1,e:'ge'}  //var obj = Object.assign({},obj1,{e:'ge'}) 效果相同(均是<<引用传递？？>>)
var h = JSON.parse(JSON.stringify(obj))
obj.a.push('333333333');
console.log(obj1);  //{a:['aaa','bbb','ccc','ddd','333333333'],b:2,c:{d:1,f:2}};
console.log(obj);  //{a:['aaa','bbb','ccc','ddd','333333333'],b:2,c:{d:1,f:2},e:'ge'};
console.log(h);    //{a:['aaa','bbb','ccc','ddd'],b:2,c:{d:1,f:2},e:'ge'}


//差别在于一个是基本数据类型，一个是引用数据类型


var obj1 = {a:1,b:2,c:{d:1,f:2}};
var obj={...obj1,e:'ge'}    //var obj = Object.assign({},obj1,{e:'ge'}) 效果相同(均是<<引用传递？？>>)
var h = JSON.parse(JSON.stringify(obj))
obj.a=10;
console.table(obj1);    //{a:1,b:2,c:{d:1,f:2}};
console.table(obj);     //{a:10,b:2,c:{d:1,f:2},e:'ge'};
console.table(h);       //{a:1,b:2,c:{d:1,f:2},e:'ge'};
/******     此例证明其浅复制        *******/




/*******    上下的差别在与Object.assign({},obj,{e:'ge'})<<Object.assign(obj,{e:'ge'})>>     (改变了obj本身)    *********/




/******     此例证明其浅复制      *******/
var obj1 = {a:1,b:2,c:{d:1,f:2}};
var obj = Object.assign(obj1,{e:'ge'}) //效果相同(均是<<引用传递？？>>)
var h = JSON.parse(JSON.stringify(obj))
obj.c.d=33;
console.table(obj1);  //{a:1,b:2,c:{d:33,f:2},e:'ge'};
console.table(obj);  //{a:1,b:2,c:{d:33,f:2},e:'ge'};
console.table(h);    //{a:1,b:2,c:{d:1,f:2},e:'ge'}


var obj1 = {a:1,b:2,c:{d:1,f:2}};
var obj = Object.assign(obj1,{e:'ge'}) //效果相同(均是<<引用传递？？>>)
var h = JSON.parse(JSON.stringify(obj))
obj.a=10;
console.table(obj1);    //{a:10,b:2,c:{d:1,f:2},e:'ge'};
console.table(obj);     //{a:10,b:2,c:{d:1,f:2},e:'ge'};
console.table(h);       //{a:1,b:2,c:{d:1,f:2},e:'ge'};
/******    此例证明其浅复制      *******/






 //Object.assign 会跳过那些值为 null 或 undefined 的源对象。

var v1 = "abc";
var v2 = true;
var v3 = 10;
var v4 = Symbol("foo")

var obj = Object.assign({}, v1, null, v2, undefined, v3, v4); 
// 原始类型会被包装，null 和 undefined 会被忽略。
// 注意，只有字符串的包装对象才可能有自身可枚举属性。
console.log(obj); // { "0": "a", "1": "b", "2": "c" }







//异常会打断接下来的拷贝任务
var target = Object.defineProperty({}, "foo", {
    value: 1,
    writable: false
}); // target 的 foo 属性是个只读属性。

Object.assign(target, {bar: 2}, {foo2: 3, foo: 3, foo3: 3}, {baz: 4});
// TypeError: "foo" is read-only
// 注意这个异常是在拷贝第二个源对象的第二个属性时发生的。

console.log(target.bar);  // 2，说明第一个源对象拷贝成功了。
console.log(target.foo2); // 3，说明第二个源对象的第一个属性也拷贝成功了。
console.log(target.foo);  // 1，只读属性不能被覆盖，所以第二个源对象的第二个属性拷贝失败了。
console.log(target.foo3); // undefined，异常之后 assign 方法就退出了，第三个属性是不会被拷贝到的。
console.log(target.baz);  // undefined，第三个源对象更是不会被拷贝到的。





//拷贝访问器（accessor）
var obj = {
  foo: 1,
  get bar() {
    return 2;
  }
};
var copy = Object.assign({}, obj); 
// { foo: 1, bar: 2 }
// copy.bar的值来自obj.bar的getter函数的返回值 
console.log(copy); 


// 下面这个函数会拷贝所有自有属性的属性描述符
function completeAssign(target, ...sources) {
  sources.forEach(source => {
    let descriptors = Object.keys(source).reduce((descriptors, key) => {
      descriptors[key] = Object.getOwnPropertyDescriptor(source, key);
      return descriptors;
    }, {});

    // Object.assign 默认也会拷贝可枚举的Symbols
    Object.getOwnPropertySymbols(source).forEach(sym => {
      let descriptor = Object.getOwnPropertyDescriptor(source, sym);
      if (descriptor.enumerable) {
        descriptors[sym] = descriptor;
      }
    });
    Object.defineProperties(target, descriptors);
  });
  return target;
}

var copy = completeAssign({}, obj);
// { foo:1, get bar() { return 2 } }
console.log(copy);








/*****   深拷贝   ******/  //http://www.jb51.net/article/79707.htm
function abc(target={},source){
  var objArr = Object.keys(source);
  for(var i in source){
    if(typeof(source[i]) == 'object' ){
      target[i] = Array.isArray(source[i]) ? [] : {};
      abc(target[i],source[i])
    }else{
      target[i] = source[i];  
    }
  }
  //console.log(target);
  return target;
};
var b = {
counts: [1, 2, 3],
reads: {paper: true}
};
var a = abc(undefined,b);
console.log(a); //{counts: [1, 2, 3],reads: {paper: true}};
b.reads.paper = '213123';
console.log(a); //{counts: [1, 2, 3],reads: {paper: true}};
console.log(b); //{counts: [1, 2, 3],reads: {paper: '213123'}};




































/********         http://www.css88.com/archives/7240#more-7240       *******/

var nodes = () => { return {op: "a", lhs: "b", rhs: "c"}}
var { op, lhs , rhs } = nodes()
console.log(op,lhs,rhs) //a  b  c



function g({name: x}) {
  return x
}
function m({name}) {
  return name
}
console.log(g({name: 5}))   //5 (相当于在参数里面结构)
console.log(m({name: 135}))  //135 (相当于在参数里面结构)



function f(x, y, z) {  // 传递数组的每个元素作为参数
  return x + y + z;
}
console.log(f(...[1,2,3]))  //6



function f(...x) {  
  console.log(x);   //[1,2,3]
  console.log(Array.isArray(x)); //true
  return x 
}
console.log(f(1,2,3)) //[1,2,3]
function demo(part1, ...part2) {
    return {part1, part2}
}
console.log(demo(1,2,3,4,5,6))  //{"part1":1,"part2":[2,3,4,5,6]}



let list = [4, 5, 6];
for (let i in list) {    /******  相当于遍历对象，取的是key  ********/
   console.log(i);    //0  1  2
   console.log(list[i]);   //4  5  6
}
for (let item of list) {
   console.log(item);    //4  5  6
}


/*******   ????迭代器(Iterators)   *******/
let infinite = {
  [Symbol.iterator]() {
    let c = 0;
    return {
      next() {
        c++;
        return { done: false, value: c }
      }
    }
  }
}
for (var n of infinite) {
  // truncate the sequence at 1000
  if (n > 10)
    break;
  console.log(n);     //1 2 3 4 5 6 7 8 9 10
}
/*******   ????迭代器(Iterators)   *******/



/*******   ????生成器(Generators)   *******/
var infinity = {
  [Symbol.iterator]: function*() {
    var c = 1;
    for (;;) {   
      yield c++;
    }
  }
}
 
console.log("start")
for (var n of infinity) {
  // truncate the sequence at 1000
  if (n > 10)
    break;
  console.log(n);  //1 2 3 4 5 6 7 8 9 10
}


/*******  ??? 生成器案列???    ********/
function* anotherGenerator(i) {
  yield i + 1;
  yield i + 2;
  yield i + 3;
}
function* generator(i) {
  yield i;
  yield* anotherGenerator(i);
  yield i + 10;
}
var gen = generator(10);
 
console.log(gen.next().value); //10
console.log(gen.next().value); //11 
console.log(gen.next().value); //12
console.log(gen.next().value); //13
console.log(gen.next().value); //20
/*******   ????生成器(Generators)   *******/



/****   Unicode     ****/
var regex = new RegExp('\u{61}', 'u');
 
console.log(regex.unicode)    //true
console.log("\u597D")         //好
console.log("\uD842\uDFD7".codePointAt())   //134103






var set = new Set();
set.add("Potato").add("Tomato").add("Tomato");
console.log(set.size)           //2
console.log(set.has("Tomato"))  //true
for(var item of set) {
   console.log(item)          //Potato   Tomato
}




var map = new Map();
map.set("Potato", 12);
map.set("Tomato", 34);
console.log(map.get("Potato"))      //12
 
for(let item of map) {
   console.log(item)      //["Potato", 12]   ["Tomato", 34]
}


var map = new Map();
var key = {a: "a"}
map.set(key, 12);
console.log(map.get(key))     //12
console.log(map.get({a: "a"})) //undefined




/**WeakMap与Map在API上的区别主要是两个：一是，没有遍历操作；也没有size属性；二是无法清空。
WeakMap只有四个方法：get、set、has、delete。WeakMap的另一个用处是部署私有变量。***/
var wm = new WeakMap();
var o1  = {}
var o2  = {}
var o3  = {}

wm.set(o1, 1);
wm.set(o2, 2);
wm.set(o3, {a: "a"});
wm.set({}, 4);
 
console.log(wm.get(o2));    //2
console.log(wm.has({}))     // false
 
delete o2;
 
console.log(wm.get(o3));   //{a: "a"}
 
for(let item in wm) {
   console.log(item)    //报错
}
for(let item of wm) {
   console.log(item)    //报错
}





//代理（Proxy）           <代理可以用来改变(Object)对象(Object)的行为>
var obj = function ProfanityGenerator() {
  return {
     words: "Horrible words"    
  }
}()
var handler = function CensoringHandler() {
  return {
    get: function (target, key) {
        console.log(target);
        return target[key].replace("Horrible", "Nice");
    }
  }
}()
var proxy = new Proxy(obj, handler);
console.log(proxy.words);   //{words: "Nice words"}






var typeSymbol = Symbol();
class Pet {
  constructor(type) {
    this[typeSymbol] = type;
  }
  getType() {
     return this[typeSymbol];
  }
}
var a = new Pet("dog");
console.log(a.getType());   //dog
console.log(Object.getOwnPropertySymbols(a))  //[Symbol()]     (Array) <将所对象的所有symbol键>
console.log(Symbol("a") === Symbol("a"))   //false





class CustomArray extends Array {
}
var a = new CustomArray();
a[0] = 2
console.log(a[0])   //2




/*****  进制之间的转化    ****/
console.log(0b11111)  //31    <2进制转为10进制>
console.log(0o2342)   //1250  <8进制转为10进制>
console.log(0xff);   //255    <16进制转为10进制>

var a = 31;a.toString(2) //"11111"   <var a = '31';a.toString(2) //"31">  (注意是字符串还是数字,必要采用parseInt()或者~~)
var a = '31';parseInt(a).toString(2) //"11111"
var a = '31';(~~a).toString(2) //"11111"
var a = '31';Number(a).toString(2) //"11111"
var a = '31';(a*1).toString(2) //"11111"

var a = '1250';(~~a).toString(8) //"2342"

var a = '255';(~~a).toString(16) //"ff" 









/*****    Number提供的简便方法  ******/
最小数值和最大数值分别为Number.MIN_VALUE，Number.MAX_VALUE

console.log(Number.EPSILON)      //   <<<(极小的常量)>>>    2.220446049250313e-16
console.log(Number.EPSILON.toFixed(16));                //0.0000000000000002
let result = 0.1 + 0.2;
console.log((result - 0.3) < Number.EPSILON.toFixed(16)); //True




console.log(Number.isInteger(Infinity))  //false


console.log(Number.isNaN("NaN"))        //<<<用来检查是否为有穷以及是否为NaN；>>>false
console.log(Number.isNaN(NaN));         //true   (检查其是否为NaN)




/*****   判断一个数是否为正数负数或者0     ******/
console.log(Math.sign('213213')); // 1
console.log(Math.sign('-1321'));  //-1
console.log(Math.sign('sdsad'));  //NaN
console.log(Math.sign(0));        //0
console.log(Math.sign(-0));        //-0
/*****   判断一个数是否为正数负数或者0     ******/


console.log(Math.hypot(3, 4))           // 5 (返回所有参数的平方和的平方根)

//适用于很大的数乘法(饿了么前端node面试提过)
console.log(Math.imul(Math.pow(2, 32) - 1, Math.pow(2, 32) - 2))   //2  <此方法返回两个数以32位带符号整数形式相乘的结果，返回的也是一个32位的带符号整数。>



console.log("abcde".includes("cd") )  //true    <上下的两种方法均可>
console.log(~("abcde".indexOf("cd")) )  //-3    <上下的两种方法均可>


console.log("abc".repeat(3) )         //abcabcabc






console.log(Array.of(1, 2, 3))          //[1,2,3]
console.log([0, 0, 0,0,0,0,0].fill(7,-2) )  //[0,0,0,0,0,7,7]   (若是负数，则其<length+负数>,作为填充的下标开始)
console.log([0, 0, 0,0,0,0,0].fill(7,2) )  //[0,0,7,7,7,7,7]


console.log([1, 2, 3].find(x => x > 1) )     //2    (找到就返回,所以就返回2)
console.log([1, 2, 3].findIndex(x => x > 1)) //1    (找到其值，返回其下标)
console.log([1, 2, 3, 4, 5].copyWithin(3, 0))  //[1, 2, 3, 1, 2]  (需要fixed,不明确其用法)????????????????????????????????



console.log(["a", "b", "c"].entries())          //{}
console.log(["a", "b", "c"].keys())             //{}
console.log(["a", "b", "c"].values())           //Uncaught TypeError: ["a","b","c"].values is not a function













/*****     反射（Reflect）   *******/
var z = {w: "Super Hello"}
var y = {x: "hello", __proto__: z};


console.log(y);                                         //{x: "hello", __proto__: {w: "Super Hello"}}


//如果在对象中存在，则返回给定的属性的属性描述符.否则返回 undefined。(第一个参数应该是obj，否则抛出异常)
console.log(Reflect.getOwnPropertyDescriptor(y, "x")); //{value: "hello", writable: true, enumerable: true, configurable: true}
console.log(Reflect.getOwnPropertyDescriptor(y, "zz")); //undefined


//Reflect.has 用于检查一个对象是否拥有某个属性(原型链中存在也是可以的)， 相当于in 操作符 。(第一个参数应该是obj，否则抛出异常)
console.log(Reflect.has(y, "w"));                      //true


// 返回一个由目标对象自身的属性键组成的数组(返回值的Array)
//如果目标不是 Object(抛出异常) 
//==== 它的返回值等同于Object.getOwnPropertyNames(target).concat(Object.getOwnPropertySymbols(target))。相当于能遍历Symbols类型的
console.log(Reflect.ownKeys(y, "w"));                  //["x"]
 
console.log(Reflect.has(y, "x"));                     //true

// 允许用于删除属性(第一个参数应该是obj，否则抛出异常)   <<返回一个 Boolean 值表示该属性是否被成功删除>>
console.log(Reflect.deleteProperty(y,"x"))            //true
var arr = [1, 2, 3, 4, 5];
Reflect.deleteProperty(arr, "3"); // true
arr; // [1, 2, 3,undefined , 5]


console.log(Reflect.has(y, "x"));                     //false























/*****    http://www.cnblogs.com/sybboy/p/6420797.html       
          http://www.cnblogs.com/brookshi/p/6426732.html
          http://www.cnblogs.com/diligenceday/p/5474126.html
 ****/

name in obj   ===  Reflect.has(obj, name)
delete obj[name] === Reflect.deleteProperty(obj, name)

f.apply(obj, args)   ===   Reflect.apply(f, obj, args)




var obj = { 
  aa:'11',
  a(){
    console.log(this.aa);
  }
}
function bb(){
  console.log(this.aa)
}
bb.apply(obj)  //11

Reflect.apply(bb,obj,[])  //11









var obj = {
  ge:'1111111111',
  get baz(){
    return this.name
  }
};
var wrapper = {
  name:'gezhonghao'
}
Reflect.get(obj, "ge");   //1111111111
Reflect.get(obj, "baz",wrapper);   //gezhonghao




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

Reflect.get(myObject, 'baz', myReceiverObject) // 8


如果第一个参数不是对象，Reflect.get方法会报错。
Reflect.get(1, 'foo') // 报错
Reflect.get(false, 'foo') // 报错











var obj = {
    set foo(value) { 
    return this.b = value; 
  },
    bar: function() {
      alert(1);
    }
};
var wrapper = {
  a:'1123213',
}
Reflect.set(obj, "foo", "value", wrapper);
Reflect.get(wrapper, "foo"); //value
console.log(wrapper);  //{a:'1123213',b:'value'}


如果第一个参数不是对象，Reflect.set会报错。
Reflect.set(1, 'foo', {}) // 报错
Reflect.set(false, 'foo', {}) // 报错













function Greeting(name) {
  this.name = name;
}

// new 的写法
const instance = new Greeting('张三');
console.log(instance.name);     //张三

// Reflect.construct 的写法
const instance = Reflect.construct(Greeting, ['张三']);
console.log(instance.name);     //张三











var fn = function() {
  this.attr = [0,1,2,3];
};
var obj = {};
Reflect.apply(fn, obj, [])
console.log(obj);   //obj{attr:[0,1,2,3]}


Reflect.apply(Math.floor, undefined, [1.75]); //1
Reflect.apply(Math.min, undefined, [104, 101, 108, 108, 111,'12DFFF']);  //NaN
Reflect.apply(Math.max, undefined, [104, 101, 108, 108, 111,'12232']);   //12232







const type = Object.prototype.toString.call(78);//[object Number]
const type = Reflect.apply(Object.prototype.toString, 78,[]);//[object Number]


//fromCharCode() 可接受一个指定的 Unicode 值，然后返回一个字符串。
Reflect.apply(String.fromCharCode, undefined, [104, 101, 108, 108, 111]); //hello










var myObject = {
  foo: 1,
  bar: 2,
  [Symbol.for('baz')]: 3,
  [Symbol.for('bing')]: 4,
};
Reflect.ownKeys(myObject)  // ['foo', 'bar', Symbol.for('baz'), Symbol.for('bing')]

Object.getOwnPropertyNames(myObject)   // ['foo', 'bar']
Object.getOwnPropertySymbols(myObject) //[Symbol.for('baz'), Symbol.for('bing')]












Reflect.preventExtensions对应Object.preventExtensions方法，用于让一个对象变为不可扩展。它返回一个布尔值，表示是否操作成功。

var myObject = {};
Object.preventExtensions(myObject) // true
Reflect.preventExtensions(myObject) // true


如果参数不是对象，Object.isExtensible在 ES5 环境报错，在 ES6 环境返回这个参数，而Reflect.preventExtensions会报错。
Object.preventExtensions(1) // 报错

Object.preventExtensions(1) // 1
Reflect.preventExtensions(1) // 报错




var p = new Proxy({}, {  
    preventExtensions: function(target) {  
        return true;  
    }  
});  
Object.preventExtensions(p) //  报错  

proxy.preventExtensions方法返回true， 但这时Object.isExtensible(proxy) 会返回true， 因此报错。

var p = new Proxy({}, {  
    preventExtensions: function(target) {  
        console.log("called");  
        Object.preventExtensions(target);  
        return true;  
    }  
});  
Object.preventExtensions(p)  // "called"  true  
















let target = {  
    _bar: 'foo',  
    _prop: 'bar',  
    prop: 'baz'  
};  
let handler = {  
    ownKeys(target) {  
        return Reflect.ownKeys(target).filter(key => key[0] !== '_');  
    }  
};  
let proxy = new Proxy(target, handler);  
for(let key of Object.keys(proxy)) {  
    console.log(target[key]);   // "baz" 
}  

















Reflect.isExtensible方法对应Object.isExtensible，返回一个布尔值，表示当前对象是否可扩展。
const myObject = {};
Object.isExtensible(myObject) // true

Reflect.isExtensible(myObject) // true


如果参数不是对象，Object.isExtensible会返回false，因为非对象本来就是不可扩展的，而Reflect.isExtensible会报错。
Object.isExtensible(1) // false
Reflect.isExtensible(1) // 报错











Reflect.defineProperty方法基本等同于Object.defineProperty，用来为对象定义属性。
未来，后者会被逐渐废除，请从现在开始就使用Reflect.defineProperty代替它。

var MyDate = {};
Object.defineProperty(MyDate, 'now', {
  value: '123213'
});
console.log(MyDate);  //123213


Object.defineProperty(MyDate, 'now', {
  value: () => new Date.now()
}); 
console.log(MyDate);  //{}会在其原型链上添加方法




Reflect.defineProperty(MyDate, 'now', {
  value: () => new Date.now()
});

var MyDate = {};
Reflect.defineProperty(MyDate, 'now', {
  value: '2321321313'
});
console.log(MyDate);   //2321321313

如果Reflect.defineProperty的第一个参数不是对象，就会抛出错误，比如Reflect.defineProperty(1, 'foo')。











Reflect.getOwnPropertyDescriptor基本等同于Object.getOwnPropertyDescriptor，用于得到指定属性的描述对象，将来会替代掉后者。

var myObject = {};
Object.defineProperty(myObject, 'hidden', {
  value: true,
  enumerable: false,
});

var theDescriptor = Object.getOwnPropertyDescriptor(myObject, 'hidden');
console.log(theDescriptor);    //{value: true, writable: false, enumerable: false, configurable: false}

var theDescriptor = Reflect.getOwnPropertyDescriptor(myObject, 'hidden');
console.log(theDescriptor);   // {value: true, writable: false, enumerable: false, configurable: false}


Reflect.getOwnPropertyDescriptor和Object.getOwnPropertyDescriptor的一个区别是，如果第一个参数不是对象，
Object.getOwnPropertyDescriptor(1, 'foo')不报错，返回undefined，而Reflect.getOwnPropertyDescriptor(1, 'foo')会抛出错误，
表示参数非法。









Reflect.getPrototypeOf方法用于读取对象的__proto__属性，对应Object.getPrototypeOf(obj)。
function FancyThing(){}
const myObj = new FancyThing();
Object.getPrototypeOf(myObj) === FancyThing.prototype; //true

Reflect.getPrototypeOf(myObj) === FancyThing.prototype; //true

Reflect.getPrototypeOf和Object.getPrototypeOf的一个区别是，如果第一个参数不是对象（包括null和undefined），
Object.getPrototypeOf会将这个参数转为对象，然后再运行，而Reflect.getPrototypeOf会报错。

Object.getPrototypeOf(1) // undefined
Reflect.getPrototypeOf(1) // 报错









Reflect.setPrototypeOf方法用于设置对象的__proto__属性，对应Object.setPrototypeOf(obj, newProto)。

function FancyThing(){}
const myObj = new FancyThing();
function OtherThing(){}

Object.setPrototypeOf(myObj, OtherThing.prototype);  

Reflect.setPrototypeOf(myObj, OtherThing.prototype);


如果第一个参数不是对象，Reflect.setPrototypeOf和Object.setPrototypeOf都会报错。
Object.setPrototypeOf(1) // 报错
Reflect.setPrototypeOf(1) // 报错










//我们可以给Reflect.construct传第三个参数 ， 第三个参数为一个超类， 新元素会继承这个超类；
var Fn = function(arg) {
    this.args = [arg]
};
console.log( new Fn(1), Reflect.construct(Fn,[1]) ); // 输出是一样的


var d = Reflect.construct(Date, [1776, 6, 4]);
d instanceof Date; // true
d.getFullYear(); // 1776



function someConstructor() {}
var result = Reflect.construct(Array, [], someConstructor);
Reflect.getPrototypeOf(result); // someConstructor.prototype
Array.isArray(result); // true







var obj={};
Reflect.defineProperty(obj, "x", {value : 7 })
console.log(obj);   //{x:7}




var obj = {};
Object.preventExtensions(obj);
Object.defineProperty(obj, "x" , {
    value: 101,
    writable: false,
    enumerable: false,
    configurable: false
});// 直接抛错了;
console.log( Reflect.defineProperty(obj, "x", {value:101}) ) //返回false：





如果通过直接赋值的方式， 无论是否正确赋值， 都返回设置的值， 除非我们手动确认对象的属性值是否设置成功；

var obj = {};
Object.preventExtensions(obj);
console.log( obj.aa = 1 ); //输出：1；
console.log(obj.aa) //输出：undefined；





var obj = {
    "foo" : 1,
    get bar() {
        return this.foo;
    }
};
var foo = {};
foo.foo = "heheda";
console.log(Reflect.get(obj, "bar", foo)); //heheda






startsWith,endWith,
includes()：返回布尔值，表示是否找到了参数字符串。
startsWith()：返回布尔值，表示参数字符串是否在源字符串的头部。
endsWith()：返回布尔值，表示参数字符串是否在源字符串的尾部。


var s = 'Hello world!';
s.startsWith('Hello') // true
s.endsWith('!') // true
s.includes('o') // true

var s = 'Hello world!';
s.startsWith('world', 6) // true
s.endsWith('Hello', 5) // true
s.includes('Hello', 6) // false



obj = new Proxy({}, {
    has(t, k) { return k.startsWith("door"); }
});
Reflect.has(obj, "doorbell"); // true
Reflect.has(obj, "dormitory"); // false










// 现在这个元素是可以扩展的；
var empty = {};
Reflect.isExtensible(empty); // === true

// 使用preventExtensions方法， 让这个对象无法扩展新属性；
Reflect.preventExtensions(empty);
Reflect.isExtensible(empty); // === false

// 这个对象无法扩展新属性， 可写的属性依然可以改动
var sealed = Object.seal({});
Reflect.isExtensible(sealed); // === false

// 这个对象完全被冻结了
var frozen = Object.freeze({});
Reflect.isExtensible(frozen); // === false



Reflect.isExtensible和Object.isExtensible的区别是， 如果参数不对，一个会抛错， 另一个只是返回true或者false：
Reflect.isExtensible(1);
// 抛错了: 1 is not an object
Object.isExtensible(1);
// 返回false;








var sym = Symbol.for("comet");
var sym2 = Symbol.for("meteor");
var obj = {[sym]: 0, "str": 0, "773": 0, "0": 0,
    [sym2]: 0, "-1": 0, "8": 0, "second str": 0};
Reflect.ownKeys(obj); //输出：/ [ "0", "8", "773", "str", "-1", "second str", Symbol(comet), Symbol(meteor) ]


Reflect.ownKeys的排序是根据: 先显示数字， 数字根据大小排序，然后是 字符串根据插入的顺序排序，
最后是symbol类型的key也根据插入插入顺序排序;出现这中排序是因为，你给一个对象属性赋值时候， 对象的key的排序规则就是先数字，
 在字符串， 最后是symbol类型的数据；











改变数组的长度

var arr = ["duck", "duck", "duck"];
Reflect.set(arr, 2, "goose"); // true
console.log( arr[2] ); // "goose"

Reflect.set(arr, "length", 1); // true
console.log( arr );// ["duck"];









var obj = {
    value : 10,
    set key( value ) {
        console.log("setter");
        this.value =  value;
    },
    get key() {
        return this.value;
    }
};
Reflect.set(obj,"key","heheda", obj);
console.log(obj);   //{value:'heheda'}





