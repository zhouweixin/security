package com.xplusplus.security.service;

import com.xplusplus.security.domain.*;
import com.xplusplus.security.exception.EnumExceptions;
import com.xplusplus.security.exception.SecurityExceptions;
import com.xplusplus.security.repository.*;
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
public class PurchaseHeaderService {
	@Autowired
	private PurchaseHeaderRepository purchaseHeaderRepository;

	@Autowired
    private UserRepository userRepository;

	@Autowired
    private DepartmentRepository departmentRepository;

	@Autowired
    private PurchaseAuditProcessRepository purchaseAuditProcessRepository;

	@Autowired
    private PurchaseAuditRecordRepository purchaseAuditRecordRepository;

	/**
	 * 新增
	 * 
	 * @param purchaseHeader
	 * @return
	 */
	public PurchaseHeader save(PurchaseHeader purchaseHeader) {

		// 验证是否存在
		if (purchaseHeader == null || (purchaseHeader.getId() != null && purchaseHeaderRepository.findOne(purchaseHeader.getId()) != null)) {
			throw new SecurityExceptions(EnumExceptions.ADD_FAILED_DUPLICATE);
		}

		// 验证申请人
		if(purchaseHeader.getApplyUser() == null || userRepository.findOne(purchaseHeader.getApplyUser().getId()) == null){
            throw new SecurityExceptions(EnumExceptions.ADD_FAILED_APPLY_USER_NOT_EXIST);
        }

        // 验证申请部门
        if(purchaseHeader.getDepartment() == null || departmentRepository.findOne(purchaseHeader.getDepartment().getId()) == null){
            throw new SecurityExceptions(EnumExceptions.ADD_FAILED_DEPARTMENT_NOT_EXIST);
        }

        // 验证采购审核流程
        PurchaseAuditProcess purchaseAuditProcess = null;
        if(purchaseHeader.getPurchaseAuditProcess() == null || (purchaseAuditProcess = purchaseAuditProcessRepository.findOne(purchaseHeader.getPurchaseAuditProcess().getId())) == null){
            throw new SecurityExceptions(EnumExceptions.ADD_FAILED_AUDIT_PROCESS_NOT_EXIST);
        }

        // 验证采购单
        if(purchaseHeader.getPurchases() == null || purchaseHeader.getPurchases().size() == 0){
            throw new SecurityExceptions(EnumExceptions.ADD_FAILED_PURCHASE_CONTENT_NULL);
        }

        // 设置当前审核人
        purchaseHeader.setCurAuditor(purchaseAuditProcess.getAuditor1());

        // 设置审核状态
        purchaseHeader.setStatus(0);

        // 设置申请时间
        purchaseHeader.setApplyTime(new Date());

		return purchaseHeaderRepository.save(purchaseHeader);
	}

	/**
	 * 更新
	 * 
	 * @param purchaseHeader
	 * @return
	 */
	public PurchaseHeader update(PurchaseHeader purchaseHeader) {

		// 验证是否存在
        PurchaseHeader one = null;
		if (purchaseHeader == null || purchaseHeader.getId() == null || (one=purchaseHeaderRepository.findOne(purchaseHeader.getId())) == null) {
			throw new SecurityExceptions(EnumExceptions.UPDATE_FAILED_NOT_EXIST);
		}

		// 验证是否已审核
        if(one != null && one.getStatus() > 0){
            throw new SecurityExceptions(EnumExceptions.UPDATE_FAILED_AUDITED);
        }

        // 验证是否正在审核
        List<PurchaseAuditRecord> purchaseAuditRecords = purchaseAuditRecordRepository.findByPurchaseHeader(purchaseHeader);
        if(purchaseAuditRecords != null && purchaseAuditRecords.size() > 0){
            throw new SecurityExceptions(EnumExceptions.UPDATE_FAILED_AUDITING);
        }

        // 先删除
        purchaseHeaderRepository.delete(purchaseHeader.getId());

        // 重新添加
		return save(purchaseHeader);
	}

	/**
	 * 删除
	 * 
	 * @param id
	 */
	public void delete(Long id) {
		// 验证是否存在
        PurchaseHeader purchaseHeader = null;
		if ((purchaseHeader = purchaseHeaderRepository.findOne(id)) == null) {
			throw new SecurityExceptions(EnumExceptions.DELETE_FAILED_NOT_EXIST);
		}

		if(purchaseHeader.getStatus() != 0){
            throw new SecurityExceptions(EnumExceptions.DELETE_FAILED_AUDITED);
        }
		purchaseHeaderRepository.delete(id);
	}

	/**
	 * 批量删除
	 * 
	 * @param purchaseHeaders
	 */
	public void deleteInBatch(Collection<PurchaseHeader> purchaseHeaders) {
	    Set<Long> set = new HashSet<Long>();
        purchaseHeaders.forEach((purchaseHeader)->{
            set.add(purchaseHeader.getId());
        });
		purchaseHeaderRepository.deleteByIdInAndStatus(set, 0);
	}

	/**
	 * 通过编码查询
	 * 
	 * @param id
	 * @return
	 */
	public PurchaseHeader findOne(Long id) {
		return purchaseHeaderRepository.findOne(id);
	}

