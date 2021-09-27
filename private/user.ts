import redisClient from './redis';
import { User } from '../api-calls/auth';

async function setUser(user: User) {
	await redisClient.setAsync(`user_${user.id}`, JSON.stringify(user));
	await redisClient.setAsync(`user_email_${user.email}`, JSON.stringify(user));
}

export async function getUser(id: number): Promise<User> {
	try {
		const user = await redisClient.getAsync(`user_${id}`);
		return JSON.parse(user);
	} catch (err) {
		throw new Error(err.message);
	}
}

export async function createUser(user: any): Promise<User> {
	const newUser: User = {
		...user,
		id: await redisClient.incrAsync('user'),
		created_at: new Date(),
		updated_at: new Date(),
	};

	await setUser(newUser);
	return newUser;
}

export async function updateUser(user: User): Promise<User> {
	user.updated_at = new Date();
	await setUser(user);
	return user;
}

export async function getUserByEmail(email: string): Promise<User> {
	const user = await redisClient.getAsync(`user_email_${email}`);
	return JSON.parse(user);
}
