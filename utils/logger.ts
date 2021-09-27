import config from '../config';

type IMsg =
	| string
	| {
			type: 'fatal' | 'info';
			message: string;
	  };

export function log(msg: IMsg): void {
	if (typeof msg === 'object') {
		throw new Error(msg.message);
	}
	if (config.isLocal) {
		console.error(msg);
	}
}
