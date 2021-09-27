import axios from 'axios';
import Cookie from 'js-cookie';

interface RegisterUser {
	email: string;
	password: string;
	firstName: string;
	lastName: string;
	phone_number: string;
}

export interface Card {
	id: number;
	external_id: string;
	user_id: number;
	created_at: Date;
	updated_at: Date;
	default: boolean;
}

export interface User extends RegisterUser {
	id: number;
	stripe_id?: string;
	card?: Card;
	created_at: Date;
	updated_at: Date;
}

export async function authorize(user: RegisterUser): Promise<User> {
	const response = await axios.post('http://localhost:3000/api/register', {
		...user,
	});
	Cookie.set('tso_token', response.data.access_token);
	return response.data;
}

export async function checkAuth(cookie?: string) {
	try {
		const response = await axios.get('http://localhost:3000/api/auth', {
			headers: { Cookie: cookie },
		});
		return response.data.user;
	} catch (e) {
		console.log(e.message);
		return {};
	}
}

export async function loginUser(body: { email: string; password: string }) {
	try {
		const response = await axios.post('http://localhost:3000/api/login', body);
		Cookie.set('tso_token', response.data.user.access_token);

		return response.data.user;
	} catch (e) {
		console.log(e.message);
		return {};
	}
}

export async function updateUser(user: User) {
	try {
		console.log('updateing user', user);
		const response = await axios.patch(`http://localhost:3000/api/user/${user.id}`, user);
		return response.data.user;
	} catch (e) {
		console.log(e);
		return {};
	}
}
