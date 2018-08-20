package com.xplusplus.security.controller;

import java.util.Collection;
import java.util.List;

import javax.validation.Valid;

import com.xplusplus.security.domain.User;
import com.xplusplus.security.service.ProjectUserService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.xplusplus.security.domain.Project;
import com.xplusplus.security.domain.ProjectStatus;
import com.xplusplus.security.domain.Result;
import com.xplusplus.security.service.ProjectService;
import com.xplusplus.security.utils.ResultUtil;

/**
 * @Author: zhouweixin
 * @Description:
 * @Date: Created in 下午8:31:53 2018年5月24日
 */
@RestController
@RequestMapping(value = "/project")
@Api(tags = "项目接口")
public class ProjectController {
    @Autowired
    private ProjectService projectService;

    @Autowired
    private ProjectUserService projectUserService;

    /**
     * 新增
     *
     * @param project
     * @return
     */
    @RequestMapping(value = "/add")
    @ApiOperation(value = "新增")
    public Result<Project> add(@Valid Project project, BindingResult bindingResult, String[] userIds) {

        if (bindingResult.hasErrors()) {
            return ResultUtil.error(bindingResult.getFieldError().getDefaultMessage().toString());
        }

        return ResultUtil.success(projectService.save(project, userIds));
    }

    /**
     * 更新
     *
     * @param project
     * @return
     */
    @RequestMapping(value = "/update")
    @ApiOperation(value = "更新")
    public Result<Project> update(@Valid Project project, BindingResult bindingResult, String[] userIds) {

        if (bindingResult.hasErrors()) {
            return ResultUtil.error(bindingResult.getFieldError().getDefaultMessage().toString());
        }

        return ResultUtil.success(projectService.update(project, userIds));
    }

    /**
     * 通过id删除
     *
     * @param id
     * @return
     */
    @RequestMapping(value = "/deleteById")
    @ApiOperation(value = "通过id删除")
    public Result<Object> deleteById(@ApiParam(value = "主键") @RequestParam Long id) {
        projectService.delete(id);
        return ResultUtil.success();
    }

    /**
     * 批量删除
     *
     * @param projects
     * @return
     */
    @RequestMapping(value = "/deleteByIdBatch")
    @ApiOperation(value = "批量删除")
    public Result<Object> deleteByIdBatch(@ApiParam(value = "项目集合, json格式")@RequestBody Collection<Project> projects) {
        projectService.deleteInBatch(projects);
        return ResultUtil.success();
    }

    /**
     * 通过id查询
     *
     * @param id
     * @return
     */
    @RequestMapping(value = "/getById")
    @ApiOperation(value = "通过id查询")
    public Result<Project> getById(@ApiParam(value = "主键") @RequestParam Long id) {
        return ResultUtil.success(projectService.findOne(id));
    }

