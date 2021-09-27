import axios from 'axios';
import { Product } from './product';

export async function addProductToCart(cart_id: number, product: Product): Promise<unknown> {
	const response = await axios.post('http://localhost:3000/api/cart/product', {
		cart_id,
		product,
	});

	return response.data;
}

export async function getUserOrder(cookies): Promise<any> {
	const response = await axios.get('http://localhost:3000/api/cart', {
		headers: { Cookie: cookies },
	});
	return response.data.order;
}

export async function payForOrder(order_id: number, card_id: number): Promise<any> {
	await axios.post('http://localhost:3000/api/cart/pay', { card_id, order_id });
}
