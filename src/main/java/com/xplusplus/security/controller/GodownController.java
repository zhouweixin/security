package com.xplusplus.security.controller;

import com.xplusplus.security.domain.Godown;
import com.xplusplus.security.domain.Result;
import com.xplusplus.security.service.GodownService;
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
@RequestMapping(value = "/godown")
public class GodownController {

	@Autowired
	private GodownService godownService;

	/**
	 * 新增
	 * 
	 * @param godown
	 * @return
	 */
	@RequestMapping(value = "/add")
	public Result<Godown> add(@Valid Godown godown, BindingResult bindingResult) {

		if (bindingResult.hasErrors()) {
			return ResultUtil.error(bindingResult.getFieldError().getDefaultMessage().toString());
		}

		return ResultUtil.success(godownService.save(godown));
	}

	/**
	 * 更新
	 * 
	 * @param godown
	 * @return
	 */
	@RequestMapping(value = "/update")
	public Result<Godown> update(@Valid Godown godown, BindingResult bindingResult) {

		if (bindingResult.hasErrors()) {
			return ResultUtil.error(bindingResult.getFieldError().getDefaultMessage().toString());
		}

		return ResultUtil.success(godownService.update(godown));
	}

	/**
	 * 通过id删除
	 * 
	 * @param id
	 * @return
	 */
	@RequestMapping(value = "/deleteById")
	public Result<Object> deleteById(Long id) {
		godownService.delete(id);
		return ResultUtil.success();
	}

	/**
	 * 批量删除
	 * 
	 * @param godowns
	 * @return
	 */
	@RequestMapping(value = "/deleteByIdBatch")
	public Result<Object> deleteByIdBatch(@RequestBody Collection<Godown> godowns) {
		godownService.deleteInBatch(godowns);
		return ResultUtil.success();
	}

	/**
	 * 通过id查询
	 * 
	 * @param id
	 * @return
	 */
	@RequestMapping(value = "/getById")
	public Result<Godown> getById(Long id) {
		return ResultUtil.success(godownService.findOne(id));
	}

	/**
	 * 查询所有
	 * 
	 * @return
	 */
	@RequestMapping(value = "/getAll")
	public Result<List<Godown>> getAll() {
		return ResultUtil.success(godownService.findAll());

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
	public Result<Page<Godown>> getAllByPage(@RequestParam(value = "page", defaultValue = "0") Integer page,
			@RequestParam(value = "size", defaultValue = "10") Integer size,
			@RequestParam(value = "sortFieldName", defaultValue = "id") String sortFieldName,
			@RequestParam(value = "asc", defaultValue = "1") Integer asc) {

		return ResultUtil.success(godownService.findAllByPage(page, size, sortFieldName, asc));
	}
}
