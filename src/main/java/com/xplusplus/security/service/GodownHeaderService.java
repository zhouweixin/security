package com.xplusplus.security.service;

import com.xplusplus.security.domain.*;
import com.xplusplus.security.exception.EnumExceptions;
import com.xplusplus.security.exception.SecurityExceptions;
import com.xplusplus.security.repository.GodownHeaderRepository;
import com.xplusplus.security.repository.PurchaseAuditProcessRepository;
import com.xplusplus.security.repository.PurchaseHeaderRepository;
import com.xplusplus.security.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.stereotype.Service;

import java.util.*;

/**
 * @Author: zhouweixin
 * @Description:
 * @Date: Created in 下午6:35:17 2018年5月22日
 */
@Service
public class GodownHeaderService {
	@Autowired
	private GodownHeaderRepository godownHeaderRepository;

	@Autowired
    private UserRepository userRepository;

	@Autowired
    private PurchaseHeaderRepository purchaseHeaderRepository;

	@Autowired
    private PurchaseAuditProcessRepository purchaseAuditProcessRepository;

	/**
	 * 新增
	 * 
	 * @param godownHeader
	 * @return
	 */
	public GodownHeader save(GodownHeader godownHeader) {

		// 验证是否存在
		if (godownHeader == null || (godownHeader.getId() != null && godownHeaderRepository.findOne(godownHeader.getId()) != null)) {
			throw new SecurityExceptions(EnumExceptions.ADD_FAILED_DUPLICATE);
		}

        // 验证申请人
        if(godownHeader.getApplyUser() == null || userRepository.findOne(godownHeader.getApplyUser().getId()) == null){
            throw new SecurityExceptions(EnumExceptions.ADD_FAILED_APPLY_USER_NOT_EXIST);
        }

        // 验证经办人
        if(godownHeader.getOperator() == null || userRepository.findOne(godownHeader.getOperator().getId()) == null){
            throw new SecurityExceptions(EnumExceptions.ADD_FAILED_OPERATOR_NOT_EXIST);
        }

        // 验证采购单
        PurchaseHeader purchaseHeader = null;
        if(godownHeader.getPurchaseHeader() == null || (purchaseHeader = purchaseHeaderRepository.findOne(godownHeader.getPurchaseHeader().getId())) == null){
            throw new SecurityExceptions(EnumExceptions.ADD_FAILED_PURCHASE_NOT_EXISE);
        }

        if(purchaseHeader.getStatus() != 1){
            throw new SecurityExceptions(EnumExceptions.ADD_FAILED_PURCHASE_NOT_AUDIT_OR_NOT);
        }

        // 设置入库单内容
        Set<Purchase> purchases = purchaseHeader.getPurchases();
        if(purchases == null){
            throw new SecurityExceptions(EnumExceptions.ADD_FAILED_PURCHASE_CONTENT_NULL);
        }

        Set<Godown> godowns = new HashSet<>();
        for(Purchase purchase:purchases){
            godowns.add(new Godown(purchase.getMaterial(), purchase.getNumber()));
        }
        godownHeader.setGodowns(godowns);

        // 设置入库时间
        godownHeader.setGodownTime(new Date());

		return godownHeaderRepository.save(godownHeader);
	}

	/**
	 * 删除
	 * 
	 * @param id
	 */
	public void delete(Long id) {

		// 验证是否存在
		if (godownHeaderRepository.findOne(id) == null) {
			throw new SecurityExceptions(EnumExceptions.DELETE_FAILED_NOT_EXIST);
		}
		godownHeaderRepository.delete(id);
	}

	/**
	 * 批量删除
	 * 
	 * @param godownHeaders
	 */
	public void deleteInBatch(Collection<GodownHeader> godownHeaders) {
		godownHeaderRepository.deleteInBatch(godownHeaders);
	}

	/**
	 * 通过编码查询
	 * 
	 * @param id
	 * @return
	 */
	public GodownHeader findOne(Long id) {
		return godownHeaderRepository.findOne(id);
	}

	/**
	 * 查询所有
	 * 
	 * @return
	 */
	public List<GodownHeader> findAll() {
		return godownHeaderRepository.findAll();
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
	public Page<GodownHeader> findAllByPage(Integer page, Integer size, String sortFieldName, Integer asc) {

		// 判断排序字段名是否存在
		try {
			GodownHeader.class.getDeclaredField(sortFieldName);
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
		return godownHeaderRepository.findAll(pageable);
	}
}
