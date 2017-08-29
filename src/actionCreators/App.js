import { dispatch , getCurrentState } from "../store/configureStore";
import { request } from '../helpers/Functions';
import Config from '../config';

export function setOauthCode(oauthCode){
	dispatch({ type : 'SET_OAUTH_CODE' , oauthCode });
}

export function setSearchTerm(term){
	dispatch({ type : 'SET_SEARCH_TERM' , searchTerm : term });
}

function requestGithubToken(options, code) {
	
}

export function requestAccessToken(code){
	let data = new FormData();
	data.append('client_id', Config.OAuth.clientId);
	data.append('client_secret', Config.OAuth.clientSecret);
	data.append('code', code);

	fetch(Config.OAuth.proxyUrl + 'https://github.com/login/oauth/access_token', {
		method: 'POST',
		body: data
	})
	.then((response) => {
		return response.text();
	})
	.then((paramsString) => {
		const params = new URLSearchParams(paramsString);
		const accessToken = params.get('access_token');
		if (accessToken){
			fetchLoggedUserRepositories(accessToken);
			dispatch({ type : 'SET_ACCESS_TOKEN' , accessToken });
		}
		
	});
}

function fetchLoggedUserRepositories(accessToken){
	dispatch({ type : "FETCH_REQUESTED" });
	request('GET', 'https://api.github.com/user/repos?access_token='+accessToken)
		.then( response => {
			dispatch({ type : "FETCH_LOGGED_USER_REPOSITORIES_SUCCEEDED" , repositories : response || [] });
		} )
		.catch( error => {
			dispatch({ type : "FETCH_FAILED" , errorMessage : error.statusText });
		})
}

export function fetchRepositories(username){
	const accessToken = getCurrentState().app.accessToken;
	dispatch({ type : "FETCH_REQUESTED" });
	request('GET', 'https://api.github.com/users/'+username+'/repos?access_token='+accessToken)
		.then( response => {
			dispatch({ type : "FETCH_REPOSITORIES_SUCCEEDED" , repositories : response || [] , username });
		} )
		.catch( error => {
			dispatch({ type : "FETCH_FAILED" , errorMessage : error.statusText });
		})
}

export function fetchContributors(username, repo){
	const accessToken = getCurrentState().app.accessToken;
	dispatch({ type : "FETCH_REQUESTED" });
	request('GET', 'https://api.github.com/repos/'+username+'/'+repo+'/contributors?access_token='+accessToken)
		.then( response => {
			dispatch({ type : "FETCH_CONTRIBUTORS_SUCCEEDED" , contributors : response || [] , username });
		} )
		.catch( error => {
			dispatch({ type : "FETCH_FAILED" , errorMessage : error.statusText });
		})
}

