package com.xplusplus.security.repository;

import com.xplusplus.security.domain.Goout;
import com.xplusplus.security.domain.GooutHeader;
import com.xplusplus.security.domain.GooutMaterialUser;
import com.xplusplus.security.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Collection;
import java.util.List;

/**
 * @Author: zhouweixin
 * @Description:
 * @Date: Created in 11:03 2018/7/5
 * @Modified By:
 */
@Repository
public interface GooutMaterialUserRepository extends JpaRepository<GooutMaterialUser, Long> {
    /**
     * 通过出库单表头查询
     *
     * @param gooutHeader
     * @return
     */
    public GooutMaterialUser findFirstByGooutHeader(GooutHeader gooutHeader);

    /**
     * 通过id, 员工和状态查询
     *
     * @param ids
     * @param status
     * @return
     */
    public List<GooutMaterialUser> findByIdInAndUserInAndStatus(Collection<Long> ids, Collection<User> users, int status);
}
