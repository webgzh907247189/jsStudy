/*
 * ES6解构
 * http://web.jobbole.com/91088/
 * http://web.jobbole.com/91071/
 */


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