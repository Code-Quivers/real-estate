"use client";
import { IoClose } from "react-icons/io5";
import { Modal } from "rsuite";

const TenantMakePaymentModal = ({ isOpen, handleClose }) => {
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
            <h3 className="text-lg font-semibold">Edit Unit Information</h3>
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
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quae deleniti nam beatae architecto assumenda labore iusto suscipit quia,
            inventore quis laborum tenetur placeat iure quod, perspiciatis fuga illo repellendus sequi!
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default TenantMakePaymentModal;