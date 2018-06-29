package com.xplusplus.security.service;

import com.xplusplus.security.domain.*;
import com.xplusplus.security.domain.AttendanceAddress;
import com.xplusplus.security.exception.EnumExceptions;
import com.xplusplus.security.exception.SecurityExceptions;
import com.xplusplus.security.repository.*;
import com.xplusplus.security.repository.AttendanceAddressRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

/**
 * @author：XudongHu
 * @description: 考勤地址
 * @date:20:32 2018/6/1
 */
@Service
public class AttendanceAddressService {
    @Autowired
    private AttendanceAddressRepository attendanceAddressRepository;

    @Autowired
    private AttendanceGroupAddressRepository attendanceGroupAddressRepository;

    /**
     * 新增
     *
     * @param attendanceAddress
     * @return
     */
    public AttendanceAddress save(AttendanceAddress attendanceAddress) {

        // 验证是否存在
        if (attendanceAddress == null || (attendanceAddress.getId() != null && attendanceAddressRepository.findOne(attendanceAddress.getId()) != null)) {
            throw new SecurityExceptions(EnumExceptions.ADD_FAILED_DUPLICATE);
        }

        return attendanceAddressRepository.save(attendanceAddress);
    }

    /**
     * 更新
     *
     * @param attendanceAddress
     * @return
     */
    public AttendanceAddress update(AttendanceAddress attendanceAddress) {

        // 验证是否存在
        if (attendanceAddress == null || attendanceAddress.getId() == null || attendanceAddressRepository.findOne(attendanceAddress.getId()) == null) {
            throw new SecurityExceptions(EnumExceptions.UPDATE_FAILED_NOT_EXIST);
        }

        return attendanceAddressRepository.save(attendanceAddress);
    }

    /**
     * 删除
     *
     * @param id
     */
    public void delete(Long id) {

        // 验证是否存在
        if (attendanceAddressRepository.findOne(id) == null) {
            throw new SecurityExceptions(EnumExceptions.DELETE_FAILED_NOT_EXIST);
        }
        attendanceAddressRepository.delete(id);
    }

    /**
     * 批量删除
     *
     * @param attendanceAddresss
     */
    public void deleteInBatch(Collection<AttendanceAddress> attendanceAddresss) {
        attendanceAddressRepository.deleteInBatch(attendanceAddresss);
    }

    /**
     * 通过编码查询
     *
     * @param id
     * @return
     */
    public AttendanceAddress findOne(Long id) {
        return attendanceAddressRepository.findOne(id);
    }

    /**
     * 查询所有
     *
     * @return
     */
    public List<AttendanceAddress> findAll() {
        return attendanceAddressRepository.findAll();
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
    public Page<AttendanceAddress> findAllByPage(Integer page, Integer size, String sortFieldName, Integer asc) {

        // 判断排序字段名是否存在
        try {
            AttendanceAddress.class.getDeclaredField(sortFieldName);
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
        return attendanceAddressRepository.findAll(pageable);
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
    public Page<AttendanceAddress> findByNameLikeByPage(String name, Integer page, Integer size, String sortFieldName,
                                             Integer asc) {

        // 判断排序字段名是否存在
        try {
            AttendanceAddress.class.getDeclaredField(sortFieldName);
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
        return attendanceAddressRepository.findByNameLike("%" + name + "%", pageable);
    }

    /**
     * 通过考勤组查询所有考勤地址
     *
     * @param attendanceGroup
     * @return
     */
    public List<AttendanceAddress> findByAttendanceGroup(AttendanceGroup attendanceGroup) {
        List<AttendanceAddress> attendanceAddresses = new ArrayList<>();
        List<AttendanceGroupAddress> attendanceGroupAddresses = attendanceGroupAddressRepository.findByAttendanceGroup(attendanceGroup);
        for(AttendanceGroupAddress attendanceGroupAddress:attendanceGroupAddresses){
            attendanceAddresses.add(attendanceGroupAddress.getAttendanceAddress());
        }
        return attendanceAddresses;
    }

}
