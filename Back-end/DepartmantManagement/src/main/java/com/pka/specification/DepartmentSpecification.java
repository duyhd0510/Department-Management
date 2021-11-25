package com.pka.specification;

import java.util.Date;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;

import org.springframework.data.jpa.domain.Specification;

import com.pka.entity.Department;

public class DepartmentSpecification implements Specification<Department>{
	private static final long serialVersionUID = 1L;
	private String field;
	private String operator;
	private Object value;
	
	public DepartmentSpecification(String field, String operator, Object value) {
		super();
		this.field = field;
		this.operator = operator;
		this.value = value;
	}



	@Override
	public Predicate toPredicate(Root<Department> root, CriteriaQuery<?> query, CriteriaBuilder criteriaBuilder) {
		if (operator.equalsIgnoreCase("LIKE")) {
			if (field.equalsIgnoreCase("author.fullName")) {
				return criteriaBuilder.like(root.get("author").get("fullName"), "%" + value.toString() + "%");
			} else {
				return criteriaBuilder.like(root.get(field),"%" + value.toString() + "%");
			}
		}
		
		if (operator.equalsIgnoreCase(">=")) {
			if(value instanceof Date) {
				return criteriaBuilder.greaterThanOrEqualTo(root.get(field), (Date)value);
			}
		}
		
		if (operator.equalsIgnoreCase("<=")) {
			if(value instanceof Date) {
				Date today = (Date) value;
				Date tomorrow = new Date(today.getTime() + (1000 * 60 * 60 * 24));
				return criteriaBuilder.lessThanOrEqualTo(root.get(field), tomorrow);
			}
		}
		return null;
	}
	
}
