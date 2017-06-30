/*******		http://www.tuicool.com/articles/2QnUba2			*******/
/*******		http://bonsaiden.github.io/JavaScript-Garden/zh/    **********/

// 有很多变通方法可以让数字的字面值看起来像对象。
// 2.toString();//出错
// 2..toString(); // 第二个点号可以正常解析
// 2 .toString(); // 注意点号前面的空格
// (2).toString(); // 2先被计算

255..toString(16)    //ff
console.log(0xff);   //255

255 .toString(2)     //11111111
console.log(0b11111111);   //255

(255).toString(8)    //377
console.log(0o377);   //255





/*******   函数也能结构     ********/
var obj = {
  a:1,
  getter:function(){
    console.log('2131');
  }
};
var { a,getter } = obj; 
console.log(a,getter);   // 1  function(){console.log('2131');}







基本类型的值应该使用 typeof 来检测,而对象的值则应该使用 instanceof 来检测。




/**		如果想截取至倒数最后一个字符采用slice(x,-1)	**/
var stmp = "rcinn.cn"; stmp.slice(1,-1)  //cinn.c

Object.prototype.toString 返回一种标准格式字符串，所以上例可以通过 slice 截取指定位置的字符串，如下所示：
Object.prototype.toString.call([])    // "[object Array]"
Object.prototype.toString.call({})    // "[object Object]"
Object.prototype.toString.call(2)    // "[object Number]"

function is(type, obj) {
	//var clas = Object.prototype.toString.call(obj)  返回的是[object String]
    var clas = Object.prototype.toString.call(obj).slice(8, -1);
    return obj !== undefined && obj !== null && clas === type;
}
is('String', 'test'); // true
is('String', new String('test')); // true





未声明的变量或声明后没有初始化的变量都是undefined的，typeof会返回undefined。
null 值表示一个空对象指针，而这也正是使用 typeof 操作符检测 null 值时会返回”object”的原因




转为Number类型的:parseInt(x)   Number(x)   ~~x   +x   x*1
转为字符串类型的：''+x   String(x)
转为布尔类型的： !!x   Boolean(x)





Object.getOwnPropertySymbols方法，可以获取指定对象的所有Symbol属性名。

/********Symbol.for方法接受一个字符串作为参数，然后搜索有没有以该参数作为名称的Symbol值。
如果有，就返回这个Symbol值，否则就新建并返回一个以该字符串为名称的Symbol值。注意，Symbol函数是总是返回新的值。*************/

var s1 = Symbol.for('foo');
var s2 = Symbol.for('foo');

var s1a = Symbol.keyFor(s1);    /**		Symbol.keyFor方法返回一个已登记的Symbol类型值的key。(获取其参数值)	**/
var s2b = Symbol.keyFor(s2);
console.log(s1 === s2)   // true
console.log(s1a === s2b) // true
var obj = {};
obj[s1] = 's1s1';
obj[s2] = 's2s2';
console.log(obj);		//Object {Symbol(foo): "s2s2"}


var s1 = Symbol.for('foo');
var s2 = Symbol.for('foooo');
var obj = {};
obj[s1] = '1111';	//只能通过[]来设置，与访问其属性
obj[s2] = '2222';
console.log(obj);   //{Symbol(foo): "1111", Symbol(foooo): "2222"}

Object.getOwnPropertySymbols(obj)   //[Symbol(foo), Symbol(foooo)]
Reflect.ownKeys(obj)				//[Symbol(foo), Symbol(foooo)]



最小数值和最大数值分别为Number.MIN_VALUE，Number.MAX_VALUE




/*****		??????????????操作符检测 ??????????   ******/


需要fixed
需要fixed
需要fixed





function foo(...a){console.log(arguments)}  //[1,2,4]
foo(...[1,2,4]); 

var [...a] = [1,2,4]; 
console.log(a);	// a = [1,2,4]

var [b,...a] = [1,2,4]; // a = [1,2,4]
console.log(b,a);  //1  [2,4]


var [a] = [...[1,2]];   //var [a] = [1,2]
console.log(a);	// a = 1


