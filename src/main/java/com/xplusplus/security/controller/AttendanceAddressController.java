package com.xplusplus.security.controller;

import com.xplusplus.security.domain.AttendanceAddress;
import com.xplusplus.security.domain.AttendanceGroup;
import com.xplusplus.security.domain.Result;
import com.xplusplus.security.service.AttendanceAddressService;
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
 * @Date: Created in 18:48 2018/6/28
 * @Modified By:
 */
@RestController
@RequestMapping(value = "attendanceAddress")
public class AttendanceAddressController {
    @Autowired
    private AttendanceAddressService attendanceAddressService;

    /**
     * 新增
     *
     * @param attendanceAddress
     * @return
     */
    @RequestMapping(value = "/add")
    public Result<AttendanceAddress> add(@Valid AttendanceAddress attendanceAddress, BindingResult bindingResult) {

        if (bindingResult.hasErrors()) {
            return ResultUtil.error(bindingResult.getFieldError().getDefaultMessage().toString());
        }

        return ResultUtil.success(attendanceAddressService.save(attendanceAddress));
    }

    /**
     * 更新
     *
     * @param attendanceAddress
     * @return
     */
    @RequestMapping(value = "/update")
    public Result<AttendanceAddress> update(@Valid AttendanceAddress attendanceAddress, BindingResult bindingResult) {

        if (bindingResult.hasErrors()) {
            return ResultUtil.error(bindingResult.getFieldError().getDefaultMessage().toString());
        }

        return ResultUtil.success(attendanceAddressService.update(attendanceAddress));
    }

    /**
     * 通过id删除
     *
     * @param id
     * @return
     */
    @RequestMapping(value = "/deleteById")
    public Result<Object> deleteById(Long id) {
        attendanceAddressService.delete(id);
        return ResultUtil.success();
    }

    /**
     * 批量删除
     *
     * @param attendanceAddresses
     * @return
     */
    @RequestMapping(value = "/deleteByIdBatch")
    public Result<Object> deleteByIdBatch(@RequestBody Collection<AttendanceAddress> attendanceAddresses) {
        attendanceAddressService.deleteInBatch(attendanceAddresses);
        return ResultUtil.success();
    }

    /**
     * 通过id查询
     *
     * @param id
     * @return
     */
    @RequestMapping(value = "/getById")
    public Result<AttendanceAddress> getById(Long id) {
        return ResultUtil.success(attendanceAddressService.findOne(id));
    }

    /**
     * 查询所有
     *
     * @return
     */
    @RequestMapping(value = "/getAll")
    public Result<List<AttendanceAddress>> getAll() {
        return ResultUtil.success(attendanceAddressService.findAll());

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
    public Result<Page<AttendanceAddress>> getAllByPage(@RequestParam(value = "page", defaultValue = "0") Integer page,
                                             @RequestParam(value = "size", defaultValue = "10") Integer size,
                                             @RequestParam(value = "sortFieldName", defaultValue = "id") String sortFieldName,
                                             @RequestParam(value = "asc", defaultValue = "1") Integer asc) {

        return ResultUtil.success(attendanceAddressService.findAllByPage(page, size, sortFieldName, asc));
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
    public Result<Page<AttendanceAddress>> getByNameLikeByPage(@RequestParam(value = "name", defaultValue = "") String name,
                                                    @RequestParam(value = "page", defaultValue = "0") Integer page,
                                                    @RequestParam(value = "size", defaultValue = "10") Integer size,
                                                    @RequestParam(value = "sortFieldName", defaultValue = "id") String sortFieldName,
                                                    @RequestParam(value = "asc", defaultValue = "1") Integer asc) {

        return ResultUtil.success(attendanceAddressService.findByNameLikeByPage(name, page, size, sortFieldName, asc));
    }

    /**
     * 通过考勤组查询
     *
     * @param attendanceGroup
     * @return
     */
    @RequestMapping(value = "/getByAttendanceGroup")
    public Result<List<AttendanceAddress>> getByAttendanceGroup(AttendanceGroup attendanceGroup){
        return ResultUtil.success(attendanceAddressService.findByAttendanceGroup(attendanceGroup));
    }
}
