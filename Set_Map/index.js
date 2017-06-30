/*************ES6提供了新的数据结构Set。它类似于数组，但是成员的值都是唯一的，没有重复的值。

Set函数可以接受一个数组（或类似数组的对象）作为参数，用来初始化。************/

var set = new Set([1, 2, 3, 4, 4]);
var a = [...set]
var b = Array.from(set)
console.log(a,b); 	// [1, 2, 3, 4]


/*****     数组转为set对象     ******/
var arr = ['a','b','c'];
var s = new Set(arr);
console.log(s); //Set {"a", "b", "c"}



/*******	在Set内部，两个NaN是相等。两个对象总是不相等的。可以用length来检测	***********/
var s = new Set();
[2, 3, 5, 4, 5, 2, 2,NaN,NaN,{a:1},{a:1}].map(x => s.add(x));
console.log(s);  //Set {2, 3, 5, 4, NaN,{a:1},{a:1}}
for (let i of s) {
  console.log(i);
}
/******		set内部的元素可以遍历for...of...	*******/




/***set拥有的方法:
	set.size返回其元素的个数
	add(value) : 添加某个值。
	delete(value) : 删除某个值。
	has(value) : 返回一个布尔值，表示该值是否为Set的成员。
	clear() : 清除所有成员*/


var set = new Set(['red', 'green', 'blue']);
for(let item of set.keys()){
 console.log(item);     //red,green,blue
}


for(let item of set.values()){
    console.log(item);  //red,green,blue
}

for(let item of set.entries()){
    console.log(item[0],item[1]);
}
// red red
// green green
// blue blue

set.forEach((item,index)=>{
    console.log(item);  //red,green,blue
})


/****************
weakset
WeakSet结构与Set类似，也是不重复的值的集合。

WeakSet和Set的区别：

WeakSet的成员只能是对象，而不能是其他类型的值
WeakSet中的对象都是弱引用，即垃圾回收机制不考虑WeakSet对该对象的引用，也就是说，如果其他对象都不再引用该对象，
那么垃圾回收机制会自动回收该对象所占用的内存，不考虑该对象还存在于WeakSet之中。这个特点意味着，
无法引用WeakSet的成员，因此WeakSet是不可遍历的。 	*****************/













/**********		Map(http://www.cnblogs.com/sker/p/5520392.html)		************/
// - size : 返回成员总数。 
// - set(key, value) : 设置一个键值对。 
// - get(key) : 读取一个键。 
// - has(key) : 返回一个布尔值，表示某个键是否在Map结构中。 
// - delete(key) : 删除某个键。 
// - clear() : 清除所有成员。



// Map结构提供了“值—值”的对应，是一种更完善的Hash结构实现。如果你需要“键值对”的数据结构，Map比Object更合适。
// 它类似于对象，也是键值对的集合，但是“键”的范围不限于字符串，各种类型的值（包括对象）都可以当作键。

var m = new Map();
var o = {p: "Hello World"};

m.set(o, "content")
m.get(o) // "content"
m.has(o) // true
m.delete(o) // true
m.has(o) // false

//只有对同一个对象的引用，Map结构才将其视为同一个键。这一点要非常小心。


var map = new Map();
map.set(['a'], 555);
map.get(['a']) // undefined
//上面代码的set和get方法，表面是针对同一个键，但实际上这是两个值，内存地址是不一样的，因此get方法无法读取该键，返回undefined。


var m = new Map();
m.set(NaN,'21312312321');
m.get(NaN)	//21312312321
/************
如果Map的键是一个简单类型的值（数字、字符串、布尔值），则只要两个值严格相等，Map将其视为一个键，包括0和-0。
另外，虽然NaN不严格相等于自身，但Map将其视为同一个键。		***************/











/******      map转为数组       ********/
var map = new Map().set(true, 7).set({foo: 3},['abc']);
var crr = [...map];
console.log(crr);   //[[true, 7],[{foo: 3},['abc']]]



var map = new Map().set({foo: 3},['abc']).set(true, 7);
map.forEach((val,index)=>{
    if(typeof(index)=='object'){
        return;
    }
    console.log(val,index);
})
//  7 true 

var map = new Map().set({foo: 3},['abc']).set(true, 7);
for(var index of map.keys()){
    if(typeof(index)=='object'){
        console.log(`${map.get(index)}`);   //['abc']   <Array>
    }
    console.log(index); //{foo: 3}       true
}





