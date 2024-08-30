"use client";
import { useMemo, useState } from "react";
import {
  MantineReactTable,
  MRT_PaginationState,
  useMantineReactTable,
  type MRT_ColumnDef,
} from "mantine-react-table";
import { ActionIcon, Flex, Tooltip } from "@mantine/core";
import { IconEdit, IconTrash } from "@tabler/icons-react";
import { useGetAllPropertyOwnerQuery } from "@/redux/api/features/propertyOwnerApi";

const PropertyOwnerTable = () => {
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
    data: propertyOwners,
    isLoading,
    isFetching,
  } = useGetAllPropertyOwnerQuery({ ...query });
  // !

  // @ts-ignore
  const { data } = propertyOwners || {};
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
        accessorKey: "password",
        header: "Password",
      },
      {
        accessorKey: "user.userName",
        header: "User name",
      },
      {
        accessorKey: "user.userStatus",
        header: "User status",
      },
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
      showSkeletons: isLoading,
    },
    enableRowSelection: true,
    enableEditing: true,
    enableColumnActions: false,
    positionActionsColumn: "last",
    initialState: { density: "xs" },
    renderRowActions: ({ row, table }) => (
      <Flex gap="md">
        <Tooltip label="Edit">
          <ActionIcon>
            <IconEdit />
          </ActionIcon>
        </Tooltip>
        <Tooltip label="Delete">
          <ActionIcon color="red">
            <IconTrash />
          </ActionIcon>
        </Tooltip>
      </Flex>
    ),
  });

  return <MantineReactTable table={table} />;
};

export default PropertyOwnerTable;
