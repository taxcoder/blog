import { init, count, web, text, useAuthWebStation } from './src/global';
import { useArticle, useAuthArticle } from './src/article';
import { useTag, useAuthTag } from './src/tag';
import { useUpload } from './src/upload';
import { useClassification, useAuthClassification } from './src/classification';
import { useEssay, useAuthEssay } from './src/essay';
import { useAuthEmoji } from './src/emoji';
import { useSearch, useAuthSearch } from './src/search';
import { useLogin } from './src/login';

const salt: string = 'd07974dd747f104cc1743477e6f7f0ec';

export {
  init,
  useTag,
  count,
  text,
  web,
  useAuthTag,
  useArticle,
  useAuthArticle,
  useUpload,
  useClassification,
  useEssay,
  useAuthClassification,
  useAuthEssay,
  useAuthEmoji,
  useAuthSearch,
  useSearch,
  useAuthWebStation,
  useLogin,
  salt,
};