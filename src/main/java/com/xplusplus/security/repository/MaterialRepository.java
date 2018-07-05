package com.xplusplus.security.repository;

import com.xplusplus.security.domain.Material;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * @Author: zhouweixin
 * @Description:
 * @Date: Created in 11:03 2018/7/5
 * @Modified By:
 */
@Repository
public interface MaterialRepository extends JpaRepository<Material, Long> {
}
