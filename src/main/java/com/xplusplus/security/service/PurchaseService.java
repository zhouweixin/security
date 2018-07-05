package com.xplusplus.security.service;

import com.xplusplus.security.domain.Purchase;
import com.xplusplus.security.exception.EnumExceptions;
import com.xplusplus.security.exception.SecurityExceptions;
import com.xplusplus.security.repository.PurchaseRepository;
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
public class PurchaseService {
	@Autowired
	private PurchaseRepository purchaseRepository;

	/**
	 * 新增
	 * 
	 * @param purchase
	 * @return
	 */
	public Purchase save(Purchase purchase) {

		// 验证是否存在
		if (purchase == null || (purchase.getId() != null && purchaseRepository.findOne(purchase.getId()) != null)) {
			throw new SecurityExceptions(EnumExceptions.ADD_FAILED_DUPLICATE);
		}

		return purchaseRepository.save(purchase);
	}

	/**
	 * 更新
	 * 
	 * @param purchase
	 * @return
	 */
	public Purchase update(Purchase purchase) {

		// 验证是否存在
		if (purchase == null || purchase.getId() == null || purchaseRepository.findOne(purchase.getId()) == null) {
			throw new SecurityExceptions(EnumExceptions.UPDATE_FAILED_NOT_EXIST);
		}

		return purchaseRepository.save(purchase);
	}

	/**
	 * 删除
	 * 
	 * @param id
	 */
	public void delete(Long id) {

		// 验证是否存在
		if (purchaseRepository.findOne(id) == null) {
			throw new SecurityExceptions(EnumExceptions.DELETE_FAILED_NOT_EXIST);
		}
		purchaseRepository.delete(id);
	}

	/**
	 * 批量删除
	 * 
	 * @param purchases
	 */
	public void deleteInBatch(Collection<Purchase> purchases) {
		purchaseRepository.deleteInBatch(purchases);
	}

	/**
	 * 通过编码查询
	 * 
	 * @param id
	 * @return
	 */
	public Purchase findOne(Long id) {
		return purchaseRepository.findOne(id);
	}

	/**
	 * 查询所有
	 * 
	 * @return
	 */
	public List<Purchase> findAll() {
		return purchaseRepository.findAll();
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
	public Page<Purchase> findAllByPage(Integer page, Integer size, String sortFieldName, Integer asc) {

		// 判断排序字段名是否存在
		try {
			Purchase.class.getDeclaredField(sortFieldName);
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
		return purchaseRepository.findAll(pageable);
	}
}
