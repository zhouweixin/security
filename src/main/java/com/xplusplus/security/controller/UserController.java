package com.xplusplus.security.controller;

import java.text.SimpleDateFormat;
import java.util.Collection;
import java.util.Date;
import java.util.List;

import javax.validation.Valid;

import com.xplusplus.security.domain.*;
import com.xplusplus.security.vo.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.xplusplus.security.service.ProjectUserService;
import com.xplusplus.security.service.UserService;
import com.xplusplus.security.utils.ResultUtil;

/**
 * @Author: zhouweixin
 * @Description:
 * @Date: Created in 20:37 2018/5/7
 * @Modified By:
 */
@RestController
@RequestMapping(value = "/user")
public class UserController {
	@Autowired
	private UserService userService;
	
	@Autowired
	private ProjectUserService projectUserService;

	/**
	 * 新增
	 * 
	 * @param user
	 * @return
	 */
	@RequestMapping(value = "/add")
	public Result<User> add(@Valid User user, BindingResult bindingResult) {

		if (bindingResult.hasErrors()) {
			return ResultUtil.error(bindingResult.getFieldError().getDefaultMessage().toString());
		}

		return ResultUtil.success(userService.save(user));
	}

	/**
	 * 更新
	 * 
	 * @param user
	 * @return
	 */
	@RequestMapping(value = "/update")
	public Result<User> update(@Valid User user, BindingResult bindingResult) {

		if (bindingResult.hasErrors()) {
			return ResultUtil.error(bindingResult.getFieldError().getDefaultMessage().toString());
		}

		return ResultUtil.success(userService.update(user));
	}

	/**
	 * 通过id删除
	 * 
	 * @param id
	 * @return
	 */
	@RequestMapping(value = "/deleteById")
	public Result<Object> deleteById(String id) {
		userService.delete(id);
		return ResultUtil.success();
	}

	/**
	 * 批量删除
	 * 
	 * @param users
	 * @return
	 */
	@RequestMapping(value = "/deleteByIdBatch")
	public Result<Object> deleteByIdBatch(@RequestBody Collection<User> users) {
		userService.deleteInBatch(users);
		return ResultUtil.success();
	}

	/**
	 * 通过id查询
	 * 
	 * @param id
	 * @return
	 */
	@RequestMapping(value = "/getById")
	public Result<User> getById(String id) {
		return ResultUtil.success(userService.findOne(id));
	}

