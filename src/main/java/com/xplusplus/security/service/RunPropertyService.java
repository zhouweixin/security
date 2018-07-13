package com.xplusplus.security.service;

import com.xplusplus.security.domain.RunProperty;
import com.xplusplus.security.domain.RunPropertyCommand;
import com.xplusplus.security.repository.RunPropertyCommandRepository;
import com.xplusplus.security.repository.RunPropertyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

/**
 * @Author: zhouweixin
 * @Description:
 * @Date: Created in 8:37 2018/7/13
 * @Modified By:
 */
@Service
public class RunPropertyService {
    @Autowired
    private RunPropertyRepository runPropertyRepository;

    @Autowired
    private RunPropertyCommandRepository runPropertyCommandRepository;

    /**
     * 新增
     *
     * @param datas : 数组
     * @return
     */
    public RunProperty save(String[] datas){
        RunProperty runProperty = new RunProperty();
        String str = "";
        for(String data : datas){
            str += data + ";";
        }
        runProperty.setData(str);

        return runPropertyRepository.save(runProperty);
    }

    /**
     * 新增
     *
     * @param data：字符串
     * @return
     */
    public RunProperty save(String data){
        RunProperty runProperty = new RunProperty();
        runProperty.setData(data);

        return runPropertyRepository.save(runProperty);
    }

    /**
     * 新增
     *
     * @param datas：字符串
     * @return
     */
    public RunProperty save(int[] datas){
        RunProperty runProperty = new RunProperty();
        String str = "";
        for(int data : datas){
            str += data + ";";
        }
        runProperty.setData(str);

        return runPropertyRepository.save(runProperty);
    }

    /**
     * 查询最新的一条数据
     *
     * @return
     */
    public RunProperty findFirstByOrderByDateDesc(){
        return runPropertyRepository.findFirstByOrderByDateDesc();
    }

    /**
     * 新增命令
     *
     * @param command
     * @return
     */
    public RunPropertyCommand addCommand(RunPropertyCommand command) {
        return runPropertyCommandRepository.save(command);
    }

    /**
     * 查询最新的未执行的命令
     *
     * @return
     */
    public RunPropertyCommand findFirstByStatusOrderByDateDesc(){
        RunPropertyCommand runPropertyCommand = runPropertyCommandRepository.findFirstByOrderByDateDesc();
        if(runPropertyCommand != null && runPropertyCommand.getStatus() == 0){
            // 更新状态
            runPropertyCommand.setStatus(1);
            runPropertyCommandRepository.save(runPropertyCommand);

            runPropertyCommand.setStatus(0);
            return runPropertyCommand;
        }

        return null;
    }

    /**
     * 查询所有命令
     *
     * @return
     */
    public List<RunPropertyCommand> findAllCommand(){
        // 日期减序排列
        Sort sort = new Sort(Sort.Direction.DESC, "date");
        return runPropertyCommandRepository.findAll(sort);
    }
}
