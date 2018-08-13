package com.xplusplus.security.service;

import com.xplusplus.security.domain.Project;
import com.xplusplus.security.domain.User;
import com.xplusplus.security.domain.WorkRecord;
import com.xplusplus.security.exception.EnumExceptions;
import com.xplusplus.security.exception.SecurityExceptions;
import com.xplusplus.security.repository.ProjectRepository;
import com.xplusplus.security.repository.UserRepository;
import com.xplusplus.security.repository.WorkRecordRepository;
import com.xplusplus.security.vo.WorkRecordMonthVO;
import com.xplusplus.security.vo.WorkRecordVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.text.SimpleDateFormat;
import java.util.*;

/**
 * @Author: zhouweixin
 * @Description:
 * @Date: Created in 16:22 2018/7/28
 * @Modified By:
 */
@Service
public class WorkRecordService {
    @Autowired
    private WorkRecordRepository workRecordRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ProjectRepository projectRepository;

    /**
     * 上班打卡
     *
     * @param userId 员工id或ic卡号
     * @param leaderId 负责人id
     * @param projectId 项目id
     * @param startLongitude 上班打卡的径度
     * @param startLatitude 上班打卡的纬度
     * @param startTime 理论上班时间
     * @return
     */
    public WorkRecordVO onDuty(String userId, String leaderId, Long projectId, Double startLongitude, Double startLatitude, Date startTime) {
        User user = null;
        if((user = userRepository.findOne(userId)) == null && (user = userRepository.findFirstByIc(userId)) == null){
            throw new SecurityExceptions(EnumExceptions.CARD_FAILED_USER_NOT_EXIST);
        }

        // 判断是否已打卡
        WorkRecord workRecord = workRecordRepository.findFirstByUserAndStatus(user, 0);
        if(workRecord != null){
            throw new SecurityExceptions(EnumExceptions.CARD_FAILED_ON_DUTY);
        }

        // 负责人
        User leader = null;
        if((leader = userRepository.findOne(leaderId)) == null){
            throw new SecurityExceptions(EnumExceptions.CARD_FAILED_LEADER_NOT_EXISTS);
        }

        // 项目
        Project project = null;
        if((project = projectRepository.findOne(projectId)) == null){
            throw new SecurityExceptions(EnumExceptions.CARD_FAILED_PROJECT_NOT_EXISTS);
        }

        // 创建打卡记录
        workRecord = new WorkRecord(user, leader, project);
        workRecord.setStartTime(startTime);
        workRecord.setRealStartTime(new Date());
        workRecord.setStartLongitude(startLongitude);
        workRecord.setStartLatitude(startLatitude);
        workRecord.setStatus(0);
        workRecord = workRecordRepository.save(workRecord);
        return new WorkRecordVO(workRecord);
    }

    /**
     * 下班打卡
     *
     * @param userId
     * @param leaderId
     * @param projectId
     * @param endLongitude
     * @param endLatitude
     * @param endTime
     * @return
     */
    public WorkRecordVO offDuty(String userId, String leaderId, Long projectId, Double endLongitude, Double endLatitude, Date endTime) {
        // 员工
        User user = null;
        if((user = userRepository.findOne(userId)) == null && (user = userRepository.findFirstByIc(userId)) == null){
            throw new SecurityExceptions(EnumExceptions.CARD_FAILED_USER_NOT_EXIST);
        }

        // 判断是否有上班打卡记录
        WorkRecord workRecord = workRecordRepository.findFirstByUserAndStatus(user, 0);
        if(workRecord == null){
            throw new SecurityExceptions(EnumExceptions.CARD_FAILED_ON_DUTY_NOT_EXISTS);
        }

        // 负责人
        User leader = null;
        if((leader = userRepository.findOne(leaderId)) == null){
            throw new SecurityExceptions(EnumExceptions.CARD_FAILED_LEADER_NOT_EXISTS);
        }

        // 项目
        Project project = null;
        if((project = projectRepository.findOne(projectId)) == null){
            throw new SecurityExceptions(EnumExceptions.CARD_FAILED_PROJECT_NOT_EXISTS);
        }

        workRecord.setEndTime(endTime);
        workRecord.setRealEndTime(new Date());
        workRecord.setEndLongitude(endLongitude);
        workRecord.setEndLatitude(endLatitude);
        workRecord.setStatus(1);
        workRecord = workRecordRepository.save(workRecord);

        return new WorkRecordVO(workRecord);
    }

