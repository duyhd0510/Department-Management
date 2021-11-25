package com.pka.service;

import org.springframework.security.core.userdetails.UserDetailsService;

import com.pka.entity.Account;

public interface IAccountService extends UserDetailsService{
	public Account getAccountByUsername(String username);
}
