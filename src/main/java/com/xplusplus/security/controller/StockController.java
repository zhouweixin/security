package com.xplusplus.security.controller;

import com.xplusplus.security.domain.Stock;
import com.xplusplus.security.domain.Result;
import com.xplusplus.security.service.StockService;
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
@RequestMapping(value = "/stock")
public class StockController {

	@Autowired
	private StockService stockService;

	/**
	 * 通过id查询
	 * 
	 * @param id
	 * @return
	 */
	@RequestMapping(value = "/getById")
	public Result<Stock> getById(Long id) {
		return ResultUtil.success(stockService.findOne(id));
	}

	/**
	 * 查询所有
	 * 
	 * @return
	 */
	@RequestMapping(value = "/getAll")
	public Result<List<Stock>> getAll() {
		return ResultUtil.success(stockService.findAll());

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
	public Result<Page<Stock>> getAllByPage(@RequestParam(value = "page", defaultValue = "0") Integer page,
			@RequestParam(value = "size", defaultValue = "10") Integer size,
			@RequestParam(value = "sortFieldName", defaultValue = "id") String sortFieldName,
			@RequestParam(value = "asc", defaultValue = "1") Integer asc) {

		return ResultUtil.success(stockService.findAllByPage(page, size, sortFieldName, asc));
	}

	/**
	 * 通过物品名称模糊查询-分页
	 * 
	 * @param name
	 * @param page
	 * @param size
	 * @param sortFieldName
	 * @param asc
	 * @return
	 */
	@RequestMapping(value = "/getByMaterialNameLikeByPage")
	public Result<Page<Stock>> getByNameLikeByPage(@RequestParam(value = "name", defaultValue = "") String name,
													@RequestParam(value = "page", defaultValue = "0") Integer page,
													@RequestParam(value = "size", defaultValue = "10") Integer size,
													@RequestParam(value = "sortFieldName", defaultValue = "id") String sortFieldName,
													@RequestParam(value = "asc", defaultValue = "1") Integer asc) {

		return ResultUtil.success(stockService.findByMaterailNameLikeByPage(name, page, size, sortFieldName, asc));
	}
}
