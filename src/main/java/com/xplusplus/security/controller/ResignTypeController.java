package com.xplusplus.security.controller;

import com.xplusplus.security.domain.ResignType;
import com.xplusplus.security.domain.Result;
import com.xplusplus.security.service.ResignTypeService;
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
 * @Date: Created in 17:20 2018/6/12
 * @Modified By:
 */
@RestController
@RequestMapping(value = "/resignType")
public class ResignTypeController {


    @Autowired
    private ResignTypeService resignTypeService;

    /**
     * 新增
     *
     * @param resignType
     * @return
     */
    @RequestMapping(value = "/add")
    public Result<ResignType> add(@Valid ResignType resignType, BindingResult bindingResult) {

        if (bindingResult.hasErrors()) {
            return ResultUtil.error(bindingResult.getFieldError().getDefaultMessage().toString());
        }

        return ResultUtil.success(resignTypeService.save(resignType));
    }

    /**
     * 更新
     *
     * @param resignType
     * @return
     */
    @RequestMapping(value = "/update")
    public Result<ResignType> update(@Valid ResignType resignType, BindingResult bindingResult) {

        if (bindingResult.hasErrors()) {
            return ResultUtil.error(bindingResult.getFieldError().getDefaultMessage().toString());
        }

        return ResultUtil.success(resignTypeService.update(resignType));
    }

    /**
     * 通过id删除
     *
     * @param id
     * @return
     */
    @RequestMapping(value = "/deleteById")
    public Result<Object> deleteById(Integer id) {
        resignTypeService.delete(id);
        return ResultUtil.success();
    }

    /**
     * 批量删除
     *
     * @param resignTypes
     * @return
     */
    @RequestMapping(value = "/deleteByIdBatch")
    public Result<Object> deleteByIdBatch(@RequestBody Collection<ResignType> resignTypes) {
        resignTypeService.deleteInBatch(resignTypes);
        return ResultUtil.success();
    }

    /**
     * 通过id查询
     *
     * @param id
     * @return
     */
    @RequestMapping(value = "/getById")
    public Result<ResignType> getById(Integer id) {
        return ResultUtil.success(resignTypeService.findOne(id));
    }

    /**
     * 查询所有
     *
     * @return
     */
    @RequestMapping(value = "/getAll")
    public Result<List<ResignType>> getAll() {
        return ResultUtil.success(resignTypeService.findAll());

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
    public Result<Page<ResignType>> getAllByPage(@RequestParam(value = "page", defaultValue = "0") Integer page,
                                             @RequestParam(value = "size", defaultValue = "10") Integer size,
                                             @RequestParam(value = "sortFieldName", defaultValue = "id") String sortFieldName,
                                             @RequestParam(value = "asc", defaultValue = "1") Integer asc) {

        return ResultUtil.success(resignTypeService.findAllByPage(page, size, sortFieldName, asc));
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
    public Result<Page<ResignType>> getByNameLikeByPage(@RequestParam(value = "name", defaultValue = "") String name,
                                                    @RequestParam(value = "page", defaultValue = "0") Integer page,
                                                    @RequestParam(value = "size", defaultValue = "10") Integer size,
                                                    @RequestParam(value = "sortFieldName", defaultValue = "id") String sortFieldName,
                                                    @RequestParam(value = "asc", defaultValue = "1") Integer asc) {

        return ResultUtil.success(resignTypeService.findByNameLikeByPage(name, page, size, sortFieldName, asc));
    }
}
