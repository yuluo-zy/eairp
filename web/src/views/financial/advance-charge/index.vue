<!--
  - Copyright (C) 2023-2033 WanSen AI Team
  -
  - Licensed under the Apache License, Version 2.0 (the "License");
  - you may not use this file except in compliance with the License.
  - You may obtain a copy of the License at
  -
  -     http://www.apache.org/licenses/LICENSE-2.0
  -
  - Unless required by applicable law or agreed to in writing, software
  - distributed under the License is distributed on an "AS IS" BASIS,
  - WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  - See the License for the specific language governing permissions and
  - limitations under the License.
  -->

<template>
  <div>
    <BasicTable @register="registerTable">
      <template #toolbar>
        <a-button type="primary" @click="handleCreate"> 新增</a-button>
        <a-button type="primary" @click="handleBatchDelete"> 批量删除</a-button>
        <a-button type="primary" @click="handleOnStatus(1)"> 批量审核</a-button>
        <a-button type="primary" @click="handleOnStatus(0)"> 批量反审核</a-button>
      </template>
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'action'">
          <TableAction
              :actions="[
              {
                icon: 'clarity:view-line',
                onClick: handleEdit.bind(null, record),
              },
              {
                icon: 'clarity:note-edit-line',
                onClick: handleEdit.bind(null, record),
              },
              {
                icon: 'ant-design:delete-outlined',
                color: 'error',
                popConfirm: {
                  title: '是否确认删除',
                  placement: 'left',
                  confirm: handleDelete.bind(null, record),
                },
              },
            ]"
          />
        </template>
        <template v-else-if="column.key === 'status'">
          <Tag :color="record.status === 1 ? 'green' : 'red'">
            {{ record.status === 1 ? '已审核' : '未审核' }}
          </Tag>
        </template>
      </template>
    </BasicTable>
    <AdvanceChargeModal ref="advanceChargeModalRef" @cancel="handleCancel"></AdvanceChargeModal>
  </div>
</template>
<div>
</div>

<script lang="ts">
import {defineComponent, ref} from "vue";
import {BasicTable, TableAction, useTable} from "@/components/Table";
import {useModal} from "@/components/Modal";
import {useMessage} from "@/hooks/web/useMessage";
import {columns, searchFormSchema} from "@/views/financial/advance-charge/advance.data";
import {getAdvancePageList, deleteBatchAdvance, updateAdvanceStatus} from "@/api/financial/advance";
import AdvanceChargeModal from "@/views/financial/advance-charge/components/AdvanceChargeModal.vue";
import {Tag} from "ant-design-vue";

export default defineComponent({
  name: 'advanceCharge',
  components: {Tag, TableAction, BasicTable, AdvanceChargeModal },
  setup() {
    const [registerModal, {openModal}] = useModal();
    const { createMessage } = useMessage();
    const advanceChargeModalRef = ref(null);
    const [registerTable, { reload, getSelectRows }] = useTable({
      title: '收预付款列表',
      api: getAdvancePageList,
      rowKey: 'id',
      columns: columns,
      rowSelection: {
        type: 'checkbox',
      },
      formConfig: {
        labelWidth: 110,
        schemas: searchFormSchema,
        autoSubmitOnEnter: true,
      },
      useSearchForm: true,
      clickToRowSelect: false,
      bordered: true,
      showTableSetting: true,
      striped: true,
      showIndexColumn: true,
      actionColumn: {
        width: 80,
        title: '操作',
        dataIndex: 'action',
        fixed: undefined,
      },
    });

    async function handleCreate() {
      advanceChargeModalRef.value.openAdvanceChargeModal();
    }

    async function handleBatchDelete(record: Recordable) {
      const data = getSelectRows();
      if (data.length === 0) {
        createMessage.warn('请选择一条数据');
        return;
      }
      const ids = data.map((item) => item.id);
      const {code} = await deleteBatchAdvance(ids);
      if (code === "F0007") {
        await reload();
      }
    }

    async function handleEdit(record: Recordable) {
      advanceChargeModalRef.value.openAdvanceChargeModal(record.id);
    }

    async function handleDelete(record: Recordable) {
      const {code} = await deleteBatchAdvance([record.id]);
      if (code === "F0007") {
        await reload();
      }
    }

    async function handleSuccess() {
      reload();
    }

    async function handleOnStatus(newStatus: number) {
      const data = getSelectRows();
      if (data.length === 0) {
        createMessage.warn('请选择一条数据');
        return;
      }

      const ids = data.map((item) => item.id);
      const {code} = await updateAdvanceStatus(ids, newStatus);
      if (code === "F0006") {
        await reload();
      }
    }

    async function handleCancel() {
      reload();
    }

    return {
      registerTable,
      registerModal,
      handleCreate,
      handleDelete,
      handleBatchDelete,
      handleEdit,
      handleSuccess,
      handleOnStatus,
      handleCancel,
      advanceChargeModalRef
    }
  }
})
</script>