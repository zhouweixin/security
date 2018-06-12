package com.xplusplus.security.controller;

import java.util.Collection;
import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.xplusplus.security.domain.Archive;
import com.xplusplus.security.domain.Result;
import com.xplusplus.security.domain.User;
import com.xplusplus.security.service.ArchiveService;
import com.xplusplus.security.utils.ResultUtil;

/**
 * @Author: zhouweixin
 * @Description:
 * @Date: Created in 12:40 2018/5/22
 * @Modified By:
 */
@RestController
@RequestMapping(value = "/archive")
public class ArchiveController {
	@Autowired
	private ArchiveService archiveService;

	/**
	 * 新增
	 * 
	 * @param archive
	 * @return
	 */
	@RequestMapping(value = "/add")
	public Result<Archive> add(@Valid Archive archive, BindingResult bindingResult) {

		if (bindingResult.hasErrors()) {
			return ResultUtil.error(bindingResult.getFieldError().getDefaultMessage().toString());
		}

		return ResultUtil.success(archiveService.save(archive));
	}

	/**
	 * 更新
	 * 
	 * @param archive
	 * @return
	 */
	@RequestMapping(value = "/update")
	public Result<Archive> update(@Valid Archive archive, BindingResult bindingResult) {

		if (bindingResult.hasErrors()) {
			return ResultUtil.error(bindingResult.getFieldError().getDefaultMessage().toString());
		}

		return ResultUtil.success(archiveService.update(archive));
	}

	/**
	 * 通过id删除
	 * 
	 * @param id
	 * @return
	 */
	@RequestMapping(value = "/deleteById")
	public Result<Object> deleteById(Long id) {
		archiveService.delete(id);
		return ResultUtil.success();
	}

	/**
	 * 批量删除
	 * 
	 * @param archives
	 * @return
	 */
	@RequestMapping(value = "/deleteByIdBatch")
	public Result<Object> deleteByIdBatch(@RequestBody Collection<Archive> archives) {
		archiveService.deleteInBatch(archives);
		return ResultUtil.success();
	}

	/**
	 * 通过id查询
	 * 
	 * @param id
	 * @return
	 */
	@RequestMapping(value = "/getById")
	public Result<Archive> getById(Long id) {
		return ResultUtil.success(archiveService.findOne(id));
	}

	/**
	 * 查询所有
	 * 
	 * @return
	 */
	@RequestMapping(value = "/getAll")
	public Result<List<Archive>> getAll() {
		return ResultUtil.success(archiveService.findAll());

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
	public Result<Page<Archive>> getAllByPage(@RequestParam(value = "page", defaultValue = "0") Integer page,
			@RequestParam(value = "size", defaultValue = "10") Integer size,
			@RequestParam(value = "sortFieldName", defaultValue = "id") String sortFieldName,
			@RequestParam(value = "asc", defaultValue = "1") Integer asc) {

		return ResultUtil.success(archiveService.findAllByPage(page, size, sortFieldName, asc));
	}

	/**
	 * 通过用户查询档案
	 * 
	 * @param user
	 * @return
	 */
	@RequestMapping(value = "/getByUser")
	public Result<Archive> getByUser(User user){
		return ResultUtil.success(archiveService.findByUser(user));
	}
}
