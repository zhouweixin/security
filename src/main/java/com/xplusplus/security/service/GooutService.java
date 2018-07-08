package com.xplusplus.security.service;

import com.xplusplus.security.domain.Goout;
import com.xplusplus.security.exception.EnumExceptions;
import com.xplusplus.security.exception.SecurityExceptions;
import com.xplusplus.security.repository.GooutRepository;
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
public class GooutService {
	@Autowired
	private GooutRepository gooutRepository;

	/**
	 * 新增
	 *
	 * @param goout
	 * @return
	 */
	public Goout save(Goout goout) {

		// 验证是否存在
		if (goout == null || (goout.getId() != null && gooutRepository.findOne(goout.getId()) != null)) {
			throw new SecurityExceptions(EnumExceptions.ADD_FAILED_DUPLICATE);
		}

		return gooutRepository.save(goout);
	}

	/**
	 * 更新
	 *
	 * @param goout
	 * @return
	 */
	public Goout update(Goout goout) {

		// 验证是否存在
		if (goout == null || goout.getId() == null || gooutRepository.findOne(goout.getId()) == null) {
			throw new SecurityExceptions(EnumExceptions.UPDATE_FAILED_NOT_EXIST);
		}

		return gooutRepository.save(goout);
	}

	/**
	 * 删除
	 *
	 * @param id
	 */
	public void delete(Long id) {

		// 验证是否存在
		if (gooutRepository.findOne(id) == null) {
			throw new SecurityExceptions(EnumExceptions.DELETE_FAILED_NOT_EXIST);
		}
		gooutRepository.delete(id);
	}

	/**
	 * 批量删除
	 *
	 * @param goouts
	 */
	public void deleteInBatch(Collection<Goout> goouts) {
		gooutRepository.deleteInBatch(goouts);
	}

	/**
	 * 通过编码查询
	 *
	 * @param id
	 * @return
	 */
	public Goout findOne(Long id) {
		return gooutRepository.findOne(id);
	}

	/**
	 * 查询所有
	 *
	 * @return
	 */
	public List<Goout> findAll() {
		return gooutRepository.findAll();
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
	public Page<Goout> findAllByPage(Integer page, Integer size, String sortFieldName, Integer asc) {

		// 判断排序字段名是否存在
		try {
			Goout.class.getDeclaredField(sortFieldName);
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
		return gooutRepository.findAll(pageable);
	}
}
