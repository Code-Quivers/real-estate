import { Button, Popover, Table, Text } from "@mantine/core";

const ServiceProviderPopover = ({ row }: any) => {
  console.log(row.original.serviceProviders, "row");
  const elements = [
    { position: 6, mass: 12.011, symbol: "C", name: "Carbon" },
    { position: 7, mass: 14.007, symbol: "N", name: "Nitrogen" },
    { position: 39, mass: 88.906, symbol: "Y", name: "Yttrium" },
    { position: 56, mass: 137.33, symbol: "Ba", name: "Barium" },
    { position: 58, mass: 140.12, symbol: "Ce", name: "Cerium" },
  ];
  const rows = elements.map((element) => (
    <Table.Tr key={element.name}>
      <Table.Td>{element.position}</Table.Td>
      <Table.Td>{element.name}</Table.Td>
      <Table.Td>{element.symbol}</Table.Td>
      <Table.Td>{element.mass}</Table.Td>
    </Table.Tr>
  ));
  return (
    <>
      {row?.original?.serviceProviders?.length > 0 ? (
        <Popover>
          <Popover.Target>
            <Button variant="transparent" size="compact-xs">
              View
            </Button>
          </Popover.Target>
          <Popover.Dropdown>
            {row.original.serviceProviders.map(
              (serviceProvider: any, index: number) => (
                <div key={index} className="space-y-2">
                  <div className="flex text-xs border rounded-md p-2 gap-7 shadow">
                    <div className="">
                      <p>{`${serviceProvider?.firstName} ${serviceProvider?.lastName}`}</p>
                      <p>{serviceProvider?.user?.email}</p>
                    </div>
                    <div>
                      <p>{`${serviceProvider?.companyName}`}</p>
                      <p>{`${serviceProvider?.companyPhoneNumber}`}</p>
                    </div>
                  </div>
                </div>
              )
            )}
          </Popover.Dropdown>
        </Popover>
      ) : (
        <p>N/A</p>
      )}
    </>
  );
};

export default ServiceProviderPopover;
