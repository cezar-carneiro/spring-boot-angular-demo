package io.cezarcarneiro.repository;

import org.springframework.data.mongodb.repository.MongoRepository;

import io.cezarcarneiro.domain.User;

public interface UserRepository extends MongoRepository<User, String> {

	User findByUsername(String username);

	boolean existsByUsername(String username);

}
