package com.pka.service;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;

import com.pka.entity.Department;
import com.pka.form.DepartmentCreatingForm;
import com.pka.form.DepartmentFilterForm;
import com.pka.form.DepartmentUpdatingForm;

public interface IDepartmentService {

	public Page<Department> getAllDepartments(Pageable pageable, String search, DepartmentFilterForm filter);

	public Department getDepartmentByID(short id);

	public Department getDepartmentByName(String name);

	public void createDepartment(DepartmentCreatingForm form);

	public void updateDepartment(short id, DepartmentUpdatingForm form);

	public void deleteDepartment(short id);

	public boolean isDepartmentExistsByID(short id);

	public boolean isDepartmentExistsByName(String name);
	
	public void deleteDepartments(List<Short> ids);
}
