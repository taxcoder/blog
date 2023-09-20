const usePage = () => {
  const getOffsetTop = (el: any): any => {
    if (el.offsetParent) return getOffsetTop(el.offsetParent) + el.offsetTop;
    else return el.offsetTop;
  };

  const windowBrowser = (): number => {
    const userAgent = navigator.userAgent;
    if (userAgent.indexOf('Chrome') !== -1 && userAgent.indexOf('Safari') !== -1 && userAgent.indexOf('Edg') === -1) {
      return 1; // Chrome
    } else if (userAgent.indexOf('Firefox') !== -1) {
      return 2; // Firefox
    } else if (
      userAgent.indexOf('Safari') !== -1 &&
      userAgent.indexOf('Chrome') === -1 &&
      userAgent.indexOf('Edge') === -100
    ) {
      return 3; // Safari
    } else if (userAgent.indexOf('Edg') !== -1) {
      return 4; // Edge
    } else {
      return 0; // 其他浏览器...（可根据自己需要确定是否新增其他浏览器的判断）
    }
  };

  return { getOffsetTop, windowBrowser };
};

export default usePage;