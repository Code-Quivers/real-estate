"use client";

import { Modal } from "rsuite";

const ContactModal = ({ isModalOpened, setModalOpened }) => {
  const handleClose = () => setModalOpened(false);

  const modalBodyStyle = {
    padding: 0,
    margin: 0,
  };

  const modalContentStyle = {
    padding: 0,
    margin: 0,
  };

  return (
    <>
      <Modal
        className="rounded-none"
        open={isModalOpened}
        onClose={handleClose}
      >
        <Modal.Body style={modalBodyStyle}>
          <div style={modalContentStyle}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Reprehenderit optio corrupti tenetur error explicabo beatae magnam
            at esse, nobis quis, fuga distinctio voluptates natus eos? Nam
            soluta natus molestiae magnam expedita repellendus rem delectus
            nihil perspiciatis sint et, error minus est necessitatibus placeat?
            Id officiis voluptatem delectus omnis nam numquam?
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ContactModal;
