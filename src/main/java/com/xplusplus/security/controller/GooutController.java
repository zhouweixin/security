package com.xplusplus.security.controller;

import com.xplusplus.security.domain.Goout;
import com.xplusplus.security.domain.Result;
import com.xplusplus.security.service.GooutService;
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
@RequestMapping(value = "/goout")
public class GooutController {

	@Autowired
	private GooutService gooutService;

	/**
	 * 新增
	 *
	 * @param goout
	 * @return
	 */
	@RequestMapping(value = "/add")
	public Result<Goout> add(@Valid Goout goout, BindingResult bindingResult) {

		if (bindingResult.hasErrors()) {
			return ResultUtil.error(bindingResult.getFieldError().getDefaultMessage().toString());
		}

		return ResultUtil.success(gooutService.save(goout));
	}

	/**
	 * 更新
	 *
	 * @param goout
	 * @return
	 */
	@RequestMapping(value = "/update")
	public Result<Goout> update(@Valid Goout goout, BindingResult bindingResult) {

		if (bindingResult.hasErrors()) {
			return ResultUtil.error(bindingResult.getFieldError().getDefaultMessage().toString());
		}

		return ResultUtil.success(gooutService.update(goout));
	}

	/**
	 * 通过id删除
	 *
	 * @param id
	 * @return
	 */
	@RequestMapping(value = "/deleteById")
	public Result<Object> deleteById(Long id) {
		gooutService.delete(id);
		return ResultUtil.success();
	}

	/**
	 * 批量删除
	 *
	 * @param goouts
	 * @return
	 */
	@RequestMapping(value = "/deleteByIdBatch")
	public Result<Object> deleteByIdBatch(@RequestBody Collection<Goout> goouts) {
		gooutService.deleteInBatch(goouts);
		return ResultUtil.success();
	}

	/**
	 * 通过id查询
	 *
	 * @param id
	 * @return
	 */
	@RequestMapping(value = "/getById")
	public Result<Goout> getById(Long id) {
		return ResultUtil.success(gooutService.findOne(id));
	}

	/**
	 * 查询所有
	 *
	 * @return
	 */
	@RequestMapping(value = "/getAll")
	public Result<List<Goout>> getAll() {
		return ResultUtil.success(gooutService.findAll());

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
	public Result<Page<Goout>> getAllByPage(@RequestParam(value = "page", defaultValue = "0") Integer page,
			@RequestParam(value = "size", defaultValue = "10") Integer size,
			@RequestParam(value = "sortFieldName", defaultValue = "id") String sortFieldName,
			@RequestParam(value = "asc", defaultValue = "1") Integer asc) {

		return ResultUtil.success(gooutService.findAllByPage(page, size, sortFieldName, asc));
	}
}
