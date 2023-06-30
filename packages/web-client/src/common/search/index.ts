// @ts-ignore
import { ElMessageBox } from 'element-plus';
import { defineAsyncComponent, h } from 'vue';

const BlogSearch = defineAsyncComponent(() => import('@/common/search/BlogSearch.vue'));
const SearchInput = defineAsyncComponent(() => import('@/common/search/SearchInput.vue'));
const open = () => {
  ElMessageBox({
    title: '搜索',
    showConfirmButton: false,
    closeOnClickModal: true,
    closeOnPressEscape: false,
    customClass: 'search-message-box',
    callback: () => {},
    message: () => h('div', { style: { height: '100%' } }, [h(SearchInput), h(BlogSearch)]),
  });
};

export { open };
