export const loadScript = (path) =>
  new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = path;
    script.onload = () => resolve();
    script.onerror = () => reject();
    const s = document.getElementsByTagName('script')[0];
    s.parentNode.insertBefore(script, s);
  });

export const loadCss = (path) =>
  new Promise((resolve, reject) => {
    const script = document.createElement('link');
    script.type = 'text/css';
    script.rel = 'stylesheet';
    script.src = path;
    script.onload = () => resolve();
    script.onerror = () => reject();
    const s = document.getElementsByTagName('head')[0];
    s.insertBefore(script, s);
  });
