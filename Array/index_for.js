/********		for...in   for...of(可以循环DOM的list->伪数组) 		********/


// 使用for in 也可以遍历数组，但是会存在以下问题：
// 1.index索引为字符串型数字，不能直接进行几何运算
// 2.遍历顺序有可能不是按照实际数组的内部顺序
// 3.使用for in会遍历数组所有的可枚举属性，包括原型。例如上栗的原型方法method和name属性
Array.prototype.method=function(){
　　console.log(this.length);
}
var myArray = [1,2,4,5,6,7]
myArray.name = "数组";
for (var index in myArray) {
  console.log(myArray[index]);
}
// 1
// 2
// 4
// 5
// 6
// 7
// 数组
// function (){
// 　　console.log(this.length);
// }




/*************所以for in更适合遍历对象，不要使用for in遍历数组。for...of(可以循环DOM的list->伪数组) ****************/
Array.prototype.method=function(){
　　console.log(this.length);
}
var myArray=[1,2,4,5,6,7]
myArray.name="数组";
for (var value of myArray) {
  console.log(value);
}
// 1
// 2
// 4
// 5
// 6
// 7




/******* for in遍历的是数组的索引（即键名），而for of遍历的是数组元素值。

for of遍历的只是数组内的元素，而不包括数组的原型属性method和索引name *************/


Object.prototype.method=function(){
　　console.log(this);
}
var myObject={
　　a:1,
　　b:2,
　　c:3
}
for (var key in myObject) {
	if(myObject.hasOwnProperty(key)){
		console.log(key);
	}
}
//a  b  c



var str='asdsad';
for(var i of str){
	console.log(i);
}
//吃	饭		了



Object.prototype.method=function(){
　　console.log(this);
}
var myObject={
　　a:1,
　　b:2,
　　c:3
}
console.log(Object.keys(myObject));//["a", "b", "c"]
Object.keys(myObject).forEach(function(key,index){
	console.log(key,myObject[key])
});
//a  1 
//b  2
//c  3





/*********	Set   Map		***********/


var set = new Set();  
set.add("a").add("b").add("d").add("c");  
for (let v of set) {  
    console.log(v);  
}  
//a b d c 



var map = new Map();  
map.set("a",1).set("b",2).set(999,3);  
for(let [k,v] of map) {  
    console.log(k,v);  
}  
//a 1 
//b 2
//c 3


var myMap = new Map().set(true, 7).set({foo: 3}, ['abc']);
console.log([...myMap]);
//[[true,7],[{foo:3},['abc']]]







//map转为Obj
function mapToObj(map) {
    let obj = {};
    for (let [key, value] of map) {
        obj[key] = value;
    }
    return obj;
}
var map = new Map([['age',21],['name','吃饭']]);
mapToObj(map);
// {age: 21, name: "吃饭"}


//Obj转为Map
function objToMap(obj){
	var map = new Map();
	for(var i of Object.keys(obj)){
		map.set(i,obj[i]);
	}
	return map;
}
var obj = {'age':1232,'name':'灰机'};
objToMap(obj);
//{"age" => 1232, "name" => "灰机"}




//Json转为Map
function jsonToMap(json) {
    let _json = JSON.parse(json);
    if(Array.isArray(_json)){
        return new Map(JSON.parse(json));
    }else{
        return objToMap(JSON.parse(json));
    }
}
jsonToMap('{"age":"1232","name":"灰机"}');





/*********		NaN的判断	**********/
NaN==NaN
//false(NaN之间的比较)


var a = Number('sadsad');
var b = Number('eeeeeeeeeeeeeee');
console.log(a)===console.log(b);
//true(值的比较 ->  字符串之间的比较)



/****************		Map   Set(http://es6.ruanyifeng.com/?search=map&x=0&y=0#docs/set-map)		********************/
var s = new Set();
s.add('1').add('2').add('2');
console.log(s);// Set {"1", "2"}

s.size;//2
s.has('1')//true
s.has('3')//false
s.delete('2');
s.has('2');//false




//可以当做数组去重的方法
const items = new Set([1, 2, 3, 4, 5]);
const array = Array.from(items);
console.log(array);
//[1, 2, 3, 4, 5]