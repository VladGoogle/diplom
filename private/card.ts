import redisClient from './redis';

export async function saveCard(card) {
	const cardId = await redisClient.incrAsync('card');

	card.id = cardId;
	card.default = true;
	await setCard(card);
	return card;
}

async function setCard(card) {
	let userCards = [];

	try {
		userCards = JSON.parse(await redisClient.getAsync(`card_${card.user_id}`)) || [];
	} catch {
		console.log('no cards yet');
	}
	let changed = false;
	for (const o of userCards) {
		if (o.id === card.id) {
			Object.assign(o, card);
			console.log('changed');
			changed = true;
		}
	}
	if (!changed) {
		userCards.push(card);
	}

	await redisClient.setAsync(`card_${card.user_id}`, JSON.stringify(userCards));
}

export async function getDefaultCard(user_id: number) {
	let cards = [];

	try {
		cards = JSON.parse(await redisClient.getAsync(`card_${user_id}`)) || [];
	} catch (e) {
		console.log('no cards');
		return null;
	}

	return cards.find((it) => it.default);
}
