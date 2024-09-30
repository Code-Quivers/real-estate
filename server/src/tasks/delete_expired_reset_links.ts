/* eslint-disable @typescript-eslint/no-explicit-any */

import { AuthService } from "../app/modules/auth/auth.service";

const delete_expired_reset_links = async () => {
  await AuthService.deleteResetLink();
};
export default delete_expired_reset_links;