    /**
     * 通过负责人, 项目和状态查询
     *
     * @param leaderId
     * @param projectId
     * @param status
     * @return
     */
    public List<WorkRecordVO> getByLeaderAndProjectAndStatusAndDate(String leaderId, Long projectId, int status, Date date) {
        List<WorkRecord> workRecords = new ArrayList<>();

        // 验证负责人和项目
        User leader = userRepository.findOne(leaderId);
        Project project = projectRepository.findOne(projectId);
        if( leader== null || project == null){
            return new WorkRecordVO().parseWorkRecords(workRecords);
        }

        Calendar c1 = Calendar.getInstance();
        Calendar c2 = Calendar.getInstance();

        c1.setTime(date);
        c2.setTime(date);

        c2.add(Calendar.DAY_OF_MONTH, 1);

        if(status < 0 || status > 2){
            workRecords = workRecordRepository.findByLeaderAndProjectAndStartTimeBetween(leader, project, c1.getTime(), c2.getTime());
        } else {
            workRecords = workRecordRepository.findByLeaderAndProjectAndStatusAndStartTimeBetween(leader, project, status, c1.getTime(), c2.getTime());
        }
        return new WorkRecordVO().parseWorkRecords(workRecords);
    }

    /**
     * 删除
     *
     * @param id
     */
    public void deleteById(Long id) {

        // 验证是否存在
        if (workRecordRepository.findOne(id) == null) {
            throw new SecurityExceptions(EnumExceptions.DELETE_FAILED_NOT_EXIST);
        }
        workRecordRepository.delete(id);
    }

    /**
     * 批量删除
     *
     * @param ids
     */
    public void deleteByIdBatch(Long[] ids){
        workRecordRepository.deleteByIdIn(Arrays.asList(ids));
    }

    /**
     * 批量新增
     *
     * @param userIds
     * @param leaderId
     * @param projectId
     * @param startLongitude
     * @param startLatitude
     * @param startTime
     * @param endLongitude
     * @param endLatitude
     * @param endTime
     * @param note
     * @return
     */
    public List<WorkRecordVO> save(String[] userIds, String leaderId, Long projectId, Double startLongitude, Double startLatitude, Date startTime, Double endLongitude, Double endLatitude, Date endTime, String note, Integer status) {
        List<User> users = userRepository.findAll(Arrays.asList(userIds));
        if(users == null || users.size() == 0){
            throw new SecurityExceptions(EnumExceptions.CARD_FAILED_NO_USERS);
        }

        User leader = userRepository.findOne(leaderId);
        if(leader == null){
            throw new SecurityExceptions(EnumExceptions.CARD_FAILED_LEADER_NOT_EXISTS);
        }

        Project project = projectRepository.findOne(projectId);
        if(project == null){
            throw new SecurityExceptions(EnumExceptions.CARD_FAILED_PROJECT_NOT_EXISTS);
        }

        List<WorkRecord> workRecords = new ArrayList<>();
        for(User user : users){
            workRecords.add(new WorkRecord(user, startTime, endTime, new Date(), new Date(), leader, project, startLongitude, startLatitude, endLongitude, endLatitude, status, note));
        }
        List<WorkRecord> save = workRecordRepository.save(workRecords);
        return new WorkRecordVO().parseWorkRecords(save);
    }

