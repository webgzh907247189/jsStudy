// 实现一个LazyMan，可以按照以下方式调用:

/*  LazyMan(“Hank”)
 *	输出:
 *	Hi! This is Hank!
 */
 // function LazyMan(name) {
 // 	console.log('Hi! This is '+name+'!');
 // }   										LazyMan('Hank')








/*	LazyMan(“Hank”).sleep(10).eat(“dinner”)输出
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
	if(this instanceof LazyMan){
		return new LazyMan();
	}
	console.log('Hi! This is !'+name);
	setTimeout(function(){
		next();
	},0)
}

LazyMan.prototype = {
	next: function(){

	},
	sleep: function(t){
		setTimeout(function(){
			console.log('等待'+t+秒);
		},t*1000)
	},
	eat: function(food){
		fn=(function(){
			return function(){
				console.log('Eat ~'+food);
			}
		})();
		
	}
};






 
/*	LazyMan(“Hank”).eat(“dinner”).eat(“supper”)
 * 输出:
 * Hi This is Hank!
 * Eat dinner~
 * Eat supper~
 */
 // function LazyMan() {
	// console.log('Hi! This is Hank!');
 // }
 // function eat() {
	// console.log('Eat dinner~');
 // }



/* LazyMan(“Hank”).sleepFirst(5).eat(“supper”)
 * 等待5秒，输出
 * Wake up after 5
 * Hi This is Hank!
 * Eat supper
 */