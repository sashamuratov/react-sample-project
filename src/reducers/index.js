import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';

const initialState = {
    accessToken: "",
	isLoading: false,
	searchTerm: "",
	username: "",
	errorMessage: false,
    repositories: [],
    contributors: [],
    loggedUserRepositories: [],
}


function app(state = initialState, action) {
    console.log(action);
    switch (action.type) {

    	case 'SET_SEARCH_TERM':
    		return {
    			...state,
    			searchTerm : action.searchTerm,
    		}

        case 'SET_ACCESS_TOKEN':
            return {
                ...state,
                accessToken: action.accessToken,
            }

    	case 'FETCH_REQUESTED':
    		return {
    			...state,
    			repositories: [],
                contributors: [],
    			isLoading: true,
    			errorMessage: false,
    		}

        case 'FETCH_FAILED':
            return {
                ...state,
                isLoading: false,
                errorMessage: action.errorMessage,
            }

    	case 'FETCH_REPOSITORIES_SUCCEEDED':
    		return {
    			...state,
    			isLoading: false,
    			repositories: action.repositories,
    			username: action.username,
    		}

    	case 'FETCH_CONTRIBUTORS_SUCCEEDED':
    		return {
    			...state,
    			isLoading: false,
    			contributors: action.contributors,
    		}


        case 'FETCH_LOGGED_USER_REPOSITORIES_SUCCEEDED':
            return {
                ...state,
                isLoading: false,
                loggedUserRepositories: action.repositories,
            }
        

    	default:
    		return state;
    }
}

export default combineReducers({
    app,
    routing
})