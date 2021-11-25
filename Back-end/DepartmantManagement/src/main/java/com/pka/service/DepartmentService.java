package com.pka.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;

import com.pka.entity.Account;
import com.pka.entity.Department;
import com.pka.form.DepartmentCreatingForm;
import com.pka.form.DepartmentFilterForm;
import com.pka.form.DepartmentUpdatingForm;
import com.pka.repository.IAccountRepository;
import com.pka.repository.IDepartmentRepository;
import com.pka.specification.DepartmentSpecification;

@Service
@Transactional
public class DepartmentService implements IDepartmentService {

	@Autowired
	private IDepartmentRepository repository;
	
	@Autowired
	private IAccountRepository accountRepository;

	@SuppressWarnings("deprecation")
	public Page<Department> getAllDepartments(Pageable pageable, String search, DepartmentFilterForm filter) {
		Specification<Department> where = null;
		
		if (!StringUtils.isEmpty(search)) {
			DepartmentSpecification nameSpecification = new DepartmentSpecification("name", "LIKE", search);
			DepartmentSpecification authorSpecification = new DepartmentSpecification("author.fullName", "LIKE", search);
			where = Specification.where(nameSpecification).or(authorSpecification);
		}
		
		if(filter != null && filter.getMinDate() != null) {
			DepartmentSpecification minDateSpecification = new DepartmentSpecification("createDate", ">=", filter.getMinDate());
			
			if(where == null) {
				where = Specification.where(minDateSpecification);
			} else {
				where = where.and(minDateSpecification);
			}
		}
		
		if(filter != null && filter.getMaxDate() != null) {
			DepartmentSpecification maxDateSpecification = new DepartmentSpecification("createDate", "<=", filter.getMaxDate());
			
			if(where == null) {
				where = Specification.where(maxDateSpecification);
			} else {
				where = where.and(maxDateSpecification);
			}
		}
		
		return repository.findAll(where, pageable);
	}

	public Department getDepartmentByID(short id) {
		return repository.findById(id).get();
	}

	public Department getDepartmentByName(String name) {
		return repository.findByName(name);
	}

	public void createDepartment(DepartmentCreatingForm form) {
		Account author = accountRepository.findById(form.getAuthorId()).get();
		
		Department department = new Department(form.getName());
		department.setAuthor(author);
		
		repository.save(department);
	}

	public void updateDepartment(short id, DepartmentUpdatingForm form) {
		Department department = getDepartmentByID(id);
		department.setName(form.getName());
		
		repository.save(department);
	}

	public void deleteDepartment(short id) {
		repository.deleteById(id);
	}

	public boolean isDepartmentExistsByID(short id) {
		return repository.existsById(id);
	}

	public boolean isDepartmentExistsByName(String name) {
		return repository.existsByName(name);
	}
	
	public void deleteDepartments(List<Short> ids) {
		repository.deleteByIds(ids);
	}
}
