/*
 * Copyright 2023-2033 WanSen AI Team, Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance
 * with the License. A copy of the License is located at
 *
 * http://opensource.wansenai.com/apache2.0/
 *
 * or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES
 * OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions
 * and limitations under the License.
 */
package com.wansensoft.dto;

import lombok.Data;

/**
 * 默认分页数据传输对象，针对需要进行分页查询的请求
 * 如果需要就继承该类
 */
@Data
public class PageSizeDTO {

    /**
     * 查询列表总记录数
     */
    Long page = 0L;

    /**
     * 每页显示条数，默认10
     */
    Long pageSize = 10L;

}
