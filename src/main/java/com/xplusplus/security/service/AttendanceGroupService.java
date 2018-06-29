package com.xplusplus.security.service;

import com.xplusplus.security.domain.*;
import com.xplusplus.security.domain.AttendanceGroup;
import com.xplusplus.security.exception.EnumExceptions;
import com.xplusplus.security.exception.SecurityExceptions;
import com.xplusplus.security.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Set;

/**
 * @author：XudongHu
 * @description: 考勤组Service
 * @date:15:33 2018/5/29
 */
@Service
public class AttendanceGroupService {
    @Autowired
    private AttendanceGroupRepository attendanceGroupRepository;
    @Autowired
    private ScheduleRepository scheduleRepository;
    @Autowired
    private AttendanceGroupLeaderRepository attendanceGroupLeaderRepository;
    @Autowired
    private UserService userService;
    @Autowired
    private AttendanceGroupLeaderService attendanceGroupLeaderService;

    @Autowired
    private AttendanceGroupAddressRepository attendanceGroupAddressRepository;

    @Autowired
    private AttendanceAddressRepository attendanceAddressRepository;

    /**
     * 新增考勤组
     */
    @Transactional
    public AttendanceGroup save(AttendanceGroup attendanceGroup, Set<String> leaderIds, Set<Long> attendanceAddressIds) {
        if (attendanceGroup == null || (attendanceGroup.getId() != null && attendanceGroupRepository.findOne(attendanceGroup.getId()) != null)) {
            throw new SecurityExceptions(EnumExceptions.ADD_FAILED_DUPLICATE);
        }

        //验证是否存在班次
        if (attendanceGroup.getSchedule() == null || scheduleRepository.findOne(attendanceGroup.getSchedule().getId()) == null) {
            throw new SecurityExceptions(EnumExceptions.ADD_FAILED_SCHEDULE_NOT_EXIST);
        }

        //先行保存
        AttendanceGroup save = attendanceGroupRepository.save(attendanceGroup);
        //验证是否设定了外勤打卡
        /**
         if(attendanceGroup.getEnableOut()==null)
         { throw new SecurityExceptions(EnumExceptions.ADD_FAILED_ATTENDANCEGROUP_NOT_EXIST);}
         **/

        //调用AttendanceGroupLeaderService新增负责人
        attendanceGroupLeaderService.addLeadersToAttendanceGroup(attendanceGroup.getId(), leaderIds);

        // 新增项目地址关系
        attendanceGroupAddressRepository.deleteByAttendanceGroup(attendanceGroup);
        for (Long attendanceAddressId : attendanceAddressIds) {
            AttendanceAddress attendanceAddress = attendanceAddressRepository.findOne(attendanceAddressId);
            if (attendanceAddress == null) {
                EnumExceptions.ADD_FAILED_ADDRESS_NOT_EXIST.setMessage("新增失败， 地址" + attendanceAddressId + "不存在");
                throw new SecurityExceptions(EnumExceptions.ADD_FAILED_ADDRESS_NOT_EXIST);
            }
            attendanceGroupAddressRepository.save(new AttendanceGroupAddress(attendanceGroup, attendanceAddress));
        }

        return save;
    }

