"use client";
import { useMemo, useState } from "react";
import dayjs from "dayjs";
import {
  MantineReactTable,
  MRT_PaginationState,
  MRT_Row,
  useMantineReactTable,
  type MRT_ColumnDef,
} from "mantine-react-table";
import { ActionIcon, Flex, Text, ThemeIcon, Tooltip } from "@mantine/core";
import { IconEdit, IconRefresh, IconTrash } from "@tabler/icons-react";
import PropertiesEditModal from "./propertiesComponents/PropertiesEditModal";
import {
  useDeletePropertyMutation,
  useGetAllPropertiesQuery,
  useUpdatePropertyDetailsMutation,
} from "@/redux/api/features/properties/propertiesApi";
import ServiceProviderPopover from "./propertiesComponents/ServiceProviderPopover";
import { modals } from "@mantine/modals";

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
  const {
    data: propertiesData,
    isLoading: isLoadingProperties,
    refetch,
  } = useGetAllPropertiesQuery({ ...query });
  const [deleteProperties, { isLoading: isDeleting }] =
    useDeletePropertyMutation();
  // @ts-ignore
  const { data } = propertiesData || {};
  // console.log(data, "data");
  const [validationErrors, setValidationErrors] = useState<{
    address?: string;
  }>({});
  // console.log(data, "data");
  //should be memoized or stable
  const columns = useMemo<MRT_ColumnDef<any>[]>(
    () => [
      {
        // accessorKey: "address",
        accessorFn: (row) => row?.address,
        id: "address",
        header: "Address",
        Cell: ({ cell }) => (
          <>
            <div className="text-wrap">{cell.getValue<any>()}</div>
          </>
        ),
        // minSize: 100,
        // maxSize: 200,
        size: 150,
      },
      {
        accessorFn: (row) => row?.owner?.user?.email,
        id: "owner",
        header: "Owner email",
        Cell: ({ cell }) => (
          <>
            <div>{cell.getValue<any>()}</div>
          </>
        ),
        Edit: () => null,
        // enableEditing: () => false,
        minSize: 100,
        maxSize: 200,
        size: 150,
      },
      {
        accessorFn: (row) => (row.Tenant ? row.Tenant.user.email : "N/A"),
        id: "tenantAssigned",
        // accessorKey: "Tenant.user.email",
        header: "Tenant Assigned",
        Cell: ({ cell }) => (
          <>
            <div>{cell.getValue<any>()}</div>
          </>
        ),
        // enableEditing: () => false,
        Edit: () => null,
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
        // enableEditing: () => false,
        Edit: () => null,
        minSize: 100,
        maxSize: 200,
        size: 100,
      },
      {
        accessorFn: (row) => (row.isRented ? "Yes" : "No"),
        id: "propertyRented",
        header: "Property Rented",
        enableEditing: () => false,
        Edit: () => null,
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
        // accessorKey: "monthlyRent",
        accessorFn: (row) =>
          Number(row?.monthlyRent)?.toLocaleString("en-US", {
            style: "currency",
            currency: "USD",
          }),
        header: "Rent Amount",
        enableEditing: () => false,
        Edit: () => null,
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
        // enableEditing: () => false,
        Edit: () => null,
        Header: ({ column }) => (
          <div>
            <p>Rent</p>
            <p>paid</p>
          </div>
        ),
        maxSize: 80,
      },
      {
        accessorFn: (row) =>
          row?.Tenant?.paymentDeadline === "N/A" ||
          !row?.Tenant?.paymentDeadline
            ? "N/A"
            : dayjs(row?.Tenant?.paymentDeadline).format("MMMM D, YYYY"),
        accessorKey: "paymentDeadline",
        header: "Payment Deadline",
        // renderEditCell: () => null,
        Edit: () => null,
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

  // update
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

  // delete properties
  const handleDeleteTenant = async (propertyId: string) => {
    try {
      await deleteProperties({ propertyId });
      modals.closeAll();
    } catch (error) {
      // console.log(error, "error");
    }
  };
  // delete properties model
  const openDeleteConfirmModal = (row: MRT_Row<any>) => {
    console.log(row, "row");
    const propertyId = row?.original?.propertyId;
    modals.openConfirmModal({
      // title: "Are you sure you want to delete this user?",
      children: (
        <Text>
          Are you sure you want to delete?
          <div className="mt-1 border bg-gray-100 p-2 rounded-md flex items-center gap-3">
            <ThemeIcon color="red" variant="outline">
              <IconTrash style={{ width: "70%", height: "70%" }} />
            </ThemeIcon>
            <div>
              <p className="font-medium">{row?.original?.title}</p>
              <p className="text-xs">{row?.original?.address}</p>
            </div>
          </div>
          <strong>
            {/* {row.original.firstName} {row.original.lastName}? */}
          </strong>{" "}
          <br />
          This action cannot be undone.
        </Text>
      ),
      labels: { confirm: "Delete", cancel: "Cancel" },
      confirmProps: { color: "red" },
      closeOnConfirm: false,
      onConfirm: () => handleDeleteTenant(propertyId),
    });
  };
  const table = useMantineReactTable({
    columns,
    data: data || [], //must be memoized or stable (useState, useMemo, defined outside of this component, etc.)
    // enableRowSelection: true,
    layoutMode: "grid",
    enableColumnActions: false,
    enableEditing: true,
    editDisplayMode: "modal",
    // @ts-ignore
    rowCount: propertiesData?.meta?.total,
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
    // renderTopToolbarCustomActions: () => (
    //   <Tooltip label="Refresh Data">
    //     <ActionIcon onClick={() => refetch()}>
    //       <IconRefresh />
    //     </ActionIcon>
    //   </Tooltip>
    // ),
    onEditingRowSave: handleUpdateProperty,
    state: {
      pagination,
      // isLoading,
      // isLoading: isLoadingProperties,
      // isSaving: isLoadingProperties,
      showSkeletons: isLoading || isLoadingProperties || isDeleting,
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

export default PropertiesTable;
