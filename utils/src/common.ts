const useCommon = () => {
  const isTrueOrFlag = (flag: boolean, success: Function, failure: Function) => {
    return flag ? success() : failure();
  };
  return { isTrueOrFlag };
};

export default useCommon;