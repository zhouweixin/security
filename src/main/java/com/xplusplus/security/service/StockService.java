package com.xplusplus.security.service;

import com.xplusplus.security.domain.*;
import com.xplusplus.security.exception.EnumExceptions;
import com.xplusplus.security.exception.SecurityExceptions;
import com.xplusplus.security.repository.MaterialRepository;
import com.xplusplus.security.repository.StockRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.Collection;
import java.util.List;

/**
 * @Author: zhouweixin
 * @Description:
 * @Date: Created in 下午6:35:17 2018年5月22日
 */
@Service
public class StockService {
    @Autowired
    private StockRepository stockRepository;

    @Autowired
    private MaterialRepository materialRepository;

    /**
     * 更新库存
     *
     * @param o
     * @param flag 1表示加， -1表示减
     * @return
     */
    @Transactional
    public void update(Object o, int flag) {
        // 入库单
        if (o instanceof GodownHeader) {
            GodownHeader godownHeader = (GodownHeader) o;
            if (godownHeader != null && godownHeader.getGodowns() != null) {
                for (Godown godown : godownHeader.getGodowns()) {
                    updateNumberByMaterial(godown.getMaterial(), godown.getNumber() * flag);
                }
            }
        } else if (o instanceof GooutHeader) {// 出库单
            GooutHeader gooutHeader = (GooutHeader) o;
            if (gooutHeader != null && gooutHeader.getGoouts() != null) {
                for (Goout goout : gooutHeader.getGoouts()) {
                    updateNumberByMaterial(goout.getMaterial(), goout.getSum() * flag);
                }
            }
        } else if (o instanceof List){// 归还单
            List<GooutMaterialUser> gooutMaterialUsers = (List<GooutMaterialUser>)o;
            for(GooutMaterialUser gooutMaterialUser : gooutMaterialUsers){
                updateNumberByMaterial(gooutMaterialUser.getMaterial(), gooutMaterialUser.getNumber() * flag);
            }
        }
    }

    /**
     * 通过物品更新库存
     *
     * @param material
     * @param number
     */
    @Transactional
    public void updateNumberByMaterial(Material material, int number){
        if (material == null) {
            return;
        }

        Stock stock = stockRepository.findFirstByMaterial(material);
        if (stock == null) {
            stock.setMaterial(material);
            stock.setNumber(number);
        } else {
            stock.setNumber(stock.getNumber() + number);
        }
        stockRepository.save(stock);
    }

    /**
     * 通过编码查询
     *
     * @param id
     * @return
     */
    public Stock findOne(Long id) {
        return stockRepository.findOne(id);
    }

    /**
     * 查询所有
     *
     * @return
     */
    public List<Stock> findAll() {
        return stockRepository.findAll();
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
    public Page<Stock> findAllByPage(Integer page, Integer size, String sortFieldName, Integer asc) {

        // 判断排序字段名是否存在
        try {
            Stock.class.getDeclaredField(sortFieldName);
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
        return stockRepository.findAll(pageable);
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
    public Page<Stock> findByMaterailNameLikeByPage(String name, Integer page, Integer size, String sortFieldName,
                                                    Integer asc) {

        // 判断排序字段名是否存在
        try {
            Stock.class.getDeclaredField(sortFieldName);
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

        List<Material> materials = materialRepository.findByNameLike("%" + name + "%");
        return stockRepository.findByMaterialIn(materials, pageable);
    }
}
