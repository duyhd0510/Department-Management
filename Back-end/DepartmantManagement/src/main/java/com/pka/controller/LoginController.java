package com.pka.controller;

import java.security.Principal;
import java.util.function.Function;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.pka.dto.AccountDto;
import com.pka.dto.DepartmentDto;
import com.pka.dto.LoginInfoDto;
import com.pka.entity.Account;
import com.pka.entity.Department;
import com.pka.form.DepartmentFilterForm;
import com.pka.service.IAccountService;
import com.pka.service.IDepartmentService;

@RestController
@RequestMapping(value = "api/v1/login")
@CrossOrigin("*")
public class LoginController {

	@Autowired
	private IAccountService service;

	@GetMapping()
	public ResponseEntity<?> login(Principal principal) {
		
		String username = principal.getName();
		Account entity = service.getAccountByUsername(username);
		
		LoginInfoDto dto = new LoginInfoDto(entity.getId(), entity.getFullName(), entity.getRole());
		return new ResponseEntity<>(dto, HttpStatus.OK);
	}
}
