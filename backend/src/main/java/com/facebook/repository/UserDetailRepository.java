package com.facebook.repository;

import com.facebook.entity.user.Details;
import org.springframework.data.repository.CrudRepository;

public interface UserDetailRepository extends CrudRepository<Details, Long> {
}
