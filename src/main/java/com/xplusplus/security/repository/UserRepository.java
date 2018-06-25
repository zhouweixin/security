package com.xplusplus.security.repository;

import java.util.Date;
import java.util.List;

import com.xplusplus.security.domain.*;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

/**
 * @Author: zhouweixin
 * @Description:
 * @Date: Created in 20:33 2018/5/7
 * @Modified By:
 */
@Repository
public interface UserRepository extends JpaRepository<User, String> {
	/**
	 * 通过名称模糊查询-分页
	 * 
	 * @param name
	 * @param pageable
	 * @return
	 */
	public Page<User> findByNameLike(String name, Pageable pageable);

	/**
	 * 通过名称模糊查询
	 * 
	 * @param name
	 * @return
	 */
	public List<User> findByNameLike(String name);

	/**
	 * 通过部门简称模糊查询最大id
	 * 
	 * @param id
	 * @return
	 */
	@Query(value = "select max(u.id) from User u where u.id like ?1%")
	public String findIdMaxByIdLike(String id);

	/**
	 * 通过工作性质查询
	 * 
	 * @param jobNature
	 * @return
	 */
	public List<User> findByJobNature(JobNature jobNature);

	/**
	 * 通过工作性质查询-分页
	 * 
	 * @param jobNature
	 * @param pageable
	 * @return
	 */
	public Page<User> findByJobNature(JobNature jobNature, Pageable pageable);

	/**
	 * 通过部门和名称模糊查询
	 * 
	 * @param department
	 * @param name
	 * @return
	 */
	public List<User> findByDepartmentAndNameLike(Department department, String name);
	
	/**
	 * 通过部门和名称模糊查询-分页
	 * 
	 * @param department
	 * @param name
	 * @return
	 */
	public Page<User> findByDepartmentAndNameLike(Department department, String name, Pageable pageable);

	/**
	 * 通过编码更新工作性质
	 * 
	 * @param jobNature
	 * @param id
	 */
	@Modifying
	@Query(value = "update User u set u.jobNature=?1 where u.id=?2")
	public void updateJobNatureById(JobNature jobNature, String id);

	/**
	 * 更新密码
	 * 
	 * @param password
	 */
	@Modifying
	@Query(value = "update User u set u.password=?1 where u.id=?2")
	public void updatePasswordById(String password, String id);

	/**
	 * 通过部门查询
	 * 
	 * @param department
	 * @return
	 */
	public List<User> findByDepartment(Department department);
	
	/**
	 * 通过部门,工作性质,名称模糊查询
	 * 
	 * @param department
	 * @param jobNature
	 * @param name
	 * @return
	 */
	public List<User> findByDepartmentAndJobNatureAndNameLike(Department department, JobNature jobNature, String name);

	/**
	 * 通过工作性质和名称模糊查询
	 * 
	 * @param jobNature
	 * @param string
	 * @return
	 */
	public List<User> findByJobNatureAndNameLike(JobNature jobNature, String string);
	
	/**
	 * 把用户从指定考勤组里清除
	 * 
	 * @param attendanceGroup
	 */
	@Modifying
	@Query(value = "update User u set u.attendanceGroup=null where u.attendanceGroup=?1")
	public void nullAttendanceGroupByAttendanceGroup(AttendanceGroup attendanceGroup);
	
	/** 给用户分配考勤组
	 * 
	 * @param attendenceGroup
	 * @param id
	 */
	@Modifying
	@Query(value = "update User u set u.attendanceGroup=?1 where u.id=?2")
	public void updateAttendanceGroupById(AttendanceGroup attendenceGroup, String id);

    /**
     * 把用户从指定薪资方案里清除
     *
     * @param wage
     */
    @Modifying
    @Query(value = "update User u set u.wage=null where u.wage=?1")
    public void nullWageByWage(Wage wage);

    /** 给用户分配薪资方案
     *
     * @param wage
     * @param id
     */
    @Modifying
    @Query(value = "update User u set u.wage=?1 where u.id=?2")
    public void updateWageById(Wage wage, String id);

    /**
     * 通过薪资方案查询
     *
     * @param wage
     * @return
     */
    public List<User> findByWage(Wage wage);

    /**
     * 通过薪资方案查询-分页
     *
     * @param wage
     * @return
     */
    public Page<User> findByWage(Wage wage, Pageable pageable);

    /**
     * 通过考勤组查询
     *
     * @param attendanceGroup
     * @return
     */
	public List<User> findByAttendanceGroup(AttendanceGroup attendanceGroup);

    /**
     * 离职
     *
     * @param date
     * @param resignType
     * @param id
     */
	@Modifying
    @Query(value = "update User u set u.resignDate=?1, u.resignType=?2 where u.id=?3")
	public void updateResignDateAndResignType(Date date, ResignType resignType, String id);

	/**
	 * 通过主键更新卡号
	 *
	 * @param ic
	 * @param id
	 */
	@Modifying
	@Query(value = "update User u set u.ic=?1 where u.id=?2")
   	public void updateIcById(String ic, String id);

    /**
     * 通过ic查询
     *
     * @param ic
     * @return
     */
	public User findFirstByIc(String ic);

    /**
     * 通过性别查询数量
     *
     * @param sex
     * @return
     */
	@Query(value = "select count(u) from User u where u.sex=?1")
	public int findCountBySex(Integer sex);

    /**
     * 通过年龄段查询
     *
     * @param date1
     * @param date2
     * @return
     */
    @Query(value = "select count(u) from User u where u.bornDate>=?1 and u.bornDate<?2")
	public int findCountByBornDateGreaterThanEqualAndBornDateLessThan(Date date1, Date date2);
}
