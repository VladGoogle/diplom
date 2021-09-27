import * as R from 'ramda';

export const noop: () => undefined = R.always(undefined);

export function formButtonText(price: number): string {
	return `Add to cart - $${price}`;
}
