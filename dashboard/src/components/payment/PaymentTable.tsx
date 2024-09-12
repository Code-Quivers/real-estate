"use client";
import { useMemo, useState } from "react";
import {
  MantineReactTable,
  MRT_PaginationState,
  MRT_Row,
  useMantineReactTable,
  type MRT_ColumnDef,
} from "mantine-react-table";
import { ActionIcon, Flex, Text, Tooltip } from "@mantine/core";
import { modals } from "@mantine/modals";
import { IconEdit, IconTrash } from "@tabler/icons-react";
import { useGetPaymentReportsQuery } from "@/redux/api/features/paymentApi";
// import TenantsEditModal from "./TenantsComponents/TenantsEditModal";

const PaymentTable = ({}: any) => {
  //   const [deleteTenantData, { isLoading: isDeleting }] =
  //     useDeleteTenantDataMutation();

  const query: any = {};

  // Store pagination state in your own state
  const [pagination, setPagination] = useState<MRT_PaginationState>({
    pageIndex: 0,
    pageSize: 5, // customize the default page size
  });

  query["limit"] = pagination.pageSize;
  query["page"] = pagination.pageIndex + 1;
  const { data, isLoading, isFetching } = useGetPaymentReportsQuery({});

  console.log(data, "data");
  // @ts-ignore
  //   const { data } = tenantsData || {};
  // !

  //should be memoized or stable

  const columns = useMemo<MRT_ColumnDef<any>[]>(
    () => [
      {
        accessorKey: "user.email",
        header: "Email",
        enableEditing: false,
      },
      {
        // accessorKey: "password",
        accessorFn: (row) => "********",
        header: "Password",
      },

      {
        accessorFn: (row) =>
          Number(row?.dueRent)?.toLocaleString("en-US", {
            style: "currency",
            currency: "USD",
          }),
        // accessorKey: "dueRent",
        header: "Rent amount",
      },
      {
        accessorFn: (row) => (row.rentPaid ? "Yes" : "No"),
        header: "Rent paid",
      },
    ],
    []
  );

  const validateRequired = (values: any) => values?.length > 0;

  const handleDeleteTenant = async (tenantId: string) => {
    try {
      //   await deleteTenantData({ tenantId });
      modals.closeAll();
    } catch (error) {
      // console.log(error, "error");
    }
  };
  // delete tenant
  const openDeleteConfirmModal = async (row: MRT_Row<any>) =>
    modals.openConfirmModal({
      // title: "Are you sure you want to delete this user?",
      children: (
        <Text>
          Are you sure you want to delete{" "}
          <strong>
            {row.original.firstName} {row.original.lastName}?
          </strong>{" "}
          <br />
          This action cannot be undone.
        </Text>
      ),
      labels: { confirm: "Delete", cancel: "Cancel" },
      confirmProps: { color: "red" },
      closeOnConfirm: false,
      onConfirm: () => handleDeleteTenant(row.original.tenantId),
    });

  const table = useMantineReactTable({
    columns,
    data: [],
    manualPagination: true,
    onPaginationChange: setPagination, // hoist pagination state to your state when it changes internally
    // @ts-ignore
    // rowCount: tenantsData?.meta?.total,
    paginationDisplayMode: "pages",
    state: {
      //   pagination,
      // isSaving: isUpdating,
      // isLoading: isLoading,
      //   showSkeletons: isUpdating || isLoading || isDeleting,
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
      <Flex gap="md">
        <Tooltip label="Edit">
          <ActionIcon onClick={() => table.setEditingRow(row)}>
            <IconEdit />
          </ActionIcon>
        </Tooltip>
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
