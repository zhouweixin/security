package com.xplusplus.security.service;

import com.xplusplus.security.domain.ResignType;
import com.xplusplus.security.exception.EnumExceptions;
import com.xplusplus.security.exception.SecurityExceptions;
import com.xplusplus.security.repository.ResignTypeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.Collection;
import java.util.List;

/**
 * @Author: zhouweixin
 * @Description:
 * @Date: Created in 17:20 2018/6/12
 * @Modified By:
 */
@Service
public class ResignTypeService {

    @Autowired
    private ResignTypeRepository resignTypeRepository;

    /**
     * 新增
     *
     * @param resignType
     * @return
     */
    public ResignType save(ResignType resignType) {

        // 验证是否存在
        if (resignType == null || (resignType.getId() != null && resignTypeRepository.findOne(resignType.getId()) != null)) {
            throw new SecurityExceptions(EnumExceptions.ADD_FAILED_DUPLICATE);
        }

        return resignTypeRepository.save(resignType);
    }

    /**
     * 更新
     *
     * @param resignType
     * @return
     */
    public ResignType update(ResignType resignType) {

        // 验证是否存在
        if (resignType == null || resignType.getId() == null || resignTypeRepository.findOne(resignType.getId()) == null) {
            throw new SecurityExceptions(EnumExceptions.UPDATE_FAILED_NOT_EXIST);
        }

        return resignTypeRepository.save(resignType);
    }

    /**
     * 删除
     *
     * @param id
     */
    public void delete(Integer id) {

        // 验证是否存在
        if (resignTypeRepository.findOne(id) == null) {
            throw new SecurityExceptions(EnumExceptions.DELETE_FAILED_NOT_EXIST);
        }
        resignTypeRepository.delete(id);
    }

    /**
     * 批量删除
     *
     * @param resignTypes
     */
    public void deleteInBatch(Collection<ResignType> resignTypes) {
        resignTypeRepository.deleteInBatch(resignTypes);
    }

    /**
     * 通过编码查询
     *
     * @param id
     * @return
     */
    public ResignType findOne(Integer id) {
        return resignTypeRepository.findOne(id);
    }

    /**
     * 查询所有
     *
     * @return
     */
    public List<ResignType> findAll() {
        return resignTypeRepository.findAll();
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
    public Page<ResignType> findAllByPage(Integer page, Integer size, String sortFieldName, Integer asc) {

        // 判断排序字段名是否存在
        try {
            ResignType.class.getDeclaredField(sortFieldName);
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
        return resignTypeRepository.findAll(pageable);
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
    public Page<ResignType> findByNameLikeByPage(String name, Integer page, Integer size, String sortFieldName,
                                             Integer asc) {

        // 判断排序字段名是否存在
        try {
            ResignType.class.getDeclaredField(sortFieldName);
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
        return resignTypeRepository.findByNameLike("%" + name + "%", pageable);
    }
}
