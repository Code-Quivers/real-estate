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
import PropertiesEditModal from "./propertiesComponents/PropertiesEditModal";
import {
  useGetAllPropertiesQuery,
  useUpdatePropertyDetailsMutation,
} from "@/redux/api/features/properties/propertiesApi";
import ServiceProviderPopover from "./propertiesComponents/ServiceProviderPopover";

const PropertiesTable = () => {
  const query: any = {};
  // Store pagination state in your own state
  const [pagination, setPagination] = useState<MRT_PaginationState>({
    pageIndex: 0,
    pageSize: 10, // customize the default page size
  });
  query["limit"] = pagination.pageSize;
  query["page"] = pagination.pageIndex + 1;
  // pagination
  const { data: propertiesData, isLoading: isLoadingProperties } =
    useGetAllPropertiesQuery({ ...query });

  // @ts-ignore
  const { data } = propertiesData || {};
  const [validationErrors, setValidationErrors] = useState<{
    address?: string;
  }>({});
  //should be memoized or stable
  const columns = useMemo<MRT_ColumnDef<any>[]>(
    () => [
      {
        accessorKey: "address",
        header: "Address",
        minSize: 100,
        maxSize: 200,
        size: 150,
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
        minSize: 100,
        maxSize: 200,
        size: 150,
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
        maxSize: 130,
        // maxSize: 160,
      },
      {
        accessorKey: "serviceProvider",
        header: "Service Provider",
        Header: ({ column }) => (
          <div>
            <p>Service</p>
            <p>Provider</p>
          </div>
        ),
        Cell: ({ row }) => <ServiceProviderPopover row={row} />,
        enableEditing: () => false,
        minSize: 100,
        maxSize: 200,
        size: 100,
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
        Header: ({ column }) => (
          <div>
            <p>Property</p>
            <p>rented</p>
          </div>
        ),
        size: 100,
        maxSize: 150,
      },
      {
        accessorKey: "monthlyRent",
        header: "Rent Amount",
        enableEditing: () => false,
        Header: ({ column }) => (
          <div>
            <p>Rent</p>
            <p>amount</p>
          </div>
        ),
        maxSize: 120,
        size: 80,
      },
      {
        accessorFn: (row) => (row?.Tenant?.rentPaid ? "Yes" : "No"),
        header: "Rent Paid",
        enableEditing: () => false,
        Header: ({ column }) => (
          <div>
            <p>Rent</p>
            <p>paid</p>
          </div>
        ),
        maxSize: 80,
      },
      {
        accessorFn: (row) => row?.Tenant?.paymentDeadline ?? "N/A",
        accessorKey: "paymentDeadline",
        header: "Payment Deadline",
        enableEditing: () => false,
        Header: ({ column }) => (
          <div>
            <p>Payment</p>
            <p>Deadline</p>
          </div>
        ),
        maxSize: 120,
        size: 80,
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
    data: data || [], //must be memoized or stable (useState, useMemo, defined outside of this component, etc.)
    // enableRowSelection: true,
    layoutMode: "grid",
    enableColumnActions: false,
    enableEditing: true,
    editDisplayMode: "modal",
    rowCount: data?.meta?.total,
    manualPagination: true,
    paginationDisplayMode: "pages",
    onPaginationChange: setPagination, // hoist pagination state to your state when it changes internally
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
      pagination,
      isSaving: isLoadingProperties,
      showSkeletons: isLoading,
    },
    positionActionsColumn: "last",
    initialState: { density: "xs" },
    renderRowActions: ({ row, table }) => (
      <Flex gap="md" w="200">
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
