package com.xplusplus.security.controller;

import com.xplusplus.security.domain.Result;
import com.xplusplus.security.domain.RunProperty;
import com.xplusplus.security.domain.RunPropertyCommand;
import com.xplusplus.security.service.RunPropertyService;
import com.xplusplus.security.utils.ResultUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

/**
 * @Author: zhouweixin
 * @Description:
 * @Date: Created in 12:47 2018/7/13
 * @Modified By:
 */
@RestController
@RequestMapping("/runProperty")
public class RunPropertyController {
    @Autowired
    private RunPropertyService runPropertyService;

    /**
     * 新增：字符串格式
     *
     * @param data
     * @return
     */
    @RequestMapping(value = "/addDataString")
    public Result<RunProperty> addData(String data){
        return ResultUtil.success(runPropertyService.save(data));
    }

    /**
     * 新增：字符串数组格式
     *
     * @param datas
     * @return
     */
    @RequestMapping(value = "/addDataStringArray")
    public Result<RunProperty> addData(String[] datas){
        return ResultUtil.success(runPropertyService.save(datas));
    }

    /**
     * 新增：整形数组格式
     *
     * @param datas
     * @return
     */
    @RequestMapping(value = "/addDataIntArray")
    public Result<RunProperty> addData(int[] datas){
        return ResultUtil.success(runPropertyService.save(datas));
    }

    /**
     * 查询最新的一条数据
     *
     * @return
     */
    @RequestMapping(value = "/getLatestData")
    public Result<RunProperty> getLatestData(){
        return ResultUtil.success(runPropertyService.findFirstByOrderByDateDesc());
    }

    /**
     * 新增命令
     *
     * @param command
     * @return
     */
    @RequestMapping(value = "/addCommand")
    public Result<RunPropertyCommand> addCommand(RunPropertyCommand command){
        return ResultUtil.success(runPropertyService.addCommand(command));
    }

    /**
     * 查询最新的一条未读的命令
     *
     * @return
     */
    @RequestMapping(value = "/getLatestCommand")
    public Result<RunPropertyCommand> getLatestCommand(){
        return ResultUtil.success(runPropertyService.findFirstByStatusOrderByDateDesc());
    }

    /**
     * 查询所有命令，按时间降序排列
     *
     * @param command
     * @return
     */
    @RequestMapping(value = "/getAllCommand")
    public Result<List<RunPropertyCommand>> getAllCommand(String command){
        return ResultUtil.success(runPropertyService.findAllCommand());
    }
}
