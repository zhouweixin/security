package com.xplusplus.security.controller;

import com.xplusplus.security.domain.PurchaseAuditProcess;
import com.xplusplus.security.domain.Result;
import com.xplusplus.security.service.PurchaseAuditProcessService;
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
@RequestMapping(value = "/purchaseAuditProcess")
public class PurchaseAuditProcessController {

	@Autowired
	private PurchaseAuditProcessService purchaseAuditProcessService;

	/**
	 * 新增
	 * 
	 * @param purchaseAuditProcess
	 * @return
	 */
	@RequestMapping(value = "/add")
	public Result<PurchaseAuditProcess> add(@Valid PurchaseAuditProcess purchaseAuditProcess, BindingResult bindingResult) {

		if (bindingResult.hasErrors()) {
			return ResultUtil.error(bindingResult.getFieldError().getDefaultMessage().toString());
		}

		return ResultUtil.success(purchaseAuditProcessService.save(purchaseAuditProcess));
	}

	/**
	 * 更新
	 * 
	 * @param purchaseAuditProcess
	 * @return
	 */
	@RequestMapping(value = "/update")
	public Result<PurchaseAuditProcess> update(@Valid PurchaseAuditProcess purchaseAuditProcess, BindingResult bindingResult) {

		if (bindingResult.hasErrors()) {
			return ResultUtil.error(bindingResult.getFieldError().getDefaultMessage().toString());
		}

		return ResultUtil.success(purchaseAuditProcessService.update(purchaseAuditProcess));
	}

	/**
	 * 通过id删除
	 * 
	 * @param id
	 * @return
	 */
	@RequestMapping(value = "/deleteById")
	public Result<Object> deleteById(Integer id) {
		purchaseAuditProcessService.delete(id);
		return ResultUtil.success();
	}

	/**
	 * 批量删除
	 * 
	 * @param purchaseAuditProcesss
	 * @return
	 */
	@RequestMapping(value = "/deleteByIdBatch")
	public Result<Object> deleteByIdBatch(@RequestBody Collection<PurchaseAuditProcess> purchaseAuditProcesss) {
		purchaseAuditProcessService.deleteInBatch(purchaseAuditProcesss);
		return ResultUtil.success();
	}

	/**
	 * 通过id查询
	 * 
	 * @param id
	 * @return
	 */
	@RequestMapping(value = "/getById")
	public Result<PurchaseAuditProcess> getById(Integer id) {
		return ResultUtil.success(purchaseAuditProcessService.findOne(id));
	}

	/**
	 * 查询所有
	 * 
	 * @return
	 */
	@RequestMapping(value = "/getAll")
	public Result<List<PurchaseAuditProcess>> getAll() {
		return ResultUtil.success(purchaseAuditProcessService.findAll());

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
	public Result<Page<PurchaseAuditProcess>> getAllByPage(@RequestParam(value = "page", defaultValue = "0") Integer page,
			@RequestParam(value = "size", defaultValue = "10") Integer size,
			@RequestParam(value = "sortFieldName", defaultValue = "id") String sortFieldName,
			@RequestParam(value = "asc", defaultValue = "1") Integer asc) {

		return ResultUtil.success(purchaseAuditProcessService.findAllByPage(page, size, sortFieldName, asc));
	}

	/**
	 * 通过名称模糊查询-分页
	 * 
	 * @param name
	 * @param page
	 * @param size
	 * @param sortFieldName
	 * @param asc
	 * @return
	 */
	@RequestMapping(value = "/getByNameLikeByPage")
	public Result<Page<PurchaseAuditProcess>> getByNameLikeByPage(@RequestParam(value = "name", defaultValue = "") String name,
													@RequestParam(value = "page", defaultValue = "0") Integer page,
													@RequestParam(value = "size", defaultValue = "10") Integer size,
													@RequestParam(value = "sortFieldName", defaultValue = "id") String sortFieldName,
													@RequestParam(value = "asc", defaultValue = "1") Integer asc) {

		return ResultUtil.success(purchaseAuditProcessService.findByNameLikeByPage(name, page, size, sortFieldName, asc));
	}
}