    /**
     * 查询所有
     *
     * @return
     */
    @RequestMapping(value = "/getAll")
    @ApiOperation(value = "查询所有")
    public Result<List<Project>> getAll() {
        return ResultUtil.success(projectService.findAll());

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
    @ApiOperation(value = "查询所有-分页")
    public Result<Page<Project>> getAllByPage(@ApiParam(value = "页码") @RequestParam(value = "page", defaultValue = "0") Integer page,
                                              @ApiParam(value = "每页记录数") @RequestParam(value = "size", defaultValue = "10") Integer size,
                                              @ApiParam(value = "排序字段名")@RequestParam(value = "sortFieldName", defaultValue = "id") String sortFieldName,
                                              @ApiParam(value = "排序方向, 0降序; 1升序")@RequestParam(value = "asc", defaultValue = "1") Integer asc) {

        return ResultUtil.success(projectService.findAllByPage(page, size, sortFieldName, asc));
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
    @ApiOperation(value = "通过名称模糊查询-分布")
    public Result<Page<Project>> getByNameLikeByPage(@ApiParam(value = "名称") @RequestParam(value = "name", defaultValue = "") String name,
                                                     @ApiParam(value = "页码") @RequestParam(value = "page", defaultValue = "0") Integer page,
                                                     @ApiParam(value = "每页记录数") @RequestParam(value = "size", defaultValue = "10") Integer size,
                                                     @ApiParam(value = "排序字段名")@RequestParam(value = "sortFieldName", defaultValue = "id") String sortFieldName,
                                                     @ApiParam(value = "排序方向, 0降序; 1升序")@RequestParam(value = "asc", defaultValue = "1") Integer asc) {

        return ResultUtil.success(projectService.findByNameLikeByPage(name, page, size, sortFieldName, asc));
    }

    /**
     * 通过客户单位模糊查询-分页
     *
     * @param customerUnit
     * @param page
     * @param size
     * @param sortFieldName
     * @param asc
     * @return
     */
    @RequestMapping(value = "/getByCustomerUnitLikeByPage")
    @ApiOperation(value = "通过客户单位模糊查询-分页")
    public Result<Page<Project>> getByCustomerUnitLikeByPage(
            @ApiParam(value = "客户单位") @RequestParam(value = "customerUnit", defaultValue = "") String customerUnit,
            @ApiParam(value = "页码") @RequestParam(value = "page", defaultValue = "0") Integer page,
            @ApiParam(value = "每页记录数") @RequestParam(value = "size", defaultValue = "10") Integer size,
            @ApiParam(value = "排序字段名")@RequestParam(value = "sortFieldName", defaultValue = "id") String sortFieldName,
            @ApiParam(value = "排序方向, 0降序; 1升序")@RequestParam(value = "asc", defaultValue = "1") Integer asc) {

        return ResultUtil
                .success(projectService.findByCustomerUnitLikeByPage(customerUnit, page, size, sortFieldName, asc));
    }

    /**
     * 通过项目状态查询-分页
     *
     * @param projectStatus
     * @param page
     * @param size
     * @param sortFieldName
     * @param asc
     * @return
     */
    @RequestMapping(value = "/getByProjectStatusByPage")
    @ApiOperation(value = "通过项目状态查询-分页")
    public Result<Page<Project>> getByProjectStatusByPage(@ApiParam(value = "项目状态") ProjectStatus projectStatus,
                                                          @ApiParam(value = "页码") @RequestParam(value = "page", defaultValue = "0") Integer page,
                                                          @ApiParam(value = "每页记录数") @RequestParam(value = "size", defaultValue = "10") Integer size,
                                                          @ApiParam(value = "排序字段名")@RequestParam(value = "sortFieldName", defaultValue = "id") String sortFieldName,
                                                          @ApiParam(value = "排序方向, 0降序; 1升序")@RequestParam(value = "asc", defaultValue = "1") Integer asc) {

        return ResultUtil
                .success(projectService.findByProjectStatusByPage(projectStatus, page, size, sortFieldName, asc));
    }

    /**
     * 分配员工到项目, 返回分配人数
     *
     * @param projectId
     * @param userIds
     * @return
     */
    @RequestMapping(value = "/assignUsersToProject")
    @ApiOperation(value = "分配员工到项目, 返回分配人数")
    public Result<Integer> assignUsersToProject(@ApiParam(value = "项目主键") @RequestParam Long projectId,
                                                @ApiParam(value = "用户主键数组") @RequestParam String[] userIds) {
        return ResultUtil.success(projectUserService.assignUsersToProject(projectId, userIds));
    }

    /**
     * 通过项目查询员工
     *
     * @param project
     * @return
     */
    @RequestMapping(value = "/getUsersByProject")
    @ApiOperation(value = "通过项目查询员工")
    public Result<List<User>> getUsersByProject(@ApiParam(value = "项目") Project project) {
        return ResultUtil.success(projectUserService.findUsersByProject(project));
    }

    /**
     * 通过负责人查询进行中的项目
     *
     * @param leader
     * @return
     */
    @RequestMapping(value = "/getByLeaderAndStaue0")
    @ApiOperation(value = "通过负责人查询进行中的项目")
    public Result<List<Project>> getByLeaderAndStaue0(@ApiParam(value = "员工") User leader) {
        return ResultUtil.success(projectService.findByLeader(leader));
    }

    @RequestMapping(value = "/updateWagePerHour")
    @ApiOperation(value = "更新每小时钱数")
    public Result<Object> updateWagePerHour(
            @ApiParam(value = "项目主键") @RequestParam Long id,
            @ApiParam(value = "每小时钱数") @RequestParam double wagePerHour){
        projectService.updateWagePerHour(id, wagePerHour);
        return ResultUtil.success();
    }
}
