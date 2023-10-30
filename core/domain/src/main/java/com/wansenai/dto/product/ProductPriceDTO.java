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
package com.wansenai.dto.product;

import lombok.Data;

import java.math.BigDecimal;

@Data
public class ProductPriceDTO {

    private Long productPriceId;

    private Integer barCode;

    private String productUnit;

    private String multiAttribute;

    private Double purchasePrice;

    private Double retailPrice;

    private Double salesPrice;

    private Double lowSalesPrice;
}
