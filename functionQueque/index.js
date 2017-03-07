// 实现一个LazyMan，可以按照以下方式调用:

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


//LazyMan('Hank').sleep(10).eat('dinner')
function LazyMan(name){
	if(!(this instanceof LazyMan)){
		return new LazyMan(name);
	}
	console.log('Hi! This is !'+name);
	var self=this;
	self.arr=[];
	setTimeout(function(){
		self.next();
	},0)
}

LazyMan.prototype = {
	next: function(){
		console.log(this.arr);
		var fn=this.arr.shirt();
		fn && fn();  // &&找false，找到false就返回
	},
	sleep: function(t){
		fn=(function(){
			return function(){
				setTimeout(function(){
					console.log('等待'+t+秒);
					self.next();
				},t*1000)
			}
		})()
		this.arr.push(fn);
		return this;
	},
	eat: function(food){
		fn=(function(){
			return function(){
				console.log('Eat ~'+food);
				self.next();
			}
		})();
		this.arr.push(fn);
		return this;
	}
};






 
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