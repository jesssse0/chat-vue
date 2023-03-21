const flexible = {};
const baseNum = 16;
const designWidth = 750;
flexible.dpr = window.devicePixelRatio || 1;
flexible.changeRem = () => {
  const { width } = document.documentElement.getBoundingClientRect();
  flexible.ratio = (width / designWidth) * 2;
  flexible.rootFontSize = (width / designWidth) * 2 * baseNum;
  if (flexible.rootFontSize >= 25) {
    flexible.rootFontSize = 16;
  }
  document.documentElement.style.fontSize = `${flexible.rootFontSize}px`;
};
// flexible.changeRem();
let t;
window.addEventListener(
  'resize',
  () => {
    clearTimeout(t);
    t = setTimeout(flexible.changeRem, 300);
  },
  false
);
window.addEventListener(
  'pageshow',
  (e) => {
    if (e.persisted) {
      clearTimeout(t);
      t = setTimeout(flexible.changeRem, 300);
    }
  },
  false
);
flexible.px2rem = (px) => parseInt(px, 10) / baseNum / 2;
flexible.rem2px = (rem) => parseFloat((rem * baseNum * flexible.ratio).toFixed(6), 10);
window.flexible = flexible;

export default flexible;
