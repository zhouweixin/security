package com.xplusplus.security.controller;

import com.xplusplus.security.domain.GooutMaterialUser;
import com.xplusplus.security.domain.Result;
import com.xplusplus.security.service.GooutMaterialUserService;
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
@RequestMapping(value = "/gooutMaterialUser")
public class GooutMaterialUserController {

	@Autowired
	private GooutMaterialUserService gooutMaterialUserService;

    /**
     * 归还物品
     *
     * @param gooutMaterialUserIds
     * @param userIds
     * @param operatorId
     * @return
     */
    @RequestMapping(value = "/returnMaterials")
    public Result<Object> returnMaterials(Long[] gooutMaterialUserIds, String[] userIds, String operatorId) {
        gooutMaterialUserService.returnMaterials(gooutMaterialUserIds, userIds, operatorId);
        return ResultUtil.success();
    }

	/**
	 * 通过id查询
	 * 
	 * @param id
	 * @return
	 */
	@RequestMapping(value = "/getById")
	public Result<GooutMaterialUser> getById(Long id) {
		return ResultUtil.success(gooutMaterialUserService.findOne(id));
	}

	/**
	 * 查询所有
	 * 
	 * @return
	 */
	@RequestMapping(value = "/getAll")
	public Result<List<GooutMaterialUser>> getAll() {
		return ResultUtil.success(gooutMaterialUserService.findAll());

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
	public Result<Page<GooutMaterialUser>> getAllByPage(@RequestParam(value = "page", defaultValue = "0") Integer page,
			@RequestParam(value = "size", defaultValue = "10") Integer size,
			@RequestParam(value = "sortFieldName", defaultValue = "id") String sortFieldName,
			@RequestParam(value = "asc", defaultValue = "1") Integer asc) {

		return ResultUtil.success(gooutMaterialUserService.findAllByPage(page, size, sortFieldName, asc));
	}
}
