package com.xplusplus.security.service;

import com.xplusplus.security.domain.Purchase;
import com.xplusplus.security.domain.PurchaseAuditRecord;
import com.xplusplus.security.domain.PurchaseHeader;
import com.xplusplus.security.exception.EnumExceptions;
import com.xplusplus.security.exception.SecurityExceptions;
import com.xplusplus.security.repository.PurchaseAuditRecordRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.stereotype.Service;

import java.util.Collection;
import java.util.List;

/**
 * @Author: zhouweixin
 * @Description:
 * @Date: Created in 下午6:35:17 2018年5月22日
 */
@Service
public class PurchaseAuditRecordService {
	@Autowired
	private PurchaseAuditRecordRepository purchaseAuditRecordRepository;

	/**
	 * 通过编码查询
	 * 
	 * @param id
	 * @return
	 */
	public PurchaseAuditRecord findOne(Long id) {
		return purchaseAuditRecordRepository.findOne(id);
	}

	/**
	 * 查询所有
	 * 
	 * @return
	 */
	public List<PurchaseAuditRecord> findAll() {
		return purchaseAuditRecordRepository.findAll();
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
	public Page<PurchaseAuditRecord> findAllByPage(Integer page, Integer size, String sortFieldName, Integer asc) {

		// 判断排序字段名是否存在
		try {
			PurchaseAuditRecord.class.getDeclaredField(sortFieldName);
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
		return purchaseAuditRecordRepository.findAll(pageable);
	}

    /**
     * 通过采购申请表头查询
     *
     * @return
     */
    public List<PurchaseAuditRecord> findByPurchaseHeader(PurchaseHeader purchaseHeader) {
        return purchaseAuditRecordRepository.findByPurchaseHeader(purchaseHeader);
    }
}
