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

import type { DropMenu } from '/@/components/Dropdown/index';
import type { RouteLocationNormalized } from 'vue-router';

export enum TabContentEnum {
  TAB_TYPE,
  EXTRA_TYPE,
}

export type { DropMenu };

export interface TabContentProps {
  tabItem: RouteLocationNormalized;
  type?: TabContentEnum;
  trigger?: ('click' | 'hover' | 'contextmenu')[];
}

export enum MenuEventEnum {
  REFRESH_PAGE,
  CLOSE_CURRENT,
  CLOSE_LEFT,
  CLOSE_RIGHT,
  CLOSE_OTHER,
  CLOSE_ALL,
  SCALE,
}
