package com.xplusplus.security.controller;

import com.xplusplus.security.domain.Purchase;
import com.xplusplus.security.domain.PurchaseAuditRecord;
import com.xplusplus.security.domain.PurchaseHeader;
import com.xplusplus.security.domain.Result;
import com.xplusplus.security.service.PurchaseAuditRecordService;
import com.xplusplus.security.utils.ResultUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;
import java.util.Collection;
import java.util.List;

/**
 * @Author: zhouweixin
 * @Description:
 * @Date: Created in 下午7:02:30 2018年5月22日
 */
@RestController
@RequestMapping(value = "/purchaseAuditRecord")
public class PurchaseAuditRecordController {

	@Autowired
	private PurchaseAuditRecordService purchaseAuditRecordService;

	/**
	 * 通过id查询
	 * 
	 * @param id
	 * @return
	 */
	@RequestMapping(value = "/getById")
	public Result<PurchaseAuditRecord> getById(Long id) {
		return ResultUtil.success(purchaseAuditRecordService.findOne(id));
	}

	/**
	 * 查询所有
	 * 
	 * @return
	 */
	@RequestMapping(value = "/getAll")
	public Result<List<PurchaseAuditRecord>> getAll() {
		return ResultUtil.success(purchaseAuditRecordService.findAll());

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
	@RequestMapping(value = "/getAllByPage")
	public Result<Page<PurchaseAuditRecord>> getAllByPage(@RequestParam(value = "page", defaultValue = "0") Integer page,
			@RequestParam(value = "size", defaultValue = "10") Integer size,
			@RequestParam(value = "sortFieldName", defaultValue = "id") String sortFieldName,
			@RequestParam(value = "asc", defaultValue = "1") Integer asc) {

		return ResultUtil.success(purchaseAuditRecordService.findAllByPage(page, size, sortFieldName, asc));
	}

    /**
     * 通过采购申请表头查询
     *
     * @return
     */
    @RequestMapping(value = "/getByPurchaseHeader")
    public Result<List<PurchaseAuditRecord>> getByPurchaseHeader(PurchaseHeader purchaseHeader) {
        return ResultUtil.success(purchaseAuditRecordService.findByPurchaseHeader(purchaseHeader));

    }
}
