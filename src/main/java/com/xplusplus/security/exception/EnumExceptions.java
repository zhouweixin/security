package com.xplusplus.security.exception;

/**
 * 所有异常类型
 * 
 * @author zhouweixin
 *
 */
public enum EnumExceptions {
	UNKOWN_ERROR(-1, "未知错误"),
	SUCCESS(0, "操作成功"),
	ADD_FAILED_DUPLICATE(1, "新增失败, 主键已存在"),
	UPDATE_FAILED_NOT_EXIST(2, "更新失败, 不存在"),
	DELETE_FAILED_NOT_EXIST(3, "删除失败, 不存在"),
	REQUEST_METHOD(4, "请求方法不匹配"),
	ARGU_MISMATCH_EXCEPTION(5, "参数类型不匹配错误, 请检查"),
	ADD_FAILED_DEPARTMENT_NOT_EXIST(6, "新增失败, 部门不存在"),
    ASSIGN_FAILED_ATTENDANCE_GROUP_NOT_EXIST(7, "分配失败, 考勤组不存在"),
	ADD_FAILED_SHORT_NAME_NOT_LAWER(8, "新增失败, 部门简称只能是唯一的2位字母"),
	ADD_FAILED_PHONE_NOT_LAWER(9, "新增失败, 手机号码只能是11位数字"),
	UPDATE_FAILED_JOB_NATURE_NOT_EXIST(10, "更新失败, 工作性质不存在"),
	UPDATE_FAILED_DEPARTMENT_NOT_EXIST(11, "更新失败, 部门不存在"),
	UPDATE_FAILED_PHONE_NOT_LAWER(12, "新增失败, 手机号码只能是11位数字"),
	ADD_FAILED_USER_NOT_EXIST(13, "新增失败, 用户不存在"),
	UPDATE_FAILED_USER_NOT_EXIST(14, "更新失败, 用户不存在"),
	ADD_FAILED_USER_ARCHIVE_EXIST(15, "新增失败, 用户的档案已存在"),
	ADD_FAILED_PROJECT_NOT_EXIST(16, "新增失败, 项目不存在"),
	ADD_FAILED_OPERATOR_NOT_EXIST(17, "新增失败, 经办人不存在"),
	UPDATE_FAILED_PASSWORD_NULL(18, "更新失败, 密码不可为空"),
	UPDATE_FAILED_PASSWORD_NOT_EQUALS(19, "更新失败, 旧密码不相同"),
    ASSIGN_FAILED_USER_NOT_EXIST(20, "分配失败, 员工不存在"),
	DELETE_FAILED_USED(21, "删除失败, 有外键引用"),
	ADD_FAILED_SCHEDULE_NOT_EXIST(22, "新增失败, 班次不存在"),
	ADD_FAILED_NULL_EXIST(23, "新增失败, 全不可为空"),
	ADD_FAILED_EXIST(24, "新增失败, 已存在"),
	ADD_FAILED_ATTENDANCEGROUP_NOT_EXIST(25, "新增失败,考勤组不存在"),
    ADD_FAILED_LATETYPE_NOT_EXIST(26, "新增失败, 迟到类型不存在"),
    ADD_FAILED_TIME_NOT_CORRECT(27,"新增失败，时间先后不正确"),
	UPDATE_FAILED_RESIGN_TYPE_NOT_EXIST(28,"更新失败, 离职类型不存在"),
	ASSIGN_FAILED_WAGE_NOT_EXIST(29, "分配失败, 薪资方案不存在"),
	ASSIGN_FAILED_PROJECT_NOT_EXIST(30, "分配失败, 项目不存在"),
	SET_IC_CARD_FAILED_EXIST(31, "设置IC卡失败, 已被用"),
    FAILED_NOT_USERIDS(32, "请传参数userIds"),
    UPLOAD_FAILED_FILE_EMPTY(33, "上传失败, 文件为空"),
    CARD_FAILED_ATTENDANCE_GROUP_NOT_EXIST(34, "打卡失败, 用户的考勤组不存在"),
    CARD_FAILED_WORKING(35, "打卡失败, 已打卡"),
    CARD_FAILED_SCHEDULE_NOT_EXIST(36, "打卡失败, 班次不存在"),
    CARD_FAILED_NOT_EXIST(37, "打卡失败, 没有待下班的记录"),
    CARD_FAILED_ADDRESS_NOT_FIT(38, "打卡失败, 打卡地点不存在"),
    CARD_FAILED_LEADER_NOT_LAWER(39, "批量打卡失败, 该用户不是合法的考勤组负责人"),
    ADD_FAILED_ADDRESS_NOT_EXIST(40, "新增失败， 地址不存在"),
    ADD_FAILED_SCHEDULE_TYPE_NOT_EXIST(41, "新增失败， 班次类型不存在"),
    ADD_FAILED_LATE_TYPE_NOT_EXIST(42, "新增失败， 迟到类型不存在"),
    ADD_FAILED_APPLY_USER_NOT_EXIST(43, "新增失败， 申请人不存在"),
    ADD_FAILED_AUDIT_PROCESS_NOT_EXIST(44, "新增失败， 审核流程不存在"),
    ADD_FAILED_PURCHASE_CONTENT_NULL(45, "新增失败， 采购内容不可为空"),
    UPDATE_FAILED_AUDITED(46, "更新失败， 已审核的申请禁止修改"),
    UPDATE_FAILED_AUDITING(47, "更新失败， 正在审核的申请禁止修改"),
    UPDATE_FAILED_AUDITOR1_NOT_EXIST(48, "添加失败， 审核人1不存在"),
    UPDATE_FAILED_AUDITOR2_NOT_EXIST(49, "添加失败， 审核人2不存在"),
    AUDIT_FAILED_PURCHASE_NOT_EXIST(50, "审核失败, 采购申请单不存在"),
    AUDIT_FAILED_AUDITED(51, "审核失败, 采购申请单已经审核"),
    AUDIT_FAILED_USER_NOT_EXIST(52, "审核失败, 审核人不存在"),
    AUDIT_FAILED_NOT_CUR_AUDITOR(53, "审核失败, 不是当前审核人"),
    ADD_FAILED_PURCHASE_NOT_EXISE(54, "添加失败, 采购单不存在"),
    GOWODN_FAILED_STATUS_NOT_LAWER(55, "入库失败, 采购单状态不合法"),
    ADD_FAILED_GOOUT_CONTENT_NULL(56, "添加失败, 出库内容不可为空"),
    ADD_FAILED_GOOUT_USER_NULL(57, "添加失败, 出库人不可为空"),
    ADD_FAILED_GOOUT_USER_NOT_EXIST(58, "添加失败, 出库人不存在"),
    ADD_FAILED_RETURN_USER_NOT_EXIST(59, "添加失败， 归还人不存在"),
    ADD_FAILED_RETURN_CONTENT_NULL(60, "添加失败, 归还内容不可为空"),
    RETURN_FAILED_NOT_MATERIAL(61, "归还失败, 未选择物品"),
    RETURN_FAILED_NOT_USER(62, "归还失败, 未选择员工"),
    RETURN_FAILED_OPERATOR_NOT_EXIST(63, "归还失败, 经办人不存在"),
    ADD_FAILED_STOCK_NOT_EXIST(64, "新增失败, 库存不存在"),
    ADD_FAILED_MATERIAL_NOT_EXIST(65, "新增失败, 物品不存在"),
    ADD_FAILED_LOSS_NUMBER_GREATER_STOCK(66, "新增失败, 报损量超过库存量"),
    DELETE_FAILED_AUDITED(67, "删除失败, 已审核"),
    GODOWN_FAILED_NOT_AUDIT(68, "入库失败, 采购单未审核"),
    GODOWN_FAILED_AUDIT_NOT_APPROVAL(69, "入库失败, 采购单审核未通过"),
    GODOWN_FAILED_GODOWNED(70, "入库失败, 已入库"),
    CARD_FAILED_USER_NOT_EXIST(71, "打卡失败, 用户不存在"),
    CARD_FAILED_LEADER_NOT_EXISTS(72, "打卡失败, 负责人不存在"),
    CARD_FAILED_PROJECT_NOT_EXISTS(73, "打卡失败, 项目不存在"),
    CARD_FAILED_ON_DUTY(74, "打卡失败, 正在上班中"),
    CARD_FAILED_ON_DUTY_NOT_EXISTS(75, "打卡失败, 上班记录不存在或已下班"),
    CARD_FAILED_NO_USERS(76, "打卡失败, 未选择打卡用户"),
    QUERY_FAILED_PROJECT_NOT_EXISTS(77, "查询失败, 项目不存在"),
    QUERY_FAILED_DATE(78, "查询失败, 日期不可为空"),
    WAGE_GENERATE_FAILED_DATE_NULL(79, "工资单生成失败, 日期不可为空"),
    LOGIN_FAILED_USER_NOT_EXISTS(80, "登录失败, 用户不存在"),
    LOGIN_FAILED_USER_PASSWORD_NOT_MATCHER(81, "登录失败, 用户名或密码错误"),
    WAGE_GENERATED(82, "本月工资单已生成, 请勿重复生成"),

	;

    /** 编码 */
	private Integer code;
	/** 信息 */
	private String message;

	/**
	 * 构造函数
	 * 
	 * @param code
	 * @param message
	 */
	private EnumExceptions(Integer code, String message) {
		this.code = code;
		this.message = message;
	}

	public Integer getCode() {
		return code;
	}

	public void setCode(Integer code) {
		this.code = code;
	}

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}
}
