"use client";

import { Modal, Button, Placeholder } from "rsuite";

const ContactModal = ({ isModalOpened, setModalOpened }) => {
  const handleClose = () => setModalOpened(false);
  return (
    <>
      <Modal open={isModalOpened} onClose={handleClose}>
        <Modal.Header>
          <Modal.Title>Modal Title</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Placeholder.Paragraph />
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleClose} appearance="primary">
            Ok
          </Button>
          <Button onClick={handleClose} appearance="subtle">
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ContactModal;
