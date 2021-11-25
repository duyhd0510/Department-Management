package com.pka.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.function.Function;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.pka.dto.AccountDto;
import com.pka.dto.DepartmentDto;
import com.pka.dto.DetailDepartmentDto;
//import com.pka.dto.DepartmentDTO;
import com.pka.entity.Department;
import com.pka.form.DepartmentCreatingForm;
import com.pka.form.DepartmentFilterForm;
import com.pka.form.DepartmentUpdatingForm;
import com.pka.service.IDepartmentService;

@RestController
@RequestMapping(value = "api/v1/departments")
@CrossOrigin("http://127.0.0.1:5500")
public class DepartmentController {

	@Autowired
	private IDepartmentService service;

	@GetMapping()
	public ResponseEntity<?> getAllDepartments(Pageable pageable, @RequestParam(required = false) String search, DepartmentFilterForm filter) {
		Page<Department> entities = service.getAllDepartments(pageable, search, filter);
		
		Page<DepartmentDto> dtoPage = entities.map(new Function<Department, DepartmentDto>() {
		    @Override
		    public DepartmentDto apply(Department entity) {
		    	DepartmentDto dto = new DepartmentDto(entity.getId(), entity.getName(), new AccountDto(entity.getAuthor().getId(), entity.getAuthor().getFullName()), entity.getCreateDate());
		        return dto;
		    }
		});
		return new ResponseEntity<>(dtoPage, HttpStatus.OK);
	}

	@GetMapping(value = "/{id}")
	public ResponseEntity<?> getDepartmentByID(@PathVariable(name = "id") short id) {
		Department entity = service.getDepartmentByID(id);
		
		DetailDepartmentDto dto = new DetailDepartmentDto(entity.getId(), entity.getName(), new AccountDto(entity.getAuthor().getId(), entity.getAuthor().getFullName()), entity.getCreateDate());
		
		return new ResponseEntity<>(dto, HttpStatus.OK);
	}
	
	@GetMapping(value = "/name/{name}/exists")
	public ResponseEntity<?> existByName(@PathVariable(name = "name") String name) {
		return new ResponseEntity<>(service.isDepartmentExistsByName(name), HttpStatus.OK);
	}

	@PostMapping()
	public ResponseEntity<?> createDepartment(@RequestBody DepartmentCreatingForm form) {
		service.createDepartment(form);
		return new ResponseEntity<String>("Create successfully!", HttpStatus.CREATED);
	}

	@PutMapping(value = "/{id}")
	public ResponseEntity<?> updateDepartment(@PathVariable(name = "id") short id, @RequestBody DepartmentUpdatingForm form) {
		service.updateDepartment(id, form);
		return new ResponseEntity<String>("Update successfully!", HttpStatus.OK);
	}

	@DeleteMapping(value = "/{id}")
	public ResponseEntity<?> deleteDepartment(@PathVariable(name = "id") short id) {
		service.deleteDepartment(id);
		return new ResponseEntity<String>("Delete successfully!", HttpStatus.OK);
	}
	
	@DeleteMapping
	public ResponseEntity<?> deleteDepartments(@RequestParam(name = "ids") List<Short> ids) {
		service.deleteDepartments(ids);
		return new ResponseEntity<String>("Delete successfully!", HttpStatus.OK);
	}
}
