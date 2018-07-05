package com.xplusplus.security.service;

import com.xplusplus.security.domain.GooutMaterialUser;
import com.xplusplus.security.exception.EnumExceptions;
import com.xplusplus.security.exception.SecurityExceptions;
import com.xplusplus.security.repository.GooutMaterialUserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.stereotype.Service;

import java.util.Collection;
import java.util.List;

/**
 * @Author: zhouweixin
 * @Description:
 * @Date: Created in 下午6:35:17 2018年5月22日
 */
@Service
public class GooutMaterialUserService {
	@Autowired
	private GooutMaterialUserRepository gooutMaterialUserRepository;

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
