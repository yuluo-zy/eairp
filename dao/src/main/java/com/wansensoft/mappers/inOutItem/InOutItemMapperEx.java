package com.wansensoft.mappers.inOutItem;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.wansensoft.entities.inOutItem.InOutItem;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.Date;
import java.util.List;

@Mapper
public interface InOutItemMapperEx extends BaseMapper<InOutItem> {

    List<InOutItem> selectByConditionInOutItem(
            @Param("name") String name,
            @Param("type") String type,
            @Param("remark") String remark,
            @Param("offset") Integer offset,
            @Param("rows") Integer rows);

    Long countsByInOutItem(
            @Param("name") String name,
            @Param("type") String type,
            @Param("remark") String remark);

    int batchDeleteInOutItemByIds(@Param("updateTime") Date updateTime, @Param("updater") Long updater, @Param("ids") String ids[]);
}