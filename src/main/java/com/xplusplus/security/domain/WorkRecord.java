package com.xplusplus.security.domain;

import com.fasterxml.jackson.annotation.JsonFormat;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import org.springframework.format.annotation.DateTimeFormat;

import javax.persistence.*;
import java.util.Date;

/**
 * @Author: zhouweixin
 * @Description: 打卡记录
 * @Date: Created in 16:11 2018/7/28
 * @Modified By:
 */
@Entity
@ApiModel(description = "打卡记录")
public class WorkRecord {
    // 主键:自增长
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @ApiModelProperty("主键: 自增长")
    private Long id;

    // 用户
    @ManyToOne(targetEntity = User.class)
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    @ApiModelProperty("用户")
    private User user;

    @JsonFormat
    @Temporal(value = TemporalType.TIMESTAMP)
    @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm")
    @ApiModelProperty("开始时间")
    private Date startTime;

    @JsonFormat
    @Temporal(value = TemporalType.TIMESTAMP)
    @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm")
    @ApiModelProperty("结束时间")
    private Date endTime;

    @JsonFormat
    // 实际上班打卡时间
    @Temporal(value = TemporalType.TIMESTAMP)
    @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm")
    @ApiModelProperty("实际上班打卡时间")
    private Date realStartTime;

    // 实际下班打卡时间
    @JsonFormat
    @Temporal(value = TemporalType.TIMESTAMP)
    @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm")
    @ApiModelProperty("实际下班打卡时间")
    private Date realEndTime;

    // 负责人
    @ManyToOne(targetEntity = User.class)
    @JoinColumn(name = "leader_id", referencedColumnName = "id")
    @ApiModelProperty("负责人")
    private User leader;

    // 项目
    @ManyToOne(targetEntity = Project.class)
    @JoinColumn(name = "project_id", referencedColumnName = "id")
    @ApiModelProperty("项目")
    private Project project;

    // 开始经度
    @Column(precision = 6)
    @ApiModelProperty("开始经度, 6位小数")
    private Double startLongitude;

    // 开始纬度
    @Column(precision = 6)
    @ApiModelProperty("开始纬度, 6位小数")
    private Double startLatitude;

    // 结束经度
    @Column(precision = 6)
    @ApiModelProperty("结束经度, 6位小数")
    private Double endLongitude;

    // 结束纬度
    @Column(precision = 6)
    @ApiModelProperty("结束纬度, 6位小数")
    private Double endLatitude;

    // 状态：0上班；1下班；2缺卡
    @ApiModelProperty("状态：0上班；1下班；2缺卡")
    private Integer status = 0;

    // 备注
    @ApiModelProperty("备注")
    private String note;

    public WorkRecord() {
    }

    public WorkRecord(User user, User leader, Project project) {
        this.user = user;
        this.leader = leader;
        this.project = project;
    }

    public WorkRecord(User user, Date startTime, Date endTime, Date realStartTime, Date realEndTime, User leader, Project project, Double startLongitude, Double startLatitude, Double endLongitude, Double endLatitude, Integer status, String note) {
        this.user = user;
        this.startTime = startTime;
        this.endTime = endTime;
        this.realStartTime = realStartTime;
        this.realEndTime = realEndTime;
        this.leader = leader;
        this.project = project;
        this.startLongitude = startLongitude;
        this.startLatitude = startLatitude;
        this.endLongitude = endLongitude;
        this.endLatitude = endLatitude;
        this.status = status;
        this.note = note;
    }

    public WorkRecord(Long id, User user, Date startTime, Date endTime, Date realStartTime, Date realEndTime, User leader, Project project, Double startLongitude, Double startLatitude, Double endLongitude, Double endLatitude, Integer status, String note) {
        this.id = id;
        this.user = user;
        this.startTime = startTime;
        this.endTime = endTime;
        this.realStartTime = realStartTime;
        this.realEndTime = realEndTime;
        this.leader = leader;
        this.project = project;
        this.startLongitude = startLongitude;
        this.startLatitude = startLatitude;
        this.endLongitude = endLongitude;
        this.endLatitude = endLatitude;
        this.status = status;
        this.note = note;
    }

    public String parseStatus(){
        switch (status){
            case 0:return "上班";
            case 1:return "下班";
            default:return "缺卡";
        }
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Date getStartTime() {
        return startTime;
    }

    public void setStartTime(Date startTime) {
        this.startTime = startTime;
    }

    public Date getEndTime() {
        return endTime;
    }

    public void setEndTime(Date endTime) {
        this.endTime = endTime;
    }

    public Date getRealStartTime() {
        return realStartTime;
    }

    public void setRealStartTime(Date realStartTime) {
        this.realStartTime = realStartTime;
    }

    public Date getRealEndTime() {
        return realEndTime;
    }

    public void setRealEndTime(Date realEndTime) {
        this.realEndTime = realEndTime;
    }

    public User getLeader() {
        return leader;
    }

    public void setLeader(User leader) {
        this.leader = leader;
    }

    public Project getProject() {
        return project;
    }

    public void setProject(Project project) {
        this.project = project;
    }

    public Integer getStatus() {
        return status;
    }

    public void setStatus(Integer status) {
        this.status = status;
    }

    public String getNote() {
        return note;
    }

    public void setNote(String note) {
        this.note = note;
    }

    public Double getStartLongitude() {
        return startLongitude;
    }

    public void setStartLongitude(Double startLongitude) {
        this.startLongitude = startLongitude;
    }

    public Double getStartLatitude() {
        return startLatitude;
    }

    public void setStartLatitude(Double startLatitude) {
        this.startLatitude = startLatitude;
    }

    public Double getEndLongitude() {
        return endLongitude;
    }

    public void setEndLongitude(Double endLongitude) {
        this.endLongitude = endLongitude;
    }

    public Double getEndLatitude() {
        return endLatitude;
    }

    public void setEndLatitude(Double endLatitude) {
        this.endLatitude = endLatitude;
    }
}
