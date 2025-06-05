import { AccountController } from "./account.controller";
import { AccountService } from "./account.service";

const accountService = new AccountService();
const accountController = new AccountController(accountService);

export { accountService, accountController };
