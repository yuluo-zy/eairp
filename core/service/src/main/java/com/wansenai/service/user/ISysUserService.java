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
package com.wansenai.service.user;

import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.wansenai.dto.user.*;
import com.wansenai.utils.response.Response;
import com.wansenai.entities.user.SysUser;
import com.baomidou.mybatisplus.extension.service.IService;
import com.wansenai.vo.UserInfoVO;
import com.wansenai.vo.UserListVO;
import com.wansenai.vo.UserRoleVO;

import java.util.List;

/**
 * <p>
 * 用户表 服务类
 * </p>
 */
public interface ISysUserService extends IService<SysUser> {

    Response<String> accountRegister(AccountRegisterDTO accountRegisterDto);

    Response<UserInfoVO> accountLogin(AccountLoginDTO accountLoginDto);

    Response<UserInfoVO> mobileLogin(MobileLoginDTO mobileLoginDto);

    Response<String> updatePassword(UpdatePasswordDto updatePasswordDto);

    Response<UserInfoVO> userInfo();

    UserInfoVO getCurrentUser();

    Long getCurrentUserId();

    Long getCurrentTenantId();

    String getCurrentUserName();

    Response<List<UserRoleVO>> userRole();

    Response<String> userLogout();

    Response<Page<UserListVO>> userList(UserListDTO pageDto);

    Response<List<UserListVO>> userListAll();

    Response<String> updateUser(UpdateUserDTO updateUserDTO);

    Response<String> addOrUpdate(AddOrUpdateUserDTO addOrUpdateUserDTO);

    Response<String> deleteUser(List<Long> ids);

    Response<String> resetPassword(Long id);
}
