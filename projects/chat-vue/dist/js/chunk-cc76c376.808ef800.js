(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-cc76c376"],{"1afd":function(n,t,e){"use strict";e.d(t,"b",(function(){return r})),e.d(t,"a",(function(){return a}));var c=e("97af"),i=e("de0c"),o={login:"".concat(i["e"],"/openapi/user/login"),getAnswer:"".concat(i["e"],"/openapi/chat/sendMsg")},r=function(){var n=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return Object(c["b"])(o.login,n)},a=function(){var n=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return Object(c["b"])(o.getAnswer,n)}},b0c0:function(n,t,e){var c=e("83ab"),i=e("5e77").EXISTS,o=e("e330"),r=e("9bf2").f,a=Function.prototype,u=o(a.toString),s=/function\b(?:\s|\/\*[\S\s]*?\*\/|\/\/[^\n\r]*[\n\r]+)*([^\s(/]*)/,f=o(s.exec),d="name";c&&!i&&r(a,d,{configurable:!0,get:function(){try{return f(s,u(this))[1]}catch(n){return""}}})},bf7b:function(n,t,e){"use strict";e("cdb3")},cdb3:function(n,t,e){},f2f4:function(n,t,e){"use strict";e.r(t);var c=function(){var n=this,t=n.$createElement;n._self._c;return n._m(0)},i=[function(){var n=this,t=n.$createElement,e=n._self._c||t;return e("div",[e("div",[e("div")]),e("div"),e("div",{staticClass:"member-list"})])}],o=(e("b0c0"),e("1afd")),r={name:"Login",data:function(){return{name:"",pwd:""}},methods:{loginHandle:function(){Object(o["b"])({name:"admin"}),console.log(this.name,this.pwd,"数据")},toRegister:function(){console.log("去注册")}}},a=r,u=(e("bf7b"),e("2877")),s=Object(u["a"])(a,c,i,!1,null,"64efc6e2",null);t["default"]=s.exports}}]);