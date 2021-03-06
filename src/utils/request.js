import fetch from 'dva/fetch';

const checkStatus = (response) => {

	if (response.status >= 200) {
		return response;
	}

	const error = new Error(response.statusText);
	error.response = response;
	throw error;
};

export default async function request(url, options = {}) {

	options.headers = {
		'Content-Type': 'application/json'
	}
	const response = await fetch(url, options);
	checkStatus(response);
	const result = response.json();
	return result;
}