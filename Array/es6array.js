/*
 * ES6解构
 * http://web.jobbole.com/91088/
 * http://web.jobbole.com/91071/
 */

var str = '123,hello';
// 反转字符串
Array.prototype.reduceRight.call(str,function(a,b){
    return a+b;
});  // olleh,321

"olleh,321"
// 过滤字符串，只保留小写字母
Array.prototype.filter.call('123,hello', function(a) {
    return /[a-z]/.test(a);
}).join('');  // hello

"hello"
// 利用 map 遍历字符串（这个例子明显举得不太好 *_*）
Array.prototype.map.call(str,function(a){
    return a.toUpperCase();
});  // ["1", "2", "3", ",", "H", "E", "L", "L", "O"]
["1", "2", "3", ",", "H", "E", "L", "L", "O"]
// 数组以序列号一一对应，这是一个有序的对应关系。
// 而对象根据属性名一一对应，这是一个无序的对应关系。
// 根据这个特性，使用解析结构从对象中获取属性值更加具有可用性。


//默认按照顺序来的,中间用逗号分隔(跳过数组中的元素),给元素缺失时的默认值(元素缺失时的默认值)
const names = ['Luke', 'Eva', 'Phil'];
const [a,b , , d,e='吃饭'] = names;  
console.log(a,b,d,e); 	// 'Luke','Eva',undefined,吃饭



const namesArr = ['Luke', 'Eva', 'Phil'];
const [first,...two] = namesArr;
console.log(two); 	//["Eva", "Phil"]



//从对象中提取数据            提取嵌套值
const person = {
    name: 'Luke',
    age: '24',
    facts: {
        hobby: 'Photo',
        work: 'Software Developer'
    }
};
let {name,age,facts:{hobby},NAME,AGE='12321'} = person;
console.log(name,age,hobby,NAME,AGE);		//Luke 24 Photo undefined 12321



/***解构函数参数***/
const getNameAge = ({name, age}) =>{
    return`${name} is ${age} years old`;
}
getNameAge(person); // Luke is 24 years old




/****展开运算符****/

const arr1 = [1, 2, 3];
const arr2 = [...arr1, 10, 20, 30]; 
// 这样，arr2 就变成了[1, 2, 3, 10, 20, 30];


//合并对象
const obj1 = {a: 1,b: 2, c: 3}
const obj2 = {
  ...obj1,
  d: 4,
  e: 5,
  f: 6
}
console.log(obj2);
// 结果类似于 const obj2 = Object.assign({}, obj1, {d: 4})


const add = (a, b, ...more) => {
    return more.reduce((m, n) => m + n,1) + a + b
}
console.log(add(1, 23, 1, 2, 3, 4, 5)) // 40







/**********    JavaScript 各种遍历方式详解，有你不知道的黑科技     ****************/
//http://web.jobbole.com/86350/?utm_source=blog.jobbole.com&utm_medium=relatedPosts



//for循环中的i在循环结束之后任然存在与作用域中，为了避免影响作用域中的其他变量，使用函数自执行的方式将其隔离起来()();
//避免使用 for(var i=0;i<arr.length;i++) 的方式，这样的数组长度每次都被计算，效率低于下面的方式
for(var i=0;i<6; i++) {
  if (i == 2) {
      // return;   // 函数执行被终止(return 出去)
      // break;    // 循环被终止(直接break出去了)               //0,1
      continue;   // 循环被跳过(跳过i=2的循环,进行其他的循环)  //0,1,3,4,5
  };
  console.log(i);
}







//遍历数组时，item表示索引值， arr表示当前索引值对应的元素 arr[item]
//遍历对象时，item表示key值，arr表示key值对应的value值 obj[item]
var demoArr = ['Javascript', 'Gulp', 'CSS3', 'Grunt', 'jQuery', 'angular'];
for(var item in demoArr) {
  if (item == 2) {
      return; // 函数执行被终止
      // break;  // 循环被终止               //Javascript   Gulp
      // continue;  // 循环被跳过            //Javascript  Gulp  Grunt  jQuery  angular
  };
  console.log(demoArr[item]);
}


