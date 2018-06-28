package com.xplusplus.security.service;

import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.time.temporal.TemporalField;
import java.util.*;
import java.util.regex.Pattern;

import javax.transaction.Transactional;

import com.xplusplus.security.domain.*;
import com.xplusplus.security.repository.*;
import com.xplusplus.security.vo.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.stereotype.Service;
import org.springframework.util.DigestUtils;

import com.xplusplus.security.exception.EnumExceptions;
import com.xplusplus.security.exception.SecurityExceptions;
import com.xplusplus.security.utils.GlobalUtil;

/**
 * @Author: zhouweixin
 * @Description:
 * @Date: Created in 20:35 2018/5/7
 * @Modified By:
 */
@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private DepartmentRepository departmentRepository;

    @Autowired
    private JobNatureRepository jobNatureRepository;

    @Autowired
    private AttendanceGroupRepository attendanceGroupRepository;

    @Autowired
    private WageRepository wageRepository;

    @Autowired
    private ResignTypeRepository resignTypeRepository;

    @Autowired
    private ProjectRepository projectRepository;

    @Autowired
    private ProjectUserRepository projectUserRepository;

    @Autowired
    private EducationRepository educationRepository;

    @Autowired
    private ArchiveRepository archiveRepository;

    @Autowired
    private WorkLoggingRepository workLoggingRepository;

    /**
     * 新增
     *
     * @param user
     * @return
     */
    public User save(User user) {

        // 验证是否存在
        if (user == null || (user.getId() != null && userRepository.findOne(user.getId()) != null)) {
            throw new SecurityExceptions(EnumExceptions.ADD_FAILED_DUPLICATE);
        }

        // 验证部门
        Department department = null;
        if (user.getDepartment() == null
                || (department = departmentRepository.findOne(user.getDepartment().getId())) == null) {
            throw new SecurityExceptions(EnumExceptions.ADD_FAILED_DEPARTMENT_NOT_EXIST);
        }

        // 生成id: 部门简称+5位数字
        String maxId = userRepository.findIdMaxByIdLike(department.getShortName());
        int id = 0;
        try {
            id = Integer.parseInt(maxId.replace(department.getShortName(), ""));
        } catch (Exception e) {
        }
        id++;
        user.setId(department.getShortName() + String.format("%05d", id));

        // 验证手机
        if (user.getContact() == null || Pattern.matches("^1[0-9]{10}$", user.getContact()) == false) {
            throw new SecurityExceptions(EnumExceptions.ADD_FAILED_PHONE_NOT_LAWER);
        }

        // 设置默认密码
        user.setPassword(DigestUtils.md5DigestAsHex("123456".getBytes()));

        // 实习周期
        user.setPeriod(GlobalUtil.computePeriod(user.getEmployDate(), user.getPracticeEndDate()));

        return userRepository.save(user);
    }

    /**
     * 更新
     *
     * @param user
     * @return
     */
    public User update(User user) {

        // 验证是否存在
        if (user == null || user.getId() == null || userRepository.findOne(user.getId()) == null) {
            throw new SecurityExceptions(EnumExceptions.UPDATE_FAILED_NOT_EXIST);
        }

        // 验证部门
        if (user.getDepartment() == null || departmentRepository.findOne(user.getDepartment().getId()) == null) {
            throw new SecurityExceptions(EnumExceptions.UPDATE_FAILED_DEPARTMENT_NOT_EXIST);
        }

        // 验证手机
        if (user.getContact() == null || Pattern.matches("^1[0-9]{10}$", user.getContact()) == false) {
            throw new SecurityExceptions(EnumExceptions.UPDATE_FAILED_PHONE_NOT_LAWER);
        }

        // 实习周期
        user.setPeriod(GlobalUtil.computePeriod(user.getEmployDate(), user.getPracticeEndDate()));

        return userRepository.save(user);
    }

    /**
     * 删除
     *
     * @param id
     */
    public void delete(String id) {

        // 验证是否存在
        if (userRepository.findOne(id) == null) {
            throw new SecurityExceptions(EnumExceptions.DELETE_FAILED_NOT_EXIST);
        }
        userRepository.delete(id);
    }

    /**
     * 批量删除
     *
     * @param users
     */
    public void deleteInBatch(Collection<User> users) {
        userRepository.deleteInBatch(users);
    }

    /**
     * 通过编码查询
     *
     * @param id
     * @return
     */
    public User findOne(String id) {
        return userRepository.findOne(id);
    }

    /**
     * 查询所有
     *
     * @return
     */
    public List<User> findAll() {
        return userRepository.findAll();
    }

    /**
     * 查询所有-分页
     *
     * @param page
     * @param size
     * @param sortFieldName
     * @param asc
     * @return
     */
    public Page<User> findAllByPage(Integer page, Integer size, String sortFieldName, Integer asc) {

        // 判断排序字段名是否存在
        try {
            User.class.getDeclaredField(sortFieldName);
        } catch (Exception e) {
            // 如果不存在就设置为id
            sortFieldName = "id";
        }

        Sort sort = null;
        if (asc == 0) {
            sort = new Sort(Direction.DESC, sortFieldName);
        } else {
            sort = new Sort(Direction.ASC, sortFieldName);
        }

        Pageable pageable = new PageRequest(page, size, sort);
        return userRepository.findAll(pageable);
    }

    /**
     * 通过名称模糊分页查询
     *
     * @param name
     * @param page
     * @param size
     * @param sortFieldName
     * @param asc
     * @return
     */
    public Page<User> findByNameLikeByPage(String name, Integer page, Integer size, String sortFieldName, Integer asc) {

        // 判断排序字段名是否存在
        try {
            User.class.getDeclaredField(sortFieldName);
        } catch (Exception e) {
            // 如果不存在就设置为id
            sortFieldName = "id";
        }

        Sort sort = null;
        if (asc == 0) {
            sort = new Sort(Direction.DESC, sortFieldName);
        } else {
            sort = new Sort(Direction.ASC, sortFieldName);
        }

        Pageable pageable = new PageRequest(page, size, sort);
        return userRepository.findByNameLike("%" + name + "%", pageable);
    }

    /**
     * 通过工作性质查询-分页
     *
     * @param jobNature
     * @param page
     * @param size
     * @param sortFieldName
     * @param asc
     * @return
     */
    public Page<User> findByJobNatureByPage(JobNature jobNature, Integer page, Integer size, String sortFieldName,
                                            Integer asc) {

        // 判断排序字段名是否存在
        try {
            User.class.getDeclaredField(sortFieldName);
        } catch (Exception e) {
            // 如果不存在就设置为id
            sortFieldName = "id";
        }

        Sort sort = null;
        if (asc == 0) {
            sort = new Sort(Direction.DESC, sortFieldName);
        } else {
            sort = new Sort(Direction.ASC, sortFieldName);
        }

        Pageable pageable = new PageRequest(page, size, sort);
        return userRepository.findByJobNature(jobNature, pageable);
    }

    /**
     * 通过工作性质查询-分页
     *
     * @param department
     * @param page
     * @param size
     * @param sortFieldName
     * @param asc
     * @return
     */
    public Page<User> findByDepartmentAndNameLikeByPage(Department department, String name, Integer page, Integer size,
                                                        String sortFieldName, Integer asc) {

        if (department == null || department.getId() == null) {
            return findByNameLikeByPage(name, page, size, sortFieldName, asc);
        }

        // 判断排序字段名是否存在
        try {
            User.class.getDeclaredField(sortFieldName);
        } catch (Exception e) {
            // 如果不存在就设置为id
            sortFieldName = "id";
        }

        Sort sort = null;
        if (asc == 0) {
            sort = new Sort(Direction.DESC, sortFieldName);
        } else {
            sort = new Sort(Direction.ASC, sortFieldName);
        }

        Pageable pageable = new PageRequest(page, size, sort);
        return userRepository.findByDepartmentAndNameLike(department, "%" + name + "%", pageable);
    }

    /**
     * 通过id更新工作性质
     *
     * @param jobNatureId
     * @param id
     */
    @Transactional
    public void updateJobNatureById(Integer jobNatureId, String id) {
        JobNature jobNature = jobNatureRepository.findOne(jobNatureId);

        if (jobNature == null) {
            throw new SecurityExceptions(EnumExceptions.UPDATE_FAILED_JOB_NATURE_NOT_EXIST);
        }

        userRepository.updateJobNatureById(jobNature, id);
    }

    /**
     * 更新密码
     *
     * @param id
     * @param oldPassword
     * @param newPassword
     */
    @Transactional
    public void updatePasswordById(String id, String oldPassword, String newPassword) {

        User user = userRepository.findOne(id);
        if (user == null) {
            throw new SecurityExceptions(EnumExceptions.UPDATE_FAILED_USER_NOT_EXIST);
        }

        if (oldPassword == null || newPassword == null || "".equals(oldPassword) || "".equals(newPassword)) {
            throw new SecurityExceptions(EnumExceptions.UPDATE_FAILED_PASSWORD_NULL);
        }

        // md5加密
        oldPassword = DigestUtils.md5DigestAsHex(oldPassword.getBytes());
        newPassword = DigestUtils.md5DigestAsHex(newPassword.getBytes());

        if (!oldPassword.equals(user.getPassword())) {
            throw new SecurityExceptions(EnumExceptions.UPDATE_FAILED_PASSWORD_NOT_EQUALS);
        }

        userRepository.updatePasswordById(newPassword, id);
    }

    /**
     * 通过用户名模糊查询
     *
     * @param name
     * @return
     */
    public List<User> findByNameLike(String name) {
        return userRepository.findByNameLike("%" + name + "%");
    }

    /**
     * 通过部门查询
     *
     * @param department
     * @return
     */
    public List<User> findByDepartment(Department department) {
        return userRepository.findByDepartment(department);
    }

    /**
     * 通过工作性质查询
     *
     * @param jobNature
     * @return
     */
    public List<User> findByJobNature(JobNature jobNature) {
        return userRepository.findByJobNature(jobNature);
    }

    /**
     * 通过部门,工作性质,名称模糊查询
     *
     * @param departmentId
     * @param jobNatureId
     * @param name
     * @return
     */
    public List<User> findByDepartmentAndJobNatureAndNameLike(Integer departmentId, Integer jobNatureId, String name) {
        Department department = new Department();
        department.setId(departmentId);
        JobNature jobNature = new JobNature();
        jobNature.setId(jobNatureId);

        if (departmentId == -1 && jobNatureId == -1) {
            return userRepository.findByNameLike("%" + name + "%");
        }

        if (departmentId != -1 && jobNatureId == -1) {
            return userRepository.findByDepartmentAndNameLike(department, "%" + name + "%");
        }

        if (departmentId == -1 && jobNatureId != -1) {
            return userRepository.findByJobNatureAndNameLike(jobNature, "%" + name + "%");
        }

        return userRepository.findByDepartmentAndJobNatureAndNameLike(department, jobNature, "%" + name + "%");
    }

    /**
     * 分配用户到薪资方案
     *
     * @param wageId
     * @param userIds
     */
    @Transactional
    public void assignUsersToWage(Integer wageId, Set<String> userIds) {
        // 判断薪资方案是否存在
        Wage wage = wageRepository.findOne(wageId);
        if (wage == null) {
            throw new SecurityExceptions(EnumExceptions.ASSIGN_FAILED_WAGE_NOT_EXIST);
        }

        // 清空考勤组的员工
        userRepository.nullWageByWage(wage);

        // 分别分配每个用户
        for (String userId : userIds) {
            if (userRepository.findOne(userId) == null) {
                EnumExceptions.ASSIGN_FAILED_USER_NOT_EXIST.setMessage("分配失败, 员工" + userId + "不存在");
                throw new SecurityExceptions(EnumExceptions.ASSIGN_FAILED_USER_NOT_EXIST);
            }

            userRepository.updateWageById(wage, userId);
        }
    }

    public void updateUserWage(Integer wageId, String userId) {
        Wage wage = wageRepository.findOne(wageId);
        if (wage == null) {
            throw new SecurityExceptions(EnumExceptions.ASSIGN_FAILED_WAGE_NOT_EXIST);
        }

        userRepository.updateWageById(wage, userId);
    }

    /**
     * 通过考勤组查询
     *
     * @param attendanceGroup
     * @return
     */
    public List<User> findByAttendanceGroup(AttendanceGroup attendanceGroup) {
        List<User> users = new ArrayList<>();
        if (attendanceGroup == null || attendanceGroup.getId() == null) {
            return users;
        }

        AttendanceGroup one = attendanceGroupRepository.findOne(attendanceGroup.getId());
        if (one == null || one.getProject() == null) {
            return users;
        }

        List<ProjectUser> projectUsers = projectUserRepository.findByProject(one.getProject());
        for (ProjectUser projectUser : projectUsers) {
            users.add(projectUser.getUser());
        }

        return users;
    }

    /**
     * 通过薪资组查询
     *
     * @param wage
     * @return
     */
    public List<User> findByWage(Wage wage) {
        return userRepository.findByWage(wage);
    }

    /**
     * 通过薪资组查询-分页
     *
     * @param wage
     * @param page
     * @param size
     * @param sortFieldName
     * @param asc
     * @return
     */
    public Page<User> findByWageByPage(Wage wage, Integer page, Integer size, String sortFieldName, Integer asc) {

        // 判断排序字段名是否存在
        try {
            User.class.getDeclaredField(sortFieldName);
        } catch (Exception e) {
            // 如果不存在就设置为id
            sortFieldName = "id";
        }

        Sort sort = null;
        if (asc == 0) {
            sort = new Sort(Direction.DESC, sortFieldName);
        } else {
            sort = new Sort(Direction.ASC, sortFieldName);
        }

        Pageable pageable = new PageRequest(page, size, sort);
        return userRepository.findByWage(wage, pageable);
    }

    /**
     * 离职
     *
     * @param date
     * @param resignTypeId
     * @param id
     */
    @Transactional
    public void updateResignDateAndResignType(Date date, Integer resignTypeId, String id) {
        // 验证离职类型
        ResignType resignType = resignTypeRepository.findOne(resignTypeId);
        if (resignType == null) {
            throw new SecurityExceptions(EnumExceptions.UPDATE_FAILED_RESIGN_TYPE_NOT_EXIST);
        }

        // 验证用户是否存在
        if (userRepository.findOne(id) == null) {
            throw new SecurityExceptions(EnumExceptions.UPDATE_FAILED_USER_NOT_EXIST);
        }

        userRepository.updateResignDateAndResignType(date, resignType, id);
    }

    /**
     * 通过主键更新ic卡号
     *
     * @param id
     * @param ic
     */
    @Transactional
    public void updateIcById(String id, String ic) {
        if (userRepository.findFirstByIc(ic) != null) {
            throw new SecurityExceptions(EnumExceptions.SET_IC_CARD_FAILED_EXIST);
        }

        userRepository.updateIcById(ic, id);
    }

    /**
     * 统计男女人数
     *
     * @return
     */
    public UserNumberVO findUserNumber() {
        UserNumberVO userNumberVO = new UserNumberVO();
        userNumberVO.setMaleNumber(userRepository.findCountBySex(0));
        userNumberVO.setFemaleNumber(userRepository.findCountBySex(1));
        return userNumberVO;
    }

    /**
     * 统计不同年龄段的人数
     *
     * @return
     */
    public UserAgeNumberVO getUserNumberByPage() {
        UserAgeNumberVO userAgeNumberVO = new UserAgeNumberVO();
        Calendar c1 = Calendar.getInstance();
        Calendar c2 = Calendar.getInstance();
        c1.set(Calendar.HOUR, 0);
        c1.set(Calendar.MINUTE, 0);
        c1.set(Calendar.SECOND, 0);
        c2.set(Calendar.HOUR, 0);
        c2.set(Calendar.MINUTE, 0);
        c2.set(Calendar.SECOND, 0);
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");

        c1.add(Calendar.YEAR, -20);
        c2.add(Calendar.YEAR, -0);
        userAgeNumberVO.setTwentyLowerNumber(userRepository.findCountByBornDateGreaterThanEqualAndBornDateLessThan(c1.getTime(), c2.getTime()));

        c1.add(Calendar.YEAR, -10);
        c2.add(Calendar.YEAR, -20);
        userAgeNumberVO.setTwentyToThirtyNumber(userRepository.findCountByBornDateGreaterThanEqualAndBornDateLessThan(c1.getTime(), c2.getTime()));

        c1.add(Calendar.YEAR, -10);
        c2.add(Calendar.YEAR, -10);
        userAgeNumberVO.setThirtyToFortyNumber(userRepository.findCountByBornDateGreaterThanEqualAndBornDateLessThan(c1.getTime(), c2.getTime()));

        c1.add(Calendar.YEAR, -10);
        c2.add(Calendar.YEAR, -10);
        userAgeNumberVO.setFortyToFiftyNumber(userRepository.findCountByBornDateGreaterThanEqualAndBornDateLessThan(c1.getTime(), c2.getTime()));

        c1.add(Calendar.YEAR, -200);
        c2.add(Calendar.YEAR, -10);
        userAgeNumberVO.setFiftyUpperNumber(userRepository.findCountByBornDateGreaterThanEqualAndBornDateLessThan(c1.getTime(), c2.getTime()));
        return userAgeNumberVO;
    }

    /**
     * 统计不同项目的人数
     *
     * @return
     */
    public List<UserProjectNumberVO> getUserNumberByProject() {
        List<UserProjectNumberVO> userProjectNumberVOs = new ArrayList<>();

        // 1.查询所有未结束的项目
        ProjectStatus projectStatus = new ProjectStatus();
        projectStatus.setId(1);
        List<Project> projects = projectRepository.findByProjectStatus(projectStatus);

        // 2.分别查询每个项目的人数
        for (Project project : projects) {
            int num = projectUserRepository.findCountByProject(project);
            userProjectNumberVOs.add(new UserProjectNumberVO(project, num));
        }

        return userProjectNumberVOs;
    }

    /**
     * 统计不同学历的人数
     *
     * @return
     */
    public List<UserEducationNumberVO> getUserNumberByEducation() {
        List<UserEducationNumberVO> userEducationNumberVOS = new ArrayList<>();

        List<Education> educations = educationRepository.findAll();
        for (Education education : educations) {
            int num = archiveRepository.findCountByEducation(education);

            userEducationNumberVOS.add(new UserEducationNumberVO(education, num));
        }
        return userEducationNumberVOS;
    }

    /**
     * 统计某天参与考勤的人数
     *
     * @return
     */
    public List<UserProjectAttendanceNumberVO> getUserNumberByProjectAttenAndDate(Date date) {

        Calendar c1 = Calendar.getInstance();
        Calendar c2 = Calendar.getInstance();
        c1.setTime(date);
        c2.setTime(date);
        c2.add(Calendar.DAY_OF_MONTH, 1);

        List<UserProjectAttendanceNumberVO> userProjectAttendanceNumberVOS = new ArrayList<>();

        // 1.查询所有未结束的项目
        ProjectStatus projectStatus = new ProjectStatus();
        projectStatus.setId(1);
        List<Project> projects = projectRepository.findByProjectStatus(projectStatus);

        // 2.分别查询每个项目的人数
        for (Project project : projects) {
            int num = workLoggingRepository.findByProjectAndStartTimeAndStatus(project, c1.getTime(), c2.getTime());
            userProjectAttendanceNumberVOS.add(new UserProjectAttendanceNumberVO(project, num));
        }

        return userProjectAttendanceNumberVOS;
    }
}
