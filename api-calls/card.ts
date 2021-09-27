import axios from 'axios';

export async function saveCard(token: string) {
	return await axios.post('http://localhost:3000/api/payment-card', { token });
}