	/**
	 * 查询所有
	 * 
	 * @return
	 */
	public List<PurchaseHeader> findAll() {
		return purchaseHeaderRepository.findAll();
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
	public Page<PurchaseHeader> findAllByPage(Integer page, Integer size, String sortFieldName, Integer asc) {

		// 判断排序字段名是否存在
		try {
			PurchaseHeader.class.getDeclaredField(sortFieldName);
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
		return purchaseHeaderRepository.findAll(pageable);
	}

    /**
     * 通过审核人查询-分页
     *
     * @param page
     * @param size
     * @param sortFieldName
     * @param asc
     * @return
     */
    public Page<PurchaseHeader> findByCurAuditorAndStatus(User auditor, Integer status, Integer page, Integer size, String sortFieldName, Integer asc) {

        // 判断排序字段名是否存在
        try {
            PurchaseHeader.class.getDeclaredField(sortFieldName);
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

        if(status == 0) {// 未审核
            return purchaseHeaderRepository.findByCurAuditorAndStatus(auditor, 0, pageable);
        } else { // 已审核
            List<PurchaseAuditRecord> purchaseAuditRecords = purchaseAuditRecordRepository.findByAuditor(auditor);
            Set<Long> purChaseHeaderIds = new HashSet<>();
            for (PurchaseAuditRecord purchaseAuditRecord : purchaseAuditRecords) {
                if (purchaseAuditRecord.getPurchaseHeader() != null && purchaseAuditRecord.getPurchaseHeader().getId() != null) {
                    purChaseHeaderIds.add(purchaseAuditRecord.getPurchaseHeader().getId());
                }
            }

            if (status < 0) {// 全部记录
                return purchaseHeaderRepository.findByIdIn(purChaseHeaderIds, pageable);
            } else {//其它记录
                return purchaseHeaderRepository.findByIdInAndStatus(purChaseHeaderIds, status, pageable);
            }
        }
    }

    /**
     * 通过申请人查询-分页
     *
     * @param page
     * @param size
     * @param sortFieldName
     * @param asc
     * @return
     */
    public Page<PurchaseHeader> findByApplyUserByPage(User applyUser, Integer page, Integer size, String sortFieldName, Integer asc) {

        // 判断排序字段名是否存在
        try {
            PurchaseHeader.class.getDeclaredField(sortFieldName);
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
        return purchaseHeaderRepository.findByApplyUser(applyUser, pageable);
    }

    /**
     * 通过状态查询-分页
     *
     * @param page
     * @param size
     * @param sortFieldName
     * @param asc
     * @return
     */
    public Page<PurchaseHeader> findByStatueByPage(int status, Integer page, Integer size, String sortFieldName, Integer asc) {

        // 判断排序字段名是否存在
        try {
            PurchaseHeader.class.getDeclaredField(sortFieldName);
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
        return purchaseHeaderRepository.findByStatus(status, pageable);
    }

    /**
     * 通过申请人和状态查询-分页
     *
     * @param page
     * @param size
     * @param sortFieldName
     * @param asc
     * @return
     */
    public Page<PurchaseHeader> findByApplyUserAndStatusByPage(User user, int status, Integer page, Integer size, String sortFieldName, Integer asc) {

        // 判断排序字段名是否存在
        try {
            PurchaseHeader.class.getDeclaredField(sortFieldName);
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
        return purchaseHeaderRepository.findByApplyUserAndStatus(user, status, pageable);
    }

    /**
     * 审核
     *
     * @param curAuditorId
     * @param purchaseHeaderId
     * @param note
     */
    @Transactional
    public void audit(String curAuditorId, Long purchaseHeaderId, int status, String note) {
        // 验证是否存在
        PurchaseHeader purchaseHeader = purchaseHeaderRepository.findOne(purchaseHeaderId);
        if(purchaseHeader == null){
            throw new SecurityExceptions(EnumExceptions.AUDIT_FAILED_PURCHASE_NOT_EXIST);
        }

        // 验证状态
        if(purchaseHeader.getStatus() > 0){
            throw new SecurityExceptions(EnumExceptions.AUDIT_FAILED_AUDITED);
        }

        // 判断用户是否存在
        User curAuditor = userRepository.findOne(curAuditorId);
        if(curAuditor == null){
            throw new SecurityExceptions(EnumExceptions.AUDIT_FAILED_USER_NOT_EXIST);
        }

        // 判断是否是当前审核人
        if(purchaseHeader.getCurAuditor() == null || purchaseHeader.getCurAuditor().getId() == null || !purchaseHeader.getCurAuditor().getId().equals(curAuditorId)){
            throw new SecurityExceptions(EnumExceptions.AUDIT_FAILED_NOT_CUR_AUDITOR);
        }

        // 同意
        if(status == 1){
            // 第一个审核人
            if(curAuditorId.equals(purchaseHeader.getPurchaseAuditProcess().getAuditor1().getId())){
                // 更新第二个审核人为当前审核人
                purchaseHeaderRepository.updateCurAuditorById(purchaseHeader.getPurchaseAuditProcess().getAuditor2(), purchaseHeaderId);
            } else { // 第二个审核人
                // 更新状态为通过
                purchaseHeaderRepository.updateStatusById(1, purchaseHeaderId);
            }
        } else {// 不同意
            // 更新状态为不通过
            purchaseHeaderRepository.updateStatusById(2, purchaseHeaderId);
        }

        // 创建审核记录
        PurchaseAuditRecord purchaseAuditRecord = new PurchaseAuditRecord(purchaseHeader, curAuditor, status, note);
        purchaseAuditRecordRepository.save(purchaseAuditRecord);
    }
}
