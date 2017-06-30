function f(x, y) {
  return {x, y};
}
// 等同于
function f(x, y) {
  return {x: x, y: y};
}
f(1, 2) // Object {x: 1, y: 2}



var o = {
  method() {
    return "Hello!";
  }
};
// 等同于
var o = {
  method: function() {
    return "Hello!";
  }
};



var obj = {
  * m(){
    yield 'hello world';
  }
};



let propKey = 'foo';
let obj = {
  [propKey]: true,
  ['a' + 'bc']: 123,
  ['h'+'ello'](){
  	return 'aaa';
  }
};
console.log(obj[propKey]);        //true
console.log(obj['foo']);          //true
console.log(obj.foo);             //true

console.log(obj['a'+'bc']);	      //123
console.log(obj['abc']);	      //123
console.log(obj.abc);	          //123

console.log(obj.hello());        //aaa
console.log(obj['hello']());     //aaa




注意，属性名表达式与简洁表示法，不能同时使用，会报错。
// 报错
var foo = 'bar';
var bar = 'abc';
var baz = { [foo] };
// 正确
var foo = 'bar';
var baz = { [foo]: 'abc'};
console.log(baz[foo]);      //abc
console.log(baz['bar']);	//abc
console.log(baz.bar);		//abc






注意，属性名表达式如果是一个对象，默认情况下会自动将对象转为字符串[object Object]，这一点要特别小心。
[keyA]和[keyB]得到的都是[object Object]，所以[keyB]会把[keyA]覆盖掉，而myObject最后只有一个[object Object]属性。
var keyA = {a: 1};
var keyB = ['aa'];
var myObject = {
  [keyA]: 'valueA',
  [keyB]: 'valueB'
};
console.log(myObject);            //{[object Object]: "valueA", aa: "valueB"}
console.log(myObject[keyA]);      //valueA
console.log(myObject[{a:1}]);	  //valueA
console.log(myObject[['aa']]);	  //valueB
console.log(myObject[keyB]);	  //valueB


const keyA = {a: 1};
const keyB = {b: 2};
const myObject = {
  [keyA]: 'valueA',
  [keyB]: 'valueB'
};
myObject // Object {[object Object]: "valueB"}







函数的name属性，返回函数名。对象方法也是函数，因此也有name属性。
const person = {
  sayName() {
    console.log('hello!');
  },
};
person.sayName.name   // "sayName"



如果对象的方法使用了取值函数（getter）和存值函数（setter），则name属性不是在该方法上面，
而是该方法的属性的描述对象的get和set属性上面，返回值是方法名前加上get和set。
const obj = {
  get foo() {},
  set foo(x) {}
};
obj.foo.name   // TypeError: Cannot read property 'name' of undefined
const descriptor = Object.getOwnPropertyDescriptor(obj, 'foo');
descriptor.get.name // "get foo"
descriptor.set.name // "set foo


bind方法创造的函数，name属性返回bound加上原函数的名字；Function构造函数创造的函数，name属性返回anonymous。
(new Function()).name // "anonymous"
var doSomething = function() {};
doSomething.bind().name // "bound doSomething"






如果对象的方法是一个 Symbol 值，那么name属性返回的是这个 Symbol 值的描述。
const key1 = Symbol('description');
const key2 = Symbol();
let obj = {
  [key1]() {},
  [key2]() {},
};
obj[key1].name // "[description]"
obj[key2].name // ""





Object.is就是部署这个算法的新方法。它用来比较两个值是否严格相等，与严格比较运算符（===）的行为基本一致。

Object.is('foo', 'foo')// true
Object.is({}, {})     //false


不同之处只有两个：一是+0不等于-0，二是NaN等于自身。
+0 === -0 //true
NaN === NaN // false
Object.is(+0, -0) // false
Object.is(NaN, NaN) // true





如果目标对象与源对象有同名属性，或多个源对象有同名属性，则后面的属性会覆盖前面的属性
var target = { a: 1, b: 1 };
var source1 = { b: 2, c: 2 };
var source2 = { c: 3 };
Object.assign(target, source1, source2);
target // {a:1, b:2, c:3}



