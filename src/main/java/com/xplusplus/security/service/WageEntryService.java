package com.xplusplus.security.service;

import cn.afterturn.easypoi.excel.ExcelExportUtil;
import cn.afterturn.easypoi.excel.entity.ExportParams;
import cn.afterturn.easypoi.excel.entity.enmus.ExcelType;
import com.xplusplus.security.domain.*;
import com.xplusplus.security.exception.EnumExceptions;
import com.xplusplus.security.exception.SecurityExceptions;
import com.xplusplus.security.repository.ArchiveRepository;
import com.xplusplus.security.repository.UserRepository;
import com.xplusplus.security.repository.WageEntryRepository;
import com.xplusplus.security.repository.WorkRecordRepository;
import com.xplusplus.security.vo.WorkRecordMonthVO;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.hibernate.jdbc.WorkExecutor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.*;

/**
 * @Author: zhouweixin
 * @Description:
 * @Date: Created in 10:59 2018/8/12
 * @Modified By:
 */
@Service
public class WageEntryService {

    @Autowired
    private WageEntryRepository wageEntryRepository;

    @Autowired
    private WorkRecordRepository workRecordRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ArchiveRepository archiveRepository;

    /**
     * 重新生成工资单
     *
     * @param date
     */
    @Transactional
    public void reGenerateWageEntry(Date date){
        wageEntryRepository.deleteByDate(date);

        generateWageEntryProcess(date);
    }

    /**
     * 生成工资单
     *
     * @param date
     */
    @Transactional
    public void generateWageEntry(Date date) {
        if(wageEntryRepository.findFirstByDate(date) != null){
            throw new SecurityExceptions(EnumExceptions.WAGE_GENERATED);
        }

        generateWageEntryProcess(date);
    }

    /**
     * 生成工资单过程
     *
     * @param date
     */
    @Transactional
    public void generateWageEntryProcess(Date date) {
        // 0.创建工资单
        Map<String, WageEntry> wageEntryMap = new HashMap<>();

        // 1.查询考勤记录
        Calendar calendar1 = Calendar.getInstance();
        Calendar calendar2 = Calendar.getInstance();
        calendar1.setTime(date);
        calendar2.setTime(date);
        calendar2.add(Calendar.MONTH, 1);
        List<WorkRecord> workRecords = workRecordRepository.findByStartTimeBetweenAndStatus(
                calendar1.getTime(), calendar2.getTime(), 1);

        // 2.按月统计汇总
        List<WorkRecordMonthVO> workRecordMonthVOS = WorkRecordMonthVO.parseWorkRecords(workRecords, date);
        for(WorkRecordMonthVO vo : workRecordMonthVOS){
            WageEntry wageEntry = wageEntryMap.getOrDefault(vo.getUserId(), new WageEntry());
            // 工号
            wageEntry.setUserId(vo.getUserId());
            // 用户名
            wageEntry.setUserName(vo.getUserName());
            // 月工作天数
            wageEntry.setWorkDays(vo.getDays());
            // 月总天数
            wageEntry.setSumDays(vo.getSumDays());
            // 计算全勤
            if(vo.getDays() >= vo.getSumDays() - 4){
                wageEntry.setFullAttenBonus(50.00);
            }
            // 月工作小时数
            wageEntry.setWorkHours(vo.getHours());
            wageEntry.setProjectWage(vo.getProjectWage());
            wageEntryMap.put(vo.getUserId(), wageEntry);
        }

        // 3.查询所有员工
        Set<String> userIds = new HashSet<String>();
        for(WorkRecordMonthVO monthVO : workRecordMonthVOS){
            userIds.add(monthVO.getUserId());
        }
        List<User> users = userRepository.findByIdIn(userIds);

        // 清除该月所有工资记录
        wageEntryRepository.deleteByUserIdInAndDateBetweenAndStatus(userIds, calendar1.getTime(), calendar2.getTime(), 0);

        for(User user : users){
            WageEntry wageEntry = wageEntryMap.getOrDefault(user.getId(), new WageEntry());
            // 银行卡号
            wageEntry.setCardNumber(user.getBankCardNum());
            // 基本工资
            wageEntry.setBaseWage(user.getBaseWage());
            // 社保补助
            wageEntry.setSocialSecuritySubsidyWage(user.getSocialSecuritySubsidyWage());
            // 基金
            wageEntry.setFoundation(user.getFoundation());
            // 原岗点
            if(user.getDepartment()!=null && user.getDepartment().getName() != null){
                wageEntry.setOriginalSpot(user.getDepartment().getName());
            }
            wageEntryMap.put(user.getId(), wageEntry);
        }

        // 4.查询所有档案
        List<Archive> archives = archiveRepository.findByUserIn(users);
        for(Archive archive : archives){
            if(archive.getUser() == null || archive.getUser().getId() == null){
                continue;
            }

            WageEntry wageEntry = wageEntryMap.getOrDefault(archive.getUser().getId(), new WageEntry());
            // 证件号码
            wageEntry.setIdNumber(archive.getIdentityNumber());
            wageEntryMap.put(archive.getUser().getId(), wageEntry);
        }

        // 5.计算工资单
        for(WageEntry wageEntry : wageEntryMap.values()){
            // 计算应发工资和实发工资
            wageEntry.computePay();
            wageEntry.setDate(date);
        }

        wageEntryRepository.save(wageEntryMap.values());
    }

