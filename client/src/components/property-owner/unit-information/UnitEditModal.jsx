"use client";
import { Controller, useForm } from "react-hook-form";
import { IoClose } from "react-icons/io5";
import { Input, Modal } from "rsuite";
import UpdateImageUpload from "./UpdateImageUpload";

const UnitEditModal = ({ open, handleClose, editData }) => {
  const {
    control,
    formState: { errors },
    handleSubmit,
    setValue,
    reset: resetForm,
  } = useForm({});

  const handleUpdateProperty = (updatedData) => {
    const { files } = updatedData;

    const srv = files?.reduce(
      (acc, file) => {
        if (file && file.fileKey) {
          if (file.fileKey.startsWith("default-") && file.url) {
            const urlWithoutLocalhost = file.url.replace(
              "http://localhost:7000/",
              "",
            );
            acc.oldFiles.push({ ...file, url: urlWithoutLocalhost });
          } else if (file.fileKey.startsWith("selected-")) {
            acc.newFiles.push(file);
          }
        }
        return acc;
      },
      { oldFiles: [], newFiles: [] },
    );

    console.log("Old Files:", srv);

    // Rest of the update logic
  };

  return (
    <div>
      <Modal
        size="lg"
        dialogAs="div"
        className="bg-white border rounded-xl mx-auto w-full h-auto min-h-[70vh]"
        open={open}
        onClose={handleClose}
      >
        <Modal.Body className=" ">
          <div className="flex px-5 justify-between items-center">
            <h3 className="text-lg font-semibold">Edit Unit Information</h3>
            <button
              className="hover:text-rose-600 hover:scale-125 duration-300 transition-all "
              onClick={() => {
                handleClose();
                resetForm();
              }}
            >
              <IoClose size={25} />
            </button>
          </div>
          <div className="p-5">
            <form onSubmit={handleSubmit(handleUpdateProperty)}>
              <div>
                <div className="rs-form-control-wrapper ">
                  <UpdateImageUpload
                    setValue={setValue}
                    control={control}
                    images={editData?.images}
                  />
                </div>

                <div className="mt-5">
                  <Controller
                    name="address"
                    control={control}
                    render={({ field }) => (
                      <div className="rs-form-control-wrapper ">
                        <Input
                          {...field}
                          type="text"
                          placeholder="Address..."
                        />
                      </div>
                    )}
                  />
                </div>
              </div>
              <div>
                <button className="bg-primary text-white py-2 px-3 rounded-full">
                  Submit
                </button>
              </div>
            </form>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default UnitEditModal;
