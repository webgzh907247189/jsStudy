/*
 * bind绑定的是函数(绑定的东西给函数,所以绑定的是函数)
 *
 */


(function (){
	console.log('11111111111111');
})();


(function(){
	console.log('2222222222');
}())


+function(){
	console.log('33333333333');
}();


-function(){
	console.log('4444444444');
}();


~function(){
	console.log('55555555');
}()


!function(){
	console.log('666666666');
}();


let a = 1;
(function(){
	console.log(`${a},这是通过bind绑定之后访问的this(a)`);
}.bind(this)());


let aa=11;
(function(){
	console.log(`${aa},这是通过bind绑定之后访问的this(aa)`);
}.bind(this))();


let b='b';
(function(_this){
	console.log(`${b},这是通过bind绑定之后访问的this(b)`);
})(this);


let bb='bbb';
(function(_this){
	console.log(`${bb},这是通过bind绑定之后访问的this(bb)`);
}(this));


let bbb='bbbbb';
+function(_this){
	console.log(`${bbb},这是通过bind绑定之后访问的this(bbb)`);
}(this);
