/* eslint-disable no-unused-vars */
"use client";
import { IoClose } from "react-icons/io5";
import { Modal, useMediaQuery } from "rsuite";
import TenantStripeCheckout from "../payment/TenantStripePayment";

const TenantMakePaymentModal = ({ isOpen, handleClose, propertyInfo, tenantId, dueRent, dueMonths }) => {
  const [isMobile] = useMediaQuery("(max-width: 575px)");
  return (
    <div>
      <Modal
        size={isMobile ? "xs" : "md"}
        overflow={false}
        backdrop="static"
        open={isOpen}
        onClose={() => {
          handleClose();
        }}
      >
        <Modal.Body>
          <div className="flex pb-3 justify-between items-center">
            <h3 className="text-lg max-w-xl mx-auto font-semibold">Payment</h3>

            <button
              className="hover:text-rose-600 hover:scale-125 duration-300 transition-all "
              onClick={() => {
                handleClose();
              }}
            >
              <IoClose size={25} />
            </button>
          </div>
          <div className="max-w-xl mx-auto border p-3 rounded-lg ">
            <h3 className="">Total Rent: ${dueRent}</h3>
            <h3 className="">Due Month: {dueMonths}</h3>
            <h3 className="">Charge: ${(dueRent * 0.04).toFixed(2)}</h3>
            <h3 className="">
              Total Amount: <strong className="text-red-400">${(dueRent + dueRent * 0.04).toFixed(2)}</strong>
            </h3>
          </div>
          <div className="py-3">
            <TenantStripeCheckout
              isRentPayment={true}
              amountToPaid={dueRent + dueRent * 0.04}
              //
              charge={dueRent * 0.04}
              netAmount={dueRent}
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
