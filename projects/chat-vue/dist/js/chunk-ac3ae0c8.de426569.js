(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-ac3ae0c8"],{"00b4":function(t,e,n){"use strict";n("ac1f");var r=n("23e7"),i=n("da84"),o=n("c65b"),a=n("e330"),c=n("1626"),s=n("861d"),u=function(){var t=!1,e=/[ac]/;return e.exec=function(){return t=!0,/./.exec.apply(this,arguments)},!0===e.test("abc")&&t}(),l=i.Error,f=a(/./.test);r({target:"RegExp",proto:!0,forced:!u},{test:function(t){var e=this.exec;if(!c(e))return f(this,t);var n=o(e,this,t);if(null!==n&&!s(n))throw new l("RegExp exec method returned something other than an Object or null");return!!n}})},"06c5":function(t,e,n){"use strict";n.d(e,"a",(function(){return i}));n("fb6a"),n("d3b7"),n("b0c0"),n("a630"),n("3ca3"),n("ac1f"),n("00b4");var r=n("6b75");function i(t,e){if(t){if("string"===typeof t)return Object(r["a"])(t,e);var n=Object.prototype.toString.call(t).slice(8,-1);return"Object"===n&&t.constructor&&(n=t.constructor.name),"Map"===n||"Set"===n?Array.from(t):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?Object(r["a"])(t,e):void 0}}},"1e66":function(t,e,n){},"285d":function(t,e,n){"use strict";n.d(e,"a",(function(){return a})),n.d(e,"b",(function(){return c})),n.d(e,"c",(function(){return s})),n.d(e,"d",(function(){return u}));var r=n("97af"),i=n("de0c"),o={getActivityInfo:"".concat(i["a"],"/activity/yx/getActivityInfo"),getActivityStatus:"".concat(i["c"],"/couponapi/couponsms/getactivitystatus.do"),recordUserTakeCoupon:"".concat(i["c"],"/couponapi/couponsms/recordusertakecoupon.do"),rightsTakeCoupon:"".concat(i["c"],"/couponapi/qyzt/takecoupon.do")},a=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return Object(r["a"])(o.getActivityInfo,t)},c=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return Object(r["b"])(o.getActivityStatus,t,"form")},s=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return Object(r["a"])(o.recordUserTakeCoupon,t)},u=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return Object(r["b"])(o.rightsTakeCoupon,t,"form")}},3835:function(t,e,n){"use strict";function r(t){if(Array.isArray(t))return t}n.d(e,"a",(function(){return c}));n("a4d3"),n("e01a"),n("d3b7"),n("d28b"),n("3ca3"),n("ddb0");function i(t,e){var n=null==t?null:"undefined"!==typeof Symbol&&t[Symbol.iterator]||t["@@iterator"];if(null!=n){var r,i,o=[],a=!0,c=!1;try{for(n=n.call(t);!(a=(r=n.next()).done);a=!0)if(o.push(r.value),e&&o.length===e)break}catch(s){c=!0,i=s}finally{try{a||null==n["return"]||n["return"]()}finally{if(c)throw i}}return o}}var o=n("06c5");n("d9e2");function a(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}function c(t,e){return r(t)||i(t,e)||Object(o["a"])(t,e)||a()}},4172:function(t,e,n){"use strict";n("de1d")},"4df4":function(t,e,n){"use strict";var r=n("da84"),i=n("0366"),o=n("c65b"),a=n("7b0b"),c=n("9bdd"),s=n("e95a"),u=n("68ee"),l=n("07fa"),f=n("8418"),p=n("9a1f"),d=n("35a1"),h=r.Array;t.exports=function(t){var e=a(t),n=u(this),r=arguments.length,v=r>1?arguments[1]:void 0,b=void 0!==v;b&&(v=i(v,r>2?arguments[2]:void 0));var m,g,y,w,C,O,k=d(e),x=0;if(!k||this==h&&s(k))for(m=l(e),g=n?new this(m):h(m);m>x;x++)O=b?v(e[x],x):e[x],f(g,x,O);else for(w=p(e,k),C=w.next,g=n?new this:[];!(y=o(C,w)).done;x++)O=b?c(w,v,[y.value,x],!0):y.value,f(g,x,O);return g.length=x,g}},5069:function(t,e,n){"use strict";n("8566")},"52a3":function(t,e,n){"use strict";n.d(e,"b",(function(){return c})),n.d(e,"a",(function(){return s}));var r=n("53ca"),i=n("406e"),o=Object(i["a"])(),a=o.CfwEnvService,c=function(t){if("string"===typeof t)try{var e=JSON.parse(t);return!("object"!==Object(r["a"])(e)||!e)}catch(n){return!1}return!1},s=function(){return a.isMainApp()?"autohomeapp":a.isAliMinProgram()?"alipayminiprogram":"m"}},"52f0":function(t,e,n){},"65ee":function(t,e,n){"use strict";n("52f0")},"6b75":function(t,e,n){"use strict";function r(t,e){(null==e||e>t.length)&&(e=t.length);for(var n=0,r=new Array(e);n<e;n++)r[n]=t[n];return r}n.d(e,"a",(function(){return r}))},"7e4a":function(t,e,n){t.exports=n.p+"img/auto-logo.90f4e2dd.png"},8566:function(t,e,n){},"9bdd":function(t,e,n){var r=n("825a"),i=n("2a62");t.exports=function(t,e,n,o){try{return o?e(r(n)[0],n[1]):e(n)}catch(a){i(t,"throw",a)}}},"9e5f":function(t,e,n){"use strict";n("eb10")},a630:function(t,e,n){var r=n("23e7"),i=n("4df4"),o=n("1c7e"),a=!o((function(t){Array.from(t)}));r({target:"Array",stat:!0,forced:a},{from:i})},b0ea:function(t,e,n){"use strict";n.d(e,"b",(function(){return r})),n.d(e,"c",(function(){return i})),n.d(e,"a",(function(){return o}));var r={personal:"https://dealer.m.autohome.com.cn/dealer/agreement.html",privacy:"https://mobile.app.autohome.com.cn/set_v7.5.0/html/protocols.json",share:"https://mwz.autohome.com.cn/sh_activity_authorization_info.html"},i="https://s.autoimg.cn/dealer/m/sj/img/logo-blue.png?v=1",o="autohome://insidebrowserwk?url=https%3A%2F%2Fpay.autohome.com.cn%2Fm%2FownerCoupon"},c60e:function(t,e,n){"use strict";n("de0f")},de0f:function(t,e,n){},de1d:function(t,e,n){},eb10:function(t,e,n){},f20e:function(t,e,n){"use strict";n("1e66")},f6b3:function(t,e,n){t.exports=n.p+"img/introduction.a04a0bf0.png"},f8f0:function(t,e,n){"use strict";n.r(e);var r,i,o=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("section",{staticClass:"coupon-activity-container",style:{backgroundColor:t.activityInfo.mainColor||"#fff"}},["1"===t.activityInfo.isShare?n("Share",{ref:"share",attrs:{shareConfig:t.shareConfig}}):t._e(),n("Header",{attrs:{bannersList:t.activityInfo.bannersList}}),n("div",{staticClass:"main-wrapper"},[n(t.displayComponent,{tag:"component",attrs:{couponNumber:t.couponNumber,userInfo:t.userInfo,activityInfo:t.activityInfo},on:{"coupon-use":t.openApp,"go-login":t.goLogin,"take-coupon":t.takeCoupon,"rights-take-coupon":t.rightsTakeCoupon}}),n("Introduction",{attrs:{activityInfo:t.activityInfo}}),t.ruleList.length>0?n("Rules",{attrs:{ruleList:t.ruleList}}):t._e()],1),n("Footer")],1)},a=[],c=n("3835"),s=n("c7eb"),u=n("1da1"),l=(n("d3b7"),n("3ca3"),n("ddb0"),n("ac1f"),n("1276"),n("00b4"),n("5319"),n("a9e3"),n("caad"),n("d9e2"),n("285d")),f=n("4b5a"),p=n("5530"),d=n("b0ea"),h={name:"Share",render:function(){return""},props:{shareConfig:{type:Object,default:function(){},required:!0}},computed:{shareOption:function(){return Object(p["a"])({pageName:"页面名称",title:"分享title",content:"分享content",url:window.location.href,platform:"weixin&weixincircle",imgurl:d["c"],success:function(){console.log("分享成功了111")},fail:function(){console.log("分享失败了111")}},this.shareConfig)}},methods:{setShare:function(){var t=this;this.CfwEnvService.isWeChat()?window.wx.ready((function(){t.CfwEnvService.setWxShares(t.shareOption)})):this.CfwEnvService.isAliMinProgram()?window.my.postMessage({agreement:"makeShareInfo",data:{title:this.shareOption.title,desc:this.shareOption.content,content:"",imageUrl:this.shareOption.imgurl,bgImgUrl:this.shareOption.bgImgUrl,link:this.shareOption.url}}):this.CfwEnvService.setShare(this.shareOption)},onShare:function(){this.CfwEnvService.isMainApp()&&this.CfwEnvService.share(this.shareOption)}}},v=h,b=n("2877"),m=Object(b["a"])(v,r,i,!1,null,"60678ae6",null),g=m.exports,y=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("section",{staticClass:"rules-wrapper"},[n("div",{staticClass:"header"},[t._v("活动规则")]),n("div",{staticClass:"content"},[n("ul",t._l(t.ruleList,(function(e,r){return n("li",{key:r},[n("p",[t._v(t._s(e))])])})),0)])])},w=[],C={name:"Rule",props:{ruleList:{type:Array,default:function(){return[]},required:!0}}},O=C,k=(n("4172"),Object(b["a"])(O,y,w,!1,null,"64498718",null)),x=k.exports,j=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("section",{staticClass:"advanced-header-container",style:{paddingBottom:t.ratio+"%"}},[n("img",{attrs:{src:t.bannerImg,alt:""}})])},I=[],A=(n("466d"),n("52a3")),S={name:"Header",props:{bannersList:{type:String,default:""}},computed:{bannerImg:function(){if(Object(A["b"])(this.bannersList)){var t=JSON.parse(this.bannersList);return t.length>0?t[0]:""}return""},ratio:function(){var t=this.bannerImg.match(/&r=([^|$]*)/);return t?t[1]:109.06667}}},_=S,E=(n("65ee"),Object(b["a"])(_,j,I,!1,null,"0b7ec566",null)),L=E.exports,F=function(){var t=this,e=t.$createElement,n=t._self._c||e;return t.introductionImg?n("div",{staticClass:"introduction-container"},[n("img",{attrs:{src:t.introductionImg,alt:""}})]):t._e()},U=[],N=n("f6b3"),T={name:"Introduction",props:{activityInfo:{type:Object,default:function(){},required:!0}},computed:{introductionImg:function(){var t=this.activityInfo.activityFlow;if(t=Object(A["b"])(t)?JSON.parse(t):"",Array.isArray(t)&&t.length>0){var e=t,n=Object(c["a"])(e,1);t=n[0]}else t=N;return t}}},$=T,M=(n("5069"),Object(b["a"])($,F,U,!1,null,"3aa9d084",null)),P=M.exports,R=function(){var t=this,e=t.$createElement;t._self._c;return t._m(0)},q=[function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"footer-wrapper"},[r("img",{attrs:{src:n("7e4a"),alt:""}})])}],J={name:"Footer"},B=J,z=(n("9e5f"),Object(b["a"])(B,R,q,!1,null,"665a720e",null)),H=z.exports,D=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"loading_wrapper"},[n("div",{staticClass:"loading-spinner"},[n("svg",{staticClass:"van-loading__circular",attrs:{viewBox:"25 25 50 50"}},[n("circle",{attrs:{cx:"50",cy:"50",r:"20",fill:"none"}})])]),n("div",{staticClass:"loading-text"},[t._v(" 加载中")])])},W=[],K={name:"Loading"},Y=K,G=(n("f20e"),Object(b["a"])(Y,D,W,!1,null,"71ee71ae",null)),Q=G.exports,V=n("ed08"),X=n("74b3"),Z=function(){return Promise.all([n.e("chunk-292859b2"),n.e("chunk-5187a4a4")]).then(n.bind(null,"5a3a"))},tt=function(){return Promise.all([n.e("chunk-292859b2"),n.e("chunk-643ed372")]).then(n.bind(null,"fb15"))},et=function(){return Promise.all([n.e("chunk-15ef5da0"),n.e("chunk-1d40e77a")]).then(n.bind(null,"3d72"))},nt=function(){return Promise.all([n.e("chunk-15ef5da0"),n.e("chunk-4f8df527")]).then(n.bind(null,"42a1"))},rt=function(){return n.e("chunk-7ec44b8b").then(n.bind(null,"0a05"))},it=function(){return n.e("chunk-ab9b0e3a").then(n.bind(null,"e22d"))},ot={name:"advanced",components:{Share:g,Header:L,Loading:Q,Form:Z,NoForm:tt,Success:et,CouponTaked:nt,ActivityFinished:rt,CouponFinished:it,Introduction:P,Footer:H,Rules:x},data:function(){return{shareConfig:{pageName:"汽车之家车主福利"},activityInfo:{},displayComponent:"Loading",isShowRules:!1,recordUserTakeCoupon:[],isAutoApp:this.CfwEnvService.isAutoApp(),userInfo:{isLogin:!1,userMobile:""}}},computed:{ruleList:function(){var t=this.activityInfo.activityRule,e=void 0===t?"":t;return e.split("\n")},couponNumber:function(){return this.recordUserTakeCoupon.length}},created:function(){var t=this;return Object(u["a"])(Object(s["a"])().mark((function e(){var n,r,i,o,a,c,u;return Object(s["a"])().wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,t.getActivityInfo();case 2:n=t.activityInfo||{},r=n.home_site_id,i=n.home_category_id,o=n.home_sub_category_id,a=n.activityName,c=n.isShare,u=void 0===c?"0":c,r&&i&&o&&V["a"].pvPage.call(t,{siteId:r,categoryId:i,subCategoryId:o}),a&&(!t.isAutoApp||t.isAutoApp&&"0"===u)&&t.CfwEnvService.setTitle(a);case 5:case"end":return e.stop()}}),e)})))()},methods:{openApp:function(t){var e=this.activityInfo,n=e.appUseScheme,r=void 0===n?"":n,i=e.backupUrl,o=void 0===i?"":i,a=e.downloadAutohomeLink,c=void 0===a?"":a,s=e.isOpenAutoFromM,u=void 0===s?"1":s,l=d["a"];if("success"===t&&r&&/^autohome:\/\//.test(r)&&(l=r),"finished"===t&&o&&/^autohome:\/\//.test(o)&&(l=o),!this.isAutoApp)return this.CfwEnvService.isAliMinProgram()?l.test(/^https?/)?void(window.location.href=l):void window.my.navigateTo({url:l}):void("1"===u?Object(X["a"])("https://activity.app.autohome.com.cn/static/autocallapp/main-v2.0.0.js").then((function(){var t=new AutoCallApp({AdrDown:c,IosDown:c,YybPackage:"com.cubic.autohome",URLScheme:l});t.launch()})):window.location.href=c);window.location.href=l},goLogin:function(){var t=this,e=this.activityInfo.couponFrom;if(!this.userInfo.isLogin&&(this.isAutoApp||"1"===e)){if(this.CfwEnvService.isAliMinProgram())return window.my.navigateTo({url:"/pages/login/authorize?type=H5"}),void(window.my.onMessage=function(){var n=Object(u["a"])(Object(s["a"])().mark((function n(r){var i,o,a,c,u;return Object(s["a"])().wrap((function(n){while(1)switch(n.prev=n.next){case 0:if(i=r||{},o=i.loginState,a=void 0===o?"":o,c=i.session,u=void 0===c?"":c,"login"!==a||!u){n.next=8;break}return t.userInfo.isLogin=!0,n.next=5,Object(f["c"])();case 5:if("1"===e){n.next=8;break}return n.next=8,t.getUserInfo();case 8:case"end":return n.stop()}}),n)})));return function(t){return n.apply(this,arguments)}}());this.CfwEnvService.goLogin({success:function(e){console.log("登录成功回调",e);var n=e.returncode,r=void 0===n?"":n,i=e.result,o=void 0===i?{}:i;0===r&&o.pcpopclub&&(t.userInfo.isLogin=!0)},fail:function(t){console.log("登录失败回调",t)}})}},setShare:function(){var t=this;if("1"===this.activityInfo.isShare){var e=this.activityInfo,n=e.shareTitle,r=e.shareDesc,i=e.shareImgUrl,o=e.shareUrl,a=e.activityName,s=e.bannersList;this.shareConfig={pageName:a||"汽车之家车主福利",title:n,content:r},o&&(this.shareConfig.url=o);var u=i?JSON.parse(i):"";if(Array.isArray(u)&&u.length>0){var l=Object(c["a"])(u,1),f=l[0];this.shareConfig.imgurl=f.replace(/^https?/,"https")}if(Object(A["b"])(s)){var p=JSON.parse(s);this.shareConfig.bgImgUrl=p[0]||""}this.$nextTick((function(){t.$refs.share.setShare()}))}},onShowRules:function(){this.isShowRules=!0},rightsTakeCoupon:function(){var t=this;return Object(u["a"])(Object(s["a"])().mark((function e(){var n,r,i,o,a,c;return Object(s["a"])().wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.prev=0,n=t.activityInfo.couponBatchNo,r=void 0===n?"":n,e.next=4,Object(l["d"])({activityKey:r,reqSource:Number(t.pvareaid)||0,couponChannel:Object(A["a"])()});case 4:i=e.sent,o=i.returncode,a=i.message,c=i.result,0===o?(t.recordUserTakeCoupon=c,t.displayComponent="Success"):[-45].includes(o)?t.displayComponent="CouponTaked":[-43].includes(o)?t.displayComponent="ActivityFinished":[-5,-7,-38,-42,-33].includes(o)?t.displayComponent="CouponFinished":t.$toast(a||"领取失败，请稍后重试"),e.next=14;break;case 11:e.prev=11,e.t0=e["catch"](0),console.log("权益中心领券失败",e.t0);case 14:case"end":return e.stop()}}),e,null,[[0,11]])})))()},takeCoupon:function(t){var e=this;return Object(u["a"])(Object(s["a"])().mark((function n(){var r,i,o,a,c,u,f,p,d,h;return Object(s["a"])().wrap((function(n){while(1)switch(n.prev=n.next){case 0:return r=t.mobile,i=void 0===r?"":r,o=t.mobileCode,a=void 0===o?"":o,n.prev=1,c=e.activityInfo.couponBatchNo,u=void 0===c?"":c,n.next=5,Object(l["c"])({mobile:i,mobile_code:a,activity_key:u,reqSource:Number(e.pvareaid)||0,couponChannel:Object(A["a"])()});case 5:f=n.sent,p=f.returncode,d=f.message,h=f.result,0===p?(e.recordUserTakeCoupon=h.couponList,e.displayComponent="Success"):[-17,-45].includes(p)?(e.recordUserTakeCoupon=h.couponList,e.displayComponent="CouponTaked"):[-5,-46].includes(p)?e.displayComponent="CouponFinished":-43===p?e.displayComponent="ActivityFinished":-27===p?e.$toast("手机验证码不正确"):e.$toast(d||"领取失败，请稍后重试"),n.next=15;break;case 12:n.prev=12,n.t0=n["catch"](1),console.log("领取优惠券失败",n.t0);case 15:return n.abrupt("return",!0);case 16:case"end":return n.stop()}}),n,null,[[1,12]])})))()},getUserInfo:function(){var t=this;return Object(u["a"])(Object(s["a"])().mark((function e(){var n,r,i;return Object(s["a"])().wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,Object(f["e"])();case 3:if(n=e.sent,r=n.returncode,i=n.result,0!==r||!i||!i.login){e.next=10;break}return t.CfwEnvService.isMiniProgram()||(t.userInfo.isLogin=!0),t.userInfo.userMobile=i.userPhone,e.abrupt("return");case 10:throw Error("未登录");case 13:e.prev=13,e.t0=e["catch"](0),console.log("获取用户信息失败",e.t0);case 16:case"end":return e.stop()}}),e,null,[[0,13]])})))()},loginInit:function(){var t=this;return Object(u["a"])(Object(s["a"])().mark((function e(){var n,r,i,o,a,c,u;return Object(s["a"])().wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(!t.CfwEnvService.isMiniProgram()){e.next=21;break}return e.prev=1,e.next=4,Object(f["c"])();case 4:if(n=e.sent,r=n.returncode,i=void 0===r?"":r,o=n.result,a=void 0===o?{}:o,c=a.uin,u=void 0===c?"":c,0!==i||!u){e.next=14;break}return t.userInfo.isLogin=!0,e.next=14,t.getUserInfo();case 14:e.next=19;break;case 16:e.prev=16,e.t0=e["catch"](1),console.log("getMiniProgramUserSign报错：",e.t0);case 19:e.next=23;break;case 21:return e.next=23,t.getUserInfo();case 23:case"end":return e.stop()}}),e,null,[[1,16]])})))()},getActivityInfo:function(){var t=this;return Object(u["a"])(Object(s["a"])().mark((function e(){var n,r,i,o,a,c,u,f,p,d,h;return Object(s["a"])().wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(e.prev=0,n=t.$route.query.code,r=void 0===n?"":n,r){e.next=5;break}return t.$toast("活动code不存在"),e.abrupt("return",!1);case 5:return e.next=7,Object(l["a"])({code:r});case 7:if(i=e.sent,o=i.returncode,a=i.message,c=i.result,0!==o||!c){e.next=36;break}if(u=c.activitySetting,f=void 0===u?null:u,p=c.activity,p=void 0===p?{status:1}:p,d=p.status,!f){e.next=33;break}if(t.activityInfo=f,t.setShare(),0!==d){e.next=22;break}t.displayComponent="ActivityFinished",e.next=31;break;case 22:return e.next=24,t.loginInit();case 24:if(h=t.activityInfo.couponFrom,"1"!==h){e.next=29;break}t.displayComponent="NoForm",e.next=31;break;case 29:return e.next=31,t.getActivityStatus();case 31:e.next=34;break;case 33:throw new Error(a);case 34:e.next=37;break;case 36:throw new Error(a);case 37:e.next=43;break;case 39:e.prev=39,e.t0=e["catch"](0),t.displayComponent="ActivityFinished",console.log("获取活动配置信息失败",e.t0);case 43:return e.abrupt("return",!0);case 44:case"end":return e.stop()}}),e,null,[[0,39]])})))()},getActivityStatus:function(){var t=this;return Object(u["a"])(Object(s["a"])().mark((function e(){var n,r,i;return Object(s["a"])().wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(e.prev=0,n=t.activityInfo.couponBatchNo,n){e.next=5;break}return t.$toast("优惠券批次不存在"),e.abrupt("return",!1);case 5:return e.next=7,Object(l["b"])({activity_key:n});case 7:r=e.sent,i=r.returncode,t.displayComponent=0===i?"Form":-43===i||-12===i?"ActivityFinished":-5===i?"CouponFinished":"ActivityFinished",e.next=16;break;case 12:e.prev=12,e.t0=e["catch"](0),t.displayComponent="ActivityFinished",console.log("获取活动状态报错",e.t0);case 16:return e.abrupt("return",!0);case 17:case"end":return e.stop()}}),e,null,[[0,12]])})))()}}},at=ot,ct=(n("c60e"),Object(b["a"])(at,o,a,!1,null,"33164030",null));e["default"]=ct.exports}}]);