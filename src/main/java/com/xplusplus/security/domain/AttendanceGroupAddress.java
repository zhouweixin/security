package com.xplusplus.security.domain;

import javax.persistence.*;

/**
 * @Author: zhouweixin
 * @Description: 考勤组-地址对应关系
 * @Date: Created in 16:09 2018/6/28
 * @Modified By:
 */
@Entity
public class AttendanceGroupAddress {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(targetEntity = AttendanceGroup.class)
    @JoinColumn(name = "attendance_group_id", referencedColumnName = "id")
    private AttendanceGroup attendanceGroup;

    @ManyToOne(targetEntity = AttendanceAddress.class)
    @JoinColumn(name = "attendance_address_id", referencedColumnName = "id")
    private AttendanceAddress attendanceAddress;

    public AttendanceGroupAddress() {
    }

    public AttendanceGroupAddress(AttendanceGroup attendanceGroup, AttendanceAddress attendanceAddress) {
        this.attendanceGroup = attendanceGroup;
        this.attendanceAddress = attendanceAddress;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public AttendanceGroup getAttendanceGroup() {
        return attendanceGroup;
    }

    public void setAttendanceGroup(AttendanceGroup attendanceGroup) {
        this.attendanceGroup = attendanceGroup;
    }

    public AttendanceAddress getAttendanceAddress() {
        return attendanceAddress;
    }

    public void setAttendanceAddress(AttendanceAddress attendanceAddress) {
        this.attendanceAddress = attendanceAddress;
    }
}
