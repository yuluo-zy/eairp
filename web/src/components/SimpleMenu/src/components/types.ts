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

import { Ref } from 'vue';

export interface Props {
  theme: string;
  activeName?: string | number | undefined;
  openNames: string[];
  accordion: boolean;
  width: string;
  collapsedWidth: string;
  indentSize: number;
  collapse: boolean;
  activeSubMenuNames: (string | number)[];
}

export interface SubMenuProvider {
  addSubMenu: (name: string | number, update?: boolean) => void;
  removeSubMenu: (name: string | number, update?: boolean) => void;
  removeAll: () => void;
  sliceIndex: (index: number) => void;
  isRemoveAllPopup: Ref<boolean>;
  getOpenNames: () => (string | number)[];
  handleMouseleave?: Fn;
  level: number;
  props: Props;
}
