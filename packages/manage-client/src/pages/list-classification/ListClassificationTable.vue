<template>
  <modal-modify ref="modal" :okClick="okModifyClick" :max-length="4" />
  <modal-delete ref="del" :okClick="okDeleteClick">
    <template #content>
      <strong>注意：</strong>
      是否确认删除分类 -> {{ currentData.name }}
    </template>
    <template #other>
      <a-modal
        v-model:open="deleteOpen"
        title="更新绑定"
        :closable="false"
        :zIndex="1001"
        :key="Math.random()"
        :centered="true"
        :width="470"
        @ok="okCloseLinkClick"
      >
        <div class="change-link">
          <a-list size="small" :data-source="articleList" :split="false">
            <template v-slot:renderItem="{ item, index }">
              <a-list-item>
                <span class="article-name">{{ item.name }}</span>
                <a-select
                  :value="values[index].key"
                  size="small"
                  style="width: 100px"
                  :options="select"
                  @select="handleSelect"
                  :placeholder="placeholder"
                  @change="selectCurrent = index"
                />
              </a-list-item>
            </template>
          </a-list>
        </div>
      </a-modal>
    </template>
  </modal-delete>

  <div id="classification-table" class="sticky top-0">
    <a-table
      sticky
      :data-source="result"
      :columns="columns"
      :loading="loading"
      size="small"
      @change="pageChange"
      :pagination="{
        position: ['bottomCenter'],
        size: 'middle',
        defaultPageSize: 15,
        hideOnSinglePage: true,
        current: current,
        total: getTotal,
        showSizeChanger: false,
      }"
    >
      <template #bodyCell="{ column, text, record }">
        <!-- name格式自定义 -->
        <template v-if="column.dataIndex === 'id'" style="height: 100px">
          <div>{{ text || ' ' }}</div>
        </template>
        <!-- name格式自定义 -->
        <template v-if="column.dataIndex === 'name'" style="height: 100px">
          <span>{{ text || ' ' }}</span>
        </template>
        <!-- articleCount格式自定义 -->
        <template v-if="column.dataIndex === 'articleCount'">
          <a-button type="link">{{ text }}</a-button>
        </template>
        <!-- createTime格式自定义 -->
        <template v-if="column.dataIndex === 'createTime'">
          <span>{{ day.shortTime(text, '/', true, false) }}</span>
        </template>
        <!-- updateTime格式自定义 -->
        <template v-if="column.dataIndex === 'updateTime'">
          <span>{{ day.shortTime(text, '/', true, false) }}</span>
        </template>
        <!-- operation格式自定义 -->
        <template v-else-if="column.dataIndex === 'operation'">
          <a-button type="primary" size="small" class="button-table modify" @click="onModify(record)">修改</a-button>
          <a-button type="primary" danger size="small" class="button-table" @click="onDelete(record)">删除</a-button>
        </template>
      </template>
    </a-table>
  </div>
</template>

<script setup lang="ts">
import ModalModify from '@/components/modal-operation/ModalModify.vue';
import ModalDelete from '@/components/modal-operation/ModalDelete.vue';

import { ref, onMounted, computed, reactive, onActivated, watch, inject } from 'vue';

import { useRouter } from 'vue-router';
import useReload from '@/hooks/useReload';
import { useDate } from '@tanxiang/utils';
import useRequestData from '@/hooks/useRequestData';
import { useAuthClassification } from '@tanxiang/apis';
import { useClassificationStore } from '@/stores/classification';

import { messageError, messageLoading, messageSuccess } from '@/config/message';
//@ts-ignore
import { columns } from './tableData';
import { useBaseStore } from '@/stores/base';

const day = useDate();
const router = useRouter();
const base = useBaseStore();
const auth = useAuthClassification();
const { commonOperation } = useReload();
const classification = useClassificationStore();

const del = ref<any>(null);
const modal = ref<any>(null);

const selectCurrent = ref<number>(1);
const timer = ref<any>(null);
const current = ref<number>(1);
const currentData = ref<any>({});
const loading = ref<boolean>(true);
const placeholder = ref<string>('');
const deleteOpen = ref<boolean>(false);

const select = reactive<any[]>([]);
const modalData = reactive<any[]>([]);
const checkBoxList = reactive<number[]>([]);
const values = reactive<{ key: number; articleId: number }[]>([]);

const tabCurrent: any = inject('tabCurrent');

const props = defineProps({
  source: { type: Object, required: true },
});

