import * as redis from 'redis';
import util from 'util';

const redisClient = redis.createClient({
	port: 6377,
});

export default {
	getAsync: util.promisify(redisClient.get).bind(redisClient),
	setAsync: util.promisify(redisClient.set).bind(redisClient),
	incrAsync: util.promisify(redisClient.incr).bind(redisClient),
};
