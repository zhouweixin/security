package com.xplusplus.security.service;

import com.xplusplus.security.domain.LossEntry;
import com.xplusplus.security.domain.Material;
import com.xplusplus.security.domain.Stock;
import com.xplusplus.security.exception.EnumExceptions;
import com.xplusplus.security.exception.SecurityExceptions;
import com.xplusplus.security.repository.LossEntryRepository;
import com.xplusplus.security.repository.MaterialRepository;
import com.xplusplus.security.repository.StockRepository;
import com.xplusplus.security.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;

import java.util.Collection;
import java.util.Date;
import java.util.List;

/**
 * @Author: zhouweixin
 * @Description:
 * @Date: Created in 8:27 2018/7/9
 * @Modified By:
 */
public class LossEntryService {
    @Autowired
    private LossEntryRepository lossEntryRepository;

    @Autowired
    private StockRepository stockRepository;

    @Autowired
    private MaterialRepository materialRepository;

    @Autowired
    private UserRepository userRepository;

    /**
     * 新增
     *
     * @param lossEntry
     * @return
     */
    public LossEntry save(LossEntry lossEntry) {
        // 验证是否存在
        if (lossEntry == null || (lossEntry.getId() != null && lossEntryRepository.findOne(lossEntry.getId()) != null)) {
            throw new SecurityExceptions(EnumExceptions.ADD_FAILED_DUPLICATE);
        }

        // 验证库存
        Stock stock = null;
        if (lossEntry.getStock() == null || (stock = stockRepository.findOne(lossEntry.getStock().getId())) == null) {
            throw new SecurityExceptions(EnumExceptions.ADD_FAILED_STOCK_NOT_EXIST);
        }

        // 验证物品
        if (lossEntry.getMaterial() == null || materialRepository.findOne(lossEntry.getMaterial().getId()) == null) {
            throw new SecurityExceptions(EnumExceptions.ADD_FAILED_MATERIAL_NOT_EXIST);
        }

        // 验证申请人
        if (lossEntry.getApplyUser() == null || userRepository.findOne(lossEntry.getApplyUser().getId()) == null) {
            throw new SecurityExceptions(EnumExceptions.ADD_FAILED_APPLY_USER_NOT_EXIST);
        }

        // 申请时间
        lossEntry.setApplyTime(new Date());

        // 验证报损数量
        if (stock.getNumber() < lossEntry.getLossNumber()) {
            throw new SecurityExceptions(EnumExceptions.ADD_FAILED_LOSS_NUMBER_GREATER_STOCK);
        }

        // 不需要审核
        if (lossEntry.getLossNumber() == 0) {
            lossEntry.setStatus(3);
        }

        return lossEntryRepository.save(lossEntry);
    }

    /**
     * 更新
     *
     * @param lossEntry
     * @return
     */
    public LossEntry update(LossEntry lossEntry) {
        delete(lossEntry.getId());
        return save(lossEntry);
    }

    /**
     * 通过主键查询
     *
     * @param id
     */
    public void delete(Long id) {
        // 验证是否存在
        LossEntry lossEntry = null;
        if ((lossEntry = lossEntryRepository.findOne(id)) == null) {
            throw new SecurityExceptions(EnumExceptions.DELETE_FAILED_NOT_EXIST);
        }

        // 验证审核状态
        if (lossEntry.getStatus() != 0) {
            throw new SecurityExceptions(EnumExceptions.DELETE_FAILED_AUDITED);
        }

        lossEntryRepository.delete(id);
    }

    /**
     * 批量删除
     *
     * @param lossEntries
     */
    public void deleteInBatch(Collection<LossEntry> lossEntries) {
        for (LossEntry lossEntry : lossEntries) {
            delete(lossEntry.getId());
        }
    }

    /**
     * 通过编码查询
     *
     * @param id
     * @return
     */
    public LossEntry findOne(Long id) {
        return lossEntryRepository.findOne(id);
    }

    /**
     * 查询所有
     *
     * @return
     */
    public List<LossEntry> findAll() {
        return lossEntryRepository.findAll();
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
    public Page<LossEntry> findAllByPage(Integer page, Integer size, String sortFieldName, Integer asc) {

        // 判断排序字段名是否存在
        try {
            Stock.class.getDeclaredField(sortFieldName);
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
        return lossEntryRepository.findAll(pageable);
    }

    /**
     * 通过物品名称模糊查询-分页
     *
     * @param name
     * @param page
     * @param size
     * @param sortFieldName
     * @param asc
     * @return
     */
    public Page<LossEntry> findByMaterailNameLikeByPage(String name, Integer page, Integer size,
                                                        String sortFieldName, Integer asc) {

        // 判断排序字段名是否存在
        try {
            Stock.class.getDeclaredField(sortFieldName);
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

        List<Material> materials = materialRepository.findByNameLike("%" + name + "%");
        return lossEntryRepository.findByMaterialIn(materials, pageable);
    }

    /**
     * 通过状态和物品名称模糊查询-分页
     *
     * @param status
     * @param name
     * @param page
     * @param size
     * @param sortFieldName
     * @param asc
     * @return
     */
    public Page<LossEntry> findByStatusAndMaterialNameLikeByPage(int status, String name, Integer page, Integer size, String sortFieldName, Integer asc) {
        // 判断排序字段名是否存在
        try {
            Stock.class.getDeclaredField(sortFieldName);
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

        List<Material> materials = materialRepository.findByNameLike("%" + name + "%");
        return lossEntryRepository.findByStatusAndMaterialIn(status, materials, pageable);
    }
}