var obj = {a: 1};
Object.assign(obj) === obj // true         (如果只有一个参数，Object.assign会直接返回该参数。)

typeof Object.assign(2) // "object"        (如果该参数不是对象，则会先转成对象，然后返回。)

Object.assign(undefined) // 报错
Object.assign(null) // 报错




如果非对象参数出现在源对象的位置（即非首参数），那么处理规则有所不同。首先，这些参数都会转成对象，如果无法转成对象，就会跳过。
这意味着，如果undefined和null不在首参数(源对象)，就不会报错。
let obj = {a: 1};
Object.assign(obj, undefined) === obj // true
Object.assign(obj, null) === obj // true



v1、v2、v3分别是字符串、布尔值和数值，结果只有字符串合入目标对象（以字符数组的形式），数值和布尔值都会被忽略。
这是因为只有字符串的包装对象，会产生可枚举属性。
var v1 = 'abc';
var v2 = true;
var v3 = 10;
var obj = Object.assign({}, v1, v2, v3);
console.log(obj); // { "0": "a", "1": "b", "2": "c" }



*******************测试...情况下的不可枚举情况
Object.assign拷贝的属性是有限制的，只拷贝源对象的自身属性（不拷贝继承属性），也不拷贝不可枚举的属性（enumerable: false）。
Object.assign({b: 'c'},
  Object.defineProperty({}, 'invisible', {
    enumerable: false,
    value: 'hello'
  })
)// { b: 'c' }



Object.assign({ a: 'b' }, { [Symbol('c')]: 'd' })
// { a: 'b', Symbol(c): 'd' }




Object.assign拷贝得到的是这个对象的引用。
var target = { a: { b: 'c', d: 'e' } }
var source = { a: { b: 'hello' } }
Object.assign(target, source)
// { a: { b: 'hello' } }



Object.assign([1, 2, 3], [4, 5])
// [4, 5, 3]










class Point {
  constructor(x, y) {
    Object.assign(this, {x, y});
  }
}
var a =new Point('a','b');
console.log(a);           //{x: "a", y: "b"}
Reflect.construct(Point,['a','b'])    //{x: "a", y: "b"}


Object.assign(SomeClass.prototype, {
  someMethod(arg1, arg2) {},
  anotherMethod() {}
});
// 等同于下面的写法
SomeClass.prototype.someMethod = function (arg1, arg2) {};
SomeClass.prototype.anotherMethod = function () {};




class Point {
  constructor(x, y) {
    Object.assign(this, {x, y});
  }
}
Object.assign(Point.prototype, {
  someMethod(...arg) {
	console.log(arg);
	console.log(...arg);
  },
  anotherMethod() {
    console.log('this is Object.assgin()');
  }
});
var a = new Point('a','b');
console.log(a);                       //{x: "a", y: "b"}
a.someMethod('aa','bb','cc','dd');    //["aa", "bb", "cc", "dd"]                   aa bb cc dd
a.someMethod({a:'aa',b:'bb'},'ffff')  //[{a:"aa",b:"bb"},"ffff"]                   {a:"aa",b:"bb"},"ffff"
a.anotherMethod();                    //this is Object.assgin()



class Point {
  constructor(x, y) {
    Object.assign(this, {x, y});
	console.log(x,y);
  }
}
Object.assign(Point.prototype, {
  someMethod(...arg) {
	console.log(arg);
	console.log(...arg);
	return this;
  },
  anotherMethod() {
    console.log('this is Object.assgin()');
	return this;
  }
});
Reflect.construct(Point,['aaa','bbb'])  //aaa  bbb
Reflect.construct(Point,['aaa','bbb']).anotherMethod().someMethod('11','22') //aaa bbb ! this is Object.assgin() ! ['11','22']  11 22
Reflect.construct(Point,['aaa','bbb']).someMethod('11','22').anotherMethod() //aaa bbb ! ['11','22']  11 22 ! this is Object.assgin()







保持继承链
function clone(origin) {
  let originProto = Object.getPrototypeOf(origin);
  return Object.assign(Object.create(originProto), origin);
}