const emit = defineEmits(['current', 'dataSource']);

const { request, getDataSource, search } = useRequestData(loading, auth.classificationLimit, emit);

onMounted(() => request());

onActivated(() => {
  if (base.getPreviousRoutePath !== '/refresh') return;
  loading.value = true;
  // 如果进入时，timer.value存在数据，则表示已经有一次的请求了，关闭当前请求，重新建立请求
  if (timer.value) clearTimeout(timer.value);
  timer.value = setTimeout(() => request(), 100);
});

const pageChange = (paging: any) => {
  if (classification.getSearch.value === '' || classification.getSearch.value.length === 0) {
    request(paging.current);
  } else {
    search(
      classification.getSearch.name,
      classification.getSearch.select,
      classification.getSearch.value,
      emit,
      paging.current,
      15
    );
  }
};

const handleSelect = (value: string, option: any) => {
  return (values[selectCurrent.value].key = option.value);
};

const classificationArticle = (key: any, link: any, status: boolean) => {
  currentData.value = key;
  modalData.splice(0, modalData.length);
  modalData.push(...getDataSource.value.records.filter((data: any) => data.id === key.id)[0].articles);
  link.list.articles.push(...modalData);
  if (status) link.list.checkList.push(...modalData.map((s: any) => s.id));
  link.spinning = false;
};

const okCloseLinkClick = () => {
  if (values.filter((value: { key: number; articleId: number }) => value.key === currentData.value.id).length > 0) {
    return messageError('删除该分类需要断开所有关联的文章！');
  }
  messageLoading('正在删除中');
  auth
    .classificationDelete(currentData.value.id, values)
    .then((success: any) => {
      deleteOpen.value = false;
      commonOperation(success.message, null, del.value.cancel, request, current.value);
    })
    .catch((error: any) => messageError(!error || error.name ? '删除失败！' : error));
};

const okDeleteClick = (modify: any, list: any, cancel: Function) => {
  if (!!list.checkList.length) {
    messageError('请断开文章与分类的连接！');
    deleteOpen.value = true;
    placeholder.value = modify.value.name;
    // 把数据渲染的select里面
    select.splice(0, select.length);
    values.splice(0, values.length);
    checkBoxList.splice(0, checkBoxList.length);

    checkBoxList.push(...list.checkList);

    select.push(...getDataSource.value.records.map((s: any) => ({ value: s.id, label: s.name })));
    values.push(...list.articles.map((s: any) => ({ key: modify.value.id, articleId: s.id })));
    return;
  } else {
    okCloseLinkClick();
  }
};

const okModifyClick = (modify: any, inputValue: any, list: any, cancel: Function) => {
  auth
    .classificationUpdateName(modify.value.id, inputValue)
    .then((success: any) => commonOperation(success.message, list, cancel, request, current.value))
    .catch((error: any) => messageError(!error || error.name ? '更新失败！' : error));
};

const onDelete = (key: any) => del.value.showModal(key, classificationArticle, false);

const onModify = (key: any) => modal.value.showModal(key, classificationArticle, false);

const dataSource = (records: any) =>
  records.map((value: any) => ({
    id: value.id,
    name: value.name,
    articleCount: value.articles.length,
    updateTime: value.updateTime,
    createTime: value.createTime,
  }));

const articleList = computed(() =>
  checkBoxList.map((list: number) => {
    let data = modalData.filter((d: { id: number; title: string }) => d.id === list)[0];
    return {
      id: data.id,
      name: data.title,
      classificationId: currentData.value.id,
      classificationName: currentData.value.name,
    };
  })
);

const getTotal = computed(() => {
  return ![undefined, null].includes(props.source.total) ? props.source.total : getDataSource.value.total;
});

const result = computed(() => {
  return ![undefined, null].includes(props.source.total)
    ? dataSource(props.source.records)
    : dataSource(getDataSource.value.records);
});

watch(
  () => tabCurrent.value,
  (newCurrent: number) => (current.value = newCurrent),
  { deep: true }
);
</script>

<style scoped>
.button-table {
  margin: 0 5px;
  font-size: 13px;
  border-radius: 4px;
}

.modify {
  background-color: #e6a23c !important;
}

.modify:hover {
  background-color: #eebe77;
}

.change-link {
  max-height: calc(100vh / 2.5);
  overflow: auto;
}

.article-name {
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}

.change-link::-webkit-scrollbar {
  display: none;
}
</style>