package com.xplusplus.security.controller;

import com.xplusplus.security.domain.LossEntry;
import com.xplusplus.security.domain.Result;
import com.xplusplus.security.service.LossEntryService;
import com.xplusplus.security.utils.ResultUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.Collection;
import java.util.List;

/**
 * @Author: zhouweixin
 * @Description:
 * @Date: Created in 8:28 2018/7/9
 * @Modified By:
 */
@RestController
@RequestMapping(value = "/lossEntry")
public class LossEntryController {
    @Autowired
    private LossEntryService lossEntryService;

    /**
     * 新增
     *
     * @param lossEntry
     * @return
     */
    @RequestMapping(value = "/add")
    public Result<LossEntry> add(LossEntry lossEntry) {
        return ResultUtil.success(lossEntryService.save(lossEntry));
    }

    /**
     * 更新
     *
     * @param lossEntry
     * @return
     */
    @RequestMapping(value = "/update")
    public Result<LossEntry> update(LossEntry lossEntry) {
        return ResultUtil.success(lossEntryService.update(lossEntry));
    }

    /**
     * 通过主键删除
     *
     * @param id
     * @return
     */
    @RequestMapping(value = "/deleteById")
    public Result<Object> deleteById(Long id) {
        lossEntryService.delete(id);
        return ResultUtil.success();
    }

    /**
     * 批量删除
     *
     * @param lossEntries
     * @return
     */
    @RequestMapping(value = "/deleteByIdBatch")
    public Result<Object> deleteByIdBatch(@RequestBody Collection<LossEntry> lossEntries) {
        lossEntryService.deleteInBatch(lossEntries);
        return ResultUtil.success();
    }

    /**
     * 通过id查询
     *
     * @param id
     * @return
     */
    @RequestMapping(value = "/getById")
    public Result<LossEntry> getById(Long id) {
        return ResultUtil.success(lossEntryService.findOne(id));
    }

    /**
     * 查询所有
     *
     * @return
     */
    @RequestMapping(value = "/getAll")
    public Result<List<LossEntry>> getAll() {
        return ResultUtil.success(lossEntryService.findAll());

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
    public Result<Page<LossEntry>> getAllByPage(@RequestParam(value = "page", defaultValue = "0") Integer page,
                                                @RequestParam(value = "size", defaultValue = "10") Integer size,
                                                @RequestParam(value = "sortFieldName", defaultValue = "id") String sortFieldName,
                                                @RequestParam(value = "asc", defaultValue = "1") Integer asc) {

        return ResultUtil.success(lossEntryService.findAllByPage(page, size, sortFieldName, asc));
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
    public Result<Page<LossEntry>> getByMaterialNameLikeByPage(@RequestParam(value = "name", defaultValue = "") String name,
                                                               @RequestParam(value = "page", defaultValue = "0") Integer page,
                                                               @RequestParam(value = "size", defaultValue = "10") Integer size,
                                                               @RequestParam(value = "sortFieldName", defaultValue = "id") String sortFieldName,
                                                               @RequestParam(value = "asc", defaultValue = "1") Integer asc) {

        return ResultUtil.success(lossEntryService.findByMaterailNameLikeByPage(name, page, size, sortFieldName, asc));
    }

    /**
     * 通过状态和物品名称模糊查询-分页
     *
     * @param name
     * @param page
     * @param size
     * @param sortFieldName
     * @param asc
     * @return
     */
    @RequestMapping(value = "/getByStatusAndMaterialNameLikeByPage")
    public Result<Page<LossEntry>> getByStatusAndMaterialNameLikeByPage(@RequestParam(value = "status", defaultValue = "1") int status,
                                                                        @RequestParam(value = "name", defaultValue = "") String name,
                                                                        @RequestParam(value = "page", defaultValue = "0") Integer page,
                                                                        @RequestParam(value = "size", defaultValue = "10") Integer size,
                                                                        @RequestParam(value = "sortFieldName", defaultValue = "id") String sortFieldName,
                                                                        @RequestParam(value = "asc", defaultValue = "1") Integer asc) {

        return ResultUtil.success(lossEntryService.findByStatusAndMaterialNameLikeByPage(status, name, page, size, sortFieldName, asc));
    }
}
