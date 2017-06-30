/*
 *  一下的方法合理使用,避免使用for循环
 *  http://web.jobbole.com/91073/
 *
 * http://web.jobbole.com/88463/
 * http://www.tuicool.com/articles/7J3amu
 * http://www.ruanyifeng.com/blog/2014/10/event-loop.html
 * http://web.jobbole.com/90967/?utm_source=blog.jobbole.com&utm_medium=relatedPosts
 * http://web.jobbole.com/91006/?utm_source=blog.jobbole.com&utm_medium=relatedPosts
 */




/***			这是for...of的方法			***/
const inputs = ['John','Paul','George','Ringo'];
const inputarr = [];
for(item of inputs){
	if(~item.indexOf('o')){    //找不到返回-1,取~是-(-1+1);   找到返回0,1,2,3,4,5取~是-1,-2,-3,-4,-5
		let itemOne = item.replace(/[aeiou]/g, 'oodle');
		inputarr.push(itemOne);
	}
}
console.log(inputarr);     
//["Joodlehn", "Goodleoodlergoodle", "Roodlengoodle"]






/***			这是map的函数(直接映射新数组)			***/
const inputsMap = ['John','Paul','George','Ringo'];
const inputsMapArr = inputsMap.map((item)=>{
	let itemOne = item.replace(/[aeiou]/g, '我');
	return itemOne;
});
console.log(inputsMapArr);
//["J我hn", "P我我l", "G我我rg我", "R我ng我"]



const inputsMapName = [{name:'John'},{name:'Paul'},{name:'George'},{name:'Ringo'}];
//const inputsMapArr = [];
let inputsMapNameArr = inputsMapName.map((item,index)=>{
	item.id = index;
	//inputsMapArr.push(itemOne);
	return item;
});
console.log(inputsMapName);
console.log(inputsMapNameArr);
// [{id:0,name:'John'},{id:1,name:'Paul'},{id:2,name:'George'},{id:3,name:'Ringo'}];






/***			这是reduce的函数			***/
const heroes = [
    {name: 'Hulk', strength: 9},
    {name: 'Spider-Man', strength: 2},
    {name: 'Hawk Eye', strength: 13},
    {name: 'Thor', strength: 10},
    {name: 'Black Widow', strength: 16},
    {name: 'Vision', strength: 50},
    {name: 'Scarlet Witch', strength: 60},
    {name: 'Mystique', strength: 11},
    {name: 'Namora', strength: 9},
];
let heroeStrength = heroes.reduce((result,item)=>{
	let resultOne = item.strength > result.strength ? item : result;
	return resultOne;
},{strength:0})
console.log(heroeStrength);
//{name: "Thor", strength: 100000}


let heroesSum = heroes.reduce((result,item)=>{
	let result = result+item.strength;
	return result;
},0)
console.log(heroesSum);
//180








/***			这是filter的函数(每个都会去查找)				***/
const heroesFilter = [
    {strength: 900, sex: 'm'},
    {strength: 250, sex: 'f'},
    {strength: 136, sex: 'f'},
    {strength: 1000, sex: 'f'},
    {strength: 136, sex: 'f'},
    {strength: 500, sex: 'm'},
    {strength: 60, sex: 'f'},
    {strength: 120, sex: 'f'},
    {strength: 7500, sex: 'f'},
];
let heroFilter = heroesFilter.filter((item)=>{
	if(item.sex=='m'){
		return item;	
	}
})
console.log(heroFilter);
//[{sex:"m",strength:900},{strength: 500,sex:'m'}]




let  heroFilterMax = heroesFilter.filter((item)=>{
	if(item.strength>1000){
		return item;
	}
})
console.log(heroFilterMax);
//[{sex:"f",strength:7500}]








/***			这是find的函数(找到就返回)			***/
const fruit = [{'a':1},{'a':2},{'a':3}];
let fruitArr = fruit.find((item)=>{
	if(item.a>=2){
		return true;
	}
})
console.log(fruitArr);
//[{'a':2}]



















let arr1 = [{id:1,status:'aa'},{id:2,status:'bb'},{id:3,status:'cc'}];			
let arr2 = [{id:1,differType:'dd'},{id:2,differType:'ee'},{id:4,differType:'ff'},{id:5,differType:'gg'}];

arr1.reduce((result,item)=>{
	let match = result.find((item1)=>{
		return item1.id==item.id;
	});

	if(match){
		match.status = item.status ;
	}else{
		result.push(item);
	}
	return result;
},arr2);
console.log(arr2);
//[{id:1,differType:'dd',status:'aa'},{id:2,differType:'ee',status:'bb'},{id:4,differType:'ff'},{id:5,differType:'gg'},{id:3,status:'cc'}];








/******************			存在疑问？？？？(不知道这样带来的后果，理赔中台的pende也是这样操作的)		*********************/
var obj1 = {a:1,b:2};
var { a } = obj1;
if(a){
	a=10;
}
console.log(obj1);//{a: 1, b: 2}


var obj1 = {a:1,b:2};
var { a } = obj1;
if(a){
	obj1.a=10;
}
console.log(obj1);//{a: 10, b: 2}


//????????????????????
        //深拷贝
        // var obj={a:1,b:2,f:{e:'aa'}};
        // var ob1 =  {...obj,c:3,d:4} 
        // console.dir(ob1);
        // return;