/***    数组的复制  ****/


var arr = [{a:'aa',code:'aa'},{b:'bb',code:'bb'}];
var brr = [...arr]
console.log(brr);       //[{a:'aa',code:'aa'},{b:'bb',code:'bb'}]
arr.push('4444444444');
console.log(arr);       //[{a:'aa',code:'aa'},{b:'bb',code:'bb'},'4444444444']
console.log(brr);       // //[{a:'aa',code:'aa'},{b:'bb',code:'bb'}]


var arr = [{a:'aa',code:'aa'},{b:'bb',code:'bb'}];
var brr = [...arr]
console.log(brr);       //[{a:'aa',code:'aa'},{b:'bb',code:'bb'}]
brr.push('4444444444');
console.log(arr);       //[{a:'aa',code:'aa'},{b:'bb',code:'bb'}]
console.log(brr);       // //[{a:'aa',code:'aa'},{b:'bb',code:'bb'},'4444444444']




相当于concat()    可连接数组
var arr = [{a:'aa',code:'aa'},{b:'bb',code:'bb'}];
var brr = ['1111']
var crr = [...arr,...brr]
console.log(arr);     //[{a:'aa',code:'aa'},{b:'bb',code:'bb'}]
console.log(brr);     //['1111']
console.log(crr);     //[{a:'aa',code:'aa'},{b:'bb',code:'bb'},'1111']













var [foo, [[bar], baz]] = [1, [[2], 3]];
console.log(foo,bar,baz)  //1  2   3


var [x = 1] = [undefined];// x = 1
console.log(x);  //1

var [x = 1] = [null]; //x = null
console.log(x);

//默认值生效的条件是，对象的属性值严格等于undefined。
var {x = 3} = {x: undefined}; //x = 3
var {x = 3} = {x: null}; //x = null



var set = new Set().add('a').add('b');
var [a, b] = set; //a = "a",b = "b"
console.log(a,b)	// a b


var obj = {     //数组是有序的，对象是无序的
  p: [
    "Hello",
    { y: "World" }
  ]
};
var { p: [x, { y }] } = obj; //x = "Hello", y = "World"


var x;
{x} = {x:1}; // SyntaxError: syntax error
({x} = {x:1}) x=1



function move({x = 0, y = 0} = {}) {
  return [x, y];
}
move({x: 3, y: 8}); // [3, 8]
move({x: 3}); // [3, 0]
move({}); // [0, 0]
move(); // [0, 0]


var obj = {a:1,b:{c:1}}
var {a=12,f:{d=12}={}} = obj;
console.log(a,d)   // 1  12
















//对象的解构
const { a, ...noA } = { a: 1, b: 2, c: 3 }
console.log(noA);   // {b: 2, c: 3}
//对象的解构


//数组的解构
var [ a, ...noA ] = ['a','b','c']
console.log(a)       //a
console.log(noA);   // ['b','c']



var { baz:foo } = { baz:'111111', foo:'222' };
console.log(foo);   //111111
console.log(baz);   //出错啦(报错)

















var val = parseInt('12', 10);
console.log(val); //12

console.log(0b1110);
var val = parseInt('1110', 2);
console.log(val); //14


20 .toString(8)  //24
console.log(0o24); //20
var val = parseInt('24', 8);
console.log(val); //20























function example() {
  return [1, 2, 3];
}
var [a, b, c] = example(); //a = 1, b = 2, c = 3
console.log(a, b, c)  //1  2   3



var x=1;
var y =2;
[x, y] = [y, x];
console.log(x,y)  // 2  1 	(交换变量的值)



function f({x, y, z}) { console.log(arguments[0])}   //  {x: 1, y: 2, z: 3}
f({x:1, y:2, z:3})  



var map = new Map()
    .set('first', 'hello')
    .set('second', 'world');

for (let [key, value] of map) {
  console.log(key + " is " + value);
}

