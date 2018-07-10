package com.xplusplus.security.service;

import com.xplusplus.security.domain.*;
import com.xplusplus.security.exception.EnumExceptions;
import com.xplusplus.security.exception.SecurityExceptions;
import com.xplusplus.security.repository.GooutHeaderRepository;
import com.xplusplus.security.repository.GooutMaterialUserRepository;
import com.xplusplus.security.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.*;

/**
 * @Author: zhouweixin
 * @Description:
 * @Date: Created in 下午6:35:17 2018年5月22日
 */
@Service
public class GooutHeaderService {
    @Autowired
    private GooutHeaderRepository gooutHeaderRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private GooutMaterialUserRepository gooutMaterialUserRepository;

    /**
     * 新增
     *
     * @param gooutHeader
     * @return
     */
    @Transactional
    public GooutHeader save(GooutHeader gooutHeader) {

        // 验证是否存在
        if (gooutHeader == null || (gooutHeader.getId() != null && gooutHeaderRepository.findOne(gooutHeader.getId()) != null)) {
            throw new SecurityExceptions(EnumExceptions.ADD_FAILED_DUPLICATE);
        }

        // 验证申请人
        if (gooutHeader.getApplyUser() == null || userRepository.findOne(gooutHeader.getApplyUser().getId()) == null) {
            throw new SecurityExceptions(EnumExceptions.ADD_FAILED_APPLY_USER_NOT_EXIST);
        }

        // 验证经办人
        User operator = null;
        if (gooutHeader.getOperator() == null || (operator = userRepository.findOne(gooutHeader.getOperator().getId())) == null) {
            throw new SecurityExceptions(EnumExceptions.ADD_FAILED_OPERATOR_NOT_EXIST);
        }

        // 设置出库时间
        gooutHeader.setGooutTime(new Date());

        // 判断出库内容
        if (gooutHeader.getGoouts() == null || gooutHeader.getGoouts().size() == 0) {
            throw new SecurityExceptions(EnumExceptions.ADD_FAILED_GOOUT_CONTENT_NULL);
        }

        // 判断出库人
        if (gooutHeader.getUserIds() == null || gooutHeader.getUserIds().size() == 0) {
            throw new SecurityExceptions(EnumExceptions.ADD_FAILED_GOOUT_USER_NULL);
        }

        List<User> users = new ArrayList<>();
        for (String userId : gooutHeader.getUserIds()) {
            User user = userRepository.findOne(userId);
            if (user == null) {
                EnumExceptions.ADD_FAILED_GOOUT_USER_NOT_EXIST.setMessage("添加失败, 出库人" + userId + "不存在");
                throw new SecurityExceptions(EnumExceptions.ADD_FAILED_GOOUT_USER_NOT_EXIST);
            }

            users.add(user);
        }

        // 设置人数
        gooutHeader.setNumPeople(users.size());

        // 新增出库单
        GooutHeader save = gooutHeaderRepository.save(gooutHeader);

        // 添加出库物品与用户关系
        for (Goout goout : save.getGoouts()) {
            for(User user : users){
                GooutMaterialUser gooutMaterialUser = new GooutMaterialUser(save, user, goout, operator);
                gooutMaterialUserRepository.save(gooutMaterialUser);
            }
        }

        return save;
    }

    /**
     * 删除
     *
     * @param id
     */
    public void delete(Long id) {

        // 验证是否存在
        GooutHeader gooutHeader = null;
        if ((gooutHeader = gooutHeaderRepository.findOne(id)) == null) {
            throw new SecurityExceptions(EnumExceptions.DELETE_FAILED_NOT_EXIST);
        }

        // 判断是否有外键关联
        if(gooutMaterialUserRepository.findFirstByGooutHeader(gooutHeader) != null){
            throw new SecurityExceptions(EnumExceptions.DELETE_FAILED_USED);
        }
        gooutHeaderRepository.delete(id);
    }

    /**
     * 批量删除
     *
     * @param gooutHeaders
     */
    public void deleteInBatch(Collection<GooutHeader> gooutHeaders) {
        gooutHeaderRepository.deleteInBatch(gooutHeaders);
    }

    /**
     * 通过编码查询
     *
     * @param id
     * @return
     */
    public GooutHeader findOne(Long id) {
        return gooutHeaderRepository.findOne(id);
    }

    /**
     * 查询所有
     *
     * @return
     */
    public List<GooutHeader> findAll() {
        return gooutHeaderRepository.findAll();
    }

    /**
     * 查询所有-分页
     *
     * @param page
     * @param size
     * @param sortFieldName
     * @param asc
     * @return
     */
    public Page<GooutHeader> findAllByPage(Integer page, Integer size, String sortFieldName, Integer asc) {

        // 判断排序字段名是否存在
        try {
            GooutHeader.class.getDeclaredField(sortFieldName);
        } catch (Exception e) {
            // 如果不存在就设置为id
            sortFieldName = "id";
        }

        Sort sort = null;
        if (asc == 0) {
            sort = new Sort(Direction.DESC, sortFieldName);
        } else {
            sort = new Sort(Direction.ASC, sortFieldName);
        }

        Pageable pageable = new PageRequest(page, size, sort);
        return gooutHeaderRepository.findAll(pageable);
    }
}
