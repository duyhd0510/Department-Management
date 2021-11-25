package com.pka.form;

public class DepartmentCreatingForm {
	private String name;
	
	private short authorId;
	
	public DepartmentCreatingForm() {
	}

	public DepartmentCreatingForm(String name, short authorId) {
		this.name = name;
		this.authorId = authorId;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public short getAuthorId() {
		return authorId;
	}

	public void setAuthorId(short authorId) {
		this.authorId = authorId;
	}
}
