"use client";
import { useMemo, useState } from "react";
import {
  MantineReactTable,
  MRT_PaginationState,
  MRT_Row,
  useMantineReactTable,
  type MRT_ColumnDef,
} from "mantine-react-table";
import {
  ActionIcon,
  Box,
  Flex,
  LoadingOverlay,
  rem,
  Text,
  Tooltip,
} from "@mantine/core";
import { modals } from "@mantine/modals";
import {
  IconCheck,
  IconEdit,
  IconExclamationCircleFilled,
  IconTrash,
} from "@tabler/icons-react";
import {
  useDeleteFinancialAccountMutation,
  useGetPaymentReportsQuery,
} from "@/redux/api/features/paymentApi";
import { notifications } from "@mantine/notifications";
import { useDisclosure } from "@mantine/hooks";
// import TenantsEditModal from "./TenantsComponents/TenantsEditModal";

const PaymentTable = ({}: any) => {
  const [
    deleteFinancialAccount,
    { isLoading: isLoadingDelete, isError: isDeleteError, error: deleteError },
  ] = useDeleteFinancialAccountMutation();
  console.log(isLoadingDelete, "isLoadingDelete");
  const query: any = {};

  // Store pagination state in your own state
  const [pagination, setPagination] = useState<MRT_PaginationState>({
    pageIndex: 0,
    pageSize: 15, // customize the default page size
  });

  query["limit"] = pagination.pageSize;
  query["page"] = pagination.pageIndex + 1;
  const {
    data: paymentReports,
    isLoading,
    isFetching,
  } = useGetPaymentReportsQuery({ ...query });

  //   console.log(data, "data");
  // @ts-ignore
  const { data } = paymentReports || {};
  // console.log(data, "data");

  //should be memoized or stable

  const columns = useMemo<MRT_ColumnDef<any>[]>(
    () => [
      {
        // accessorKey: "id",
        accessorFn: (row) => row?.id || "N/A",
        header: "ID",
        size: 100,
      },
      {
        // accessorKey: "business_profile.name",
        accessorFn: (row) =>
          `${row?.individual?.first_name || "N/A"} ${
            row?.individual?.last_name || ""
          }`,
        header: "Name",
        id: "name",
        Cell: ({ cell }) => (
          <>
            <div className="text-wrap">{cell.getValue<any>()}</div>
          </>
        ),
        size: 150,
        // maxSize: 150,
      },
      {
        // accessorKey: "business_profile.name",
        accessorFn: (row) =>
          row?.individual?.dob
            ? `${row?.individual?.dob?.month}/${row?.individual?.dob?.day}/${row?.individual?.dob?.year}`
            : "N/A",
        header: "DOB",
        size: 100,
      },
      {
        // accessorKey: "email",
        accessorFn: (row) =>
          row?.individual?.email ? row?.individual?.email : "N/A",
        header: "Email",
        size: 150,
      },
      // address
      // {
      //   accessorFn: (row) => row?.individual?.address?.line1 || "N/A",
      //   id: "address",
      //   header: "Address",
      //   Cell: ({ row }) => (
      //     <div>
      //       {row?.original?.individual?.address?.line1 ? (
      //         <>
      //           <span>{row?.original?.individual?.address?.line1}</span> <br />
      //           <span>{row?.original?.individual?.address?.city}</span>
      //           {", "}
      //           {row?.original?.individual?.address?.state}{" "}
      //           {row?.original?.individual?.address?.postal_code}
      //         </>
      //       ) : (
      //         "N/A"
      //       )}
      //     </div>
      //   ),
      // },
      {
        accessorFn: (row) => row?.individual?.phone || "N/A",
        header: "Phone",
        size: 110,
      },
      {
        accessorFn: (row) =>
          row?.external_accounts?.data[0]?.bank_name || "N/A",
        header: "Bank Name",
        size: 150,
      },
      {
        accessorFn: (row) => row?.external_accounts?.data[0]?.last4 || "N/A",
        header: "Last 4",
        size: 90,
      },
      {
        accessorFn: (row) =>
          row?.external_accounts?.data[0]?.routing_number || "N/A",
        header: "Routing Number",
        Header: () => (
          <div>
            <p>Routing</p>
            <p>Number</p>
          </div>
        ),
        size: 100,
      },
      {
        accessorFn: (row) => (row?.details_submitted ? "Yes" : "No"),
        header: "Details Submitted",
        Header: () => (
          <div>
            <p>Details</p>
            <p>Submitted</p>
          </div>
        ),
        size: 120,
      },
      {
        accessorFn: (row) => (row?.payouts_enabled ? "Yes" : "No"),
        header: "Payouts Enabled",
        Header: () => (
          <div>
            <p>Payouts</p>
            <p>Enabled</p>
          </div>
        ),
        size: 120,
      },
    ],
    []
  );

  const handleDeleteTenant = async (accountId: string) => {
    try {
      modals.closeAll();
      const id = notifications.show({
        loading: true,
        title: "Deleting account",
        message: "Please wait while we delete the account.",
        autoClose: false,
        withCloseButton: false,
        position: "top-right",
        withBorder: true,
      });
      const response = await deleteFinancialAccount(accountId);
      console.log(response, "response");
      if ((response?.data as { success?: boolean })?.success) {
        notifications.update({
          id,
          loading: false,
          message: "Account deleted successfully",
          title: "Account deleted",
          autoClose: 4000,
          color: "Green",
          position: "top-right",
          icon: <IconCheck />,
          withBorder: true,
          withCloseButton: true,
        });
      } else {
        notifications.update({
          id,
          loading: false,
          message: "Failed to delete account",
          title: "Failed",
          autoClose: 4000,
          color: "red",
          position: "top-right",
          icon: <IconExclamationCircleFilled />,
          withBorder: true,
          withCloseButton: true,
        });
      }
    } catch (error) {
      // console.log(error, "error");
    }
  };
  // delete tenant
  const openDeleteConfirmModal = async (row: MRT_Row<any>) =>
    modals.openConfirmModal({
      title: "Delete account",
      children: (
        <Text>
          Are you sure you want to delete this account
          <br />
          <strong>{row?.original?.id} ?</strong> <br />
          This action cannot be undone.
        </Text>
      ),
      labels: { confirm: "Delete", cancel: "Cancel" },
      confirmProps: { color: "red" },
      closeOnConfirm: false,
      onConfirm: () => handleDeleteTenant(row?.original?.id),
    });

  const table = useMantineReactTable({
    columns,
    data: data?.data || [],
    manualPagination: true,
    onPaginationChange: setPagination, // hoist pagination state to your state when it changes internally
    // @ts-ignore
    rowCount: data?.meta?.total || 0,
    layoutMode: "grid",
    paginationDisplayMode: "pages",
    state: {
      pagination,
      // isSaving: isUpdating,
      isLoading: isLoading,
      showSkeletons: isLoading || isFetching || isLoadingDelete,
    },
    //must be memoized or stable (useState, useMemo, defined outside of this component, etc.)
    // enableRowSelection: true,
    enableEditing: true,
    // onEditingRowSave: handleSaveTenant,
    editDisplayMode: "modal",
    // mantineSkeletonProps: {
    //   // visible: true,
    //   animate: true,
    // },

    enableColumnActions: false,
    positionActionsColumn: "last",
    initialState: { density: "xs" },
    renderRowActions: ({ row, table }) => (
      <Flex gap="md" justify="center">
        {/* <Tooltip label="Edit">
          <ActionIcon onClick={() => table.setEditingRow(row)}>
            <IconEdit />
          </ActionIcon>
        </Tooltip> */}
        <Tooltip label="Delete" onClick={() => openDeleteConfirmModal(row)}>
          <ActionIcon color="red">
            <IconTrash />
          </ActionIcon>
        </Tooltip>
      </Flex>
    ),
  });

  return <MantineReactTable table={table} />;
};

export default PaymentTable;
