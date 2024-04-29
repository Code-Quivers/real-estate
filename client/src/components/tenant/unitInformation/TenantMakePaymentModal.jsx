/* eslint-disable no-unused-vars */
"use client";
import { IoClose } from "react-icons/io5";
import { Modal } from "rsuite";
import TenantStripeCheckout from "../payment/TenantStripePayment";

const TenantMakePaymentModal = ({ isOpen, handleClose, propertyInfo, tenantId, dueRent, dueMonths }) => {
  return (
    <div>
      <Modal
        size="md"
        dialogAs="div"
        overflow={false}
        className="!max-w-5xl bg-white border rounded-xl
       mx-auto w-full  mt-2 2xl:mt-5 "
        open={isOpen}
        onClose={() => {
          handleClose();
        }}
      >
        <Modal.Body className=" ">
          <div className="flex px-5 justify-between items-center">
            {console.log(propertyInfo, "from modal")}

            <h3 className="text-lg ml-24 font-semibold">Payment</h3>
            <button
              className="hover:text-rose-600 hover:scale-125 duration-300 transition-all "
              onClick={() => {
                handleClose();
              }}
            >
              <IoClose size={25} />
            </button>
          </div>
          <div className="p-5">
            <TenantStripeCheckout
              isRentPayment={true}
              amountToPaid={dueRent}
              propertyId={propertyInfo?.propertyId}
              tenantId={tenantId}
              ownerId={propertyInfo?.ownerId}
            />
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default TenantMakePaymentModal;
