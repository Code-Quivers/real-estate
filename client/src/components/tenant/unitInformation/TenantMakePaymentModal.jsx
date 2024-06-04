/* eslint-disable no-unused-vars */
"use client";
import { IoClose } from "react-icons/io5";
import { Modal, useMediaQuery } from "rsuite";
import TenantStripeCheckout from "../payment/TenantStripePayment";
import { useState } from "react";

const TenantMakePaymentModal = ({ isOpen, handleClose, propertyInfo, tenantId, dueRent, dueMonths }) => {
  const [amountToPaid, setAmountToPaid] = useState(dueRent + dueRent * 0.04);
  const [isMobile] = useMediaQuery("(max-width: 575px)");
  return (
    <div>
      <Modal
        size={isMobile ? "xs" : "md"}
        overflow={false}
        backdrop="static"
        className=""
        open={isOpen}
        onClose={() => {
          handleClose();
        }}
      >
        <Modal.Body>
          <div className="flex pb-3 justify-between items-center">
            {console.log(propertyInfo, "from modal")}

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
          <div className="max-w-xl mx-auto pt-3">
            <h3 className="">Total Rent: ${dueRent}</h3>
            <h3 className="">Charge: ${dueRent * 0.04}</h3>
            <h3 className="">Total Amount: ${dueRent + dueRent * 0.04}</h3>
          </div>
          <div className="py-3">
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
