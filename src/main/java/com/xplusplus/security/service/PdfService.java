package com.xplusplus.security.service;

import com.xplusplus.security.domain.Pdf;
import com.xplusplus.security.exception.EnumExceptions;
import com.xplusplus.security.exception.SecurityExceptions;
import com.xplusplus.security.repository.ArchiveRepository;
import com.xplusplus.security.repository.PdfRepository;
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
 * @Date: Created in 13:14 2018/6/8
 * @Modified By:
 */
@Service
public class PdfService {
    @Autowired
    private PdfRepository pdfRepository;

    @Autowired
    private ArchiveRepository archiveRepository;

    /**
     * 上传文件
     *
     * @return
     */
    public Pdf fileUpload(MultipartFile file){
        if (file.isEmpty()) {
            throw new SecurityExceptions(EnumExceptions.UPLOAD_FAILED_FILE_EMPTY);
        }

        Pdf pdf = new Pdf();
        try {
            pdf.setData(file.getBytes());
            pdf = pdfRepository.save(pdf);
        } catch (IOException e) {
            throw new SecurityExceptions(EnumExceptions.UNKOWN_ERROR);
        }

        if(pdf != null){
            pdf.setData(null);
        }
        
        return pdf;
    }

    /**
     * 查询文件
     *
     * @param id
     * @param response
     */
    public void findOne(Long id, HttpServletResponse response) {
        Pdf pdf = pdfRepository.findOne(id);
        if (pdf == null) {
            return;
        }

        byte[] bytes = pdf.getData();
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
    public void delete(Long id) {
        if (pdfRepository.findOne(id) == null) {
            throw new SecurityExceptions(EnumExceptions.DELETE_FAILED_NOT_EXIST);
        }
        pdfRepository.delete(id);
    }

    /**
     * 批量删除
     *
     * @param images
     */
    public void deleteInBatch(Set<Pdf> images) {
        pdfRepository.deleteInBatch(images);
    }
}
