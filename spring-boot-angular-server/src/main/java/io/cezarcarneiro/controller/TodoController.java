package io.cezarcarneiro.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import io.cezarcarneiro.domain.Todo;
import io.cezarcarneiro.service.TodoService;

@RestController
@RequestMapping("/api/todos")
@PreAuthorize("hasAuthority('USER')")
public class TodoController {

	@Autowired
	private TodoService service;

	@RequestMapping({ "", "/" })
	public List<Todo> getAll() {
		return service.getAll();
	}

	@RequestMapping(value = { "", "/" }, method = RequestMethod.POST)
	@ResponseBody
	public Todo create(@RequestBody Todo todo) {
		return service.create(todo);
	}

	@RequestMapping(value = { "{id}" }, method = RequestMethod.PUT)
	@ResponseBody
	public Todo update(@RequestBody Todo todo) {
		return service.update(todo);
	}

	@RequestMapping(value = { "{id}" }, method = RequestMethod.DELETE)
	@ResponseBody
	public void delete(@PathVariable String id) {
		service.delete(id);
	}

}
