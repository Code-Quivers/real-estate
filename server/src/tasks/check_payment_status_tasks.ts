/* eslint-disable @typescript-eslint/no-explicit-any */

import { PaymentServices } from "../app/modules/payment/payment.services";

const check_payment_status_tasks = async () => {
  /**
   * 

   **/
  //

  await PaymentServices.checkAndUpdateBulkOrderStatus();
};
export default check_payment_status_tasks;
