package com.wansensoft.service.redis;

import com.wansensoft.utils.constants.BusinessConstants;
import com.wansensoft.utils.StringUtil;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Component;

import jakarta.servlet.http.HttpServletRequest;
import java.util.Set;
import java.util.concurrent.TimeUnit;

/**
 * Description
 */
@Component
public class RedisService {

    public final RedisTemplate redisTemplate;

    public static final String ACCESS_TOKEN = "X-Access-Token";

    public RedisService(RedisTemplate redisTemplate) {
        this.redisTemplate = redisTemplate;
    }

    /**
     * @author jisheng hua
     * description:
     *  从session中获取信息
     *@date: 2021/1/28 18:10
     * @Param: request
     * @Param: key
     * @return Object
     */
    public Object getObjectFromSessionByKey(HttpServletRequest request, String key){
        Object obj=null;
        if(request==null){
            return null;
        }
        String token = request.getHeader(ACCESS_TOKEN);
        if(token!=null) {
            //开启redis，用户数据放在redis中，从redis中获取
            if(redisTemplate.opsForHash().hasKey(token,key)){
                //redis中存在，拿出来使用
                obj=redisTemplate.opsForHash().get(token,key);
                redisTemplate.expire(token, BusinessConstants.MAX_SESSION_IN_SECONDS, TimeUnit.SECONDS);
            }
        }
        return obj;
    }
    /**
     * @author jisheng hua
     * description:
     *  将信息放入session或者redis中
     *@date: 2021/1/28 18:10
     * @Param: request
     * @Param: key
     * @Param: obj
     * @return
     */
    public void storageObjectBySession(String token, String key, Object obj) {
        //开启redis，用户数据放到redis中
        redisTemplate.opsForHash().put(token, key, obj.toString());
        redisTemplate.expire(token, BusinessConstants.MAX_SESSION_IN_SECONDS, TimeUnit.SECONDS);
    }
    /**
     * @author jisheng hua
     * description:
     *  将信息从session或者redis中移除
     *@date: 2021/1/28 18:10
     * @Param: request
     * @Param: key
     * @Param: obj
     * @return
     */
    public void deleteObjectBySession(HttpServletRequest request, String key){
        if(request!=null){
            String token = request.getHeader(ACCESS_TOKEN);
            if(StringUtil.isNotEmpty(token)){
                //开启redis，用户数据放在redis中，从redis中删除
                redisTemplate.opsForHash().delete(token, key);
            }
        }
    }

    /**
     * @author jisheng hua
     * 将信息从redis中移除，比对user和ip
     * @param userId
     * @param clientIp
     */
    public void deleteObjectByUserAndIp(Long userId, String clientIp){
        Set<String> tokens = redisTemplate.keys("*");
        for(String token : tokens) {
            Object userIdValue = redisTemplate.opsForHash().get(token, "userId");
            Object clientIpValue = redisTemplate.opsForHash().get(token, "clientIp");
            if(userIdValue!=null && clientIpValue!=null && userIdValue.equals(userId.toString()) && clientIpValue.equals(clientIp)) {
                redisTemplate.opsForHash().delete(token, "userId");
            }
        }
    }
}