/*****     数组转为map对象     ******/
var m = new Map([[true, 7],[{foo: 3},['abc']]]);
console.log(m); //Map {true => 7, Object {foo: 3} => ["abc"]}


/**********     对象转为map对象        ************/
function objToMap(obj){
    let map = new Map();
    for (let k of Object.keys(obj)){
        map.set(k, obj[k]);
    }
    return map;
}
var a = objToMap({yes: true, no: false});
console.log(a);     //Map {"yes" => true, "no" => false}


var obj = { foo: 'bar', baz: 42 };
var map = new Map(Object.entries(obj));
map       //{"foo" => "bar", "baz" => 42}

/******    map对象转为对象     ******/
var m = new Map();
m.set(['a'],'21321').set(['b'],'asdsadsa');
function mapToObj(m){
    var obj = {};
    for(var i of  m.keys(m)){
        obj[i] = m.get(i)
    }
    return obj;
}
var b = mapToObj(m);
console.log(b);   // {a: "21321", b: "asdsadsa"}  //Object











var m = new Map();
var o = {a:1};
m.set(o,'1312');
m.get(o) //1312



var m = new Map();

m.set("edition", 6); // 键是字符串
m.set(262, "standard"); // 键是数字
m.set(undefined, "nah"); //键是undefined

var hello = function() {
    console.log("hello");
}
m.set(hello, "Hello ES6!");  //键是函数

m.has("edition");  //true
m.has("years");  //false
m.has(262);  //true
m.has(undefined);  //true
m.has(hello);  //true

m.delete( undefined );  
m.has( undefined );  //false

m.get( hello );  //hello ES6!
m.get("edition");  //6







var m = new Map();
var arr = ['a','b'];
m.set(arr,'123213');




//entries() : 返回所有成员的遍历器。(与下面的产生效果相同)
for (var item of m) {
    console.log("Key: %s, Value: %s", item[0], item[1]);  	//Key: Array[2], Value: 123213
}
//entries() : 返回所有成员的遍历器。
for ( var item of m.entries() ) {
    console.log("Key: %s, Value: %s", item[0], item[1]);	//Key: Array[2], Value: 123213
}

//values() : 返回键值的遍历器。
for ( var value of m.values() ) {
    console.log("value: %s", value); 	//value: 123213
}

//keys() : 返回键名的遍历器。
for ( var key of m.keys() ) {
    console.log("key: %s", key);	//key: Array[2]
}





var m = new Map();
var arr = ['a','b'];
m.set(arr,'123213');

m.forEach(function(value, key) {
    console.log("Key: %s, Value: %s", key, value);
});
//Key: Array[2], Value: 123213






var m = new Map();
var arr = ['a','b'];
m.set(arr,'123213');

var reporter = {
    report: function(value,key) {
        console.log("key: %s, Value: %s", key, value);
    }
};

m.forEach(function(value, key) {
    this.report(value,key)
}, reporter);
//key: Array[2], Value: 123213




var m = new Map();
var o = {p: "Hello World"};
m.set(o);
//console.log(JSON.stringify(m.keys()));
for(var i of m.keys()){
    console.log(JSON.stringify(i));
}
//{"p":"Hello World"}



/************       WeakMap()      ************/

WeakMap结构与Map类似，唯一的区别是它只接受对象作为键名（null）除外，而且键名所指向的对象不计入垃圾回收机制。

该对象设计的目的在于，键名是对象的弱引用，所以其所对应的对象可能被自动回收。基本上，WeakMap的专用场合就是，
他的键所对应的对象可能会在将来消失，该结构有助于防止内存泄漏。

WeakMap与Map在API上的区别主要是两个：一是，没有遍历操作；也没有size属性；二是无法清空。
WeakMap只有四个方法：get、set、has、delete。WeakMap的另一个用处是部署私有变量。









/******************     ES6管理私有数据 http://efe.baidu.com/blog/managing-the-private-data-of-es6-classes/    ***************/


// 有很多变通方法可以让数字的字面值看起来像对象。
// 2.toString();//出错
// 2..toString(); // 第二个点号可以正常解析
// 2 .toString(); // 注意点号前面的空格
// (2).toString(); // 2先被计算



