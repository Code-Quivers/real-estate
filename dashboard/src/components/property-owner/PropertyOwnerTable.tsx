"use client";
import { useMemo } from "react";
import {
  MantineReactTable,
  useMantineReactTable,
  type MRT_ColumnDef,
} from "mantine-react-table";
import { ActionIcon, Flex, Tooltip } from "@mantine/core";
import { IconEdit, IconTrash } from "@tabler/icons-react";

type Person = {
  email: string;
  password: string;
};

//nested data is ok, see accessorKeys in ColumnDef below
// const data: Person[] = [
//   {
//     email: "John Doe",
//     password: "password",
//   },
//   {
//     email: "Jane Doe",
//     password: "password",
//   },
//   {
//     email: "John Smith",
//     password: "password",
//   },
//   {
//     email: "Jane Smith",
//     password: "password",
//   },
//   {
//     email: "John Johnson",
//     password: "password",
//   },
//   {
//     email: "Jane Johnson",
//     password: "password",
//   },
//   {
//     email: "John Brown",
//     password: "password",
//   },
//   {
//     email: "Jane Brown",
//     password: "password",
//   },
//   {
//     email: "John White",
//     password: "password",
//   },
//   {
//     email: "Jane White",
//     password: "password",
//   },
// ];

const PropertyOwnerTable = ({ propertyOwners }: any) => {
  const { data } = propertyOwners;
  console.log(propertyOwners, "propertyOwners");
  //should be memoized or stable
  const columns = useMemo<MRT_ColumnDef<any>[]>(
    () => [
      {
        accessorFn: (row) => `${row.firstName} ${row.lastName}`,
        id: "name",
        header: "Name",
        Cell: ({ cell }) => {
          console.log(cell, "cell");
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
    data, //must be memoized or stable (useState, useMemo, defined outside of this component, etc.)
    enableRowSelection: true,
    enableEditing: true,
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
