/*
 * @Author: tanxiang 1571922819@qq.com
 * @Date: 2023-09-30 18:23:37
 * @Description:
 * @LastEditTime: 2023-12-04 21:33:18
 * @LastEditors: tanxiang 1571922819@qq.com
 * @FilePath: \blog\apis\src\search.ts
 * @copyright: Copyright (c) 2023 by 1571922819@qq.com, All Rights Reserved.
 */
import { useAuthArticle } from './article';
import { useAuthClassification } from './classification';
import { useAuthEssay, useEssay } from './essay';
import { service } from './http';
import { useAuthTag } from './tag';
//@ts-ignore
export const useSearch = (base: string = 'api') => {
  const tableSearch = async (condition: string, searchValue: any, current: number, size: number) => {
    return await service.get(`/${base}/search/${condition}/${searchValue}?current=${current}&size=${size}`);
  };
  return { tableSearch };
};

export const useAuthSearch = (base: string = 'auth') => {
  const tableSearch = async (tableName: string, condition: string, searchValue: any, current: number, size: number) => {
    if (!searchValue || searchValue === '' || searchValue.length === 0) {
      switch (tableName) {
        case 'classification':
          return await useAuthClassification().classificationLimit(1, 15);
        case 'tag':
          return await useAuthTag().tagLimit(1, 15);
        case 'essay':
          return await useEssay().essayList(1, 15);
        case 'article':
          return await useAuthArticle().articleList(1, 15);
        case 'recovery/article':
          return await useAuthArticle().recoveryArticleList(1, 15);
        case 'recovery/essay':
          return await useAuthEssay().essayRecoveryList(1, 15);
        default:
          break;
      }
    } else {
      return await service.get(
        `/${base}/${tableName}/search/${condition}/${searchValue}?current=${current}&size=${size}`
      );
    }
  };
  return { tableSearch };
};