    /**
     * 通过日期和名称模糊查询-分页
     *
     * @param date
     * @param name
     * @param page
     * @param size
     * @param sortFieldName
     * @param asc
     * @return
     */
    public Page<WageEntry> getByDateAndNameLikeByPage(Date date, String name, Integer page, Integer size, String sortFieldName, Integer asc) {
        if(date.toString().equals("2000-01")){
            throw new SecurityExceptions(EnumExceptions.WAGE_GENERATE_FAILED_DATE_NULL);
        }

        Calendar calendar1 = Calendar.getInstance();
        Calendar calendar2 = Calendar.getInstance();
        calendar1.setTime(date);
        calendar2.setTime(date);
        calendar2.add(Calendar.MONTH, 1);

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

        List<User> users = userRepository.findByNameLike("%" + name + "%");
        Set<String> userIds = new HashSet<String>();
        for(User user : users){
            userIds.add(user.getId());
        }

        return wageEntryRepository.findByDateBetweenAndUserIdIn(calendar1.getTime(), calendar2.getTime(), userIds, pageable);
    }

    /**
     * 批量更新工资单
     *
     * @param wageEntries
     */
    public void update(Set<WageEntry> wageEntries) {
        for(WageEntry wageEntry : wageEntries){
            if(wageEntry.getId() != null){
                WageEntry one = wageEntryRepository.findOne(wageEntry.getId());
                wageEntry.setUserId(one.getUserId());
                wageEntry.setUserName(one.getUserName());
                wageEntry.setOriginalSpot(one.getOriginalSpot());
                wageEntry.setDate(one.getDate());
                wageEntry.setIdNumber(one.getIdNumber());
                wageEntry.setCardNumber(one.getCardNumber());
                wageEntry.setDate(one.getDate());
            }
        }

        wageEntryRepository.save(wageEntries);
    }

    /**
     * 通过月份查询所有工资单
     *
     * @param date
     * @return
     */
    public List<WageEntry> getAllByMonth(Date date) {
        return wageEntryRepository.findByDate(date);
    }

    /**
     * 导出工资单
     *
     * @param date
     * @return
     */
    public Workbook exportByDate(Date date) {
        List<WageEntry> wageEntries = wageEntryRepository.findByDate(date);

        Calendar calendar = Calendar.getInstance();
        calendar.setTime(date);

        String fileName = String.format("%d年%d月工资单.xlsx", calendar.get(Calendar.YEAR), calendar.get(Calendar.MONTH) + 1);
        return ExcelExportUtil.exportExcel(new ExportParams(fileName, fileName, ExcelType.XSSF), WageEntry.class, wageEntries);
    }
}
