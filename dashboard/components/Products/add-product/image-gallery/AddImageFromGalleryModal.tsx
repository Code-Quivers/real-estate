import { Modal, ScrollArea, TextInput } from '@mantine/core';
import { FaPencil } from 'react-icons/fa6';
import { IoClose } from 'react-icons/io5';
import classes from '@/styles/modal/add-notes.module.css';
import { IconSearch } from '@tabler/icons-react';
import { useRef } from 'react';
import { Dropzone } from '@mantine/dropzone';
const AddImageFromGalleryModal = ({ opened, close, open }: { opened: boolean; close: any; open: any }) => {
  const openRef = useRef<() => void>(null);
  return (
    <div>
      <Modal
        closeOnClickOutside={false}
        classNames={classes}
        radius="lg"
        withCloseButton={false}
        transitionProps={{ transition: 'pop' }}
        centered
        opened={opened}
        onClose={close}
        size="xl"
        scrollAreaComponent={ScrollArea.Autosize}
      >
        {/* Modal content */}

        <Modal.Body>
          <div className="relative">
            {/* header */}
            <div className="sticky top-0 ">
              <div className=" flex items-center justify-between bg-[#f3f3f3] px-4 py-3">
                <h2>Select file</h2>
                <button type="button" className="text-gray-500  focus-within:outline-none hover:text-black" onClick={() => close()}>
                  <IoClose size={18} />
                </button>
              </div>
              <div className="flex items-center justify-between bg-white px-4 py-3">
                <div>
                  <TextInput radius="md" size="xs" placeholder="Search product" data-autofocus leftSection={<IconSearch stroke={1.5} />} />
                </div>
                <div>
                  <TextInput radius="md" size="xs" placeholder="Search product" data-autofocus leftSection={<IconSearch stroke={1.5} />} />
                </div>
              </div>
            </div>
            {/* content */}
            <div className="mb-10 px-4">
              {/* search and filters */}

              {/* main content */}
              <div>
                <section
                  onClick={(event) => {
                    event.stopPropagation();
                    openRef.current?.();
                  }}
                  className="mt-2 flex h-[120px] cursor-pointer items-center justify-center rounded-lg border
    border-dashed border-[#a8a8a8] bg-white transition-all duration-300 hover:bg-[#f1f1f1]"
                >
                  <div>
                    <div className="flex items-center justify-center gap-3">
                      <button
                        onClick={(event) => {
                          event.stopPropagation();
                          openRef.current?.();
                        }}
                        type="button"
                        className="e rounded-md border border-[#ffff] bg-[#fff] px-4  py-0.5 text-xs font-semibold shadow-inner ring-1 ring-[#e7e7e7] hover:bg-[#e7e7e7b2]"
                      >
                        Add media
                      </button>

                      <button
                        onClick={(event) => {
                          event.stopPropagation();
                        }}
                        className="text-xs font-semibold hover:underline"
                        type="button"
                      >
                        Add from URL
                      </button>
                    </div>
                    <div className="flex items-center justify-center pt-2 text-center">
                      <p className="text-xs font-semibold text-[#767676]">Drag and drop images or videos and files</p>
                    </div>
                  </div>
                </section>
                {/* photo list */}
                <div className="grid grid-cols-6 gap-3 py-10">
                  <div className="h-[100px] rounded-lg border"></div>
                  <div className="h-[100px] rounded-lg border"></div>
                  <div className="h-[100px] rounded-lg border"></div>
                  <div className="h-[100px] rounded-lg border"></div>
                  <div className="h-[100px] rounded-lg border"></div>
                  <div className="h-[100px] rounded-lg border"></div>
                  <div className="h-[100px] rounded-lg border"></div>
                  <div className="h-[100px] rounded-lg border"></div>
                  <div className="h-[100px] rounded-lg border"></div>
                  <div className="h-[100px] rounded-lg border"></div>
                  <div className="h-[100px] rounded-lg border"></div>
                  <div className="h-[100px] rounded-lg border"></div>
                  <div className="h-[100px] rounded-lg border"></div>
                  <div className="h-[100px] rounded-lg border"></div>
                  <div className="h-[100px] rounded-lg border"></div>
                  <div className="h-[100px] rounded-lg border"></div>
                  <div className="h-[100px] rounded-lg border"></div>
                  <div className="h-[100px] rounded-lg border"></div>
                  <div className="h-[100px] rounded-lg border"></div>
                  <div className="h-[100px] rounded-lg border"></div>
                  <div className="h-[100px] rounded-lg border"></div>
                  <div className="h-[100px] rounded-lg border"></div>
                  <div className="h-[100px] rounded-lg border"></div>
                  <div className="h-[100px] rounded-lg border"></div>
                  <div className="h-[100px] rounded-lg border"></div>
                  <div className="h-[100px] rounded-lg border"></div>
                  <div className="h-[100px] rounded-lg border"></div>
                  <div className="h-[100px] rounded-lg border"></div>
                  <div className="h-[100px] rounded-lg border"></div>
                  <div className="h-[100px] rounded-lg border"></div>
                  <div className="h-[100px] rounded-lg border"></div>
                  <div className="h-[100px] rounded-lg border"></div>
                  <div className="h-[100px] rounded-lg border"></div>
                  <div className="h-[100px] rounded-lg border"></div>
                  <div className="h-[100px] rounded-lg border"></div>
                  <div className="h-[100px] rounded-lg border"></div>
                  <div className="h-[100px] rounded-lg border"></div>
                  <div className="h-[100px] rounded-lg border"></div>
                  <div className="h-[100px] rounded-lg border"></div>
                  <div className="h-[100px] rounded-lg border"></div>
                  <div className="h-[100px] rounded-lg border"></div>
                  <div className="h-[100px] rounded-lg border"></div>
                  <div className="h-[100px] rounded-lg border"></div>
                  <div className="h-[100px] rounded-lg border"></div>
                  <div className="h-[100px] rounded-lg border"></div>
                  <div className="h-[100px] rounded-lg border"></div>
                  <div className="h-[100px] rounded-lg border"></div>
                  <div className="h-[100px] rounded-lg border"></div>
                  <div className="h-[100px] rounded-lg border"></div>
                  <div className="h-[100px] rounded-lg border"></div>
                  <div className="h-[100px] rounded-lg border"></div>
                  <div className="h-[100px] rounded-lg border"></div>
                  <div className="h-[100px] rounded-lg border"></div>
                  <div className="h-[100px] rounded-lg border"></div>
                </div>
              </div>
              {/* dropzone */}
              <Dropzone openRef={openRef} onDrop={() => {}} activateOnClick={false} style={{ display: 'none' }} />
            </div>
            {/* content */}
            {/* footer */}

            <div className="fixed bottom-0 flex w-full justify-end gap-4 border-t-2 bg-white  p-4">
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
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default AddImageFromGalleryModal;
