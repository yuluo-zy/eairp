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

import type { ValidationRule } from 'ant-design-vue/lib/form/Form';
import type { ComponentType } from './types/index';
import { useI18n } from '/@/hooks/web/useI18n';
import { dateUtil } from '/@/utils/dateUtil';
import { isNumber, isObject } from '/@/utils/is';

const { t } = useI18n();

/**
 * @description: 生成placeholder
 */
export function createPlaceholderMessage(component: ComponentType) {
  if (component.includes('Input') || component.includes('Complete')) {
    return t('common.inputText');
  }
  if (component.includes('Picker')) {
    return t('common.chooseText');
  }
  if (
    component.includes('Select') ||
    component.includes('Cascader') ||
    component.includes('Checkbox') ||
    component.includes('Radio') ||
    component.includes('Switch')
  ) {
    // return `请选择${label}`;
    return t('common.chooseText');
  }
  return '';
}

const DATE_TYPE = ['DatePicker', 'MonthPicker', 'WeekPicker', 'TimePicker'];

function genType() {
  return [...DATE_TYPE, 'RangePicker'];
}

export function setComponentRuleType(
  rule: ValidationRule,
  component: ComponentType,
  valueFormat: string,
) {
  if (Reflect.has(rule, 'type')) {
    return;
  }
  if (['DatePicker', 'MonthPicker', 'WeekPicker', 'TimePicker'].includes(component)) {
    rule.type = valueFormat ? 'string' : 'object';
  } else if (['RangePicker', 'Upload', 'CheckboxGroup', 'TimePicker'].includes(component)) {
    rule.type = 'array';
  } else if (['InputNumber'].includes(component)) {
    rule.type = 'number';
  }
}

export function processDateValue(attr: Recordable, component: string) {
  const { valueFormat, value } = attr;
  if (valueFormat) {
    attr.value = isObject(value) ? dateUtil(value).format(valueFormat) : value;
  } else if (DATE_TYPE.includes(component) && value) {
    attr.value = dateUtil(attr.value);
  }
}

export function handleInputNumberValue(component?: ComponentType, val?: any) {
  if (!component) return val;
  if (['Input', 'InputPassword', 'InputSearch', 'InputTextArea'].includes(component)) {
    return val && isNumber(val) ? `${val}` : val;
  }
  return val;
}

/**
 * 时间字段
 */
export const dateItemType = genType();

export const defaultValueComponents = ['Input', 'InputPassword', 'InputSearch', 'InputTextArea'];

// TODO 自定义组件封装会出现验证问题，因此这里目前改成手动触发验证
export const NO_AUTO_LINK_COMPONENTS: ComponentType[] = [
  'Upload',
  'ApiTransfer',
  'ApiTree',
  'ApiSelect',
  'ApiMultipleSelect',
  'ApiTreeSelect',
  'ApiRadioGroup',
  'ApiCascader',
  'AutoComplete',
  'RadioButtonGroup',
];