/**********************     因为symbol键值是被设计来避免冲突的，所以JavaScript最基本的对象检测特性是会忽略symbol键值的。
以for-in循环为例，循环只会遍历对象的字符串类型的键。Symbol键直接被忽略过了。
Object.key(obj)和 Object.getOwnPropertyNames(obj) 也是这样运作的。   **********************/

//http://www.csdn.net/article/2015-07-09/2825172-es6-in-depth-symbols(未读完，还有需要fixed)


/********Symbol.for方法接受一个字符串作为参数，然后搜索有没有以该参数作为名称的Symbol值。
如果有，就返回这个Symbol值，否则就新建并返回一个以该字符串为名称的Symbol值。注意，Symbol函数是总是返回新的值。*************/

var s1 = Symbol.for('foo');
var s2 = Symbol.for('foo');
var s1a = Symbol.keyFor(s1);
var s2b = Symbol.keyFor(s2);
console.log(s1 === s2)   // true
console.log(s1a === s2b) // true





var obj = {};
var mySymbol = Symbol();  
var mySymbol1 = Symbol();
obj[mySymbol] = "ok!";  // guaranteed not to collide
obj[mySymbol1] = "ok11111!";

console.log(obj);   //{Symbol(): "ok!", Symbol(): "ok11111!"}
for(var item in obj){
    console.log(item); //无值(JavaScript最基本的对象检测特性是会忽略symbol键值)
}
Object.keys(obj)        //无值(JavaScript最基本的对象检测特性是会忽略symbol键值)  
Object.getOwnPropertyNames(obj) //无值(JavaScript最基本的对象检测特性是会忽略symbol键值)


//将所对象的所有symbol键
Object.getOwnPropertySymbols(obj)   //[Symbol(), Symbol()]    (Array)   <将所对象的所有symbol键>
//将会同时返回string和symbol类型的键
Reflect.ownKeys(obj)            //[Symbol(), Symbol()]    (Array)       <将会同时返回string和symbol类型的键>




/***     与JS中的其它类型不同，它不能被自动转换为字符串(变为字符串使用toString()或者String())   ***/
var sym = Symbol("<3");  
"your symbol is " + sym.toString()      //"your symbol is Symbol(<3)"

"your symbol is " + String(sym)  //"your symbol is Symbol(<3)"




/*********        http://blog.csdn.net/xiejunna/article/details/53586682                *********/
let sym2 = Symbol("key"); // 可选的字符串key


let sym = Symbol();
let obj = {
    [sym]: "value"
};
console.log(obj[sym]); // "value"



const getClassNameSymbol = Symbol();
class C {
    [getClassNameSymbol](){
       return "C";
    }
}
let c = new C();
let className = c[getClassNameSymbol](); 
console.log(className);     // "C"
        



//http://www.csdn.net/article/2015-07-09/2825172-es6-in-depth-symbols(未读完，还有需要fixed)


/**********************     因为symbol键值是被设计来避免冲突的，所以JavaScript最基本的对象检测特性是会忽略symbol键值的。
以for-in循环为例，循环只会遍历对象的字符串类型的键。Symbol键直接被忽略过了。
Object.key(obj)和 Object.getOwnPropertyNames(obj) 也是这样运作的。   **********************/





mock平台，菜单。微信公众号的文章()  Co





/***********            http://efe.baidu.com/blog/managing-the-private-data-of-es6-classes/                    *********/

/******         es6实现私有数据             ******/
/***优点：     可以使用原型方法；       私有属性命名不会冲突。
缺点：     代码不如命名约定优雅；   不太安全：可以通过 Reflect.ownKeys() 列出一个对象所有的属性键名（即使用了 Symbol）***/

const _counter = Symbol('counter');
const _action = Symbol('action');

class Countdown {
    constructor(counter, action) {
        this[_counter] = counter;
        this[_action] = action;
    }
    dec() {
        if (this[_counter] < 1) return;
        this[_counter]--;
        if (this[_counter] === 0) {
            this[_action]();
        }
    }
}
let c = new Countdown(2, () => console.log('DONE'));
console.log(Object.keys(c));    // []
console.log(Reflect.ownKeys(c));// [Symbol(counter), Symbol(action)]





