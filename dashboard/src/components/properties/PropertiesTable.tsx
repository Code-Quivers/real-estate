"use client";
import { useMemo, useState } from "react";
import {
  MantineReactTable,
  useMantineReactTable,
  type MRT_ColumnDef,
} from "mantine-react-table";
import { ActionIcon, Flex, Tooltip } from "@mantine/core";
import { IconEdit, IconTrash } from "@tabler/icons-react";
import PropertiesEditModal from "./propertiesComponents/PropertiesEditModal";
import { useUpdatePropertyDetailsMutation } from "@/redux/api/features/properties/propertiesApi";

const PropertiesTable = ({ properties, queryLoading }: any) => {
  const { data } = properties;
  const [validationErrors, setValidationErrors] = useState<{
    address?: string;
  }>({});
  //should be memoized or stable
  const columns = useMemo<MRT_ColumnDef<any>[]>(
    () => [
      {
        accessorKey: "address",
        header: "Address",
        minSize: 100, //min size enforced during resizing
        maxSize: 200, //max size enforced during resizing
        size: 180, //medium column
      },
      {
        accessorFn: (row) => row.owner.user.email,
        id: "owner",
        header: "Owner",
        Cell: ({ cell }) => (
          <>
            <div>{cell.getValue<any>()}</div>
          </>
        ),
        enableEditing: () => false,
      },
      {
        accessorFn: (row) =>
          row.Tenant ? row.Tenant.user.email : "No Tenant Assigned",
        id: "tenantAssigned",
        // accessorKey: "Tenant.user.email",
        header: "Tenant Assigned",
        Cell: ({ cell }) => (
          <>
            <div>{cell.getValue<any>()}</div>
          </>
        ),
        enableEditing: () => false,
      },
      {
        accessorKey: "serviceProvider",
        header: "Service Provider",
        enableEditing: () => false,
      },
      {
        accessorFn: (row) => (row.isRented ? "Yes" : "No"),
        id: "propertyRented",
        header: "Property Rented",
        enableEditing: () => false,
        Cell: ({ cell }) => (
          <>
            <div>{cell.getValue<any>()}</div>
          </>
        ),
      },
      {
        accessorKey: "monthlyRent",
        header: "Rent Amount",
        enableEditing: () => false,
      },
      {
        accessorFn: (row) => (row?.Tenant?.rentPaid ? "Yes" : "No"),
        header: "Rent Paid",
        enableEditing: () => false,
      },
      {
        accessorFn: (row) => row?.Tenant?.paymentDeadline,
        accessorKey: "paymentDeadline",
        header: "Payment Deadline",
        enableEditing: () => false,
      },
    ],
    []
  );
  const validateRequired = (values: any) => values?.length > 0;
  const validateAddress = (property: any) => {
    return {
      address: validateRequired(property?.address) ? "" : "Address is required",
    };
  };
  //
  const [updatePropertyDetails, { isLoading, isSuccess, error }] =
    useUpdatePropertyDetailsMutation();
  //
  const handleUpdateProperty = async ({ values, table, row }: any) => {
    const propertyId = row.original.propertyId;
    const newValidationErrors = validateAddress(values);
    if (Object.values(newValidationErrors).some((error) => error)) {
      setValidationErrors(newValidationErrors);
      return;
    }
    // update tenant
    try {
      await updatePropertyDetails({ data: values, propertyId });
      table.setEditingRow(null);
    } catch (error) {
      console.log(error, "error");
    }

    // console.log(values, "values");
  };

  const table = useMantineReactTable({
    columns,
    data, //must be memoized or stable (useState, useMemo, defined outside of this component, etc.)
    enableRowSelection: true,
    // layoutMode: "semantic",
    enableColumnActions: false,
    enableEditing: true,
    editDisplayMode: "modal",
    renderEditRowModalContent: ({ table, row, internalEditComponents }) => (
      <PropertiesEditModal
        table={table}
        row={row}
        internalEditComponents={internalEditComponents}
        isLoading={isLoading}
      />
    ),
    onEditingRowSave: handleUpdateProperty,
    state: {
      isSaving: queryLoading,
      showSkeletons: isLoading,
    },
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
