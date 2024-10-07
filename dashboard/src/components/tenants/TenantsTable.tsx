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
import {
  IconCheck,
  IconEdit,
  IconExclamationCircleFilled,
  IconTrash,
} from "@tabler/icons-react";
import {
  useDeleteTenantDataMutation,
  useGetAllTenantsQuery,
  useUpdateTenantProfileMutation,
} from "@/redux/api/features/tenantsApi";
import TenantsEditModal from "./TenantsComponents/TenantsEditModal";
import { notifications } from "@mantine/notifications";

const TenantsTable = ({}: any) => {
  const [updateTenant, { isLoading: isUpdating }] =
    useUpdateTenantProfileMutation();
  const [deleteTenantData, { isLoading: isDeleting }] =
    useDeleteTenantDataMutation();
  // !
  const query: any = {};

  // Store pagination state in your own state
  const [pagination, setPagination] = useState<MRT_PaginationState>({
    pageIndex: 0,
    pageSize: 5, // customize the default page size
  });

  query["limit"] = pagination.pageSize;
  query["page"] = pagination.pageIndex + 1;
  const {
    data: tenantsData,
    isLoading,
    isFetching,
  } = useGetAllTenantsQuery({ ...query });
  // @ts-ignore
  const { data } = tenantsData || {};
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
        accessorFn: (row) => `${row.firstName} ${row.lastName}`,
        header: "Property owner assigned to",
        id: "propertyOwner",
        Cell: ({ cell }) => (
          <>
            <div>{cell.getValue<any>()}</div>
          </>
        ),
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

  const handleDeleteTenant = async (tenantId: string) => {
    modals.closeAll();
    const id = notifications.show({
      loading: true,
      title: "Deleting tenant",
      message: "Please wait while we delete the tenant",
      autoClose: false,
      withCloseButton: false,
      position: "top-right",
      color: "blue",
      withBorder: true,
    });
    try {
      const response = await deleteTenantData({ tenantId });
      if ((response?.data as { success?: boolean })?.success) {
        notifications.update({
          id,
          loading: false,
          message: "Tenant deleted successfully",
          title: "Tenant data deleted",
          autoClose: 3000,
          withCloseButton: true,
          position: "top-right",
          icon: <IconCheck />,
          color: "green",
          withBorder: true,
        });
      } else {
        notifications.update({
          id,
          loading: false,
          message: "Failed to delete Tenant",
          title: "Failed to delete",
          withCloseButton: true,
          position: "top-right",
          color: "red",
          icon: <IconExclamationCircleFilled />,
          withBorder: true,
          autoClose: 3000,
        });
      }
    } catch (error) {
      // console.log(error, "error");
    }
  };
  // delete tenant
  const openDeleteConfirmModal = async (row: MRT_Row<any>) =>
    modals.openConfirmModal({
      title: "Delete tenant",
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
    data: data || [],
    manualPagination: true,
    onPaginationChange: setPagination, // hoist pagination state to your state when it changes internally
    // @ts-ignore
    rowCount: tenantsData?.meta?.total,
    paginationDisplayMode: "pages",
    state: {
      pagination,
      // isSaving: isUpdating,
      // isLoading: isLoading,
      showSkeletons: isUpdating || isLoading || isDeleting,
    },
    // enableRowSelection: true,
    enableEditing: true,
    // onEditingRowSave: handleSaveTenant,
    editDisplayMode: "modal",
    renderEditRowModalContent: ({ table, row, internalEditComponents }) => (
      <TenantsEditModal
        table={table}
        updateTenant={updateTenant}
        row={row}
        internalEditComponents={internalEditComponents}
      />
    ),
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

export default TenantsTable;
