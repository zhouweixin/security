package com.xplusplus.security.controller;

import com.xplusplus.security.domain.GodownHeader;
import com.xplusplus.security.domain.Result;
import com.xplusplus.security.service.GodownHeaderService;
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
@RequestMapping(value = "/godownHeader")
public class GodownHeaderController {

	@Autowired
	private GodownHeaderService godownHeaderService;

	/**
	 * 新增
	 * 
	 * @param godownHeader
	 * @return
	 */
	@RequestMapping(value = "/add")
	public Result<GodownHeader> add(@Valid GodownHeader godownHeader, BindingResult bindingResult) {

		if (bindingResult.hasErrors()) {
			return ResultUtil.error(bindingResult.getFieldError().getDefaultMessage().toString());
		}

		return ResultUtil.success(godownHeaderService.save(godownHeader));
	}

	/**
	 * 通过id删除
	 * 
	 * @param id
	 * @return
	 */
	@RequestMapping(value = "/deleteById")
	public Result<Object> deleteById(Long id) {
		godownHeaderService.delete(id);
		return ResultUtil.success();
	}

	/**
	 * 批量删除
	 * 
	 * @param godownHeaders
	 * @return
	 */
	@RequestMapping(value = "/deleteByIdBatch")
	public Result<Object> deleteByIdBatch(@RequestBody Collection<GodownHeader> godownHeaders) {
		godownHeaderService.deleteInBatch(godownHeaders);
		return ResultUtil.success();
	}

	/**
	 * 通过id查询
	 * 
	 * @param id
	 * @return
	 */
	@RequestMapping(value = "/getById")
	public Result<GodownHeader> getById(Long id) {
		return ResultUtil.success(godownHeaderService.findOne(id));
	}

	/**
	 * 查询所有
	 * 
	 * @return
	 */
	@RequestMapping(value = "/getAll")
	public Result<List<GodownHeader>> getAll() {
		return ResultUtil.success(godownHeaderService.findAll());

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
	public Result<Page<GodownHeader>> getAllByPage(@RequestParam(value = "page", defaultValue = "0") Integer page,
			@RequestParam(value = "size", defaultValue = "10") Integer size,
			@RequestParam(value = "sortFieldName", defaultValue = "id") String sortFieldName,
			@RequestParam(value = "asc", defaultValue = "1") Integer asc) {

		return ResultUtil.success(godownHeaderService.findAllByPage(page, size, sortFieldName, asc));
	}
}
