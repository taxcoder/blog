const useDate = () => {
  const current = () => {
    return new Date().getTime();
  };

  const days = (time: number) => {
    let residue: number = current() - time;
    return Math.floor(residue / (1000 * 60 * 60 * 24));
  };

  const headway = (time: number, isDisabled: boolean = false) => {
    let residue: number = current() - time;
    // 年
    let yearDate: number = residue / (1000 * 60 * 60 * 24 * 365);
    // 天
    let dayDate: number = (yearDate - Math.floor(yearDate)) * 365;
    // 时
    let hourData: number = (dayDate - Math.floor(dayDate)) * 24;
    // 分
    let minuteData: number = (hourData - Math.floor(hourData)) * 60;

    let times: { key: number; prefix: string }[] = [
      { key: Math.floor(yearDate), prefix: '年' },
      { key: Math.floor(dayDate), prefix: '天' },
      { key: Math.floor(hourData), prefix: '时' },
      { key: Math.floor(minuteData), prefix: '分' },
    ];
    let size: number = 0;
    let date: string = '';
    while (size < times.length) {
      let key: number = times[size].key;
      let flag: boolean = key < 10 && size !== 0 && !isDisabled;
      date = date + (key !== 0 ? (flag ? '0' + key : key) + times[size].prefix : date + '');

      if (isDisabled && date !== '') break;
      size++;
    }
    return date;
  };

  const year = (time: number) => {
    return new Date(time).getFullYear();
  };

  const addPrefix = (time: string | number) => {
    return time.toString().length < 2 ? '0' + time : time;
  };

  const shortTime = (time: string, separate: string = '-', all: boolean = false, seconds = true) => {
    let date = new Date(time);
    return all
      ? date.getFullYear() +
          separate +
          date.getMonth() +
          separate +
          date.getDate() +
          ' ' +
          addPrefix(date.getHours()) +
          ':' +
          addPrefix(date.getMinutes()) +
          (seconds ? ':' + addPrefix(date.getSeconds()) : '')
      : date.getFullYear() + separate + date.getMonth() + separate + date.getDate();
  };

  const chineseTime = (time: string) => {
    let date = new Date(time);
    return date.getFullYear() + '年' + date.getMonth() + '月' + date.getDate() + '日';
  };
  return { current, headway, days, shortTime, year, chineseTime };
};

export default useDate;