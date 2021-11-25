package com.pka.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.pka.entity.Account;

public interface IAccountRepository extends JpaRepository<Account, Short> {
	public Account findByUsername(String username);
}
