/*
 * Copyright (C) 2023-2033 WanSen AI Team
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

export { default as BasicTable } from './src/BasicTable.vue';
export { default as TableAction } from './src/components/TableAction.vue';
export { default as EditTableHeaderIcon } from './src/components/EditTableHeaderIcon.vue';
export { default as TableImg } from './src/components/TableImg.vue';

export * from './src/types/table';
export * from './src/types/pagination';
export * from './src/types/tableAction';
export { useTable } from './src/hooks/useTable';
export type { FormSchema, FormProps } from '/@/components/Form/src/types/form';
export type { EditRecordRow } from './src/components/editable';
