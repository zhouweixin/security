package com.xplusplus.security.repository;

import com.xplusplus.security.domain.Pdf;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * @Author: zhouweixin
 * @Description:
 * @Date: Created in 13:13 2018/6/8
 * @Modified By:
 */
@Repository
public interface PdfRepository extends JpaRepository<Pdf, Long> {
}
