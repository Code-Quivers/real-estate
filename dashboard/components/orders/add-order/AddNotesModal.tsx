import { Modal, Textarea } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import React from 'react';
import { FaPencil } from 'react-icons/fa6';
import classes from '@/styles/modal/add-notes.module.css';
import { IoClose } from 'react-icons/io5';

const AddNotesModal = () => {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <div>
      <button onClick={open} type="button" className="rounded-lg p-1 text-[#a7a7a7] transition-all duration-100 hover:bg-[#a7a7a752]  active:translate-y-[2px]  ">
        <FaPencil />
      </button>
      {/* modal content */}
      <Modal closeOnClickOutside={false} classNames={classes} radius="lg" withCloseButton={false} transitionProps={{ transition: 'fade-up' }} centered opened={opened} onClose={close} size="lg">
        {/* Modal content */}

        <Modal.Body>
          {/* header */}
          <div className="flex items-center justify-between bg-[#f3f3f3] p-4">
            <h2>Add Note</h2>
            <button type="button" className="text-gray-500 hover:text-black" onClick={() => close()}>
              <IoClose size={18} />
            </button>
          </div>
          {/* content */}
          <div className="border-t p-4">
            <Textarea radius="lg" resize="vertical" minRows={5} maxRows={30} autosize placeholder="Input placeholder" />
          </div>
          {/* footer */}

          <div className="flex justify-end gap-4 border-t  p-4">
            <button
              type="button"
              onClick={() => {
                close();
              }}
              className="rounded-md border border-[#ffff] bg-[#fff] px-4 py-0.5 font-semibold shadow-inner ring-1 ring-[#e7e7e7] hover:bg-[#e7e7e7]"
            >
              Cancel
            </button>
            <button type="button" className="rounded-md border border-[#ffffff3b] bg-[#3b3b3b] px-4 py-0.5 font-semibold text-white shadow-inner ring-1 ring-[#3a3a3a] hover:bg-[#303030]">
              Done
            </button>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default AddNotesModal;
