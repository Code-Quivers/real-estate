"use client";
import { Controller } from "react-hook-form";
import { Form, Input, Modal, useToaster } from "rsuite";
import { useForm } from "react-hook-form";
import { useRemoveTenantFromPropertyMutation } from "@/redux/features/propertyOwner/propertyApi";
import { useEffect } from "react";
import { LoginErrorMessage, LoginSuccessMessage } from "@/components/toasts/auth/authToastMessages";

const RemoveTenantModal = ({ tenantRemoveData, isOpenTenantRemove, handleCloseRemove }) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset: formReset,
  } = useForm();

  const [removeTenantFromProperty, { data, isLoading, isSuccess, isError, error, reset: resetReq }] = useRemoveTenantFromPropertyMutation();

  const handleRemoveTenant = async (reasonData) => {
    // console.log("nw data", newData);

    const removeData = {
      propertyId: tenantRemoveData?.propertyId,
      tenantId: tenantRemoveData?.Tenant?.tenantId,
      reasonForRemove: reasonData?.reasonForRemove,
    };

    await removeTenantFromProperty({ data: removeData });
  };

  //
  const toaster = useToaster();

  useEffect(() => {
    if ((isSuccess && !isLoading && !isError, !error && data)) {
      toaster.push(LoginSuccessMessage(data?.message), {
        placement: "bottomStart",
      });

      handleCloseRemove();
      resetReq();
      formReset();
    }

    // if error
    if ((!isSuccess && !isLoading && isError, error && !data)) {
      toaster.push(LoginErrorMessage(error?.message), {
        placement: "bottomStart",
      });
    }
  }, [isSuccess, isLoading, isError, error, data, toaster]);

  return (
    <>
      <Modal
        open={isOpenTenantRemove}
        onClose={() => {
          handleCloseRemove();
          resetReq();
        }}
        size="sm"
        dialogAs="div"
        overflow={false}
        className="h-auto bg-white mx-auto
       mt-20  rounded-xl "
      >
        <Modal.Body className="">
          <div>
            <div className="bg-red-500 flex justify-between items-center px-5 rounded-t-xl py-4">
              <h2>Delete Tenant</h2>
              <button onClick={handleCloseRemove}>x</button>
            </div>
            {/* Confirmation Message */}
            <div className="p-5">
              <h2>Are you sure you want to delete this Tenant?</h2>
              {/* Display Tenant Details */}
              <div>
                <p>
                  Name: {tenantRemoveData?.Tenant?.firstName} {tenantRemoveData?.Tenant?.lastName}
                </p>
                <p>Phone Number: {tenantRemoveData?.Tenant?.phoneNumber}</p>
                <p>Email: john.doe@example.com</p>
                <p>Address: 123 Main St, City, Country</p>
                {/* Add more relevant tenant details */}
              </div>
            </div>

            {/* Delete Button */}
            <div className="p-5  ">
              <form onSubmit={handleSubmit(handleRemoveTenant)}>
                <div>
                  <label htmlFor="">Reason for remove *</label>
                  <Controller
                    name="reasonForRemove"
                    control={control}
                    rules={{
                      required: "Reason is Required !",
                    }}
                    render={({ field }) => (
                      <div className="rs-form-control-wrapper ">
                        <Input as="textarea" rows={5} {...field} type="text" className="!w-full" placeholder="Reason for Remove..." />

                        <Form.ErrorMessage show={(!!errors?.reasonForRemove && !!errors?.reasonForRemove?.message) || false} placement="topEnd">
                          {errors?.reasonForRemove?.message}
                        </Form.ErrorMessage>
                      </div>
                    )}
                  />
                </div>

                <div className="flex justify-end gap-3 items-center">
                  <button
                    type="button"
                    onClick={() => {
                      handleCloseRemove();
                      resetReq();
                    }}
                    className="border  px-4 py-2 rounded mt-4"
                  >
                    Cancel
                  </button>
                  <button type="submit" className="bg-red-500 text-white px-4 py-2 rounded mt-4">
                    Remove
                  </button>
                </div>
              </form>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default RemoveTenantModal;
