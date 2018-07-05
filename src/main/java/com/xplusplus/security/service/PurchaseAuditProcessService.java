package com.xplusplus.security.service;

import com.xplusplus.security.domain.PurchaseAuditProcess;
import com.xplusplus.security.exception.EnumExceptions;
import com.xplusplus.security.exception.SecurityExceptions;
import com.xplusplus.security.repository.PurchaseAuditProcessRepository;
import com.xplusplus.security.repository.UserRepository;
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
public class PurchaseAuditProcessService {
	@Autowired
	private PurchaseAuditProcessRepository purchaseAuditProcessRepository;

	@Autowired
    private UserRepository userRepository;

	/**
	 * 新增
	 * 
	 * @param purchaseAuditProcess
	 * @return
	 */
	public PurchaseAuditProcess save(PurchaseAuditProcess purchaseAuditProcess) {

		// 验证是否存在
		if (purchaseAuditProcess == null || (purchaseAuditProcess.getId() != null && purchaseAuditProcessRepository.findOne(purchaseAuditProcess.getId()) != null)) {
			throw new SecurityExceptions(EnumExceptions.ADD_FAILED_DUPLICATE);
		}

		// 验证审核人1
        if(purchaseAuditProcess.getAuditor1() == null || userRepository.findOne(purchaseAuditProcess.getAuditor1().getId()) == null){
            throw new SecurityExceptions(EnumExceptions.UPDATE_FAILED_AUDITOR1_NOT_EXIST);
        }

        // 验证审核人2
        if(purchaseAuditProcess.getAuditor2() == null || userRepository.findOne(purchaseAuditProcess.getAuditor2().getId()) == null){
            throw new SecurityExceptions(EnumExceptions.UPDATE_FAILED_AUDITOR2_NOT_EXIST);
        }

		return purchaseAuditProcessRepository.save(purchaseAuditProcess);
	}

	/**
	 * 更新
	 * 
	 * @param purchaseAuditProcess
	 * @return
	 */
	public PurchaseAuditProcess update(PurchaseAuditProcess purchaseAuditProcess) {

		// 验证是否存在
		if (purchaseAuditProcess == null || purchaseAuditProcess.getId() == null || purchaseAuditProcessRepository.findOne(purchaseAuditProcess.getId()) == null) {
			throw new SecurityExceptions(EnumExceptions.UPDATE_FAILED_NOT_EXIST);
		}

        // 验证审核人1
        if(purchaseAuditProcess.getAuditor1() == null || userRepository.findOne(purchaseAuditProcess.getAuditor1().getId()) == null){
            throw new SecurityExceptions(EnumExceptions.UPDATE_FAILED_AUDITOR1_NOT_EXIST);
        }

        // 验证审核人2
        if(purchaseAuditProcess.getAuditor2() == null || userRepository.findOne(purchaseAuditProcess.getAuditor2().getId()) == null){
            throw new SecurityExceptions(EnumExceptions.UPDATE_FAILED_AUDITOR2_NOT_EXIST);
        }

		return purchaseAuditProcessRepository.save(purchaseAuditProcess);
	}

	/**
	 * 删除
	 * 
	 * @param id
	 */
	public void delete(Integer id) {

		// 验证是否存在
		if (purchaseAuditProcessRepository.findOne(id) == null) {
			throw new SecurityExceptions(EnumExceptions.DELETE_FAILED_NOT_EXIST);
		}
		purchaseAuditProcessRepository.delete(id);
	}

	/**
	 * 批量删除
	 * 
	 * @param purchaseAuditProcesss
	 */
	public void deleteInBatch(Collection<PurchaseAuditProcess> purchaseAuditProcesss) {
		purchaseAuditProcessRepository.deleteInBatch(purchaseAuditProcesss);
	}

	/**
	 * 通过编码查询
	 * 
	 * @param id
	 * @return
	 */
	public PurchaseAuditProcess findOne(Integer id) {
		return purchaseAuditProcessRepository.findOne(id);
	}

	/**
	 * 查询所有
	 * 
	 * @return
	 */
	public List<PurchaseAuditProcess> findAll() {
		return purchaseAuditProcessRepository.findAll();
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
	public Page<PurchaseAuditProcess> findAllByPage(Integer page, Integer size, String sortFieldName, Integer asc) {

		// 判断排序字段名是否存在
		try {
			PurchaseAuditProcess.class.getDeclaredField(sortFieldName);
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
		return purchaseAuditProcessRepository.findAll(pageable);
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
	public Page<PurchaseAuditProcess> findByNameLikeByPage(String name, Integer page, Integer size, String sortFieldName,
			Integer asc) {

		// 判断排序字段名是否存在
		try {
			PurchaseAuditProcess.class.getDeclaredField(sortFieldName);
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
		return purchaseAuditProcessRepository.findByNameLike("%" + name + "%", pageable);
	}
}
