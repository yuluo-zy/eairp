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

/**
 * Makes the first character of a string uppercase
 */
export function upperFirst(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

interface HTMLExpandElement extends HTMLElement {
  _parent?: (Node & ParentNode & HTMLElement) | null;
  _initialStyle: {
    transition: string;
    overflow: string | null;
    height?: string | null;
    width?: string | null;
  };
}

export default function (expandedParentClass = '', x = false) {
  const sizeProperty = x ? 'width' : ('height' as 'width' | 'height');
  const offsetProperty = `offset${upperFirst(sizeProperty)}` as 'offsetHeight' | 'offsetWidth';

  return {
    beforeEnter(el: HTMLExpandElement) {
      el._parent = el.parentNode as (Node & ParentNode & HTMLElement) | null;
      el._initialStyle = {
        transition: el.style.transition,
        overflow: el.style.overflow,
        [sizeProperty]: el.style[sizeProperty],
      };
    },

    enter(el: HTMLExpandElement) {
      const initialStyle = el._initialStyle;

      el.style.setProperty('transition', 'none', 'important');
      el.style.overflow = 'hidden';
      // const offset = `${el[offsetProperty]}px`;

      // el.style[sizeProperty] = '0';

      void el.offsetHeight; // force reflow

      el.style.transition = initialStyle.transition;

      if (expandedParentClass && el._parent) {
        el._parent.classList.add(expandedParentClass);
      }

      requestAnimationFrame(() => {
        // el.style[sizeProperty] = offset;
      });
    },

    afterEnter: resetStyles,
    enterCancelled: resetStyles,

    leave(el: HTMLExpandElement) {
      el._initialStyle = {
        transition: '',
        overflow: el.style.overflow,
        [sizeProperty]: el.style[sizeProperty],
      };

      el.style.overflow = 'hidden';
      el.style[sizeProperty] = `${el[offsetProperty]}px`;
      /* eslint-disable-next-line */
      void el.offsetHeight; // force reflow

      requestAnimationFrame(() => (el.style[sizeProperty] = '0'));
    },

    afterLeave,
    leaveCancelled: afterLeave,
  };

  function afterLeave(el: HTMLExpandElement) {
    if (expandedParentClass && el._parent) {
      el._parent.classList.remove(expandedParentClass);
    }
    resetStyles(el);
  }

  function resetStyles(el: HTMLExpandElement) {
    const size = el._initialStyle[sizeProperty];
    el.style.overflow = el._initialStyle.overflow!;
    if (size != null) el.style[sizeProperty] = size;
    Reflect.deleteProperty(el, '_initialStyle');
  }
}
