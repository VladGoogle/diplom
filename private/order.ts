import redisClient from './redis';
import { randomString } from 'react-inlinesvg/lib/helpers';
import { Product } from '../api-calls/product';

type Order = {
	user_id: number;
	id: any;
	products: Product[];
	uuid: string;
	paid: boolean;
	created_at: Date;
	updated_at: Date;
};
export async function createOrder(user_id: number, products: Product[]): Promise<Order> {
	const order_id = await redisClient.incrAsync('orders');

	const order = {
		user_id,
		id: order_id,
		paid: false,
		products,
		uuid: randomString(10),
		created_at: new Date(),
		updated_at: new Date(),
	};

	await setOrder(order);
	return order;
}

export async function addProductToOrder(order_id: number, product: Product): Promise<Order> {
	const order = await getOrderById(order_id);
	order.products.push(product);
	order.updated_at = new Date();
	await setOrder(order);

	return order;
}

export async function getOrderById(order_id: number): Promise<Order> {
	return JSON.parse(await redisClient.getAsync(`order_${order_id}`));
}

export async function setOrder(order: Order): Promise<void> {
	await redisClient.setAsync(`order_${order.id}`, JSON.stringify(order));
	let userOrders: Order[] = [];
	try {
		userOrders = JSON.parse(await redisClient.getAsync(`order_user_${order.user_id}`)) || [];
	} catch {
		console.log('no orders yet');
	}
	let changed = false;
	for (const o of userOrders) {
		if (o.id === order.id) {
			Object.assign(o, order);
			console.log('changed');
			changed = true;
		}
	}

	if (!changed) {
		userOrders.push(order);
	}
	console.log('userOrders ===> ', userOrders, order);
	await redisClient.setAsync(`order_user_${order.user_id}`, JSON.stringify(userOrders));
}

export async function getUserOrders(user_id: number): Promise<Order[]> {
	let orders: Order[] = [];
	try {
		orders = JSON.parse(await redisClient.getAsync(`order_user_${user_id}`)) || [];
	} catch (e) {
		console.log('no orders yet');
	}

	return orders;
}
