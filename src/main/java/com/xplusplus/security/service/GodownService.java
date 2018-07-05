package com.xplusplus.security.service;

import com.xplusplus.security.domain.Godown;
import com.xplusplus.security.exception.EnumExceptions;
import com.xplusplus.security.exception.SecurityExceptions;
import com.xplusplus.security.repository.GodownRepository;
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
public class GodownService {
	@Autowired
	private GodownRepository godownRepository;

	/**
	 * 新增
	 * 
	 * @param godown
	 * @return
	 */
	public Godown save(Godown godown) {

		// 验证是否存在
		if (godown == null || (godown.getId() != null && godownRepository.findOne(godown.getId()) != null)) {
			throw new SecurityExceptions(EnumExceptions.ADD_FAILED_DUPLICATE);
		}

		return godownRepository.save(godown);
	}

	/**
	 * 更新
	 * 
	 * @param godown
	 * @return
	 */
	public Godown update(Godown godown) {

		// 验证是否存在
		if (godown == null || godown.getId() == null || godownRepository.findOne(godown.getId()) == null) {
			throw new SecurityExceptions(EnumExceptions.UPDATE_FAILED_NOT_EXIST);
		}

		return godownRepository.save(godown);
	}

	/**
	 * 删除
	 * 
	 * @param id
	 */
	public void delete(Long id) {

		// 验证是否存在
		if (godownRepository.findOne(id) == null) {
			throw new SecurityExceptions(EnumExceptions.DELETE_FAILED_NOT_EXIST);
		}
		godownRepository.delete(id);
	}

	/**
	 * 批量删除
	 * 
	 * @param godowns
	 */
	public void deleteInBatch(Collection<Godown> godowns) {
		godownRepository.deleteInBatch(godowns);
	}

	/**
	 * 通过编码查询
	 * 
	 * @param id
	 * @return
	 */
	public Godown findOne(Long id) {
		return godownRepository.findOne(id);
	}

	/**
	 * 查询所有
	 * 
	 * @return
	 */
	public List<Godown> findAll() {
		return godownRepository.findAll();
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
	public Page<Godown> findAllByPage(Integer page, Integer size, String sortFieldName, Integer asc) {

		// 判断排序字段名是否存在
		try {
			Godown.class.getDeclaredField(sortFieldName);
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
		return godownRepository.findAll(pageable);
	}
}
