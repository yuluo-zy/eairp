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
  <BasicTitle :class="prefixCls" v-if="getTitle" :helpMessage="helpMessage">
    {{ getTitle }}
  </BasicTitle>
</template>
<script lang="ts">
  import { computed, defineComponent, PropType } from 'vue';
  import { BasicTitle } from '/@/components/Basic/index';
  import { useDesign } from '/@/hooks/web/useDesign';
  import { isFunction } from '/@/utils/is';

  export default defineComponent({
    name: 'BasicTableTitle',
    components: { BasicTitle },
    props: {
      title: {
        type: [Function, String] as PropType<string | ((data) => string)>,
      },
      getSelectRows: {
        type: Function as PropType<() => any[]>,
      },
      helpMessage: {
        type: [String, Array] as PropType<string | string[]>,
      },
    },
    setup(props) {
      const { prefixCls } = useDesign('basic-table-title');

      const getTitle = computed(() => {
        const { title, getSelectRows = () => {} } = props;
        let tit = title;

        if (isFunction(title)) {
          tit = title({
            selectRows: getSelectRows(),
          });
        }
        return tit;
      });

      return { getTitle, prefixCls };
    },
  });
</script>
<style lang="less">
  @prefix-cls: ~'@{namespace}-basic-table-title';

  .@{prefix-cls} {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
</style>
