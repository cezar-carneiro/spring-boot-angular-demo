package io.cezarcarneiro.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import io.cezarcarneiro.domain.Auth;
import io.cezarcarneiro.domain.User;
import io.cezarcarneiro.service.AuthService;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

	@Autowired
	private AuthService authService;

	@PostMapping("/signin")
	public Auth login(@RequestParam String username, @RequestParam String password) {
		return authService.signin(username, password);
	}

	@PostMapping("/signup")
	public Auth signup(@RequestBody User user) {
		return authService.signup(user);
	}

	@GetMapping(value = "/{username}")
	@PreAuthorize("hasRole('ADMIN')")
	public User search(@PathVariable String username) {
		return authService.search(username);
	}

}
