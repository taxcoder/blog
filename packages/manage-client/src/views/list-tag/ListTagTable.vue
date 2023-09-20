<template>
  <list-tag-table-modal-modify ref="modal" />
  <list-tag-table-modal-delete />

  <div id="tag-table">
    <a-table
      sticky
      :data-source="dataSource"
      :columns="columns"
      :loading="loading"
      size="small"
      :pagination="{ position: ['bottomCenter'], size: 'middle', defaultPageSize: 15, hideOnSinglePage: true }"
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
          <a-button type="link" @click="countClick(record)">{{ text }}</a-button>
        </template>
        <!-- createTime格式自定义 -->
        <template v-if="column.dataIndex === 'createTime'">
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
import { computed, reactive, ref, onMounted } from 'vue';

import { useTag } from '@tanxiang/apis';
import { useDate } from '@tanxiang/utils';
import ListTagTableModalModify from '@/views/list-tag/ListTagTableModalModify.vue';
import ListTagTableModalDelete from '@/views/list-tag/ListTagTableModalModify.vue';

const tag = useTag();
const day = useDate();

const modal = ref<any>(null);
const modify = ref<any>({});

const loading = ref<boolean>(true);
const dataSource = ref<any[]>([]);

provide('updateDataSource', (id, title, data) => {
  dataSource.value = dataSource.value.map((source: any) => {
    if (source.id !== id) return source;
    source[title] = data;
    return source;
  });
});

onMounted(() => {
  tag
    .tags()
    .then((success: any) => {
      dataSource.value = success;
    })
    .catch((error: any) => {
      console.log(error);
    })
    .finally(() => (loading.value = false));
});

const columns = [
  {
    title: 'ID',
    dataIndex: 'id',
    align: 'center',
    width: 70,
    responsive: ['sm'],
  },
  {
    title: '标签名',
    dataIndex: 'name',
    align: 'center',
    ellipsis: true,
  },
  {
    title: '文章',
    dataIndex: 'articleCount',
    align: 'center',
    width: 60,
  },
  {
    title: '创建时间',
    dataIndex: 'createTime',
    align: 'center',
    responsive: ['sm'],
  },
  {
    title: '操作',
    dataIndex: 'operation',
    align: 'center',
    width: 140,
    fixed: 'right',
  },
];

const count = computed(() => dataSource.value.length + 1);

const editableData: any = reactive({});

const save = (key: string) => {
  Object.assign(dataSource.value.filter((item: any) => key === item.key)[0], editableData[key]);
  delete editableData[key];
};

const countClick = (dataSource: any) => {
  console.log(dataSource.id);
};

const onDelete = (key: any) => {};

const onModify = (key: any) => {
  modal.value.showModal(key);
};
</script>

<style scoped>
.button-table {
  margin: 0 5px;
  font-size: 13px;
  border-radius: 4px;
}

.modify {
  background-color: #e6a23c;
}

.modify:hover {
  background-color: #eebe77;
}
</style>