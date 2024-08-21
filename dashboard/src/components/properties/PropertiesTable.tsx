"use client";
import { useMemo } from "react";
import {
  MantineReactTable,
  useMantineReactTable,
  type MRT_ColumnDef,
} from "mantine-react-table";
import { ActionIcon, Flex, Tooltip } from "@mantine/core";
import { IconEdit, IconTrash } from "@tabler/icons-react";

// type Person = {
//   email: string;
//   password: string;
// };

//nested data is ok, see accessorKeys in ColumnDef below
const data = [
  {
    address: "123 Street FL",
    owner: "John Doe",
    tenantAssigned: "Jhon Cena",
    serviceProvider: "Selim Brothers",
    propertyRented: "Yes",
    rentAmount: 1000,
    rentPaid: 900,
    paymentDeadline: "2022-12-12",
    password: "password",
  },
  {
    address: "123 Street FL",
    owner: "John Doe",
    tenantAssigned: "Jhon Cena",
    serviceProvider: "Selim Brothers",
    propertyRented: "Yes",
    rentAmount: 1000,
    rentPaid: 900,
    paymentDeadline: "2022-12-12",
    password: "password",
  },
  {
    address: "123 Street FL",
    owner: "John Doe",
    tenantAssigned: "Jhon Cena",
    serviceProvider: "Selim Brothers",
    propertyRented: "Yes",
    rentAmount: 1000,
    rentPaid: 900,
    paymentDeadline: "2022-12-12",
    password: "password",
  },
  {
    address: "123 Street FL",
    owner: "John Doe",
    tenantAssigned: "Jhon Cena",
    serviceProvider: "Selim Brothers",
    propertyRented: "Yes",
    rentAmount: 1000,
    rentPaid: 900,
    paymentDeadline: "2022-12-12",
    password: "password",
  },
  {
    address: "123 Street FL",
    owner: "John Doe",
    tenantAssigned: "Jhon Cena",
    serviceProvider: "Selim Brothers",
    propertyRented: "Yes",
    rentAmount: 1000,
    rentPaid: 900,
    paymentDeadline: "2022-12-12",
    password: "password",
  },
  {
    address: "123 Street FL",
    owner: "John Doe",
    tenantAssigned: "Jhon Cena",
    serviceProvider: "Selim Brothers",
    propertyRented: "Yes",
    rentAmount: 1000,
    rentPaid: 900,
    paymentDeadline: "2022-12-12",
    password: "password",
  },
  {
    address: "123 Street FL",
    owner: "John Doe",
    tenantAssigned: "Jhon Cena",
    serviceProvider: "Selim Brothers",
    propertyRented: "Yes",
    rentAmount: 1000,
    rentPaid: 900,
    paymentDeadline: "2022-12-12",
    password: "password",
  },
  {
    address: "123 Street FL",
    owner: "John Doe",
    tenantAssigned: "Jhon Cena",
    serviceProvider: "Selim Brothers",
    propertyRented: "Yes",
    rentAmount: 1000,
    rentPaid: 900,
    paymentDeadline: "2022-12-12",
    password: "password",
  },
  {
    address: "123 Street FL",
    owner: "John Doe",
    tenantAssigned: "Jhon Cena",
    serviceProvider: "Selim Brothers",
    propertyRented: "Yes",
    rentAmount: 1000,
    rentPaid: 900,
    paymentDeadline: "2022-12-12",
    password: "password",
  },
  {
    address: "123 Street FL",
    owner: "John Doe",
    tenantAssigned: "Jhon Cena",
    serviceProvider: "Selim Brothers",
    propertyRented: "Yes",
    rentAmount: 1000,
    rentPaid: 900,
    paymentDeadline: "2022-12-12",
    password: "password",
  },
];

const PropertiesTable = () => {
  //should be memoized or stable
  const columns = useMemo<MRT_ColumnDef<any>[]>(
    () => [
      {
        accessorKey: "address",
        header: "Address",
      },
      {
        accessorKey: "password",
        header: "Owner",
      },
      {
        accessorKey: "tenantAssigned",
        header: "Tenant Assigned",
      },
      {
        accessorKey: "serviceProvider",
        header: "Service Provider",
      },
      {
        accessorKey: "propertyRented",
        header: "Property Rented",
      },
      {
        accessorKey: "rentAmount",
        header: "Rent Amount",
      },
      {
        accessorKey: "rentPaid",
        header: "Rent Paid",
      },
      {
        accessorKey: "paymentDeadline",
        header: "Payment Deadline",
      },
    ],
    []
  );

  const table = useMantineReactTable({
    columns,
    data, //must be memoized or stable (useState, useMemo, defined outside of this component, etc.)
    enableRowSelection: true,
    enableColumnActions: false,
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

export default PropertiesTable;
