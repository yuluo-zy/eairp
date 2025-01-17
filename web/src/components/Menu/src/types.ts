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

// import { ComputedRef } from 'vue';
// import { ThemeEnum } from '/@/enums/appEnum';
// import { MenuModeEnum } from '/@/enums/menuEnum';
export interface MenuState {
  // 默认选中的列表
  defaultSelectedKeys: string[];

  // 模式
  // mode: MenuModeEnum;

  // // 主题
  // theme: ComputedRef<ThemeEnum> | ThemeEnum;

  // 缩进
  inlineIndent?: number;

  // 展开数组
  openKeys: string[];

  // 当前选中的菜单项 key 数组
  selectedKeys: string[];

  // 收缩状态下展开的数组
  collapsedOpenKeys: string[];
}
