"use client";

import { FailedUpdate, SuccessUpdate } from "@/components/toasts/notifications/ToastNotificationMessages";
import { useUpdateExtraCostMutation } from "@/redux/features/propertyOwner/propertyOwnerApi";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { Button, Form, InputNumber, Modal, useToaster } from "rsuite";

const UpdateExtraCostModal = ({ open, handleClose, modalData }) => {
  const [updateExtraCost, { data, isLoading, isError, isSuccess, error, reset }] = useUpdateExtraCostMutation();

  const {
    control,
    formState: { errors },
    handleSubmit,
    reset: resetForm,
  } = useForm();
  const handleUpdateExtraCost = async (updatedData) => {
    //
    await updateExtraCost({
      data: {
        cost: parseFloat(updatedData?.cost),
      },
    });
  };
  // ! side effect
  const toaster = useToaster();
  useEffect(() => {
    if ((isSuccess && !isLoading && !isError, !error && data)) {
      toaster.push(SuccessUpdate(data?.message), {
        placement: "bottomStart",
      });
      resetForm();
      reset();
      handleClose();
    }

    // if error
    if ((!isSuccess && !isLoading && isError, error && !data)) {
      toaster.push(FailedUpdate(error?.message), {
        placement: "bottomStart",
      });
    }
  }, [isSuccess, isLoading, isError, error, data, reset, resetForm]);

  return (
    <div>
      <Modal size="sm" dialogAs="div" overflow={false} className="bg-white  mx-auto mt-10 p-5 rounded-lg" open={open} onClose={handleClose}>
        <Modal.Header>
          <Modal.Title>
            <h1 className="font-medium">Add Cost of This Month</h1>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <form onSubmit={handleSubmit(handleUpdateExtraCost)}>
              <div>
                <div className="flex justify-between items-center">
                  <label htmlFor="cost">Add Cost</label>
                  <h2>Current Cost : ${modalData?.cost}</h2>
                </div>
                <Controller
                  name="cost"
                  control={control}
                  rules={{
                    required: "Cost is Required !",
                    min: {
                      value: modalData?.cost,
                      message: "Cost should be greater than previous",
                    },
                  }}
                  render={({ field }) => (
                    <div className="rs-form-control-wrapper ">
                      <InputNumber prefix="$" {...field} className="!w-full mt-2" defaultValue={modalData?.cost} min={modalData?.cost} />
                      <Form.ErrorMessage show={(!!errors?.cost && !!errors?.cost?.message) || false} placement="topEnd">
                        {errors?.cost?.message}
                      </Form.ErrorMessage>
                    </div>
                  )}
                />
              </div>
              <div className="flex justify-end gap-5 items-center mt-5">
                <button onClick={handleClose} type="button" className="hover:underline">
                  Cancel
                </button>
                <Button loading={isLoading} type="submit" className="!bg-primary !text-white !rounded-lg">
                  Add
                </Button>
              </div>
            </form>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default UpdateExtraCostModal;
