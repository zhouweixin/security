package com.xplusplus.security.repository;

import com.xplusplus.security.domain.RunPropertyCommand;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Collection;

/**
 * @Author: zhouweixin
 * @Description:
 * @Date: Created in 13:06 2018/7/13
 * @Modified By:
 */
public interface RunPropertyCommandRepository extends JpaRepository<RunPropertyCommand, Long> {
    /**
     * 通过状态查询最新的命令
     *
     * @return
     */
    public RunPropertyCommand findFirstByOrderByDateDesc();

    /**
     * 批量删除
     *
     * @param ids
     */
    public void deleteByIdIn(Collection<Long> ids);
}
