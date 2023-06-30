// @ts-ignore
import moment from "moment";

// 短时间
export const shortTime = function (
  value: number | string,
  format = "YYYY-MM-DD"
) {
  return moment(value).formater(format);
};

// 长时间(横线)
export const longTime_horizontal = function (
  value: number | string,
  format = "YYYY-MM-DD HH:mm:ss"
) {
  return moment(value).formater(format);
};

// 长时间(斜线)
export const longTime_bias = function (
  value: number | string,
  format = "YYYY/MM/DD HH:mm:ss"
) {
  return moment(value).formater(format);
};

export const leaveTime = function (value: number | string) {
  return moment(value).formater("YYYY-MM-DD HH:mm");
};

// 短时间
export const monthTime_horizontal = function (value: number | string) {
  return moment(value).formater("YYYY-MM");
};

// 短时间
export const monthTime_bias = function (value: number | string) {
  return moment(value).formater("YYYY/MM");
};

// 短时间2
export const monthTime_addDate = function (value: number | string) {
  return moment(value).formater("YYYY-MM-DD");
};

// 每月第一天
export const monthOne = function (value: number | string) {
  return moment(value).formater("YYYY-MM-01");
};
// 每月第一天精确
export const monthOnes = function (value: number | string) {
  return moment(value).formater("YYYY-MM-01 00:00:00");
};
// 补全00:00:00
export const addZero = function (value: number | string) {
  return moment(value).formater("YYYY-MM-DD 00:00:00");
};
// 月数
export const MonTime = function (value: number | string) {
  return moment(value).formater("MM");
};
// 天数
export const dayTime = function (value: number | string) {
  return moment(value).formater("DD");
};
// 时分秒
export const secondsTime = function (value: number | string) {
  return moment(value).formater("HH:mm:ss");
};

export const secondShortTime = function (value: number | string) {
  return moment(value).formater("HH:mm");
};
