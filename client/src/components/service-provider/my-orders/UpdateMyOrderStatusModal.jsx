"use client";

import { useUpdateMaintenanceOrderRequestMutation } from "@/redux/features/maintenanceRequest/maintenanceRequestApi";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { Button, Modal, Notification, SelectPicker, useToaster } from "rsuite";

const UpdateMyOrderStatusModal = ({ isOpen, handleClose, editData, handleCloseDrawer }) => {
  const { control, handleSubmit, reset: resetForm, watch } = useForm({});
  const { status } = watch();
  const [updateMaintenanceOrderRequest, { data, isLoading, isSuccess, isError, error, reset }] = useUpdateMaintenanceOrderRequestMutation();

  const handleUpdateOrder = async (updatedData) => {
    await updateMaintenanceOrderRequest({ data: updatedData, maintenanceRequestId: editData?.maintenanceRequestId });
  };

  // ! side effect
  const toaster = useToaster();
  useEffect(() => {
    if (!isLoading && isSuccess && !isError) {
      toaster.push(
        <Notification header="Success" type="success" closable>
          {data?.message || "Successfully Updated"}
        </Notification>,
        { placement: "bottomStart", duration: 3000 },
      );
      reset();
      handleClose();

      resetForm();
      if (handleCloseDrawer) {
        handleCloseDrawer();
      }
    }
    if (!isLoading && !isSuccess && isError && error) {
      toaster.push(
        <Notification header="Error" type="error" closable>
          {error?.message || "Failed to Updated"}
        </Notification>,
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
          if (handleCloseDrawer) {
            handleCloseDrawer();
          }
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
                    if (handleCloseDrawer) {
                      handleCloseDrawer();
                    }
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
// "use client";

// import { useUpdateMaintenanceOrderRequestMutation } from "@/redux/features/maintenanceRequest/maintenanceRequestApi";
// import { useEffect, useState } from "react";
// import { Controller, useForm } from "react-hook-form";
// import { Button, Dropdown, Message, Popover, SelectPicker, Whisper, useToaster } from "rsuite";

// const UpdateMyOrderStatusModal = ({ editData }) => {
//   const { control, handleSubmit, reset: resetForm, watch } = useForm({});
//   const { status } = watch();
//   const [updateMaintenanceOrderRequest, { data, isLoading, isSuccess, isError, error, reset }] = useUpdateMaintenanceOrderRequestMutation();

//   const handleUpdateOrder = async (updatedData) => {
//     await updateMaintenanceOrderRequest({ data: updatedData, maintenanceRequestId: editData?.maintenanceRequestId });
//   };

//   // ! side effect
//   const toaster = useToaster();
//   useEffect(() => {
//     if (!isLoading && isSuccess && !isError) {
//       toaster.push(
//         <Message showIcon centered type="success" closable>
//           {data?.message || "Successfully Updated"}
//         </Message>,
//         { placement: "bottomStart", duration: 5000 },
//       );
//       reset();

//       resetForm();
//     }
//     if (!isLoading && !isSuccess && isError && error) {
//       toaster.push(
//         <Message showIcon centered type="error" closable>
//           {error?.message || "Failed to Updated"}
//         </Message>,
//         { placement: "bottomStart", duration: 5000 },
//       );
//       reset();
//     }
//   }, [isLoading, isSuccess, isError, data, error, reset]);
//   const [selectedStatus, setSelectedStatus] = useState(editData?.status);

//   const handleStatusSelect = (eventKey) => {
//     setSelectedStatus(eventKey);
//   };
//   return (
//     <div>
//       <Whisper
//         placement="bottomEnd"
//         trigger="click"
//         speaker={
//           <Popover className="!w-[350px]">
//             <div className="">
//               <div>
//                 <h2>Want to update status?</h2>
//               </div>
//               <form onSubmit={handleSubmit(handleUpdateOrder)}>
//                 <div>
//                   <Controller
//                     name="status"
//                     control={control}
//                     rules={{
//                       required: {
//                         message: "Status is Required",
//                       },
//                     }}
//                     render={({ field }) => (
//                       <div className="space-y-1">
//                         <label className="font-medium text-base">Order Status</label>
//                         <div>
//                           <Dropdown
//                             // {...field}
//                             title={selectedStatus || editData?.status}
//                             activeKey={editData?.status}
//                             menuStyle={{
//                               width: "100% !important",
//                             }}
//                             appearance="ghost"
//                             onSelect={(e) => {
//                               handleStatusSelect(e);
//                               field.onChange(e);
//                             }}
//                           >
//                             <Dropdown.Item eventKey="PAUSED">PAUSED</Dropdown.Item>
//                             <Dropdown.Item eventKey="COMPLETED">COMPLETED</Dropdown.Item>
//                             <Dropdown.Item eventKey="CANCEL" disabled>
//                               CANCEL
//                             </Dropdown.Item>
//                             <Dropdown.Item eventKey="ACTIVE" disabled>
//                               ACTIVE
//                             </Dropdown.Item>
//                           </Dropdown>
//                         </div>
//                       </div>
//                     )}
//                   />
//                 </div>
//                 <div className="mt-5 flex justify-end   gap-3">
//                   <Button
//                     onClick={() => {
//                       resetForm();
//                     }}
//                     type="button"
//                     appearance="subtle"
//                   >
//                     Cancel
//                   </Button>
//                   <Button disabled={!status} loading={isLoading} type="submit" className="!bg-primary !text-white">
//                     Submit
//                   </Button>
//                 </div>
//               </form>
//             </div>
//           </Popover>
//         }
//       >
//         <Button>Click</Button>
//       </Whisper>
//     </div>
//   );
// };

// export default UpdateMyOrderStatusModal;
