package com.xplusplus.security.controller;

import com.xplusplus.security.domain.User;
import com.xplusplus.security.domain.Wage;
import com.xplusplus.security.domain.Result;
import com.xplusplus.security.service.UserService;
import com.xplusplus.security.service.WageService;
import com.xplusplus.security.utils.ResultUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;
import java.util.Arrays;
import java.util.Collection;
import java.util.HashSet;
import java.util.List;

/**
 * @Author: zhouweixin
 * @Description:
 * @Date: Created in 20:25 2018/6/12
 * @Modified By:
 */
@RestController
@RequestMapping(value = "/wage")
public class WageController {

    @Autowired
    private WageService wageService;

    @Autowired
    private UserService userService;

    /**
     * 新增
     *
     * @param wage
     * @return
     */
    @RequestMapping(value = "/add")
    public Result<Wage> add(@Valid Wage wage, BindingResult bindingResult, String[] userIds) {

        if (bindingResult.hasErrors()) {
            return ResultUtil.error(bindingResult.getFieldError().getDefaultMessage().toString());
        }

        return ResultUtil.success(wageService.save(wage, userIds));
    }

    /**
     * 更新
     *
     * @param wage
     * @return
     */
    @RequestMapping(value = "/update")
    public Result<Wage> update(@Valid Wage wage, BindingResult bindingResult, String[] userIds) {

        if (bindingResult.hasErrors()) {
            return ResultUtil.error(bindingResult.getFieldError().getDefaultMessage().toString());
        }

        return ResultUtil.success(wageService.update(wage, userIds));
    }

    /**
     * 分配用户到薪资组
     *
     * @param wageId
     * @param userIds
     * @return
     */
    @RequestMapping(value = "/assignUsersToWage")
    public Result<Object> assignUsersToWage(Integer wageId, String[] userIds) {
        HashSet<String> userIdSet = new HashSet<>(Arrays.asList(userIds));
        userService.assignUsersToWage(wageId, userIdSet);
        return ResultUtil.success();
    }

    /**
     * 更新用户的薪资组
     *
     * @param wageId
     * @param userId
     * @return
     */
    @RequestMapping(value = "/updateUserWage")
    public Result<Object> updateUserWage(Integer wageId, String userId) {
        userService.updateUserWage(wageId, userId);
        return ResultUtil.success();
    }

    /**
     * 通过薪资查询员工
     *
     * @param wage
     * @return
     */
    @RequestMapping(value = "/getUsersByWage")
    public Result<List<User>> getUsersByWage(Wage wage) {
        return ResultUtil.success(userService.findByWage(wage));
    }

    /**
     * 通过薪资查询员工-分页
     *
     * @param wage
     * @param page
     * @param size
     * @param sortFieldName
     * @param asc
     * @return
     */
    @RequestMapping(value = "/getUsersByWageByPage")
    public Result<Page<User>> getUsersByWageByPage(
            Wage wage,
            @RequestParam(value = "page", defaultValue = "0") Integer page,
            @RequestParam(value = "size", defaultValue = "10") Integer size,
            @RequestParam(value = "sortFieldName", defaultValue = "id") String sortFieldName,
            @RequestParam(value = "asc", defaultValue = "1") Integer asc) {

        return ResultUtil.success(userService.findByWageByPage(wage, page, size, sortFieldName, asc));
    }

    /**
     * 通过id删除
     *
     * @param id
     * @return
     */
    @RequestMapping(value = "/deleteById")
    public Result<Object> deleteById(Integer id) {
        wageService.delete(id);
        return ResultUtil.success();
    }

    /**
     * 批量删除
     *
     * @param wages
     * @return
     */
    @RequestMapping(value = "/deleteByIdBatch")
    public Result<Object> deleteByIdBatch(@RequestBody Collection<Wage> wages) {
        wageService.deleteInBatch(wages);
        return ResultUtil.success();
    }

    /**
     * 通过id查询
     *
     * @param id
     * @return
     */
    @RequestMapping(value = "/getById")
    public Result<Wage> getById(Integer id) {
        return ResultUtil.success(wageService.findOne(id));
    }

    /**
     * 查询所有
     *
     * @return
     */
    @RequestMapping(value = "/getAll")
    public Result<List<Wage>> getAll() {
        return ResultUtil.success(wageService.findAll());

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
    public Result<Page<Wage>> getAllByPage(@RequestParam(value = "page", defaultValue = "0") Integer page,
                                           @RequestParam(value = "size", defaultValue = "10") Integer size,
                                           @RequestParam(value = "sortFieldName", defaultValue = "id") String sortFieldName,
                                           @RequestParam(value = "asc", defaultValue = "1") Integer asc) {

        return ResultUtil.success(wageService.findAllByPage(page, size, sortFieldName, asc));
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
    public Result<Page<Wage>> getByNameLikeByPage(@RequestParam(value = "name", defaultValue = "") String name,
                                                  @RequestParam(value = "page", defaultValue = "0") Integer page,
                                                  @RequestParam(value = "size", defaultValue = "10") Integer size,
                                                  @RequestParam(value = "sortFieldName", defaultValue = "id") String sortFieldName,
                                                  @RequestParam(value = "asc", defaultValue = "1") Integer asc) {

        return ResultUtil.success(wageService.findByNameLikeByPage(name, page, size, sortFieldName, asc));
    }
}
