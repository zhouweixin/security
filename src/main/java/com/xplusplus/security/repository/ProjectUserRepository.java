package com.xplusplus.security.repository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.xplusplus.security.domain.Project;
import com.xplusplus.security.domain.ProjectUser;
import com.xplusplus.security.domain.User;

/**
 * @Author: zhouweixin
 * @Description:
 * @Date: Created in 下午3:54:39 2018年5月31日
 */
@Repository
public interface ProjectUserRepository extends JpaRepository<ProjectUser, Long> {
	/**
	 * 通过项目和用户查询
	 * 
	 * @param project
	 * @param user
	 * @return
	 */
	public ProjectUserRepository findFirstByProjectAndUser(Project project, User user);

	/**
	 * 通过项目查询
	 * 
	 * @param project
	 * @return
	 */
	public List<ProjectUser> findByProject(Project project);

	/**
	 * 通过项目查询-分页
	 * 
	 * @param project
	 * @param pageable
	 * @return
	 */
	public Page<ProjectUser> findByProject(Project project, Pageable pageable);

	/**
	 * 通过用户查询
	 * 
	 * @param user
	 * @return
	 */
	public List<ProjectUser> findByUser(User user);

	/**
	 * 通过用户查询-分页
	 * 
	 * @param user
	 * @param pageable
	 * @return
	 */
	public Page<ProjectUser> findByUser(User user, Pageable pageable);

	/**
	 * 通过项目删除
	 *
	 * @param project
	 */
	public void deleteByProject(Project project);

    /**
     * 查询项目里的人数
     *
     * @param project
     * @return
     */
	@Query(value = "select count(pu) from ProjectUser pu where pu.project=?1")
	public int findCountByProject(Project project);
}
