/* eslint-disable @typescript-eslint/no-explicit-any */

import { PaymentServices } from "../app/modules/payment/payment.services";

const check_payment_status_tasks = async () => {
  /**
   *   check payment status  if they are processing during the application startup.
   *
   * processing --> pending
   * success --> confirmed
   * other ---> failed

   **/
  //

  await PaymentServices.checkAndUpdateBulkOrderStatus();
};
export default check_payment_status_tasks;
