"use client";

import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { IoClose } from "react-icons/io5";
import { Button, Form, InputNumber, Modal, Notification, useToaster } from "rsuite";
import { useUpdateMonthlyOrAnnualReportDataMutation } from "@/redux/features/reports/reportsApi";

const EditMonthlyOrAnnualReportModal = ({ reportData, isOpen, handleClose }) => {
  const {
    control,
    formState: { errors },
    handleSubmit,
    reset: resetForm,
  } = useForm();

  //  add new monthly or annual report
  const [updateMonthlyOrAnnualReportData, { data, isLoading, isError, isSuccess, error, reset: resetReq }] =
    useUpdateMonthlyOrAnnualReportDataMutation();

  // submit
  const handleUpdateReport = async (postData) => {
    const newReportData = {
      collectedRent: postData?.collectedRent ? parseFloat(postData?.collectedRent) : undefined,
      expenses: postData?.expenses ? parseFloat(postData?.expenses) : undefined,
    };

    await updateMonthlyOrAnnualReportData({
      data: newReportData,
      reportId: reportData?.reportId,
    });
  };

  // ! side effect
  const toaster = useToaster();
  useEffect(() => {
    if (!isLoading && !isError && isSuccess) {
      toaster.push(
        <Notification type="success" header="success" closable>
          <div>
            <p className="text-lg font-semibold mb-2">{data?.message || "Successfully Updated"}</p>
          </div>
        </Notification>,
        {
          placement: "bottomStart",
        },
      );
      handleClose();
      resetForm();
      resetReq();
    }
    if (!isLoading && isError && !isSuccess && error) {
      toaster.push(
        <Notification type="error" header="Error" closable>
          <div>
            <p className="text-lg font-semibold mb-2">{error?.message || "Failed to  Update"}</p>
          </div>
        </Notification>,
        {
          placement: "bottomStart",
        },
      );
    }
  }, [isLoading, isError, isSuccess, error, toaster]);

  return (
    <div>
      <Modal
        size="sm"
        onClose={() => {
          handleClose();
          resetForm();
        }}
        overflow={false}
        open={isOpen}
      >
        <Modal.Body>
          {/* heading title */}
          <div className="flex justify-between items-center">
            <h2 className="font-medium">Edit Report Details</h2>
            <button
              onClick={() => {
                handleClose();
                resetForm();
              }}
              className="hover:scale-125 duration-300"
            >
              <IoClose size={20} />
            </button>
          </div>
          {/* form */}
          <form onSubmit={handleSubmit(handleUpdateReport)}>
            <div className="my-5 space-y-5">
              <div className="space-y-2  pb-5">
                {/* collected rent */}
                <div className="space-y-1">
                  <label htmlFor="collectedRent">Collected Rent</label>
                  <Controller
                    name="collectedRent"
                    control={control}
                    rules={{
                      min: {
                        value: 0,
                        message: "Collected Rent must be greater than or equal to 0",
                      },
                    }}
                    render={({ field }) => (
                      <div className="rs-form-control-wrapper ">
                        <InputNumber
                          defaultValue={reportData?.collectedRent}
                          prefix="$"
                          min={0}
                          max={999999999999999}
                          step={0.1}
                          className="!w-full"
                          {...field}
                          type="text"
                          placeholder="Collected Rent..."
                          formatter={(value) => {
                            if (!isNaN(value)) {
                              return `${value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
                            }
                            return "";
                          }}
                          parser={(value) => parseInt(value.replace(/\D/g, ""), 10) || 0}
                        />
                        <Form.ErrorMessage show={(!!errors?.collectedRent && !!errors?.collectedRent?.message) || false} placement="topEnd">
                          {errors?.collectedRent?.message}
                        </Form.ErrorMessage>
                      </div>
                    )}
                  />
                </div>
                {/* Monthly Expenses */}
                <div className="space-y-1">
                  <label htmlFor="expenses"> Expenses</label>
                  <Controller
                    name="expenses"
                    rules={{
                      min: {
                        value: 0,
                        message: "Expenses must be greater than or equal to 0",
                      },
                    }}
                    control={control}
                    render={({ field }) => (
                      <div className="rs-form-control-wrapper ">
                        <InputNumber
                          prefix="$"
                          defaultValue={reportData?.expenses}
                          min={0}
                          max={999999999999999}
                          step={0.1}
                          className="!w-full"
                          {...field}
                          type="text"
                          placeholder="Expenses..."
                          formatter={(value) => {
                            if (!isNaN(value)) {
                              return `${value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
                            }
                            return "";
                          }}
                          parser={(value) => parseInt(value.replace(/\D/g, ""), 10) || 0}
                        />

                        <Form.ErrorMessage show={(!!errors?.expenses && !!errors?.expenses?.message) || false} placement="topEnd">
                          {errors?.expenses?.message}
                        </Form.ErrorMessage>
                      </div>
                    )}
                  />
                </div>
              </div>
            </div>
            {/* submit or cancel */}
            <div className="flex justify-end items-center gap-5">
              <button
                type="button"
                onClick={() => {
                  handleClose();
                  resetForm();
                }}
                className="hover:underline"
              >
                Close
              </button>

              <Button loading={isLoading} type="submit" className="!bg-primary !text-white !rounded-full !px-5 !py-2.5">
                Submit
              </Button>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default EditMonthlyOrAnnualReportModal;
