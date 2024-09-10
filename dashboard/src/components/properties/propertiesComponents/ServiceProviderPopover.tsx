import { Button, Popover, Table, Text } from "@mantine/core";

const ServiceProviderPopover = ({ row }: any) => {
  return (
    <>
      {row?.original?.serviceProviders?.length > 0 ? (
        <Popover styles={{ dropdown: { paddingLeft: 6, paddingRight: 6 } }}>
          <Popover.Target>
            <Button variant="transparent" size="compact-xs">
              View
            </Button>
          </Popover.Target>
          <Popover.Dropdown>
            <div className="space-y-3">
              {row?.original?.serviceProviders?.map(
                (serviceProvider: any, index: number) => (
                  <div key={index}>
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
            </div>
          </Popover.Dropdown>
        </Popover>
      ) : (
        <p>N/A</p>
      )}
    </>
  );
};

export default ServiceProviderPopover;