    /**
     * 批量更新
     *
     * @param ids
     * @param leaderId
     * @param projectId
     * @param startLongitude
     * @param startLatitude
     * @param startTime
     * @param endLongitude
     * @param endLatitude
     * @param endTime
     * @param note
     * @return
     */
    public List<WorkRecordVO> update(Long[] ids, String leaderId, Long projectId, Double startLongitude, Double startLatitude, Date startTime, Double endLongitude, Double endLatitude, Date endTime, String note, Integer status) {
        // 验证是否存在
        List<WorkRecord> workRecords = workRecordRepository.findAll(Arrays.asList(ids));
        if (workRecords == null || workRecords.size() == 0) {
            throw new SecurityExceptions(EnumExceptions.UPDATE_FAILED_NOT_EXIST);
        }

        User leader = userRepository.findOne(leaderId);
        if(leader == null){
            throw new SecurityExceptions(EnumExceptions.CARD_FAILED_LEADER_NOT_EXISTS);
        }

        Project project = projectRepository.findOne(projectId);
        if(project == null){
            throw new SecurityExceptions(EnumExceptions.CARD_FAILED_PROJECT_NOT_EXISTS);
        }

        for(WorkRecord workRecord : workRecords){
            workRecord.setStartTime(startTime);
            workRecord.setEndTime(endTime);
            workRecord.setRealStartTime(new Date());
            workRecord.setRealEndTime(new Date());
            workRecord.setLeader(leader);
            workRecord.setProject(project);
            workRecord.setStartLongitude(startLongitude);
            workRecord.setStartLatitude(startLatitude);
            workRecord.setEndLongitude(endLongitude);
            workRecord.setEndLatitude(endLatitude);
            workRecord.setStatus(status);
            workRecord.setNote(note);
        }
        List<WorkRecord> save = workRecordRepository.save(workRecords);
        return new WorkRecordVO().parseWorkRecords(save);
    }

    /**
     * 通过项目, 日期和姓名模糊查询-分页
     *
     * @param projectId
     * @param date
     * @param name
     * @param page
     * @param size
     * @param sortFieldName
     * @param asc
     * @return
     */
    public Page<WorkRecord> getByProjectAndDateAndNameLike(Long projectId, Date date, String name, Integer page, Integer size, String sortFieldName, Integer asc) {
        // 判断排序字段名是否存在
        try {
            Project.class.getDeclaredField(sortFieldName);
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

        // 查询用户
        List<User> users = userRepository.findByNameLike("%" + name + "%");

        if(projectId != -1 && date.toString().equals("2000-01-01")){
            Project project = null;
            if((project = projectRepository.findOne(projectId)) == null){
                throw new SecurityExceptions(EnumExceptions.QUERY_FAILED_PROJECT_NOT_EXISTS);
            }

            return workRecordRepository.findByProjectAndUserInAndStatus(project, users, 1, pageable);
        }

        if(projectId != -1 && !date.toString().equals("2000-01-01")){
            Project project = null;
            if((project = projectRepository.findOne(projectId)) == null){
                throw new SecurityExceptions(EnumExceptions.QUERY_FAILED_PROJECT_NOT_EXISTS);
            }

            Calendar calendar1 = Calendar.getInstance();
            Calendar calendar2 = Calendar.getInstance();
            calendar1.setTime(date);
            calendar2.setTime(date);
            calendar2.add(Calendar.DAY_OF_MONTH, 1);

            return workRecordRepository.findByProjectAndStartTimeBetweenAndUserInAndStatus(project, calendar1.getTime(), calendar2.getTime(), users, 1, pageable);
        }

        return workRecordRepository.findByUserInAndStatus(users, 1, pageable);
    }

    /**
     * 月度统计-分页
     *
     * @param projectId
     * @param date
     * @param name
     * @return
     */
    public List<WorkRecordMonthVO> getByMonth(Long projectId, Date date, String name) {
        List<WorkRecord> workRecords = null;

        // 查询用户
        List<User> users = userRepository.findByNameLike("%" + name + "%");

        if(date.toString().equals("2000-01")){
            throw new SecurityExceptions(EnumExceptions.QUERY_FAILED_DATE);
        }

        if(projectId != -1){
            Project project = null;
            if((project = projectRepository.findOne(projectId)) == null){
                throw new SecurityExceptions(EnumExceptions.QUERY_FAILED_PROJECT_NOT_EXISTS);
            }

            Calendar calendar1 = Calendar.getInstance();
            Calendar calendar2 = Calendar.getInstance();
            calendar1.setTime(date);
            calendar2.setTime(date);
            calendar2.add(Calendar.MONTH, 1);

            workRecords = workRecordRepository.findByProjectAndStartTimeBetweenAndUserInAndStatus(project, calendar1.getTime(), calendar2.getTime(), users, 1);
        } else {
            workRecords = workRecordRepository.findByUserInAndStatus(users, 1);
        }

        return WorkRecordMonthVO.parseWorkRecords(workRecords, date);
    }
}
