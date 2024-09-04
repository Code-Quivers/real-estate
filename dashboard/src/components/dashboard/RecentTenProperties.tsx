import { fileUrlKey } from "@/helpers/config/envConfig";
import { Avatar, Table } from "@mantine/core";
import { IconBath, IconBed } from "@tabler/icons-react";

const RecentTenProperties = ({ recentProperties }: any) => {
  return (
    <div className="bg-white rounded-md shadow-md mb-10">
      <h1 className="font-medium text-lg p-5">Recent ten properties</h1>
      <Table.ScrollContainer minWidth={500}>
        <Table
          styles={{
            thead: { color: "#475569", fontWeight: 600 },
            tr: { color: "#1e293b" },
          }}
          verticalSpacing={"md"}
          horizontalSpacing={"lg"}
          // highlightOnHover
          // withTableBorder
        >
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Property</Table.Th>
              <Table.Th>Address</Table.Th>
              <Table.Th>Monthly rent</Table.Th>
              <Table.Th>Rented</Table.Th>
              <Table.Th>Property owner</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {recentProperties?.length > 0 &&
              recentProperties?.map((property: any, index: number) => (
                <Table.Tr key={index}>
                  <Table.Td>
                    <div>
                      <p className="font-medium">{property?.title}</p>
                      <div>
                        <div className="flex gap-2 items-center">
                          <IconBed size={18} />{" "}
                          <span className="border-r pr-3">
                            {property?.numOfBed}
                          </span>
                          <IconBath size={18} />
                          <span>{property?.numOfBath}</span>
                        </div>
                      </div>
                    </div>
                  </Table.Td>
                  <Table.Td>
                    <div className="w-44">{property?.address}</div>
                  </Table.Td>
                  <Table.Td>
                    <div>
                      {property?.monthlyRent?.toLocaleString("en-US", {
                        style: "currency",
                        currency: "USD",
                      })}
                    </div>
                  </Table.Td>
                  <Table.Td>
                    <div>{property?.isRented ? "Yes" : "No"}</div>
                  </Table.Td>
                  <Table.Td>
                    <div className="flex items-center gap-2">
                      <div>
                        <Avatar
                          src={`${fileUrlKey()}/${
                            property?.owner?.profileImage
                          }`}
                          alt="Vitaly Rtishchev"
                          color="violet"
                        >
                          {property?.owner?.firstName?.charAt(0)}
                          {property?.owner?.lastName?.charAt(0)}
                        </Avatar>
                      </div>
                      <div>
                        <p className="font-medium">
                          {property?.owner?.firstName}{" "}
                          {property?.owner?.lastName}
                        </p>
                        <p className="text-xs">
                          {property?.owner?.user?.email}
                        </p>
                      </div>
                    </div>
                  </Table.Td>
                </Table.Tr>
              ))}
          </Table.Tbody>
        </Table>
      </Table.ScrollContainer>
    </div>
  );
};

export default RecentTenProperties;
