package io.cezarcarneiro.service;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import io.cezarcarneiro.domain.Auth;
import io.cezarcarneiro.domain.User;
import io.cezarcarneiro.exception.CustomException;
import io.cezarcarneiro.repository.UserRepository;
import io.cezarcarneiro.security.JwtTokenProvider;

@Component
public class AuthService {

	@Autowired
	private UserRepository userRepository;

	@Autowired
	private PasswordEncoder passwordEncoder;

	@Autowired
	private JwtTokenProvider jwtTokenProvider;

	@Autowired
	private AuthenticationManager authenticationManager;

	public Auth signin(String username, String password) {
		try {
			authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(username, password));
			User user = userRepository.findByUsername(username);
			return new Auth(jwtTokenProvider.createToken(username, user.getRoles()));
		} catch (AuthenticationException e) {
			throw new CustomException("Invalid username/password", HttpStatus.BAD_REQUEST);
		}
	}

	public Auth signup(User user) {
		if (!userRepository.existsByUsername(user.getUsername())) {
			if(user.getRoles() == null) {
				user.setRoles(new ArrayList<String>());
			}
			user.getRoles().add("USER");
			user.setPassword(passwordEncoder.encode(user.getPassword()));
			userRepository.insert(user);
			return new Auth(jwtTokenProvider.createToken(user.getUsername(), user.getRoles()));
		} else {
			throw new CustomException("Username is already in use", HttpStatus.BAD_REQUEST);
		}
	}

	public User search(String username) {
		User user = userRepository.findByUsername(username);
		if (user == null) {
			throw new CustomException("The user doesn't exist", HttpStatus.BAD_REQUEST);
		}
		return user;
	}

}
