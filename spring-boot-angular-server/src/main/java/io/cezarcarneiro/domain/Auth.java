package io.cezarcarneiro.domain;

public class Auth {

	private String token;

	public Auth() {

	}

	public Auth(String token) {
		this.token = token;
	}

	public String getToken() {
		return token;
	}

	public void setToken(String token) {
		this.token = token;
	}
	
}
