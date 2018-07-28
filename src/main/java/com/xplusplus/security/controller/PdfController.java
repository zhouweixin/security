package com.xplusplus.security.controller;

import com.xplusplus.security.domain.Pdf;
import com.xplusplus.security.domain.Result;
import com.xplusplus.security.exception.EnumExceptions;
import com.xplusplus.security.exception.SecurityExceptions;
import com.xplusplus.security.service.PdfService;
import com.xplusplus.security.utils.ResultUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.OutputStream;
import java.util.Set;

/**
 * @Author: zhouweixin
 * @Description:
 * @Date: Created in 13:14 2018/6/8
 * @Modified By:
 */
@RestController
@RequestMapping(value = "/pdf")
public class PdfController {
    @Autowired
    private PdfService pdfService;

    /**
     * 上传图片
     *
     * @param file
     * @return
     */
    @PostMapping(value = "/upload")
    public Result<Pdf> fileUpload(MultipartFile file) {
        return ResultUtil.success(pdfService.fileUpload(file));
    }

    /**
     * 查询图片
     *
     * @param id
     * @param response
     * @return
     */
    @RequestMapping(value = "/download/{id}")
    public Result<Object> getImage(@PathVariable Long id, HttpServletResponse response) {
        pdfService.findOne(id, response);
        return ResultUtil.success();
    }

    /**
     * 通过主键删除
     *
     * @param id
     * @return
     */
    @RequestMapping(value = "/deleteById")
    public Result<Object> deleteById(Long id) {
        pdfService.delete(id);
        return ResultUtil.success();
    }

    /**
     * 批量删除
     *
     * @param pdfs
     * @return
     */
    @PostMapping(value = "/deleteByBatchId")
    public Result<Object> deleteByBatchId(@RequestBody Set<Pdf> pdfs){
        pdfService.deleteInBatch(pdfs);
        return ResultUtil.success();
    }
}
