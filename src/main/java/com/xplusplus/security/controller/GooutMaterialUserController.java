package com.xplusplus.security.controller;

import com.xplusplus.security.domain.GooutMaterialUser;
import com.xplusplus.security.domain.Result;
import com.xplusplus.security.service.GooutMaterialUserService;
import com.xplusplus.security.utils.ResultUtil;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

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
@Api(tags = "出库物品用户关系接口")
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

	@ApiOperation(value = "通过状态和用户工号查询-分页")
    @GetMapping(value = "/getByStatusAndUserIdByPage")
	public Result<Page<GooutMaterialUser>> getByStatusAndUserIdByPage(
	        @ApiParam(value = "状态：0未归还；1已归还；2不需要归还；默认为-1，表示不启用此条件检索", defaultValue = "-1") @RequestParam(defaultValue = "-1") Integer status,
            @ApiParam(value = "用户工号", defaultValue = "-1") @RequestParam(defaultValue = "-1") String userId,
            @ApiParam(value = "当前页, 从0开始, 默认0", defaultValue = "0") @RequestParam(value = "page", defaultValue = "0") Integer page,
            @ApiParam(value = "每页记录数, 默认10", defaultValue = "10") @RequestParam(value = "size", defaultValue = "10") Integer size,
            @ApiParam(value = "排序字段, 默认id", defaultValue = "id") @RequestParam(value = "sortFieldName", defaultValue = "id") String sortFieldName,
            @ApiParam(value = "排序方向, 0降序;1升序;默认1", defaultValue = "1") @RequestParam(value = "asc", defaultValue = "1") Integer asc){
        return ResultUtil.success(gooutMaterialUserService.getByStatusAndUserId(status, userId, page, size, sortFieldName, asc));
    }

    @ApiOperation(value = "通过状态和用户名称模糊查询-分页")
    @GetMapping(value = "/getByStatusAndNameLikeByPage")
    public Result<Page<GooutMaterialUser>> getByStatusAndNameLikeByPage(
            @ApiParam(value = "状态：0未归还；1已归还；2不需要归还；默认为-1，表示不启用此条件检索", defaultValue = "-1") @RequestParam(defaultValue = "-1") Integer status,
            @ApiParam(value = "用户工号", defaultValue = "") @RequestParam(defaultValue = "") String userName,
            @ApiParam(value = "当前页, 从0开始, 默认0", defaultValue = "0") @RequestParam(value = "page", defaultValue = "0") Integer page,
            @ApiParam(value = "每页记录数, 默认10", defaultValue = "10") @RequestParam(value = "size", defaultValue = "10") Integer size,
            @ApiParam(value = "排序字段, 默认id", defaultValue = "id") @RequestParam(value = "sortFieldName", defaultValue = "id") String sortFieldName,
            @ApiParam(value = "排序方向, 0降序;1升序;默认1", defaultValue = "1") @RequestParam(value = "asc", defaultValue = "1") Integer asc){
        return ResultUtil.success(gooutMaterialUserService.getByStatusAndNameLike(status, userName, page, size, sortFieldName, asc));
    }
}