for (let [key] of map) { // ...  }  	// 获取键名

for (let [,value] of map) { // ...  }  	// 获取键值



switch语句在比较值时使用的是全等操作符，因此不会发生类型转换（例如，字符串”10”不等于数值10）。

for-in 语句是一种精准的迭代语句,可以用来枚举对象的属性（包括原型链上的属性）。对于数组则是遍历下标




var obj = [{code:'aa',name:'123213'},{code:'bb',name:'444444444444'},{code:'cc',name:'6666666666'}];
for (var {code,name} of obj){
  console.log(`${code},${name}`);
}
//aa,123213
//bb,444444444444
//cc,6666666666





通过for-of遍历对象，一种解决方法是,遍历其keys，另一个方法是使用Generator函数将对象重新包装一下。
var obj = {code:'aa',name:'123213'}
for (var key of Object.keys(obj)){
	console.log(`${key}:${obj[key]}`);  //code:aa    name:123213
}

?????????通过for-of遍历对象，一种解决方法是,遍历其keys，另一个方法是使用Generator函数将对象重新包装一下。?????
var  es6 = {
  edition: 6,
  committee: "TC39",
  standard: "ECMA-262"
};

function* entries(obj) {
  for (let key of Object.keys(obj)) {
    yield [key, obj[key]];
  }
}

for (let [key, value] of entries(es6)) {
  console.log(key, '->', value);
}
//edition -> 6
// committee -> TC39
// standard -> ECMA-262









function test(num1, num2) {
    'use strict';
    num1 = 11;
    console.log(arguments[0]);  //1
}
test(1,2)

function test(num1, num2) {
    num1 = 11;
    console.log(arguments[0]);  //11
}
test(1,2)




function foo(a, b, c) {}
var bar = {};
//在foo 函数内 this 被设置成了 bar。
foo.apply(bar, [1, 2, 3]); // 数组将会被扩展，如下所示
foo.call(bar, 1, 2, 3); // 传递到foo的参数是：a = 1, b = 2, c = 3



没有return，或者return不带任何返回值，都会返回undefined值




注意，参数默认值所处的作用域，不是全局作用域，而是函数作用域。
var x = 1;
function foo(x, y = x) {
  console.log(y);
}
foo(2) // 2

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






rest参数之后不能再有其他参数（即只能是最后一个参数），否则会报错。
函数的length属性，不包括rest参数。
(function(a, ...b) {}).length  // 1




Math.max(...[14, 3, 77])  //77
Math.max(...[14, 3, 77,'8888'])  //8888
Math.max(...[14, 3, 77,'8888','mm']) //NaN




=>
//如果返回一个对象，必须在对象外面加上括号。
params => ({foo: bar})	

// 支持Rest参数
(param1, param2, ...rest) => { statements }
// 支持变量解构
({param1, param2}) => { statements }


箭头函数有几个使用注意点。

不可以使用yield命令，因此箭头函数不能用作Generator函数
函数体内的this对象，绑定定义时所在的对象，而不是使用时所在的对象。
不可以当作构造函数，也就是说，不可以使用new命令，否则会抛出一个错误。
不可以使用arguments对象，该对象在函数体内不存在。

var obj = {
  length: 1,
  doSomeThing(){
    console.log([1,2,3].map(x => x*this.length));
  }
}
obj.doSomeThing();//[1,2,3]

var obj = {
  length:1,
  doSomeThing(){
    console.log([1,2,3].map(function(x){
      return this.length * x;
    }));
  }
}
obj.doSomeThing();//[0,0,0]







????????????????????????Generator????????????????????????


一个对象的属性可以是Generator函数

var obj = { * gen(){} };
var obj = { gen: function* (){} };






闭包是指有权访问另一个函数作用域中的变量的函数

function fn(name) {
    return function(){
      return name;
    };
}
var f = fn("Howie");
f();
f = null;  //释放其内存









类和模块的内部，默认就是严格模式，所以不需要使用 use strict 指定运行模式

import花括号里面的变量名必须与导出的变量名相同，可以通过as起别名
// a.js
var name = 'Michael';
var year = 1958;
export {name, year};
// b.js
import {name as nickName, year} from 'profile';
console.log(nickName);  //Michael

// // 注意default只能导出一个模块，不能导出多个。
// // 导出多个模块，我们用
// // export {模块1，模块2}



export default AA;   ===   export { AA as default };
import { default as AA } from '.AA';  ===  import AA from './AA';


var name = 'Michael';
var year = 1958;
export {name, year};
import * as obj from './AA';
console.log(obj.name,obj.year);  //Michael , 1958






对象使用和属性
一种方式是使用对象字面量表示法。属性名可以是字符串也可以是Symbol类型的数据（后者必须使用方括号包含）
var nickname = Symbol.for('nickname');
var type = 'cat';
var animal = { [nickname]:'mimi', type ,'come from':'shan xi'}
animal[nickname]  //mimi
animal.type    	  //cat
animal['type']	  //cat
animal['come from'] //shan xi





console.log(Array.of(1, 2, 3))          //[1,2,3]
console.log([0, 0, 0,0,0,0,0].fill(7,-2) )  //[0,0,0,0,0,7,7]   (若是负数，则其<length+负数>,作为填充的下标开始)
console.log([0, 0, 0,0,0,0,0].fill(7,2) )  //[0,0,7,7,7,7,7]


var set = new Set([1, 2, 3, 4, 4]);
var a = [...set]
var b = Array.from(set)
console.log(a,b); 	// [1, 2, 3, 4]


Array.prototype.copyWithin(target, start = 0, end = this.length)
target:从该位置开始替换数据。
start （可选）：从该位置开始读取数据，默认为 0 。如果为负值，表示倒数。
end （可选）：到该位置前停止读取数据，默认等于数组长度。如果为负值，表示倒数。
console.log([1, 2, 3, 4, 5].copyWithin(3, 0))  //[1, 2, 3, 1, 2]  






Number.isFinite(number)	返回一个布尔值，该值指示值是否为有限数。
Number.isInteger(number)	返回一个布尔值，该值指示值是否为整数。

Number.isNaN(number)	返回一个布尔值，该值指示某个值是否为保留值 NaN（非数字）。
Number.isNaN(NaN) 		//true 
Number.isNaN('NaN')	 	//false

/*****   判断一个数是否为正数负数或者0     ******/
console.log(Math.sign('213213')); // 1
console.log(Math.sign('-1321'));  //-1
console.log(Math.sign('sdsad'));  //NaN
console.log(Math.sign(0));        //0
console.log(Math.sign(-0));        //-0
/*****   判断一个数是否为正数负数或者0     ******/




其中，encodeURI()主要用于整个URI（例如， http://www.wrox.com/illegal value.htm ），
而 encodeURIComponent()主要用于对URI中的某一段（例如前面URI中的illegal value.htm）进行编码。
它们的主要区别在于，encodeURI()不会对本身属于 URI 的特殊字符进行编码，例如冒号、正斜杠、问号和井字号；
而encodeURIComponent()则会对它发现的任何非标准字符进行编码。



encodeURI()和 encodeURIComponent()方法对应的两个方法分别是 decodeURI()和decodeURIComponent()









基本上，WeakMap的专用场合就是，它的键所对应的对象，可能会在将来消失。WeakMap结构有助于防止内存泄漏。

WeakMap只有四个方法可用：get()、set()、has()、delete()





Reflect.deleteProperty(target,name) 等同于 delete obj[name] 。
var obj={a:1,b:2,c:'222'};
Reflect.deleteProperty(obj,'c')
console.log(obj);   // {a: 1, b: 2}







async函数
一比较就会发现，async函数就是将Generator函数的星号（ * ）替换成async，将yield替换成await，仅此而已。




















/************		http://www.tuicool.com/articles/YnYjau7			*************/


console.log(0b1001110010); //626
console.log(0o626); //406



Number.isFinite() , Number.isNaN()
用来检查是否为有穷以及是否为NaN；

console.log(Number.isFinite(Infinity)); //false
console.log(Number.isNaN(NaN)); //true
这两个新方法只对数值有效，非数值一律返回false。



极小的常量
console.log(Number.EPSILON); //2.220446049250313e-16
console.log(Number.EPSILON.toFixed(16)); //0.0000000000000002



安全整数和Number.isSafeInteger()		<不要只验证运算结果，同时必须验证参与运算的每个值>
console.log(Number.MAX_SAFE_INTEGER); //9007199254740991
console.log(Number.isSafeInteger(Number.MAX_SAFE_INTEGER + 1)); //false




Math.trunc()
Math.trunc方法用于去除一个数的小数部分，返回整数部分。
Math.trunc(4.1) // 4




Math.sign方法用来判断一个数到底是正数、负数、还是零。
console.log(Math.sign(321)); //1
console.log(Math.sign(-321)); //-1
console.log(Math.sign(-0)); //-0
console.log(Math.sign(0)); //0




Math.cbrt方法用于计算一个数的立方根。
console.log(Math.cbrt(8)); //2




ES7 新增的指数运算符 **
2 ** 2 //4
2 ** 3 //8

/*********			http://www.tuicool.com/articles/YnYjau7			***********/











/*************				http://efe.baidu.com/blog/avoid-foreach/				****************/

forEach 总会产生副作用。如果你想避免产生副作用，那就不要使用它了。

forEach 隐藏了迭代的意图。推荐使用更加语义化的迭代方法，例如 map、filter 和 some。

如果每次迭代包含了太多操作，将它们拆分到不同的函数中。

通过多个方法的串联调用，将不同的数据转换隔离开来。如果性能不可接受，那就使用 Transducers 重构它。

改造后的程序最终会多了操作，但是如果你处理得当，那么每一步都会更容易理解。

如果你确实需要循环产生的副作用，完全可以用 forEach。

最后，如果性能测试表明更加语义化的迭代函数是性能瓶颈或者被频繁执行， 那就用 for 循环好了。

/******			数组变对象			******/

var obj = {};
var arr = [{key:'1',name:'23123'},{key:'2',name:'22222222'},{key:'3',name:'33333333'}];
arr.forEach(function (item) {
    obj[item.key] = item;
});
console.log(obj);
//{1:{key:'1',name:'23123'},2:{key:'2',name:'22222222'},3:{key:'3',name:'33333333'}}



var arr = [{key:'1',name:'23123'},{key:'2',name:'22222222'},{key:'3',name:'33333333'}];
var obj1 = arr.reduce((obj,item)=>{
	obj[item.key] = item;
	return obj;
},{})
console.log(obj1);
//{1:{key:'1',name:'23123'},2:{key:'2',name:'22222222'},3:{key:'3',name:'33333333'}}



/*****		优化代码		******/
var matches = [];
var nonMatches = [];
values.forEach(function(value) {
    if (matchesSomething(value)) {
        matches.push(value);
    }
    else {
        nonMatches.push(value);
    }
});



var result = values.reduce(function (result, value) {
    if (matchesSomething(value)) {
        result.matches.push(value);
    }else {
        result.nonMatches.push(value);
    }
}, {matches: [], nonMatches: []});


var matches = values.filter(matchesSomething);
var nonMatches = values.filter(not(matchesSomething));


/****		优化代码		*****/






/*************				http://efe.baidu.com/blog/avoid-foreach/				****************/


var  es6 = {
  edition: 6,
  committee: "TC39",
  standard: "ECMA-262"
};

function* entries(obj) {
  for (let key of Object.keys(obj)) {
    yield [key, obj[key]];
  }
}

for (let [key, value] of entries(es6)) {
  console.log(key, '->', value);
}
//edition -> 6
// committee -> TC39
// standard -> ECMA-262




var { policyPeriod:[beginTime,endTime]=[] } = {policyPeriod:[1,2]};
console.log(beginTime,endTime);  //1 2 
var obj = {a:'21321321'}
var obj1 = {
    ...obj,
    beginTime,
    endTime
};
console.log(obj1);   //{a: "21321321", beginTime: 1, endTime: 2}


































Object.create() 方法使用指定的原型对象和其属性创建了一个新的对象。

Object.create(proto, [ propertiesObject ])
proto
  一个对象，应该是新创建的对象的原型。
如果 proto 参数不是 null 或一个对象值，则抛出一个 TypeError 异常。








var obj = {};

// 创建一个原型为null的空对象
var a = Object.create(null);
console.log(obj);     //{}
console.log(a);       //{}








var a = { p: { value: 42 } }
var o = Object.create({}, a)
console.log(o);               // {p: 42}
a.p.value=12;
console.log(a);               //{p: 12}
console.log(o);               //{p: 42}
















var flat = {};
[[0, 1], [2, 3], [4, 5]].reduce((memo, item, index) => {
  console.log(memo,item,index);               //[0,1]  [2,3]  1
  var flatten = memo.concat(item);
  flat[index] = flatten;
  return flatten;
});
console.log(flat);  //{[0,1,2,3],[0,1,2,3,4,5]}







































proxy(Proxy 对象用于定义基本操作的自定义行为 (例如, 属性查找，赋值，枚举，函数调用,等))
/*************        Proxy 可以理解成，在目标对象之前架设一层“拦截”，外界对该对象的访问，都必须先通过这层拦截，
因此提供了一种机制，可以对外界的访问进行过滤和改写。Proxy 这个词的原意是代理，用在这里表示由它来“代理”某些操作，
可以译为“代理器”。              *********************/
    

var person = {
  name: "张三"
};

var proxy = new Proxy(person, {
  get: function(target, property) {
    if (property in target) {
      return target[property];
    } else {
      throw new ReferenceError("Property \"" + property + "\" does not exist.");
    }
  }
});

proxy.name // "张三"
proxy.age // 抛出一个错误








Number.isFinite(number) 返回一个布尔值，该值指示值是否为有限数。
Number.isInteger(number)  返回一个布尔值，该值指示值是否为整数。

var validator = {
  set: function(obj, prop, value) {
    if (prop === 'age') {
      if (!Number.isInteger(value)) {
        throw new TypeError('The age is not an integer');
      }
      if (value > 200) {
        throw new RangeError('The age seems invalid');
      }
    }

    // 对于age以外的属性，直接保存
    obj[prop] = value;
  }
};
var person = new Proxy({}, validator);

person.age = 100;

person.age // 100
person.age = 'young' // 报错
person.age = 300 // 报错







var validator = {
  get(obj,prop){
    if(Reflect.has(obj,prop)){
      //console.log('访问成功!');
      return obj[prop] = '设置成功'
    }else{
      return obj[prop] = '需要设置值,才能访问'
    }
  }
};
var person = new Proxy({}, validator);

person.age = 100;

console.log(person.age)  // 设置成功
console.log(person.name) // 需要设置值,才能访问









/**       apply方法拦截函数的调用、call和apply操作。apply方法可以接受三个参数，分别是目标对象、
          目标对象的上下文对象（this）和目标对象的参数数组。
**/
var twice = {
  apply (target, ctx, args) {
    debugger;
    return Reflect.apply(...arguments) * 2;
  }
};
function sum (left, right) {
  debugger;
  return left + right;
};
var proxy = new Proxy(sum, twice);
proxy(1, 2) // 6
proxy.call(null, 5, 6) // 22
proxy.apply(null, [7, 8]) // 30




var p = new Proxy(function() {}, {
  apply: function(target, thisArg, argumentsList) {
    console.log("called: " + argumentsList.join(", "));        // "called: 1, 2, 3"
    return argumentsList[0] + argumentsList[1] + argumentsList[2];
  }
});
console.log(p(1, 2, 3));   // 6








var handler = {
    get: function(target, name){
        return Reflect.has(target,name) ? target[name] : 37;
    }
};
var p = new Proxy({}, handler);
p.a = 1;
p.b = undefined;

console.log(p.a, p.b); // 1, undefined

console.log(Reflect.has(p,'c'), p.c);   //false  37
console.log('c' in p, p.c);             //false  37






handler是一个空对象，没有任何拦截效果，访问proxy就等同于访问target。

var target = {};
var handler = {};
var proxy = new Proxy(target, handler);
proxy.a = 'b';
target.a // "b"

handler是一个空对象，没有任何拦截效果，访问proxy就等同于访问target。



var target = {};
var p = new Proxy(target, {});
p.a = 37; 
// 操作转发到目标

console.log(target.a); 
// 37. 操作已经被正确地转发










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


















http://blog.csdn.net/qq_30100043/article/details/53443017

get方法可以继承。
var proto = new Proxy({}, {  
    get(target, propertyKey, receiver) {  
        console.log('GET ' + propertyKey);  
        return target[propertyKey];  
    }  
});  
var obj = Object.create(proto);  
obj.xxx // "GET xxx"  









function createArray(...elements) {  
    let handler = {  
        get(target, propKey, receiver) {  
            let index = Number(propKey);  
            if(index < 0) {  
                propKey = String(target.length + index);  
            }  
            return Reflect.get(target, propKey, receiver);  
        }  
    };  
    let target = [];  
    target.push(...elements);  
    return new Proxy(target, handler);  
}  
let arr = createArray('a', 'b', 'c');  
arr[-1] // c 


var brr = ['a','b','c'];
Reflect.get(brr,1)   //b








/********       需要再次fixed     **********/

var pipe = (function() {  
    return function(value) {  
        var funcStack = [];  
        var oproxy = new Proxy({}, {  
            get: function(pipeObject, fnName) {  
                if(fnName === 'get') {  
                    return funcStack.reduce(function(val, fn) {  
                        return fn(val);  
                    }, value);  
                }  
                funcStack.push(window[fnName]);  
                return oproxy;  
            }  
        });  
        return oproxy;  
    }  
}());  
var double = n => n * 2;  
var pow = n => n * n;  
var reverseInt = n => n.toString().split("").reverse().join("") | 0;  
pipe(3).double.pow.reverseInt.get; // 63  

/********       需要再次fixed     **********/








var handler = {  
    get(target, key) {  
        invariant(key, 'get');  
        return target[key];  
    },  
    set(target, key, value) {  
        invariant(key, 'set');  
        return true;  
    }  
};  
  
function invariant(key, action) {  
    if(key[0] === '_') {  
        throw new Error(`Invalid attempt to ${action} private "${key}" property`);  
    }  
}  
var target = {};  
var proxy = new Proxy(target, handler);  
proxy._prop  
    // Error: Invalid attempt to get private "_prop" property  
proxy._prop = 'c'  
    // Error: Invalid attempt to set private "_prop" property  
    // Error: Invalid attempt to set private "_prop" property  

上面代码中， 只要读写的属性名的第一个字符是下划线， 一律抛错， 从而达到禁止读写内部属性的目的。(私有属性)





var target = function() {  
    return 'I am the target';  
};  
var handler = {  
    apply: function() {  
        return 'I am the proxy';  
    }  
};  
var p = new Proxy(target, handler);  
p()  
// "I am the proxy"  
变量p是 Proxy 的实例， 当它作为函数调用时（ p()）， 就会被apply方法拦截， 返回一个字符串。












注意，如果目标对象不可扩展（extensible），则defineProperty不能增加目标对象上不存在的属性，否则会报错。
另外，如果目标对象的某个属性不可写（writable）或不可配置（configurable），则defineProperty方法不得改变这两个设置。
var handler = {  
    defineProperty(target, key, descriptor) {  
        return false;  
    }  
};  
var target = {};  
var proxy = new Proxy(target, handler);  
proxy.foo = 'bar'  
 defineProperty方法返回false， 导致添加新属性会抛出错误。

注意，如果目标对象不可扩展（extensible），则defineProperty不能增加目标对象上不存在的属性，否则会报错。
另外，如果目标对象的某个属性不可写（writable）或不可配置（configurable），则defineProperty方法不得改变这两个设置。












ownKeys方法用来拦截Object.keys() 操作
let target = {};  
let handler = {  
    ownKeys(target) {  
        return ['hello', 'world'];  
    }  
};  
let proxy = new Proxy(target, handler);  
Object.keys(proxy)  
// [ 'hello', 'world' ]  



http://blog.csdn.net/qq_30100043/article/details/53443017















/****     http://www.cnblogs.com/diligenceday/p/5467634.html       ***/
如果实例化的时候不给第二个参数设置get和set, 相当于没有这个代理器：
var obj = new Proxy({},{});
obj.vvvv = 1;
console.log( obj.vvvv );  //1






var obj = {};
var proto = {};
var handler = {
    getPrototypeOf(target) {
        console.log(target === obj);   // true
        console.log(this === handler); // true
        return proto;
    }
};

var p = new Proxy(obj, handler);
console.log(Reflect.getPrototypeOf(p) === proto);    //true
console.log(Object.getPrototypeOf(p) === proto);    // true







var obj = {};
var p = new Proxy(obj, {
    getPrototypeOf(target) {
        return Array.prototype;
    }
});
console.log(
    Object.getPrototypeOf(p) === Array.prototype,  // true
    Reflect.getPrototypeOf(p) === Array.prototype, // true
    p.__proto__ === Array.prototype,               // true
    Array.prototype.isPrototypeOf(p),              // true
    p instanceof Array                             // true
);







var p = new Proxy(function() {}, {
    construct: function(target, argumentsList, newTarget) {
        console.log("called: " + argumentsList.join(", "));
        return { value: argumentsList[0] * 10 };
    }
});

console.log(new p(1));   //called 1   {value:10}
console.log(Reflect.construct(p,[1]))  //called 1   {value:10}










Proxy.revocable()返回一个可以取消的Proxy代理， 当实例化完毕后，在 执行 Proxy实例对象.revoke(); 
那么这个proxy实例相当于被内存回收， 不存在一样；

var revocable = Proxy.revocable({}, {
    get: function(target, name) {
        return "[[" + name + "]]";
    }
});
var proxy = revocable.proxy;
console.log(proxy.foo); // "[[foo]]"
revocable.revoke();
console.log(proxy.foo); // 抛出异常
proxy.foo = 1           // 抛出异常
delete proxy.foo;       // 抛出异常
typeof proxy            // "object"， 但是它还是一个对象....










Proxy.revocable方法返回一个对象， 该对象的proxy属性是Proxy实例， revoke属性是一个函数， 可以取消Proxy实例。 
上面代码中， 当执行revoke函数之后， 再访问Proxy实例， 就会抛出一个错误。

let target = {};  
let handler = {};  
let {proxy,revoke} = Proxy.revocable(target, handler);  
proxy.foo = 123;  
proxy.foo // 123  
revoke();  
proxy.foo // TypeError: Revoked  


Proxy.revocable方法返回一个对象， 该对象的proxy属性是Proxy实例， revoke属性是一个函数， 可以取消Proxy实例。 
上面代码中， 当执行revoke函数之后， 再访问Proxy实例， 就会抛出一个错误。













需要再次fixed(没看完)
/******        http://www.cnblogs.com/diligenceday/p/5467634.html         *******/












如果一个属性不可配置（configurable）和不可写（writable），则该属性不能被代理，通过 Proxy 对象访问该属性会报错。

const target = Object.defineProperties({}, {
  foo: {
    value: 123,
    writable: false,
    configurable: false
  },
});
const handler = {
  get(target, propKey) {
    return 'abc';
  }
};
const proxy = new Proxy(target, handler);
proxy.foo      // TypeError: Invariant check failed






obj对象禁止扩展，结果使用has拦截就会报错。也就是说，如果某个属性不可配置（或者目标对象不可扩展），
则has方法就不得“隐藏”（即返回false）目标对象的该属性。
var obj = { a: 10 };
Object.preventExtensions(obj);

var p = new Proxy(obj, {
  has: function(target, prop) {
    return false;
  }
});
'a' in p // TypeError is thrown






Obj对象是不可扩展的，这时ownKeys方法返回的数组之中，包含了obj对象的多余属性b，所以导致了报错。

var obj = {
  a: 1
};

Object.preventExtensions(obj);

var p = new Proxy(obj, {
  ownKeys: function(target) {
    return ['a', 'b'];
  }
});

Object.getOwnPropertyNames(p)
// Uncaught TypeError: 'ownKeys' on proxy: trap retu