var demoArrObj = [{'name':'Javascript'},{'name':'Gulp'},{'name':'CSS3'},{'name':'Grunt'},{'name':'jQuery'},{'name':'angular'}];
for(var item in demoArrObj){
  if(item == 2){
    break;                        //{name: "Javascript"}  {'name':'Gulp'}
    //continue;                   // {'name':'Javascript'}{'name':'Gulp'}{'name':'Grunt'}{'name':'jQuery'}{'name':'angular'}
  }
  console.log(demoArrObj[item]);
}



var demoArrObj = {'name':'Javascript','age':'19','home':'安徽省'}
for(var item in demoArrObj){
  if(item == 'age'){
    //break;             //Javascript 
    continue;           //Javascript      '安徽省'
  }
  console.log(demoArrObj[item]);
}


//在for循环与for in循环中，i值都会在循环结束之后保留下来。因此使用函数自执行的方式避免。
//使用return，break，continue跳出循环都与for循环一致，不过关于return需要注意，在函数体中，return表示函数执行终止，
//就算是循环外面的代码，也不再继续往下执行。而break仅仅只是终止循环(跳出循环)，后面的代码会继续执行。







//forEach
//回调函数中有2个参数，分别表示值和索引，这一点与jQuery中的$.each相反
//forEach无法遍历对象              forEach无法在IE中使用，firefox和chrome实现了该方法
//forEach无法使用break，continue跳出循环，使用return时，效果和在for循环中使用continue一致
//最重要的一点，可以添加第二参数，（为一个数组<这个不对，见下面的案列>)，而且回调函数中的this会指向这个数组。而如果没有第二参数，则this会指向window。
let nameArr=['Javascript', 'Gulp', 'CSS3', 'Grunt', 'jQuery', 'angular'];
nameArr.forEach(function(val, index) {
    if (val == 'CSS3') {
        return;  // 循环被跳过
        // break;   // 报错
        // continue;// 报错
    };
    console.log(val, index);
})
// Javascript 0
// Gulp 1
// Grunt 3
// jQuery 4
// angular 5





let goHome=['Javascript', 'Gulp', 'CSS3', 'Grunt', 'jQuery', 'angular'];
var newArr = [];
goHome.forEach(function(val, index) {
    this.push(val); // 这里的this指向newArr
}, newArr);
console.log(newArr);
//["Javascript", "Gulp", "CSS3", "Grunt", "jQuery", "angular"]





//this指向database。所以通过其访问其下面的方法
var database = {
    users:['上学','下班','放学'],
    eat:function(user){
      if(this.test(user)){
        console.log(`包含了"学"字，${user}`);
      }else{
        console.log(`不包含"学"字，${user}`);
      }
    },
    test:function(item){
      var a = /学/.test(item);
      return a;
    }
};
database.users.forEach(database.eat,database);
// 包含了"学"字，上学
// 不包含"学"字，下班
// 包含了"学"字，放学



var divs = document.getElementsByTagName('div');
Array.prototype.forEach.call(divs,function(item){
  console.log(item);
  return item;
});

var uls = document.getElementsByTagName('ul');
//以下三种方法都是将伪数组转化为真正的数组
uls = Array.from(uls);
//uls = Array.prototype.slice.call(uls);
//uls = [].slice.call(uls); 
console.log(Array.isArray(uls));
uls.forEach((item)=>{
  console.log(item);
  return item;
});



//    http://www.jianshu.com/p/bc4f25f9e087?a=1&b=2&c=3
var arr = window.location.search.substr(1).split('&');
arr.reduce((res,item)=>{
  var brr = item.split('=');
  res[brr[0]] = brr[1];
  return res;
},{})
//Object {a: "1", b: "2", c: "3"}




//substr()   第一个参数代表开始位置,第二个参数代表截取的长度
//var stmp = "rcinn.cn"; stmp.substr(1,3)  //cin

//substring()  第一个参数代表开始位置,第二个参数代表结束位置的下一个位置;(不包括结束位置)
//若参数值为负数,则将该值转为0;两个参数中,取较小值作为开始位置,截取出来的字符串的长度为较大值与较小值之间的差.
//var stmp = "rcinn.cn"; stmp.substring(1,3)  //ci  
//var stmp = "rcinn.cn"; stmp.substring(1,-3)  //r 


//slice() 也适用于数组  第一个参数代表开始位置,第二个参数代表结束位置的下一个位置,
//截取出来的字符串的长度为第二个参数与第一个参数之间的差;若参数值为负数,则将该值加上字符串长度后转为正值;若第一个参数等于大于第二个参数,则返回空字符串.
//var stmp = "rcinn.cn"; stmp.slice(1,3)  //ci  
//var stmp = "rcinn.cn"; stmp.slice(1,-3)  //cinn




