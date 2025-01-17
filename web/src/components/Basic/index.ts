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

import { withInstall } from '/@/utils';
import basicArrow from './src/BasicArrow.vue';
import basicTitle from './src/BasicTitle.vue';
import basicHelp from './src/BasicHelp.vue';

export const BasicArrow = withInstall(basicArrow);
export const BasicTitle = withInstall(basicTitle);
export const BasicHelp = withInstall(basicHelp);
