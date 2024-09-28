/* eslint-disable @typescript-eslint/no-explicit-any */

import { PaymentServices } from "../app/modules/payment/payment.services";

const check_due_rent_tasks = async () => {
  /**
   

   **/
  //

  await PaymentServices.checkAndSendNotificationForDueRent();
};
export default check_due_rent_tasks;
