package com.xplusplus.security.controller;

import com.xplusplus.security.domain.Image;
import com.xplusplus.security.domain.Result;
import com.xplusplus.security.service.ImageService;
import com.xplusplus.security.utils.ResultUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletResponse;
import java.util.Set;

/**
 * @Author: zhouweixin
 * @Description:
 * @Date: Created in 18:25 2018/6/6
 * @Modified By:
 */
@RestController
@RequestMapping(value = "/image")
public class ImageController {
    @Autowired
    private ImageService imageService;

    /**
     * 上传图片
     *
     * @param file
     * @return
     */
    @PostMapping(value = "/upload")
    public Result<Image> fileUpload(MultipartFile file) {
        return ResultUtil.success(imageService.fileUpload(file));
    }

    /**
     * 查询图片
     *
     * @param id
     * @param response
     * @return
     */
    @RequestMapping(value = "/{id}")
    public Result<Object> getImage(@PathVariable Long id, HttpServletResponse response) {
        imageService.findOne(id, response);
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
        imageService.delete(id);
        return ResultUtil.success();
    }

    /**
     * 批量删除
     *
     * @param images
     * @return
     */
    @PostMapping(value = "/deleteByBatchId")
    public Result<Object> deleteByBatchId(@RequestBody Set<Image> images){
        imageService.deleteInBatch(images);
        return ResultUtil.success();
    }
}
