package com.pka.dto;

public class LoginInfoDto {
	private short id;

	private String fullName;
	
	private String role;

	public LoginInfoDto(short id, String fullName, String role) {
		super();
		this.id = id;
		this.fullName = fullName;
		this.role = role;
	}

	public short getId() {
		return id;
	}

	public void setId(short id) {
		this.id = id;
	}

	public String getFullName() {
		return fullName;
	}

	public void setFullName(String fullName) {
		this.fullName = fullName;
	}

	public String getRole() {
		return role;
	}

	public void setRole(String role) {
		this.role = role;
	}
}
