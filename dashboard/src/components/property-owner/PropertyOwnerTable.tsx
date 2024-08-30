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
import { IconEdit, IconTrash } from "@tabler/icons-react";
import {
  useDeletePropertyOwnerDataMutation,
  useGetAllPropertyOwnerQuery,
  useUpdatePropertyOwnerProfileMutation,
} from "@/redux/api/features/propertyOwnerApi";
import { modals } from "@mantine/modals";
import PropertyOwnerEditModal from "./PropertyOwnerEditModal";

const PropertyOwnerTable = () => {
  const [updatePropertyOwner, { isLoading: isUpdating }] =
    useUpdatePropertyOwnerProfileMutation();
  const [deletePropertyOwnerData, { isLoading: isDeleting }] =
    useDeletePropertyOwnerDataMutation();
  // !
  const query: any = {};
  // Store pagination state in your own state
  const [pagination, setPagination] = useState<MRT_PaginationState>({
    pageIndex: 0,
    pageSize: 5, // customize the default page size
  });
  query["limit"] = pagination.pageSize;
  query["page"] = pagination.pageIndex + 1;
  const { data: propertyOwners, isLoading } = useGetAllPropertyOwnerQuery({
    ...query,
  });
  // !

  // @ts-ignore
  const { data } = propertyOwners || {};

  //

  // delete property owner
  const handleDeleteTenant = async (propertyOwnerId: string) => {
    await deletePropertyOwnerData({ propertyOwnerId });
  };
  const openDeleteConfirmModal = async (row: MRT_Row<any>) =>
    modals.openConfirmModal({
      title: "Are you sure you want to delete this user?",
      children: (
        <Text>
          Are you sure you want to delete {row.original?.firstName}{" "}
          {row.original?.lastName}? This action cannot be undone.
        </Text>
      ),
      labels: { confirm: "Delete", cancel: "Cancel" },
      confirmProps: { color: "red" },
      onConfirm: () => handleDeleteTenant(row.original?.propertyOwnerId),
    });

  //should be memoized or stable
  const columns = useMemo<MRT_ColumnDef<any>[]>(
    () => [
      {
        accessorFn: (row) => `${row.firstName} ${row.lastName}`,
        id: "name",
        header: "Name",
        Cell: ({ cell }) => {
          return (
            <>
              <div>{cell.getValue<any>()}</div>
            </>
          );
        },
      },
      {
        accessorKey: "user.email",
        header: "Email",
      },
      {
        accessorFn: (row) => "********",
        header: "Password",
      },
      {
        accessorKey: "user.userName",
        header: "User name",
      },
      // {
      //   accessorKey: "user.userStatus",
      //   header: "User status",
      // },
    ],
    []
  );

  const table = useMantineReactTable({
    columns,
    data: data || [], //must be memoized or stable (useState, useMemo, defined outside of this component, etc.)
    rowCount: data?.meta?.total,
    paginationDisplayMode: "pages",
    manualPagination: true,
    onPaginationChange: setPagination, // hoist pagination state to your state when it changes internally
    state: {
      pagination,
      // isSaving: isUpdating,
      // isLoading: isLoading,
      showSkeletons: isLoading || isUpdating || isDeleting,
    },
    // enableRowSelection: true,
    enableEditing: true,
    renderEditRowModalContent: ({ table, row }) => (
      <PropertyOwnerEditModal
        table={table}
        updatePropertyOwner={updatePropertyOwner}
        row={row}
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
        <Tooltip label="Delete">
          <ActionIcon color="red" onClick={() => openDeleteConfirmModal(row)}>
            <IconTrash />
          </ActionIcon>
        </Tooltip>
      </Flex>
    ),
  });

  return <MantineReactTable table={table} />;
};

export default PropertyOwnerTable;
