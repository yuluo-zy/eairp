package com.wansensoft.api.serialNumber;

import com.alibaba.fastjson.JSONObject;
import com.wansensoft.entities.depot.DepotItem;
import com.wansensoft.entities.serialNumber.SerialNumberEx;
import com.wansensoft.service.depotHead.DepotHeadServiceImpl;
import com.wansensoft.service.depotItem.DepotItemServiceImpl;
import com.wansensoft.service.serialNumber.SerialNumberService;
import com.wansensoft.utils.BaseResponseInfo;
import com.wansensoft.utils.ErpInfo;
import com.wansensoft.utils.Tools;
import com.wansensoft.utils.ResponseJsonUtil;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.*;

import jakarta.annotation.Resource;
import jakarta.servlet.http.HttpServletRequest;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping(value = "/serialNumber")
@Api(tags = {"序列号管理"})
public class SerialNumberController {
    private Logger logger = LoggerFactory.getLogger(SerialNumberController.class);

    @Resource
    private SerialNumberService serialNumberService;
    @Resource
    private DepotHeadServiceImpl depotHeadServiceImpl;
    @Resource
    private DepotItemServiceImpl depotItemServiceImpl;

    /**
     * description:
     *批量添加序列号
     * @Param: materialName
     * @Param: serialNumberPrefix
     * @Param: batAddTotal
     * @Param: remark
     * @return java.lang.Object
     */
    @PostMapping("/batAddSerialNumber")
    @ApiOperation(value = "批量添加序列号")
    public String batAddSerialNumber(@RequestBody JSONObject jsonObject, HttpServletRequest request)throws Exception{
        Map<String, Object> objectMap = new HashMap<>();
        String materialCode = jsonObject.getString("materialCode");
        String serialNumberPrefix = jsonObject.getString("serialNumberPrefix");
        Integer batAddTotal = jsonObject.getInteger("batAddTotal");
        String remark = jsonObject.getString("remark");
        int insert = serialNumberService.batAddSerialNumber(materialCode,serialNumberPrefix,batAddTotal,remark);
        if(insert > 0) {
            return ResponseJsonUtil.returnJson(objectMap, ErpInfo.OK.name, ErpInfo.OK.code);
        } else if(insert == -1) {
            return ResponseJsonUtil.returnJson(objectMap, ErpInfo.TEST_USER.name, ErpInfo.TEST_USER.code);
        } else {
            return ResponseJsonUtil.returnJson(objectMap, ErpInfo.ERROR.name, ErpInfo.ERROR.code);
        }
    }

    /**
     * 获取序列号商品
     * @param name
     * @param depotId
     * @param barCode
     * @param currentPage
     * @param pageSize
     * @param request
     * @return
     * @throws Exception
     */
    @GetMapping(value = "/getEnableSerialNumberList")
    @ApiOperation(value = "获取序列号商品")
    public BaseResponseInfo getEnableSerialNumberList(@RequestParam("name") String name,
                                                      @RequestParam("depotItemId") Long depotItemId,
                                                      @RequestParam("depotId") Long depotId,
                                                      @RequestParam("barCode") String barCode,
                                                      @RequestParam("page") Integer currentPage,
                                                      @RequestParam("rows") Integer pageSize,
                                                      HttpServletRequest request)throws Exception {
        BaseResponseInfo res = new BaseResponseInfo();
        Map<String, Object> map = new HashMap<>();
        try {
            String number = "";
            if(depotItemId != null) {
                DepotItem depotItem = depotItemServiceImpl.getDepotItem(depotItemId);
                number = depotHeadServiceImpl.getDepotHead(depotItem.getHeaderId()).getNumber();
            }
            List<SerialNumberEx> list = serialNumberService.getEnableSerialNumberList(number, name, depotId, barCode, (currentPage-1)*pageSize, pageSize);
            for(SerialNumberEx serialNumberEx: list) {
                serialNumberEx.setCreateTimeStr(Tools.getCenternTime(serialNumberEx.getCreateTime()));
            }
            Long total = serialNumberService.getEnableSerialNumberCount(number, name, depotId, barCode);
            map.put("rows", list);
            map.put("total", total);
            res.code = 200;
            res.data = map;
        } catch(Exception e){
            e.printStackTrace();
            res.code = 500;
            res.data = "获取数据失败";
        }
        return res;
    }
}