将多个对象合并到某个对象。
const merge = (target, ...sources) => Object.assign(target, ...sources);
const merge = (...sources) => Object.assign({}, ...sources);








描述对象的enumerable属性，称为”可枚举性“，如果该属性为false，就表示某些操作会忽略当前属性。
let obj = { foo: 123 };
Object.getOwnPropertyDescriptor(obj, 'foo')     //{value: 123,writable: true,enumerable: true,configurable: true}

ES5 有三个操作会忽略enumerable为false的属性。
	for...in循环：只遍历对象自身的和继承的可枚举的属性
	Object.keys()：返回对象自身的所有可枚举的属性的键名
	JSON.stringify()：只串行化对象自身的可枚举的属性

ES6 Object.assign()，会忽略enumerable为false的属性，只拷贝对象自身的可枚举的属性。



只有for...in会返回继承的属性。实际上，引入enumerable的最初目的，就是让某些属性可以规避掉for...in操作。
比如，对象原型的toString方法，以及数组的length属性，就通过这种手段，不会被for...in遍历到。
Object.getOwnPropertyDescriptor(Object.prototype, 'toString').enumerable
// false

Object.getOwnPropertyDescriptor([], 'length').enumerable
// false


ES6规定，所有Class的原型的方法都是不可枚举的。
Object.getOwnPropertyDescriptor(class {foo() {}}.prototype, 'foo').enumerable
// false








for...in 循环遍历对象自身的和继承的可枚举属性（不含 Symbol 属性）。
Object.keys返回一个数组，包括对象自身的（不含继承的）所有可枚举属性（不含 Symbol 属性）。
Object.getOwnPropertyNames返回一个数组，包含对象自身的所有属性（不含 Symbol 属性，但是包括不可枚举属性）。
Object.getOwnPropertySymbols返回一个数组，包含对象自身的所有 Symbol 属性。
Reflect.ownKeys返回一个数组，包含对象自身的所有属性，不管属性名是 Symbol 或字符串，也不管是否可枚举


以上的5种方法遍历对象的属性，都遵守同样的属性遍历的次序规则。
首先遍历所有属性名为数值的属性，按照数字排序。
其次遍历所有属性名为字符串的属性，按照生成时间排序。


Reflect.ownKeys({ [Symbol()]:0, b:0, 10:0, 2:0, a:0 })
// ['2', '10', 'b', 'a', Symbol()]
最后遍历所有属性名为 Symbol 值的属性，按照生成时间排序。


var target = { a: 1, b: 9 };
Object.defineProperty(target,'ggg',{value:'112321',enumerable: false});
Object.defineProperty(target,Symbol('gehonghap'),{value:'112321',enumerable: false});
console.log(target);            //{a: 1, b: 9, ggg: "112321"}
for (var key in target){
	console.log(key,target[key]);      //a 1     b  9
}

for (var key of Object.keys(target)){
	console.log(key,target[key]);      //a 1     b  9
}

for (var key of Object.getOwnPropertyNames(target)){
	console.log(key,target[key]);     //a 1      b  9     ggg 112321
}

for (var key of Object.getOwnPropertySymbols(target)){
	console.log(key,target[key]);     //Symbol(gehonghap) "112321"
}

for (var key of Reflect.ownKeys(target)){
	console.log(key,target[key]);     //a 1      b  9     ggg 112321   Symbol(gehonghap) "112321"
}







function SomeOtherObj(){}
var obj = {
  method: function(){}
};
obj.__proto__ = SomeOtherObj;
console.log(obj);             //obj原型等于SomeOtherObj

如果一个对象本身部署了__proto__属性，则该属性的值就是对象的原型。
Object.getPrototypeOf({ __proto__: null })// null






let proto = {};
let obj = { x: 10 };
Object.setPrototypeOf(obj, proto);

proto.y = 20;
proto.z = 40;
var { x,y,z } = obj;
console.log(x,y,z);  //10   20   40







