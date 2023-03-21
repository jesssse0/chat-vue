// 主软随页面滚动变化透明度
function navlucency() {
  window.AHAPP.invokeNative('navlucency', {
    canChangeNavAlpha: 1, // 1开启,0关闭
    callBackJSName: 'helllo', // 绑定方法名,用于接收客户端回调
    success(result) {
      console.log(JSON.stringify(result)); // 打印客户端返回的参数内容
    },
    fail(result) {
      console.log(JSON.stringify(result));
    },
  });

  const change = (n) => {
    const bcolor = '#ffffff';
    const style = (n === 2) ? 1 : 0;
    const tcolor = (n === 2) ? '#000000' : '#00FFFFFF';
    window.AHAPP.invokeNative('navigationcolorstyle', {
      bgcolor: bcolor, // 背景色
      titlecolor: tcolor, // 标题颜色
      shareImageStyle: style, // 默认是1，1是灰色分享按钮，0是白色分享按钮
      closeImageStyle: style, // 默认是-1 表示不修改原来的图标，1是灰色分享按钮，0是白色分享按钮
      statusBarStyle: style, // 0白色,1黑色
      moreImageStyle: style, // 0白色,1黑色
      success(result) {
        console.log(JSON.stringify(result)); // 打印客户端返回的参数内容
      },
      fail(result) {
        console.log(JSON.stringify(result));
      },
    });
  };

  window.AHJavascriptBridge.bindMethod('helllo',
    (args) => {
      console.log(JSON.stringify(args));
      change(args.navlucencystatus); // 调用设置导航颜色方法
    });
}

export default navlucency;
