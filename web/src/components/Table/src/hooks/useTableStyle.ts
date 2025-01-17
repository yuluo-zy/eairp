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

import type { ComputedRef } from 'vue';
import type { BasicTableProps, TableCustomRecord } from '../types/table';
import { unref } from 'vue';
import { isFunction } from '/@/utils/is';

export function useTableStyle(propsRef: ComputedRef<BasicTableProps>, prefixCls: string) {
  function getRowClassName(record: TableCustomRecord, index: number) {
    const { striped, rowClassName } = unref(propsRef);
    const classNames: string[] = [];
    if (striped) {
      classNames.push((index || 0) % 2 === 1 ? `${prefixCls}-row__striped` : '');
    }
    if (rowClassName && isFunction(rowClassName)) {
      classNames.push(rowClassName(record, index));
    }
    return classNames.filter((cls) => !!cls).join(' ');
  }

  return { getRowClassName };
}