如果第一个参数不是对象，会自动转为对象。但是由于返回的还是第一个参数，所以这个操作不会产生任何效果。
Object.setPrototypeOf(1, {}) === 1 // true
Object.setPrototypeOf('foo', {}) === 'foo' // true
Object.setPrototypeOf(true, {}) === true // true

由于undefined和null无法转为对象，所以如果第一个参数是undefined或null，就会报错。
Object.setPrototypeOf(undefined, {})
// TypeError: Object.setPrototypeOf called on null or undefined

Object.setPrototypeOf(null, {})
// TypeError: Object.setPrototypeOf called on null or undefined








function Rectangle() {}
var rec = new Rectangle();
Object.getPrototypeOf(rec) === Rectangle.prototype// true
Object.setPrototypeOf(rec, Object.prototype);
Object.getPrototypeOf(rec) === Rectangle.prototype// false



function Rectangle() {}
var a = Reflect.construct(Rectangle,[])
Object.getPrototypeOf(a) === Rectangle.prototype// true
Reflect.getPrototypeOf(a) === Rectangle.prototype// true

var b = new Rectangle();
Object.getPrototypeOf(b) === Rectangle.prototype// true
Reflect.getPrototypeOf(b) === Rectangle.prototype// true







如果参数不是对象，会被自动转为对象。
// 等同于 Object.getPrototypeOf(Number(1))
Object.getPrototypeOf(1)
// Number {[[PrimitiveValue]]: 0}


// 等同于 Object.getPrototypeOf(String('foo'))
Object.getPrototypeOf('foo')
// String {length: 0, [[PrimitiveValue]]: ""}


// 等同于 Object.getPrototypeOf(Boolean(true))
Object.getPrototypeOf(true)
// Boolean {[[PrimitiveValue]]: false}


Object.getPrototypeOf(1) === Number.prototype // true
Object.getPrototypeOf('foo') === String.prototype // true
Object.getPrototypeOf(true) === Boolean.prototype // true



如果参数是undefined或null，它们无法转为对象，所以会报错。
Object.getPrototypeOf(null)
// TypeError: Cannot convert undefined or null to object

Object.getPrototypeOf(undefined)
// TypeError: Cannot convert undefined or null to object










let {keys, values, entries} = Object;
let obj = { a: 1, b: 2, c: 3 };

for (let key of keys(obj)) {
  console.log(key); // 'a', 'b', 'c'
}

for (let value of values(obj)) {
  console.log(value); // 1, 2, 3
}

for (let [key, value] of entries(obj)) {
  console.log([key, value]); // ['a', 1], ['b', 2], ['c', 3]
}








Object.create方法的第二个参数添加的对象属性（属性p），如果不显式声明，默认是不可遍历的，
因为p的属性描述对象的enumerable默认是false，Object.values不会返回这个属性。只要把enumerable改成true，
Object.values就会返回属性p的值。
var obj = Object.create({}, {p: {value: 42}});
Object.values(obj) // []

var obj = Object.create({}, {p:{
    value: 42,
    enumerable: true
  }
});
Object.values(obj) // [42]



Object.values会过滤属性名为 Symbol 值的属性。
Object.values({ [Symbol()]: 123, foo: 'abc' });   // ['abc']
Object.keys({ [Symbol()]: 123, foo: 'abc' });     //["foo"]
Object.entries({ [Symbol()]: 123, foo: 'abc' });  //[['foo','abc']]




Object.values方法的参数是一个字符串，会返回各个字符组成的一个数组。
Object.values('foo')// ['f', 'o', 'o']
Object.values(42) // []
Object.values(true) // []   
由于数值和布尔值的包装对象，都不会为实例添加非继承的属性。所以，Object.values会返回空数组

















Object.entries方法的另一个用处是，将对象转为真正的Map结构。
var obj = { foo: 'bar', baz: 42 };
var map = new Map(Object.entries(obj));
map // Map { foo: "bar", baz: 42 }         //{"foo" => "bar", "baz" => 42}
[...map]  //[[foo,'bar'],[baz,42]]
var [x,y] = [...map]
console.log(x,y);["foo", "bar"] ["baz", 42]
[...x,...y]   //["foo", "bar", "baz", 42]






