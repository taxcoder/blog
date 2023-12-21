import { messageError, messageSuccess, messageLoading } from '@/config/message';
import { ref, computed, reactive } from 'vue';
import { useAuthSearch } from '@tanxiang/apis';
//@ts-nocheck
const useRequestData: any = (
  loading: ref<boolean>,
  functionName: Function,
  emit: any,
  size: number = 15,
  currentData: number = 1
) => {
  const dataSource = reactive<any>({
    total: 0,
    records: [],
    size: 15,
    current: 1,
  });

  const request = (current: number = 0) => {
    messageLoading('数据加载中！');
    functionName(current === 0 ? currentData : current, size)
      .then((success: any) => {
        dataSource.total = success.data.total;
        dataSource.current = success.data.current;
        dataSource.size = success.data.size;
        emit('current', current === 0 ? 1 : current);
        emit('dataSource', getDataSource.value);
        dataSource.records.splice(0, dataSource.records.length);
        dataSource.records.push(...success.data.records);
        messageSuccess('请求成功！');
      })
      .catch((error: any) => messageError(!error || error.name ? '数据请求失败！' : error))
      .finally(() => (loading.value = false));
  };

  const search = (name: string, select: string, value: string, emit: any, current: number = 1, size: number = 15) => {
    useAuthSearch()
      .tableSearch(name, select, value, current, size)
      .then((success: any) => {
        emit('current', current);
        coverDataSource(success.data);
        emit('dataSource', getDataSource.value);
      })
      .catch((error: any) => messageError(!error || error.name ? '网络错误！' : error));
  };

  const getDataSource = computed(() => {
    return dataSource;
  });

  const setDataSource = (name: string, condition: any, changeName: string, updateValue: any) => {
    let temp = dataSource.records.map((source: any) => {
      if (source[name] === condition) {
        source[changeName] = updateValue;
        return source;
      }
      return source;
    });
    dataSource.records.splice(0, dataSource.records.length);
    dataSource.records.push(...temp);
  };

  const coverDataSource = (data: any) => {
    dataSource.total = data.total;
    dataSource.current = data.current + 1;
    dataSource.size = data.size;
    dataSource.records.splice(0, dataSource.records.length);
    if (!!data.records.length) {
      dataSource.records.push(...data.records);
    }
  };
  return { request, getDataSource, setDataSource, coverDataSource, search };
};

export default useRequestData;