package io.cezarcarneiro.service;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;

import io.cezarcarneiro.domain.Todo;
import io.cezarcarneiro.exception.CustomException;
import io.cezarcarneiro.repository.TodoRepository;

@Component
public class TodoService {
	
	@Autowired
	private TodoRepository repository;
	
	private DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd-MM-yyyy HH:mm:ss");

	public List<Todo> getAll() {
		return repository.findAll();
	}

	public Todo create(Todo todo) {
		if(StringUtils.isEmpty(todo.getDescription())) {
			throw new CustomException("Description invalid", HttpStatus.BAD_REQUEST);
		}
		
		if(todo.getHistory() == null) {
			todo.setHistory(new ArrayList<String>());
		}
		todo.getHistory().add(String.format("Created on %s", LocalDateTime.now().format(formatter)));
		
		return repository.insert(todo);
	}

	public Todo update(Todo todo) {
		if(StringUtils.isEmpty(todo.getDescription())) {
			throw new CustomException("Description invalid", HttpStatus.BAD_REQUEST);
		}
		
		if(todo.getHistory() == null) {
			todo.setHistory(new ArrayList<String>());
		}
		todo.getHistory().add(
				String.format("Marked as %s on %s",
						todo.getDone() ? "DONE" : "NOT DONE",
						LocalDateTime.now().format(formatter)));
		return repository.save(todo);
	}

	public void delete(String id) {
		repository.deleteById(id);
	}

}