//使用for in 遍历DOMList([].slice.call(domList))
//因为domList并非数组，而是一个对象，只是因为其key值为0，1，2… 而感觉与数组类似，
//用for in 遍历domList时，需要将domList转换为数组([].slice.call(domList))
//类似这样的对象还有函数的属性arguments对象，当然字符串也是可以遍历的，但是因为字符串其他属性的enumerable被设置成了false，
//因此遍历出来的结果跟数组是一样的，也就不用担心这个问题了.




//()()              !function() {}()             +function() {}() 三种函数自执行的方式










/**************JavaScript 中的遍历******************/
//http://web.jobbole.com/90923/


// 为 Object 设置三个自定义属性（可枚举）
Object.prototype.userProp = 'userProp';
Object.prototype.getUserProp = function() {
    return Object.prototype.userProp;
};
// 定义一个对象，隐式地继承自 Object.prototype
var obj = {
    name: 'percy',
    age: 21,
    [Symbol('symbol 属性')]: 'symbolProp',
    unEnumerable: '我是一个不可枚举属性',
    skills: ['html', 'css', 'js'],
    getSkills: function() {
        return this.skills;
    }
};
// 设置 unEnumerable 属性为不可枚举属性
Object.defineProperty(obj, 'unEnumerable', {
    enumerable: false
});




// ES6 之后，共有以下 5 种方法可以遍历对象的属性。

// for…in： 遍历对象自身的和继承的可枚举属性（不含 Symbol 类型的属性）(不要使用 for…in 来遍历数组)

// Object.keys(obj)：返回一个数组，包括对象自身的（不含继承的）所有可枚举属性（不含 Symbol 类型的属性）
//["name", "age", "skills", "getSkills"]


//Object.getOwnPropertyNames(obj)：返回一个数组，包含对象自身的所有属性（不含 Symbol 类型的属性，不包含继承属性，
//但是包括不可枚举属性）
//["name", "age", "unEnumerable", "skills", "getSkills"]



// Object.getOwnPropertySymbols(obj)：返回一个数组，包含对象自身的所有 Symbol 类型的属性（不包括继承的属性）
// [Symbol(symbol 属性)]



// Reflect.ownKeys(obj)：返回一个数组，包含对象自身的所有属性（包含 Symbol 类型的属性，还有不可枚举的属性，但是不包括继承的属性）
// ["name", "age", "unEnumerable", "skills", "getSkills", Symbol(symbol 属性)]




// 如何判断某个属性是不是某个对象自身的属性呢？
// 1:用 in 操作符（不严谨，它其实判定的是这个属性在不在该对象的原型链上）
// 2:用 hasOwnProperty()，这个方法只会检测某个对象上的属性，而不是原型链上的属性。
// 3:使用 Object.prototype.hasOwnProperty.call(obj,’prop’…)



var str = '123,hello';
// 反转字符串
Array.prototype.reduceRight.call(str,function(a,b){
    return a+b;
});  // olleh,321


// 过滤字符串，只保留小写字母
Array.prototype.filter.call('123,hello', function(a) {
    return /[a-z]/.test(a);
}).join('');  // hello


// 利用 map 遍历字符串（这个例子明显举得不太好 *_*）
Array.prototype.map.call(str,function(a){
    return a.toUpperCase();
});  // ["1", "2", "3", ",", "H", "E", "L", "L", "O"]



// push(尾部添加)
// pop(尾部删除)
// unshift(头部添加)
// shirt(头部删除)
















var arr=[{payWay:'银行转账',payType:'赔款支出'},{payWay:'支付宝',payType:'其它'},{payWay:'支付宝',payType:'公估费'}];
arr.forEach((v)=>{
  v.name='111';
  v.payWay={
        '银行转账':'01',
        '支付宝':'02',
    }[v.payWay]
    v.payType={
        '赔款支出':'01',
        '律师费':'02',
        '公估费':'03',
        '查勘费':'04',
        '其它':'05',
    }[v.payType]
});
console.log(arr);
//[{name:'111',payType:"01",payWay:"01"},{name:'111',payType:"05",payWay:"02"},{name:'111',payType:"03",payWay:"02"}]