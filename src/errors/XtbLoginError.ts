import { XtbApiError } from "./XtbApiError";

export class XtbLoginError extends XtbApiError {
  constructor(message: string, errorCode?: string) {
    super(message, errorCode);
    this.name = "XtbLoginError";
  }
}
