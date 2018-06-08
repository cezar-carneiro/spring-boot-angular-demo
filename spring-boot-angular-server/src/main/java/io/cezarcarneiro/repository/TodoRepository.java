package io.cezarcarneiro.repository;

import org.springframework.data.mongodb.repository.MongoRepository;

import io.cezarcarneiro.domain.Todo;

public interface TodoRepository extends MongoRepository<Todo, String>{

}
