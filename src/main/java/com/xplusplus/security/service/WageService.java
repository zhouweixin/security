package com.xplusplus.security.service;

import com.xplusplus.security.domain.Wage;
import com.xplusplus.security.exception.EnumExceptions;
import com.xplusplus.security.exception.SecurityExceptions;
import com.xplusplus.security.repository.WageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.Collection;
import java.util.HashSet;
import java.util.List;

/**
 * @Author: zhouweixin
 * @Description:
 * @Date: Created in 20:24 2018/6/12
 * @Modified By:
 */
@Service
public class WageService {

    @Autowired
    private WageRepository wageRepository;

    @Autowired
    private UserService userService;

    /**
     * 新增
     *
     * @param wage
     * @return
     */
    public Wage save(Wage wage, String[] userIds) {

        // 验证是否存在
        if (wage == null || (wage.getId() != null && wageRepository.findOne(wage.getId()) != null)) {
            throw new SecurityExceptions(EnumExceptions.ADD_FAILED_DUPLICATE);
        }

        // 先行保存
        Wage save = wageRepository.save(wage);

        if (userIds != null && userIds.length > 0) {
            // 分配用户到薪资组
            HashSet<String> userIdSet = new HashSet<>(Arrays.asList(userIds));
            userService.assignUsersToWage(save.getId(), userIdSet);
        }

        return save;
    }

    /**
     * 更新
     *
     * @param wage
     * @return
     */
    public Wage update(Wage wage, String[] userIds) {

        // 验证是否存在
        if (wage == null || wage.getId() == null || wageRepository.findOne(wage.getId()) == null) {
            throw new SecurityExceptions(EnumExceptions.UPDATE_FAILED_NOT_EXIST);
        }

        // 先行保存
        Wage save = wageRepository.save(wage);

        if (userIds != null && userIds.length > 0) {
            // 分配用户到薪资组
            HashSet<String> userIdSet = new HashSet<>(Arrays.asList(userIds));
            userService.assignUsersToWage(save.getId(), userIdSet);
        }

        return save;
    }

    /**
     * 删除
     *
     * @param id
     */
    public void delete(Integer id) {

        // 验证是否存在
        if (wageRepository.findOne(id) == null) {
            throw new SecurityExceptions(EnumExceptions.DELETE_FAILED_NOT_EXIST);
        }
        wageRepository.delete(id);
    }

    /**
     * 批量删除
     *
     * @param wages
     */
    public void deleteInBatch(Collection<Wage> wages) {
        wageRepository.deleteInBatch(wages);
    }

    /**
     * 通过编码查询
     *
     * @param id
     * @return
     */
    public Wage findOne(Integer id) {
        return wageRepository.findOne(id);
    }

    /**
     * 查询所有
     *
     * @return
     */
    public List<Wage> findAll() {
        return wageRepository.findAll();
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
    public Page<Wage> findAllByPage(Integer page, Integer size, String sortFieldName, Integer asc) {

        // 判断排序字段名是否存在
        try {
            Wage.class.getDeclaredField(sortFieldName);
        } catch (Exception e) {
            // 如果不存在就设置为id
            sortFieldName = "id";
        }

        Sort sort = null;
        if (asc == 0) {
            sort = new Sort(Sort.Direction.DESC, sortFieldName);
        } else {
            sort = new Sort(Sort.Direction.ASC, sortFieldName);
        }

        Pageable pageable = new PageRequest(page, size, sort);
        return wageRepository.findAll(pageable);
    }

    /**
     * 通过名称模糊分页查询
     *
     * @param name
     * @param page
     * @param size
     * @param sortFieldName
     * @param asc
     * @return
     */
    public Page<Wage> findByNameLikeByPage(String name, Integer page, Integer size, String sortFieldName,
                                           Integer asc) {

        // 判断排序字段名是否存在
        try {
            Wage.class.getDeclaredField(sortFieldName);
        } catch (Exception e) {
            // 如果不存在就设置为id
            sortFieldName = "id";
        }

        Sort sort = null;
        if (asc == 0) {
            sort = new Sort(Sort.Direction.DESC, sortFieldName);
        } else {
            sort = new Sort(Sort.Direction.ASC, sortFieldName);
        }

        Pageable pageable = new PageRequest(page, size, sort);
        return wageRepository.findByNameLike("%" + name + "%", pageable);
    }
}
