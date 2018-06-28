package com.xplusplus.security.domain;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

/**
 * @Author: zhouweixin
 * @Description: 班次表
 * @Date: Created in 下午2:00:24 2018年5月27日
 */
@Entity
public class Schedule {
	// 主键: 自增长
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;

	// 名称
	private String name;

	// 班次类型
    @ManyToMany(targetEntity = ScheduleType.class)
    @JoinTable(name = "schedule_schedule_type",
            joinColumns = {@JoinColumn(name = "schedule_id", referencedColumnName = "id")},
            inverseJoinColumns = {@JoinColumn(name = "schedule_type_id", referencedColumnName = "id")})
    private Set<ScheduleType> scheduleTypes = new HashSet<>();

    // 迟到类型
    @ManyToMany(targetEntity = LateType.class)
    @JoinTable(name = "schedule_late_type",
            joinColumns = {@JoinColumn(name = "schedule_id", referencedColumnName = "id")},
            inverseJoinColumns = {@JoinColumn(name = "late_type_id", referencedColumnName = "id")})
    private Set<LateType> lateTypes = new HashSet<>();

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

    public Set<ScheduleType> getScheduleTypes() {
        return scheduleTypes;
    }

    public void setScheduleTypes(Set<ScheduleType> scheduleTypes) {
        this.scheduleTypes = scheduleTypes;
    }

    public Set<LateType> getLateTypes() {
        return lateTypes;
    }

    public void setLateTypes(Set<LateType> lateTypes) {
        this.lateTypes = lateTypes;
    }

    @Override
	public String toString() {
		return "Schedule [id=" + id + ", name=" + name + "]";
	}

}
