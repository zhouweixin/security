package com.xplusplus.security.service;

import com.xplusplus.security.domain.Image;
import com.xplusplus.security.exception.EnumExceptions;
import com.xplusplus.security.exception.SecurityExceptions;
import com.xplusplus.security.repository.ImageRepository;
import com.xplusplus.security.utils.ResultUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.OutputStream;
import java.util.Set;

/**
 * @Author: zhouweixin
 * @Description:
 * @Date: Created in 18:07 2018/6/6
 * @Modified By:
 */
@Service
public class ImageService {
    @Autowired
    private ImageRepository imageRepository;

    /**
     * 上传文件
     * 
     * @param file
     */
    public Image fileUpload(MultipartFile file) {
        if (file.isEmpty()) {
            throw new SecurityExceptions(EnumExceptions.UPLOAD_FAILED_FILE_EMPTY);
        }

        Image image = new Image();
        try {
            image.setData(file.getBytes());
            image = imageRepository.save(image);
        } catch (IOException e) {
            throw new SecurityExceptions(EnumExceptions.UNKOWN_ERROR);
        }

        if(image != null){
            image.setData(null);
        }
        
        return image;
    }

    /**
     * 通过主键查询
     *
     * @param id
     * @return
     */
    public void findOne(Long id, HttpServletResponse response){
        Image image = imageRepository.findOne(id);

        if (image == null) {
            return;
        }

        byte[] bytes = image.getData();
        try {
            OutputStream os = response.getOutputStream();
            os.write(bytes, 0, bytes.length);
            os.flush();
        } catch (IOException e) {
            throw new SecurityExceptions(EnumExceptions.UNKOWN_ERROR);
        }
    }

    /**
     * 删除
     *
     * @param id
     */
    public void delete(Long id){
        if (imageRepository.findOne(id) == null) {
            throw new SecurityExceptions(EnumExceptions.DELETE_FAILED_NOT_EXIST);
        }
        
        imageRepository.delete(id);
    }

    /**
     * 批量删除
     *
     * @param images
     */
    public void deleteInBatch(Set<Image> images) {
        imageRepository.deleteInBatch(images);
    }

    
}
