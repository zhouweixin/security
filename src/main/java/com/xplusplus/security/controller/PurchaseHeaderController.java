package com.xplusplus.security.controller;

import com.xplusplus.security.domain.PurchaseHeader;
import com.xplusplus.security.domain.Result;
import com.xplusplus.security.domain.User;
import com.xplusplus.security.service.PurchaseHeaderService;
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
@RequestMapping(value = "/purchaseHeader")
public class PurchaseHeaderController {

    @Autowired
    private PurchaseHeaderService purchaseHeaderService;

    /**
     * 新增
     *
     * @param purchaseHeader
     * @return
     */
    @RequestMapping(value = "/add")
    public Result<PurchaseHeader> add(@RequestBody PurchaseHeader purchaseHeader) {
        return ResultUtil.success(purchaseHeaderService.save(purchaseHeader));
    }

    /**
     * 更新
     *
     * @param purchaseHeader
     * @return
     */
    @RequestMapping(value = "/update")
    public Result<PurchaseHeader> update(@RequestBody PurchaseHeader purchaseHeader) {
        return ResultUtil.success(purchaseHeaderService.update(purchaseHeader));
    }

    /**
     * 通过id删除
     *
     * @param id
     * @return
     */
    @RequestMapping(value = "/deleteById")
    public Result<Object> deleteById(Long id) {
        purchaseHeaderService.delete(id);
        return ResultUtil.success();
    }

    /**
     * 批量删除
     *
     * @param purchaseHeaders
     * @return
     */
    @RequestMapping(value = "/deleteByIdBatch")
    public Result<Object> deleteByIdBatch(@RequestBody Collection<PurchaseHeader> purchaseHeaders) {
        purchaseHeaderService.deleteInBatch(purchaseHeaders);
        return ResultUtil.success();
    }

    /**
     * 通过id查询
     *
     * @param id
     * @return
     */
    @RequestMapping(value = "/getById")
    public Result<PurchaseHeader> getById(Long id) {
        return ResultUtil.success(purchaseHeaderService.findOne(id));
    }

    /**
     * 查询所有
     *
     * @return
     */
    @RequestMapping(value = "/getAll")
    public Result<List<PurchaseHeader>> getAll() {
        return ResultUtil.success(purchaseHeaderService.findAll());

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
    public Result<Page<PurchaseHeader>> getAllByPage(@RequestParam(value = "page", defaultValue = "0") Integer page,
                                                     @RequestParam(value = "size", defaultValue = "10") Integer size,
                                                     @RequestParam(value = "sortFieldName", defaultValue = "id") String sortFieldName,
                                                     @RequestParam(value = "asc", defaultValue = "1") Integer asc) {

        return ResultUtil.success(purchaseHeaderService.findAllByPage(page, size, sortFieldName, asc));
    }

    /**
     * 通过审核人查询-分页
     *
     * @param page
     * @param size
     * @param sortFieldName
     * @param asc
     * @return
     */
    @RequestMapping(value = "/getByAuditorByPage")
    public Result<Page<PurchaseHeader>> getByCurAuditorByPage(User auditor,
                                                              @RequestParam(value = "status", defaultValue = "0") Integer status,
                                                              @RequestParam(value = "page", defaultValue = "0") Integer page,
                                                              @RequestParam(value = "size", defaultValue = "10") Integer size,
                                                              @RequestParam(value = "sortFieldName", defaultValue = "id") String sortFieldName,
                                                              @RequestParam(value = "asc", defaultValue = "1") Integer asc) {

        return ResultUtil.success(purchaseHeaderService.findByCurAuditorAndStatus(auditor, status, page, size, sortFieldName, asc));
    }

    /**
     * 通过申请人查询-分页
     *
     * @param page
     * @param size
     * @param sortFieldName
     * @param asc
     * @return
     */
    @RequestMapping(value = "/getByApplyUserByPage")
    public Result<Page<PurchaseHeader>> getByApplyUserByPage(User applyUser,
                                                             @RequestParam(value = "page", defaultValue = "0") Integer page,
                                                             @RequestParam(value = "size", defaultValue = "10") Integer size,
                                                             @RequestParam(value = "sortFieldName", defaultValue = "applyTime") String sortFieldName,
                                                             @RequestParam(value = "asc", defaultValue = "0") Integer asc) {

        return ResultUtil.success(purchaseHeaderService.findByApplyUserByPage(applyUser, page, size, sortFieldName, asc));
    }

    /**
     * 通过状态查询-分页
     *
     * @param page
     * @param size
     * @param sortFieldName
     * @param asc
     * @return
     */
    @RequestMapping(value = "/getByStatueByPage")
    public Result<Page<PurchaseHeader>> getByStatueByPage(@RequestParam(value = "status", defaultValue = "0") int status,
                                                          @RequestParam(value = "page", defaultValue = "0") Integer page,
                                                          @RequestParam(value = "size", defaultValue = "10") Integer size,
                                                          @RequestParam(value = "sortFieldName", defaultValue = "applyTime") String sortFieldName,
                                                          @RequestParam(value = "asc", defaultValue = "0") Integer asc) {

        return ResultUtil.success(purchaseHeaderService.findByStatueByPage(status, page, size, sortFieldName, asc));
    }

    /**
     * 通过申请人和状态查询-分页
     *
     * @param page
     * @param size
     * @param sortFieldName
     * @param asc
     * @return
     */
    @RequestMapping(value = "/getByApplyUserAndStatusByPage")
    public Result<Page<PurchaseHeader>> getByApplyUserAndStatusByPage(User applyUser,
                                                                      @RequestParam(value = "status", defaultValue = "0") int status,
                                                                      @RequestParam(value = "page", defaultValue = "0") Integer page,
                                                                      @RequestParam(value = "size", defaultValue = "10") Integer size,
                                                                      @RequestParam(value = "sortFieldName", defaultValue = "applyTime") String sortFieldName,
                                                                      @RequestParam(value = "asc", defaultValue = "0") Integer asc) {

        return ResultUtil.success(purchaseHeaderService.findByApplyUserAndStatusByPage(applyUser, status, page, size, sortFieldName, asc));
    }

    /**
     * 审核
     *
     * @param curAuditorId
     * @param purchaseHeaderId
     * @param status
     * @param note
     * @return
     */
    @RequestMapping(value = "/audit")
    public Result<Object> audit(String curAuditorId, Long purchaseHeaderId, int status, String note) {
        purchaseHeaderService.audit(curAuditorId, purchaseHeaderId, status, note);
        return ResultUtil.success();
    }
}
