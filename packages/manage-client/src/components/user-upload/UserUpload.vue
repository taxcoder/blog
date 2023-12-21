<template>
  <el-upload
    ref="upload"
    action="#"
    class="user-head"
    list-type="picture-card"
    :auto-upload="false"
    :drag="true"
    :file-list="props.list"
    :limit="1"
    @change="onChange"
    @exceed="onExceed"
  >
    <el-icon>
      <Plus />
    </el-icon>

    <template #file="{ file }">
      <div>
        <img class="el-upload-list__item-thumbnail" :src="file.url" alt="" />
        <span class="el-upload-list__item-actions">
          <span class="el-upload-list__item-preview" @click="handlePictureCardPreview(file)">
            <el-icon><zoom-in /></el-icon>
          </span>
          <span v-if="!disabled" class="el-upload-list__item-delete" @click="handleDownload(file)">
            <el-icon><Download /></el-icon>
          </span>
          <span v-if="!disabled" class="el-upload-list__item-delete" @click="handleRemove()">
            <el-icon><Delete /></el-icon>
          </span>
        </span>
      </div>
    </template>
  </el-upload>
</template>
<script lang="ts" setup>
import { reactive, ref } from 'vue';
import { Delete, Download, Plus, ZoomIn } from '@element-plus/icons-vue';
import { messageWarning } from '@/config/message';
import type { UploadFile, UploadFiles, UploadRawFile, UploadUserFile } from 'element-plus';

const upload = ref<any>();

const disabled = ref(false);
const dialogImageUrl = ref('');

const fileList = reactive<any>([]);
const emit = defineEmits(['changeFile']);

const props = defineProps({
  list: { type: Array, required: true },
});

const handleRemove = () => {
  upload.value!.clearFiles();
  fileList.splice(0, fileList.length);
  emit('changeFile', []);
};

const handlePictureCardPreview = (file: UploadFile) => {
  dialogImageUrl.value = file.url!;
};

const onChange = (uploadFile: UploadFile, uploadFiles: UploadFiles) => {
  if (
    uploadFile.raw?.type !== 'image/png' &&
    uploadFile.raw?.type !== 'image/jpg' &&
    uploadFile.raw?.type !== 'image/jpeg'
  ) {
    messageWarning('只能传入png、jpg、jpeg格式的图片！', 1.5);
    handleRemove();
    return;
  }

  fileList.splice(0, fileList.length);
  uploadFiles.forEach((file: any) => {
    blob2Base64(file.url)
      .then((success: any) => {
        fileList.push({ name: file.name, url: success });
        emit('changeFile', fileList);
      })
      .catch((error: any) => console.log(error));
  });
};

const onExceed = (files: File[], uploadFiles: UploadUserFile[]) => {
  upload.value!.clearFiles();
  const file: any = files[0] as UploadRawFile;
  file.uid = uploadFiles[0].uid;
  upload.value!.handleStart(file);
};

const handleDownload = (file: UploadFile) => {};

const blob2Base64 = async (url: any) => {
  return await new Promise((resolve, reject) => {
    let image = new Image();
    image.onload = function () {
      let canvas = document.createElement('canvas');
      //@ts-ignore
      canvas.width = this.naturalWidth;
      //@ts-ignore
      canvas.height = this.naturalHeight;
      //@ts-ignore
      canvas.getContext('2d').drawImage(image, 0, 0);
      resolve(canvas.toDataURL('image/png'));
    };
    image.setAttribute('crossOrigin', 'Anonymous');
    //@ts-ignore
    image.src = url;
    image.onerror = () => reject(new Error('urlToBase64 error'));
  });
};
</script>

<style>
.user-head .el-upload-list,
.user-head .el-upload--picture-card,
.user-head .el-upload-list__item {
  width: 100% !important;
  height: 100% !important;
}

.user-head .el-upload-list__item {
  margin-right: 0 !important;
  display: flex !important;
  align-items: center;
  justify-content: center;
  height: 100% !important;
}

.user-head .el-upload--picture-card {
  border: none !important;
}

.user-head .el-upload-dragger,
.user-head .el-icon {
  height: 100% !important;
}

.user-head .el-upload-list .el-upload-list__item:first-child + .el-upload {
  display: none;
}

.user-head .el-upload-list .el-upload-list__item:first-child.el-list-leave-active + .el-upload {
  display: block !important;
}
</style>
