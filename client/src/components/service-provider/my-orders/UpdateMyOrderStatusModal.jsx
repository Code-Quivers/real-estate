"use client";

import { useUpdateMaintenanceOrderRequestMutation } from "@/redux/features/maintenanceRequest/maintenanceRequestApi";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { Button, Message, Modal, SelectPicker, useToaster } from "rsuite";

const UpdateMyOrderStatusModal = ({ isOpen, handleClose, editData }) => {
  const { control, handleSubmit, reset: resetForm, watch } = useForm({});
  const { status } = watch();
  const [updateMaintenanceOrderRequest, { data, isLoading, isSuccess, isError, error, reset }] = useUpdateMaintenanceOrderRequestMutation();

  const handleUpdateOrder = async (updatedData) => {
    await updateMaintenanceOrderRequest({ data: updatedData, maintenanceRequestId: editData?.maintenanceRequestId });
  };
  const toaster = useToaster();
  useEffect(() => {
    if (!isLoading && isSuccess && !isError) {
      toaster.push(
        <Message showIcon centered type="success" closable>
          {data?.message || "Successfully Updated"}
        </Message>,
        { placement: "bottomStart", duration: 5000 },
      );
      reset();
      handleClose();
      resetForm();
    }
    if (!isLoading && !isSuccess && isError && error) {
      toaster.push(
        <Message showIcon centered type="error" closable>
          {error?.message || "Failed to Updated"}
        </Message>,
        { placement: "bottomStart", duration: 5000 },
      );
      reset();
    }
  }, [isLoading, isSuccess, isError, data, error, reset]);
  return (
    <div>
      <Modal
        overflow={false}
        dialogAs="div"
        className="bg-white mx-auto  rounded-lg mt-10"
        size={400}
        open={isOpen}
        onClose={() => {
          handleClose();
          resetForm();
        }}
      >
        <Modal.Body>
          <div className="p-5">
            <div>
              <h2>WAnt to update status?</h2>
            </div>
            <form onSubmit={handleSubmit(handleUpdateOrder)}>
              <div>
                <Controller
                  name="status"
                  control={control}
                  rules={{
                    required: {
                      message: "Status is Required",
                    },
                  }}
                  render={({ field }) => (
                    <div className="space-y-1">
                      <label className="font-medium text-base">Order Status</label>
                      <div>
                        <SelectPicker
                          label="Status"
                          cleanable={false}
                          searchable={false}
                          defaultValue={editData?.status}
                          {...field}
                          disabledItemValues={["ACTIVE", "CANCEL"]}
                          data={["PAUSED", "COMPLETED", "CANCEL", "ACTIVE"].map((item) => ({
                            label: item,
                            value: item,
                          }))}
                          className="!w-full"
                        />
                      </div>
                    </div>
                  )}
                />
              </div>
              <div className="mt-5 flex justify-end   gap-3">
                <Button
                  onClick={() => {
                    handleClose();
                    resetForm();
                  }}
                  type="button"
                  appearance="subtle"
                >
                  Cancel
                </Button>
                <Button disabled={!status} loading={isLoading} type="submit" className="!bg-primary !text-white">
                  Submit
                </Button>
              </div>
            </form>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default UpdateMyOrderStatusModal;
