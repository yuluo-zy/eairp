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

type ColSpanType = number | string;
export interface ColEx {
  style?: any;
  /**
   * raster number of cells to occupy, 0 corresponds to display: none
   * @default none (0)
   * @type ColSpanType
   */
  span?: ColSpanType;

  /**
   * raster order, used in flex layout mode
   * @default 0
   * @type ColSpanType
   */
  order?: ColSpanType;

  /**
   * the layout fill of flex
   * @default none
   * @type ColSpanType
   */
  flex?: ColSpanType;

  /**
   * the number of cells to offset Col from the left
   * @default 0
   * @type ColSpanType
   */
  offset?: ColSpanType;

  /**
   * the number of cells that raster is moved to the right
   * @default 0
   * @type ColSpanType
   */
  push?: ColSpanType;

  /**
   * the number of cells that raster is moved to the left
   * @default 0
   * @type ColSpanType
   */
  pull?: ColSpanType;

  /**
   * <576px and also default setting, could be a span value or an object containing above props
   * @type { span: ColSpanType, offset: ColSpanType } | ColSpanType
   */
  xs?: { span: ColSpanType; offset: ColSpanType } | ColSpanType;

  /**
   * ≥576px, could be a span value or an object containing above props
   * @type { span: ColSpanType, offset: ColSpanType } | ColSpanType
   */
  sm?: { span: ColSpanType; offset: ColSpanType } | ColSpanType;

  /**
   * ≥768px, could be a span value or an object containing above props
   * @type { span: ColSpanType, offset: ColSpanType } | ColSpanType
   */
  md?: { span: ColSpanType; offset: ColSpanType } | ColSpanType;

  /**
   * ≥992px, could be a span value or an object containing above props
   * @type { span: ColSpanType, offset: ColSpanType } | ColSpanType
   */
  lg?: { span: ColSpanType; offset: ColSpanType } | ColSpanType;

  /**
   * ≥1200px, could be a span value or an object containing above props
   * @type { span: ColSpanType, offset: ColSpanType } | ColSpanType
   */
  xl?: { span: ColSpanType; offset: ColSpanType } | ColSpanType;

  /**
   * ≥1600px, could be a span value or an object containing above props
   * @type { span: ColSpanType, offset: ColSpanType } | ColSpanType
   */
  xxl?: { span: ColSpanType; offset: ColSpanType } | ColSpanType;
}

export type ComponentType =
  | 'Input'
  | 'InputGroup'
  | 'InputPassword'
  | 'InputSearch'
  | 'InputTextArea'
  | 'InputNumber'
  | 'InputCountDown'
  | 'Select'
  | 'ApiSelect'
  | 'TreeSelect'
  | 'ApiTree'
  | 'ApiTreeSelect'
  | 'ApiMultipleSelect'
  | 'ApiMultipleTreeSelect'
  | 'ApiRadioGroup'
  | 'RadioButtonGroup'
  | 'RadioGroup'
  | 'Checkbox'
  | 'CheckboxGroup'
  | 'AutoComplete'
  | 'ApiCascader'
  | 'Cascader'
  | 'DatePicker'
  | 'MonthPicker'
  | 'RangePicker'
  | 'WeekPicker'
  | 'TimePicker'
  | 'TimeRangePicker'
  | 'Switch'
  | 'StrengthMeter'
  | 'Upload'
  | 'IconPicker'
  | 'Render'
  | 'Slider'
  | 'Rate'
  | 'Divider'
  | 'ApiTransfer';