var obj = { foo: 'bar', baz: 42 };
function* getItem(obj){
	for(var key of Object.keys(obj)){
		yield [key,obj[key]]
	}	
}
for (var [key,val] of getItem(obj)){
	console.log(key,val);
}
//foo bar    baz 42


var obj = { foo: 'bar', baz: 42 };
function getItem(obj){
	var arr = []
	for(var i of Object.keys(obj)){
		arr.push([i,obj[i]])
	}
	return arr;
}
for (var [key,val] of getItem(obj)){
	console.log(key,val);
}
//foo bar    baz 42


var obj = { foo: 'bar', baz: 42 };
for (var [key,val] of Object.entries(obj)){
	console.log(key,val);
}
//foo bar    baz 42






var obj = { foo: 'bar', baz: 42 };
Object.entries(obj).reduce((result,item)=>{
	result = result.concat(item)
	return result;
},[])          //["foo", "bar", "baz", 42]


var obj = { foo: 'bar', baz: 42 };
var [key,val] = Object.entries(obj);
var heArr = [...key,...val]   //["foo", "bar", "baz", 42]









解构赋值的拷贝是浅拷贝，即如果一个键的值是复合类型的值（数组、对象、函数）、那么解构赋值拷贝的是这个值的引用，
而不是这个值的副本。
let obj = { a: { b: 1 } };
let { ...x } = obj;
console.log(x);    //{ a: { b: 1 } }
obj.a.b = 2;
x.a.b // 2






解构赋值不会拷贝继承自原型对象的属性。
let o1 = { a: 1 };
let o2 = { b: 2 };
o2.__proto__ = o1;
let { ...o3 } = o2;
o3 // { b: 2 }
o3.a // undefined







变量x是单纯的解构赋值，所以可以读取对象o继承的属性；
变量y和z是双重解构赋值，只能读取对象o自身的属性，所以只有变量z可以赋值成功。
var o = Object.create({ x: 1, y: 2 });
o.z = 3;
let { x, ...{ y, z } } = o;
x // 1
y // undefined
z // 3






function Rectangle(a,b,...arg) {console.log(arg);}   //["cc", "dd", "ee"]
Rectangle('aa','bb','cc','dd','ee');

function Rectangle(...arg) {console.log(arg);}   //["aa", "bb", "cc", "dd", "ee"]
Rectangle('aa','bb','cc','dd','ee');








let z = { a: 3, b: 4 };
let n = { ...z };
n // { a: 3, b: 4 }


let aClone = { ...a };
// 等同于
let aClone = Object.assign({}, a);


let ab = { ...a, ...b };
// 等同于
let ab = Object.assign({}, a, b);





a对象的x属性和y属性，拷贝到新对象后会被覆盖掉。
let aWithOverrides = { ...a, x: 1, y: 2 };
// 等同于
let aWithOverrides = { ...a, ...{ x: 1, y: 2 } };
// 等同于
let x = 1, y = 2, aWithOverrides = { ...a, x, y };
// 等同于
let aWithOverrides = Object.assign({}, a, { x: 1, y: 2 });
a对象的x属性和y属性，拷贝到新对象后会被覆盖掉。







把自定义属性放在扩展运算符前面，就变成了设置新对象的默认属性值。
let aWithDefaults = { x: 1, y: 2, ...a };
// 等同于
let aWithDefaults = Object.assign({}, { x: 1, y: 2 }, a);
// 等同于
let aWithDefaults = Object.assign({ x: 1, y: 2 }, a);
把自定义属性放在扩展运算符前面，就变成了设置新对象的默认属性值。






// 并不会抛出错误，因为x属性只是被定义，但没执行
let aWithXGetter = {
  ...a,
  get x() {
    throws new Error('not thrown yet');
  }
};

// 会抛出错误，因为x属性被执行了
let runtimeError = {
  ...a,
  ...{
    get x() {
      throws new Error('thrown now');
    }
  }
};






如果扩展运算符的参数是null或undefined，这两个值会被忽略，不会报错。
let emptyObject = { ...null, ...undefined }; // 不报错    {}