const _counter = Symbol('counter');
const _action = Symbol('action');
class Countdown {
    constructor(counter, action) {
        this[_counter] = counter;
        this[_action] = action;
    }
    
    dec() {
        //debugger;
        if (this[_counter] < 1) return;
        this[_counter]--;
        //debugger;
        if(this[_counter]>=1){
            this.dec();
            //return;
        }
        
        if (this[_counter] === 0) {
            console.log('11111');
            this[_action]();
        }
        console.log(this[_counter]);
    }
}
let c = new Countdown(2, () => console.log('DONE'));
console.log(c.dec());
/**************     每一个 Symbol 都是唯一的，这就是为什么使用 Symbol 的属性键名之间不会冲突的原因。
并且，Symbol 某种程度上来说是隐式的，但也并不完全是(   Reflect.ownKeys()或者Object.getOwnPropertyNames()   )   **************/



















var { policyPeriod:[beginTime,endTime]=[] } = {policyPeriod:[1,2]};
console.log(beginTime,endTime);  //1 2 
var obj = {a:'21321321'}
var obj1 = {
    ...obj,
    beginTime,
    endTime
};
console.log(obj1);   //{a: "21321321", beginTime: 1, endTime: 2}




















/**************             http://www.tuicool.com/articles/FnQ3iiV            ****************/
Symbol.for()方法首先在全局Symbol注册表中搜索键为"uid"的Symbol是否存在，如果存在，直接返回已有的Symbol；
否则，创建一个新的Symbol，并使用这个键在Symbol全局注册表中注册，随即返回新创建的Symbol。

let uid = Symbol.for("uid");
let object = {
    [uid]: "12345"
};

console.log(object[uid]);       // "12345"
console.log(uid);               // "Symbol(uid)"

let uid2 = Symbol.for("uid");

console.log(uid === uid2);      // true
console.log(object[uid2]);      // "12345"
console.log(uid2);              // "Symbol(uid)"

在这个示例中，uid和uid2包含相同的Symbol并且可以互换使用。
第一次调用Symbol.for()方法创建这个Symbol，第二次调用可以直接从Symbol的全局注册表中检索到这个Symbol。

可以使用Symbol.keyFor()方法在Symbol全局注册表中检索与Symbol有关的键。















/****      http://www.cnblogs.com/diligenceday/p/5479076.html         ****/



var union = (setA, setB) => {
    return new Seet([...setA,...setB]);
};
var union = (setA, setB) => {
    return new Set(Array.from(setA).concat(Array.from(setB)));
}





var intersect = (set1, set2) => {
    return new Set([...set1].filter(x => set2.has(x)));
}
console.log(intersect(new Set([1,2,3,4]), new Set([2,3,4,5]))); //输出：Set {2,3,4}




var arr = [{name:'111',age:'222'},{name:'333',age:'444'},{name:'555',age:'666'},{name:'777',age:'888'}];
var brr = [{name:'111',age:'222'},{name:'aaa',age:'bbb'},{name:'555',age:'666'}];
function a(arr,brr){
    //debugger;
    return new Set([...arr].filter((item)=>{
        for (let {name,age} of brr){
            if(name === item.name && age === item.age){
                return {name,age};
            }
        }
    }))
}
var cc = a(new Set(arr),new Set(brr))
[...cc]  //[{name:'111',age:'222'},{name:'555',age:'666'}]



var arr = ['111','2222','3333'];
var brr = ['111','4444','gggggggg'];
function a(arr,brr){
    //debugger;
    return new Set([...arr].filter((item)=>{
        return brr.has(item)
        
    }))
}
[...a(new Set(arr),new Set(brr))]   //[111]










WeakSet对象是一些对象值的集合, 并且其中的每个对象值都只能出现一次，WeakSet只能存对象类型的元素，
比如：Object, Array, Function 等等；有了弱引用的WeakSet， 就不用担心内存泄漏了，如果别的对象不引用该对象， 
这个对象会被垃圾回收机制自动回收；

var ws = new WeakSet()
var obj = {}; ws.add(obj);
ws.add([])
setInterval(()=>{
    console.log(ws);   //先是{[], Object {}}，过一会就是{Object{}}
},1000)

weakSet可以用来保存DOM节点， 当节点被删除， weakSet里面的该节点如果不存在别的引用的话， 一段时间内会被内存回收；


