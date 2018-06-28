package com.xplusplus.security.service;

import com.xplusplus.security.domain.*;
import com.xplusplus.security.exception.EnumExceptions;
import com.xplusplus.security.exception.SecurityExceptions;
import com.xplusplus.security.repository.*;
import com.xplusplus.security.utils.GlobalUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

/**
 * @Author: zhouweixin
 * @Description:
 * @Date: Created in 21:50 2018/6/1
 * @Modified By:
 */
@Service
public class WorkLoggingService {
    @Autowired
    private WorkLoggingRepository workLoggingRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private WorkLoggingStatusRepository workLoggingStatusRepository;

    @Autowired
    private AttendanceAddressRepository attendanceAddressRepository;

    @Autowired
    private AttendanceGroupLeaderRepository attendanceGroupLeaderRepository;

    @Autowired
    private AttendanceGroupRepository attendanceGroupRepository;


    /**
     * 查询所有
     *
     * @return
     */
    public List<WorkLogging> findAll() {
        return workLoggingRepository.findAll();
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
    public Page<WorkLogging> findAllByPage(Integer page, Integer size, String sortFieldName, Integer asc) {

        // 判断排序字段名是否存在
        try {
            WorkLogging.class.getDeclaredField(sortFieldName);
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
        return workLoggingRepository.findAll(pageable);
    }

    /**
     * 通过用户查询-分页
     *
     * @param page
     * @param size
     * @param sortFieldName
     * @param asc
     * @return
     */
    public Page<WorkLogging> findByUserByPage(User user, Integer page, Integer size, String sortFieldName, Integer asc) {

        // 判断排序字段名是否存在
        try {
            WorkLogging.class.getDeclaredField(sortFieldName);
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
        return workLoggingRepository.findByUser(user, pageable);
    }

    /**
     * 通过状态查询-分页
     *
     * @param page
     * @param size
     * @param sortFieldName
     * @param asc
     * @return
     */
    public Page<WorkLogging> findByStatusByPage(WorkLoggingStatus workLoggingStatus, Integer page, Integer size, String sortFieldName, Integer asc) {

        // 判断排序字段名是否存在
        try {
            WorkLogging.class.getDeclaredField(sortFieldName);
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
        return workLoggingRepository.findByStatus(workLoggingStatus, pageable);
    }

    /**
     * 修改状态
     *
     * @param workLoggingStatusId
     * @param note
     * @param modifyUserId
     * @param id
     */
    public void updateStatusAndNoteAndModifyUserAndModifyDateById(Integer workLoggingStatusId, String note, String modifyUserId, Long id) {
        // 判断工作记录是否存在
        if (workLoggingRepository.findOne(id) == null) {
            throw new SecurityExceptions(EnumExceptions.UPDATE_FAILED_NOT_EXIST);
        }

        // 判断修改用户是否存在
        User modifyUser = userRepository.findOne(modifyUserId);
        if (modifyUser == null) {
            throw new SecurityExceptions(EnumExceptions.UPDATE_FAILED_USER_NOT_EXIST);
        }

        // 验证状态是否存在
        WorkLoggingStatus workLoggingStatus = workLoggingStatusRepository.findOne(workLoggingStatusId);
        if (workLoggingStatus == null) {
            throw new SecurityExceptions(EnumExceptions.UPDATE_FAILED_USER_NOT_EXIST);
        }

        workLoggingRepository.updateStatusAndNoteAndModifyUserAndModifyDateById(workLoggingStatus, note, modifyUser, new Date(), id);
    }

    /**
     * 上班打卡
     *
     * @param userId
     * @param longitude
     * @param latitude
     */
    @Transactional
    public void goWork(Integer attendanceGroupId, String leaderId, String userId, double longitude, double latitude) {
        // 判断用户是否存在
        User user = userRepository.findOne(userId);
        if (user == null) {
            throw new SecurityExceptions(EnumExceptions.CARD_FAILED_USER_NOT_EXIST);
        }

        // 判断所在考勤组是否存在
        AttendanceGroup attendanceGroup = attendanceGroupRepository.findOne(attendanceGroupId);
        if (attendanceGroup == null) {
            throw new SecurityExceptions(EnumExceptions.CARD_FAILED_ATTENDANCE_GROUP_NOT_EXIST);
        }

        // 判断是否有未完成的打卡
        if (workLoggingRepository.findFirstByUserAndStatus(user, new WorkLoggingStatus(0)) != null) {
            throw new SecurityExceptions(EnumExceptions.CARD_FAILED_WORKING);
        }

        // 验证地点是否合法
        List<AttendanceAddress> attendanceAddresses = attendanceAddressRepository.findByAttendanceGroup(attendanceGroup);
        // 计算距离是否合法
        for (AttendanceAddress attendanceAddress : attendanceAddresses) {
            double distance = GlobalUtil.getDistance(attendanceAddress.getLongitude(), attendanceAddress.getLatitude(), longitude, latitude);
            if (distance < attendanceAddress.getDomainRadius()) {
                WorkLogging workLogging = new WorkLogging();
                workLogging.setDate(new Date());
                workLogging.setUser(user);
                workLogging.setStartTime(new Date());
                workLogging.setAttendanceAddress(attendanceAddress);
                workLogging.setStatus(new WorkLoggingStatus(0));
                workLogging.setCardUser(user);
                workLogging.setProject(attendanceGroup.getProject());
                workLoggingRepository.save(workLogging);
                return;
            }
        }

        throw new SecurityExceptions(EnumExceptions.CARD_FAILED_ADDRESS_NOT_FIT);
    }

    /**
     * 下班打卡
     *
     * @param userId
     * @param longitude
     * @param latitude
     */
    public void offWork(Integer attendanceGroupId, String userId, double longitude, double latitude) {
        // 判断用户是否存在
        User user = userRepository.findOne(userId);
        if (user == null) {
            EnumExceptions.CARD_FAILED_USER_NOT_EXIST.setMessage("打卡失败, 用户" + userId + "不存在");
            throw new SecurityExceptions(EnumExceptions.CARD_FAILED_USER_NOT_EXIST);
        }

        // 判断所在考勤组是否存在
        AttendanceGroup attendanceGroup = attendanceGroupRepository.findOne(attendanceGroupId);
        if (attendanceGroup == null) {
            throw new SecurityExceptions(EnumExceptions.CARD_FAILED_ATTENDANCE_GROUP_NOT_EXIST);
        }

        // 判断是否有未完成的打卡
        WorkLogging workLogging = workLoggingRepository.findFirstByUserAndStatus(user, new WorkLoggingStatus(0));
        if (workLogging == null) {
            throw new SecurityExceptions(EnumExceptions.CARD_FAILED_NOT_EXIST);
        }

        // 验证地点是否合法
        List<AttendanceAddress> attendanceAddresses = attendanceAddressRepository.findByAttendanceGroup(attendanceGroup);
        // 计算距离是否合法
        for (AttendanceAddress attendanceAddress : attendanceAddresses) {
            double distance = GlobalUtil.getDistance(attendanceAddress.getLongitude(), attendanceAddress.getLatitude(), longitude, latitude);
            if (distance < attendanceAddress.getDomainRadius()) {
                workLogging.setEndTime(new Date());
                workLogging.setStatus(new WorkLoggingStatus(1));
                workLoggingRepository.save(workLogging);
                return;
            }
        }

        throw new SecurityExceptions(EnumExceptions.CARD_FAILED_ADDRESS_NOT_FIT);
    }

    /**
     * 批量上班打卡
     *
     * @param leaderId
     * @param userIds
     * @param longitude
     * @param latitude
     */
    public void goWorkBatch(int attendanceGroupId, int attenceGroupId, String leaderId, String[] userIds, double longitude, double latitude) {
        // 判断负责人是否合法
        AttendanceGroupLeader attendanceGroupLeader = attendanceGroupLeaderRepository.findFirstByAttendanceGroupAndLeader(new AttendanceGroup(attenceGroupId), new User(leaderId));
        if (attendanceGroupLeader == null) {
            throw new SecurityExceptions(EnumExceptions.CARD_FAILED_LEADER_NOT_LAWER);
        }

        for (String userId : userIds) {
            goWork(attendanceGroupId, userId, userId, longitude, latitude);
        }
    }

    /**
     * 批量下班打卡
     *
     * @param leaderId
     * @param userIds
     * @param longitude
     * @param latitude
     */
    public void offWorkBatch(int attendanceGroupId, String leaderId, String[] userIds, double longitude, double latitude) {
        // 判断负责人是否合法
        AttendanceGroupLeader attendanceGroupLeader = attendanceGroupLeaderRepository.findFirstByAttendanceGroupAndLeader(
                new AttendanceGroup(attendanceGroupId), new User(leaderId));
        if (attendanceGroupLeader == null) {
            throw new SecurityExceptions(EnumExceptions.CARD_FAILED_LEADER_NOT_LAWER);
        }

        for (String userId : userIds) {
            goWork(attendanceGroupId, userId, userId, longitude, latitude);
        }
    }
}
