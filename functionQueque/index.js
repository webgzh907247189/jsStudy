// 实现一个LazyMan，可以按照以下方式调用:
//先同步,在异步,最后回调


/*  LazyMan('Hank')
 *	输出:
 *	Hi! This is Hank!
 */





/*	LazyMan('Hank').sleep(10).eat('dinner')输出
 * 	输出:
 *	Hi! This is Hank!
 *	等待10秒..
 *	Wake up after 10
 *	Eat dinner~
 */
//  var LazyMan = (function() {
//  	return function(){
//  		console.log('Hi! This is !');
// 		next();
//  	}
//  })()
//  function sleep(){
//  	setTimeout(function(){
//  		console.log('等待10秒..');	
//  		console.log('Wake up after 10');
//  		next();		
//  	},1000)
//  } 
//  function eat() {
// 	console.log('Eat ~');
// 	next();
//  }
//  var crr = [],
//  	index = 0;
//  crr.push(LazyMan,sleep,eat);
//  function next(){
//  	var fn = crr[index];
//  	index=index+1;
//  	// if(typeof(fn)==='function'){
//  	// 	fn('Hank');
//  	// }
//  	fn && fn();
//  }
// next();




//LazyMan('Hank').sleep(1).eat('dinner')//尾部使用函数
function LazyMan(name){
	if(!(this instanceof LazyMan)){
		return new LazyMan(name);
	}
	this.arr=[];
	console.log('Hi! This is !'+name);
	setTimeout(function(){
		this.next();
	}.bind(this),0)
}

LazyMan.prototype = {
	next: function(){
		var fn=this.arr.shift();
		fn && fn();  // &&找false，找到false就返回
	},
	sleep: function(t){
		fn=(function(){
			return function(){
				setTimeout(function(){
					console.log('等待'+t+'秒');
					this.next();
				}.bind(this),t*1000)	//绑定this
			}
		})().bind(this);	//绑定this
		this.arr.push(fn);
		return this; 	//实现链式调用
	},
	eat: function(food){
		fn=(function(){
			return function(){
				console.log('Eat ~'+food);
				this.next();
			}
		})().bind(this);	//绑定this
		this.arr.push(fn);
		return this;	//实现链式调用
	}
};

LazyMan('Hank').sleep(10).eat('dinner')



 
/*	LazyMan('Hank').eat('dinner').eat('supper')
 * 输出:
 * Hi This is Hank!
 * Eat dinner~
 * Eat supper~
 */



/* LazyMan('Hank').sleepFirst(5).eat('supper')
 * 等待5秒，输出
 * Wake up after 5
 * Hi This is Hank!
 * Eat supper
 */