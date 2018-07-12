package com.xplusplus.security.service;

import com.xplusplus.security.domain.GooutMaterialUser;
import com.xplusplus.security.domain.User;
import com.xplusplus.security.exception.EnumExceptions;
import com.xplusplus.security.exception.SecurityExceptions;
import com.xplusplus.security.repository.GooutMaterialUserRepository;
import com.xplusplus.security.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.*;

/**
 * @Author: zhouweixin
 * @Description:
 * @Date: Created in 下午6:35:17 2018年5月22日
 */
@Service
public class GooutMaterialUserService {
	@Autowired
	private GooutMaterialUserRepository gooutMaterialUserRepository;

	@Autowired
    private UserRepository userRepository;

	@Autowired
    private StockService stockService;

    /**
     * 归还物品
     *
     * @param gooutMaterialUserIds
     * @param userIds
     * @return
     */
    @Transactional
    public void returnMaterials(Long[] gooutMaterialUserIds, String[] userIds, String operatorId) {
        if(gooutMaterialUserIds == null){
            throw new SecurityExceptions(EnumExceptions.RETURN_FAILED_NOT_MATERIAL);
        }

        if(userIds == null){
            throw new SecurityExceptions(EnumExceptions.RETURN_FAILED_NOT_USER);
        }

        User operator = null;
        if((operator = userRepository.findOne(operatorId)) == null){
            throw new SecurityExceptions(EnumExceptions.RETURN_FAILED_OPERATOR_NOT_EXIST);
        }

        // 去重
        Set<Long> gooutMaterialUserIdSet = new HashSet<>(Arrays.asList(gooutMaterialUserIds));
        Set<String> userIdSet = new HashSet<>(Arrays.asList(userIds));

        // 查询所有用户
        List<User> users = userRepository.findAll(userIdSet);

        // 查询未归还的记录
        List<GooutMaterialUser> gooutMaterialUsers = gooutMaterialUserRepository.findByIdInAndUserInAndStatus(gooutMaterialUserIdSet, users,0);

        if(gooutMaterialUsers == null || gooutMaterialUsers.size() == 0){
            throw new SecurityExceptions(EnumExceptions.RETURN_FAILED_NOT_MATERIAL);
        }

        // 创建归还单
        for(GooutMaterialUser gooutMaterialUser : gooutMaterialUsers){
            gooutMaterialUser.setReturnTime(new Date());
            gooutMaterialUser.setReturnOperator(operator);
            gooutMaterialUser.setStatus(1);
        }

        // 更新库存
        stockService.update(gooutMaterialUsers, 1);

        gooutMaterialUserRepository.save(gooutMaterialUsers);
    }

	/**
	 * 通过编码查询
	 * 
	 * @param id
	 * @return
	 */
	public GooutMaterialUser findOne(Long id) {
		return gooutMaterialUserRepository.findOne(id);
	}

	/**
	 * 查询所有
	 * 
	 * @return
	 */
	public List<GooutMaterialUser> findAll() {
		return gooutMaterialUserRepository.findAll();
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
	public Page<GooutMaterialUser> findAllByPage(Integer page, Integer size, String sortFieldName, Integer asc) {

		// 判断排序字段名是否存在
		try {
			GooutMaterialUser.class.getDeclaredField(sortFieldName);
		} catch (Exception e) {
			// 如果不存在就设置为id
			sortFieldName = "id";
		}

		Sort sort = null;
		if (asc == 0) {
			sort = new Sort(Direction.DESC, sortFieldName);
		} else {
			sort = new Sort(Direction.ASC, sortFieldName);
		}

		Pageable pageable = new PageRequest(page, size, sort);
		return gooutMaterialUserRepository.findAll(pageable);
	}
}
