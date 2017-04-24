//http://blog.csdn.net/w20101114/article/details/16858403  跳出循环
//http://www.cnblogs.com/lovesong/p/4908871.html

//continue 跳出本次循环，进行下一次的循环(i++)
//break 跳出循环(不在循环,执行下面的代码)




out://命名外圈语句
for (var i=0;i<4;i++) {
    inner://命名内圈语句
    for(var k=0;k<5;k++){
        //if(k>2){break;}//跳出循环小循环，大循环加1，进行其他循环(跳出最近的一层循环)       // 跳出内圈循环
        //if(i==2){break inner;}                                        // 跳出内圈循环
        if(i==3){break out;}                                            // 跳出外圈循环
        //console.log(i,k);
    }
}




var arr = [123,4324,13123];
arr.fill(10);
console.log(arr);


//http://www.cnblogs.com/alienfan/p/5097540.html



// fill方法用于空数组的初始化非常方便。数组中已有的元素，会被全部抹去。
// fill方法还可以接受第二个和第三个参数，用于指定填充的   起始位置   和   结束位置(不包括结束位置)
var a1=[0, 0, 0];a1.fill(7, 1);console.log(a1); // [0,7,7]
var a2=[0, 0, 0];a2.fill(111);console.log(a2);//[111, 111, 111]



var crr=[1,2,3,4];
var crrNum=crr.find((v)=>{return v==2})	//找到就返回那个元素
console.log(crrNum);  	//2


var crr1=[1,2,3,4];
var crrNum=crr1.findIndex((v)=>{return v==2})	//找到就返回那个元素的索引(下标)
console.log(crrNum); 	//1


//indexOf方法无法识别数组的NaN成员，但是findIndex方法可以借助Object.is方法做到
[NaN].indexOf(NaN);  // -1  
[NaN].findIndex(y => Object.is(NaN, y));  // 0  



//http://blog.csdn.net/qq_30100043/article/details/53219365

[1, 2, 3, 4, 5].copyWithin(3, 0) // [1, 2, 3, 1, 2]





var a = [1,2,3,4,5,6,7];
var b = [1,2,5,9];
var c = [];
var tmp = a.concat(b);
var o = {};
for (var i = 0; i < tmp.length; i ++){
	(tmp[i] in o) ? o[tmp[i]] ++ : o[tmp[i]] = 1;
}

for (x in o){ 
	if (o[x] == 1){
		c.push(x);
	}
}
alert(c);          //[3,4,6,7,9]

// o.1=1
// o.2=1
// o.5=1

// o.3=1
// o.4=1
// o.6=1
// o.7=1
// o.1=2
// o.2=2
// o.5=2
// o.9=1