    /**
     * 更新考勤组
     */
    @Transactional
    public AttendanceGroup update(AttendanceGroup attendanceGroup, Set<String> leaderIds, Set<Long> attendanceAddressIds) {

        // 验证是否存在
        if (attendanceGroup == null || attendanceGroup.getId() == null ||
                attendanceGroupRepository.findOne(attendanceGroup.getId()) == null) {
            throw new SecurityExceptions(EnumExceptions.UPDATE_FAILED_NOT_EXIST);
        }
        //验证是否存在班次
        if (attendanceGroup.getSchedule() == null ||
                scheduleRepository.findOne(attendanceGroup.getSchedule().getId()) == null) {
            throw new SecurityExceptions(EnumExceptions.ADD_FAILED_SCHEDULE_NOT_EXIST);
        }
        /**验证是否设定了外勤打卡
         if(attendanceGroup.getEnableOut()==null)
         { throw new SecurityExceptions(EnumExceptions.ADD_FAILED_ATTENDANCEGROUP_NOT_EXIST);}
         **/
        //先行保存
        AttendanceGroup save = attendanceGroupRepository.save(attendanceGroup);
        //调用AttendanceGroupleaderService新增负责人
        attendanceGroupLeaderService.addLeadersToAttendanceGroup(attendanceGroup.getId(), leaderIds);

        // 新增项目地址关系
        attendanceGroupAddressRepository.deleteByAttendanceGroup(attendanceGroup);
        for (Long attendanceAddressId : attendanceAddressIds) {
            AttendanceAddress attendanceAddress = attendanceAddressRepository.findOne(attendanceAddressId);
            if (attendanceAddress == null) {
                EnumExceptions.ADD_FAILED_ADDRESS_NOT_EXIST.setMessage("更新失败， 地址" + attendanceAddressId + "不存在");
                throw new SecurityExceptions(EnumExceptions.ADD_FAILED_ADDRESS_NOT_EXIST);
            }
            attendanceGroupAddressRepository.save(new AttendanceGroupAddress(attendanceGroup, attendanceAddress));
        }

        return save;
    }

    /**
     * 删除考勤组
     */
    @Transactional
    public void delete(Integer id) {
        //验证是否存在
        if (attendanceGroupRepository.findOne(id) == null) {
            throw new SecurityExceptions(EnumExceptions.DELETE_FAILED_NOT_EXIST);
        }

        //先删除 考勤负责人
        attendanceGroupLeaderRepository.deleteByAttendanceGroup(attendanceGroupRepository.getOne(id));

        //再删除考勤组
        attendanceGroupRepository.delete(id);
    }

    /**
     * 通过id查询
     */
    public AttendanceGroup findOne(Integer id) {
        return attendanceGroupRepository.findOne(id);
    }

    /**
     * 通过考勤组ID查询该考勤组员工
     */
    public List<User> findUser(Integer id) {
        return userService.findByAttendanceGroup(attendanceGroupRepository.findOne(id));
    }

    /**
     * 通过考勤组ID 查询该考勤组负责人
     */
    public List<AttendanceGroupLeader> findLeaders(Integer id) {
        return attendanceGroupLeaderService.findByAttendanceGroup(attendanceGroupRepository.findOne(id));
    }

    /**
     * 查询所有
     */
    public List<AttendanceGroup> findAll() {
        return attendanceGroupRepository.findAll();
    }

    /**
     * 分页查询所有
     */
    public Page<AttendanceGroup> findAllByPage(Integer page, Integer size, String sortFieldName, Integer asc) {
        //判断排序字段名是否存在
        try {
            AttendanceGroup.class.getDeclaredField(sortFieldName);
        } catch (Exception e) {
            //如果不存在就设置为id
            sortFieldName = "id";
        }

        Sort sort = null;
        if (asc == 0) {
            sort = new Sort(Sort.Direction.DESC, sortFieldName);
        } else {
            sort = new Sort(Sort.Direction.ASC, sortFieldName);
        }
        Pageable pageable = new PageRequest(page, size, sort);
        return attendanceGroupRepository.findAll(pageable);
    }

    /***
     * 通过考勤组名模糊查询-分页
     */
    public Page<AttendanceGroup> findByNameLikeByPage(String name, Integer page, Integer size, String sortFieldName,
                                                      Integer asc) {

        // 判断排序字段名是否存在
        try {
            Nation.class.getDeclaredField(sortFieldName);
        } catch (Exception e) {
            // 如果不存在就设置为id
            sortFieldName = "id";
        }

        Sort sort = null;
        if (asc == 0) {
            sort = new Sort(Sort.Direction.DESC, sortFieldName);
        } else {
            sort = new Sort(Sort.Direction.ASC, sortFieldName);
        }

        Pageable pageable = new PageRequest(page, size, sort);
        return attendanceGroupRepository.findByNameLike("%" + name + "%", pageable);
    }

}
