import { XtbApiError } from './XtbApiError';

export class XtbConnectionError extends XtbApiError {
	constructor(message: string) {
		super(message);
		this.name = 'XtbConnectionError';
	}
}