	/**
	 * 查询所有
	 * 
	 * @return
	 */
	@RequestMapping(value = "/getAll")
	public Result<List<User>> getAll() {
		return ResultUtil.success(userService.findAll());
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
	@RequestMapping(value = "/getAllByPage")
	public Result<Page<User>> getAllByPage(@RequestParam(value = "page", defaultValue = "0") Integer page,
			@RequestParam(value = "size", defaultValue = "10") Integer size,
			@RequestParam(value = "sortFieldName", defaultValue = "id") String sortFieldName,
			@RequestParam(value = "asc", defaultValue = "1") Integer asc) {

		return ResultUtil.success(userService.findAllByPage(page, size, sortFieldName, asc));
	}
	
	/**
	 * 通过名称模糊查询
	 * 
	 * @param name
	 * @return
	 */
	@RequestMapping(value = "/getByNameLike")
	public Result<List<User>> getByNameLike(@RequestParam(value = "name", defaultValue = "") String name){
		return ResultUtil.success(userService.findByNameLike(name));
	}

	/**
	 * 通过名称模糊查询-分页
	 * 
	 * @param name
	 * @param page
	 * @param size
	 * @param sortFieldName
	 * @param asc
	 * @return
	 */
	@RequestMapping(value = "/getByNameLikeByPage")
	public Result<Page<User>> getByNameLikeByPage(@RequestParam(value = "name", defaultValue = "") String name,
			@RequestParam(value = "page", defaultValue = "0") Integer page,
			@RequestParam(value = "size", defaultValue = "10") Integer size,
			@RequestParam(value = "sortFieldName", defaultValue = "id") String sortFieldName,
			@RequestParam(value = "asc", defaultValue = "1") Integer asc) {

		return ResultUtil.success(userService.findByNameLikeByPage(name, page, size, sortFieldName, asc));
	}
	
	/**
	 * 通过部门查询
	 * 
	 * @param department
	 * @return
	 */
	@RequestMapping(value = "/getByDepartment")
	public Result<List<User>> getByDepartment(Department department){
		return ResultUtil.success(userService.findByDepartment(department));
	}
	
	/**
	 * 通过项目查询
	 * 
	 * @param project
	 * @return
	 */
	@RequestMapping(value = "/getByProject")
	public Result<List<ProjectUser>> getByProject(Project project){
		return ResultUtil.success(projectUserService.findByProject(project));
	}

	/**
	 * 通过部门和名称模糊查询-分页
	 * 
	 * @param name
	 * @param page
	 * @param size
	 * @param sortFieldName
	 * @param asc
	 * @return
	 */
	@RequestMapping(value = "/getByDepartmentAndNameLikeByPage")
	public Result<Page<User>> getByDepartmentAndNameLikeByPage(Department department,
			@RequestParam(value = "name", defaultValue = "") String name,
			@RequestParam(value = "page", defaultValue = "0") Integer page,
			@RequestParam(value = "size", defaultValue = "10") Integer size,
			@RequestParam(value = "sortFieldName", defaultValue = "id") String sortFieldName,
			@RequestParam(value = "asc", defaultValue = "1") Integer asc) {

		return ResultUtil.success(userService.findByDepartmentAndNameLikeByPage(department, name, page, size, sortFieldName, asc));
	}
	
	/**
	 * 通过工作性质查询
	 * 
	 * @param jobNature
	 * @return
	 */
	@RequestMapping(value = "/getByJobNature")
	public Result<List<User>> getByJobNature(JobNature jobNature){
		return ResultUtil.success(userService.findByJobNature(jobNature));
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
	@RequestMapping(value = "/getByJobNatureByPage")
	public Result<Page<User>> getByJobNatureByPage(JobNature jobNature,
			@RequestParam(value = "page", defaultValue = "0") Integer page,
			@RequestParam(value = "size", defaultValue = "10") Integer size,
			@RequestParam(value = "sortFieldName", defaultValue = "id") String sortFieldName,
			@RequestParam(value = "asc", defaultValue = "1") Integer asc) {

		return ResultUtil.success(userService.findByJobNatureByPage(jobNature, page, size, sortFieldName, asc));
	}
	
	/**
	 * 通过id更新工作性质
	 * 
	 * @param jobNatureId
	 * @param id
	 * @return
	 */
	@RequestMapping(value = "/updateJobNatureById")
	public Result<Object> updateJobNatureById(Integer jobNatureId, String id){
		userService.updateJobNatureById(jobNatureId, id);
		return ResultUtil.success();
	}

    /**
     * 离职
     *
     * @return
     */
    @RequestMapping(value = "/resign")
	public Result<Object> resign(@DateTimeFormat(pattern = "yyyy-MM-dd") Date resignDate,
                                 @RequestParam(value = "resignTypeId", defaultValue = "-1") Integer resignTypeId,
                                 @RequestParam(value = "id", defaultValue = "-1") String id){
        userService.updateResignDateAndResignType(resignDate, resignTypeId, id);
        return ResultUtil.success();
    }

    /**
     * 通过主键更新ic卡号
     *
     * @param id
     * @param ic
     */
    @RequestMapping(value = "/updateIcById")
    public Result<Object> updateIcById(String id, String ic){
        userService.updateIcById(id, ic);
        return ResultUtil.success();
    }

    /**
     * 统计男女人数
     *
     * @return
     */
    @RequestMapping(value = "/getUserNumber")
    public Result<UserNumberVO> getUserNumber(){
        return ResultUtil.success(userService.findUserNumber());
    }

    /**
     * 统计不同年龄段的人数
     *
     * @return
     */
    @RequestMapping(value = "/getUserNumberByPage")
    public Result<UserAgeNumberVO> getUserNumberByPage(){
        return ResultUtil.success(userService.getUserNumberByPage());
    }

    /**
     * 统计不同项目的人数
     *
     * @return
     */
    @RequestMapping(value = "/getUserNumberByProject")
    public Result<List<UserProjectNumberVO>> getUserNumberByProject(){
        return ResultUtil.success(userService.getUserNumberByProject());
    }

    /**
     * 统计不同学历的人数
     *
     * @return
     */
    @RequestMapping(value = "/getUserNumberByEducation")
    public Result<List<UserEducationNumberVO>> getUserNumberByEducation(){
        return ResultUtil.success(userService.getUserNumberByEducation());
    }

    /**
     * 统计某天不同项目参加考勤的人数
     *
     * @return
     */
    @RequestMapping(value = "/getUserNumberByProjectAttenAndDate")
    public Result<List<UserProjectAttendanceNumberVO>> getUserNumberByProjectAttenAndDate(
           @RequestParam(defaultValue = "1970-01-01") @DateTimeFormat(pattern = "yyyy-MM-dd") Date date){

        if(new SimpleDateFormat("yyyy-MM-dd").format(date).equals("1970-01-01")){
            return ResultUtil.success(userService.getUserNumberByProjectAttenAndDate(new Date()));
        }

        return ResultUtil.success(userService.getUserNumberByProjectAttenAndDate(date));
    }
}
