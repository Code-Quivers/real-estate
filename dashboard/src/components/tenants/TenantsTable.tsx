"use client";
import { useMemo } from "react";
import {
  MantineReactTable,
  MRT_EditActionButtons,
  useMantineReactTable,
  type MRT_ColumnDef,
} from "mantine-react-table";
import { ActionIcon, Flex, Stack, Title, Tooltip } from "@mantine/core";
import { IconEdit, IconTrash } from "@tabler/icons-react";
import { useGetAllTenantsQuery } from "@/redux/api/features/tenantsApi";

// type Person = {
//   tenantName: string;
//   password: string;
//   rentAmount: number;
//   rentPaid: number;
// };

//nested data is ok, see accessorKeys in ColumnDef below
// const data: Person[] = [
//   {
//     tenantName: "John Doe",
//     password: "password",
//     rentAmount: 1000,
//     rentPaid: 900,
//   },
//   {
//     tenantName: "Jane Doe",
//     password: "password",
//     rentAmount: 1000,
//     rentPaid: 1000,
//   },
//   {
//     tenantName: "John Smith",
//     password: "password",
//     rentAmount: 1000,
//     rentPaid: 1000,
//   },
//   {
//     tenantName: "Jane Smith",
//     password: "password",
//     rentAmount: 1000,
//     rentPaid: 1000,
//   },
//   {
//     tenantName: "John Johnson",
//     password: "password",
//     rentAmount: 1000,
//     rentPaid: 1000,
//   },
//   {
//     tenantName: "Jane Johnson",
//     password: "password",
//     rentAmount: 1000,
//     rentPaid: 1000,
//   },
//   {
//     tenantName: "John Brown",
//     password: "password",
//     rentAmount: 1000,
//     rentPaid: 1000,
//   },
//   {
//     tenantName: "Jane Brown",
//     password: "password",
//     rentAmount: 1000,
//     rentPaid: 1000,
//   },
//   {
//     tenantName: "John White",
//     password: "password",
//     rentAmount: 1000,
//     rentPaid: 1000,
//   },
//   {
//     tenantName: "Jane White",
//     password: "password",
//     rentAmount: 1000,
//     rentPaid: 1000,
//   },
// ];

const TenantsTable = ({ tenantData, isLoading, isFetching }: any) => {
  //should be memoized or stable

  const columns = useMemo<MRT_ColumnDef<any>[]>(
    () => [
      {
        accessorKey: "password",
        header: "Password",
      },
      {
        accessorKey: "tenantName",
        header: "Property owner assigned to",
      },

      {
        accessorKey: "rentAmount",
        header: "Rent amount",
      },
      {
        accessorKey: "rentPaid",
        header: "Rent paid",
      },
    ],
    []
  );

  const table = useMantineReactTable({
    columns,
    data: tenantData, //must be memoized or stable (useState, useMemo, defined outside of this component, etc.)
    enableRowSelection: true,
    enableEditing: true,
    editDisplayMode: "modal",
    renderEditRowModalContent: ({ table, row, internalEditComponents }) => (
      <>
       <Stack>
        <Title order={3}>Edit User</Title>
        {internalEditComponents}
        <Flex justify="flex-end" mt="xl">
          <MRT_EditActionButtons variant="text" table={table} row={row} />
        </Flex>
      </Stack>
      </>
    ),
    positionActionsColumn: "last",
    initialState: { density: "xs" },
    renderRowActions: ({ row, table }) => (
      <Flex gap="md">
        <Tooltip label="Edit">
          <ActionIcon>
            <IconEdit onClick={() => table.setEditingRow(row)} />
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

export default TenantsTable;
