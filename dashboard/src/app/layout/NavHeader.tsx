import { Avatar, Menu, Popover, UnstyledButton } from "@mantine/core";

const NavHeader = () => {
  return (
    <>
      <div className="flex justify-between items-start px-5 w-full">
        <div className="py-4">Welcome back, Edward 👋</div>
        <div className="py-3 pr-5">
          <Menu trigger="click" position="bottom-end" width={150} shadow="md">
            <Menu.Target>
              <UnstyledButton>
                <Avatar color="cyan" radius="xl">
                  MK
                </Avatar>
              </UnstyledButton>
            </Menu.Target>
            <Menu.Dropdown>
              <Menu.Item component="a" href="https://mantine.dev">
                Profile
              </Menu.Item>
              <Menu.Item component="a" href="https://mantine.dev">
                Log out
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
          {/* <Popover.Target>
            <Avatar color="cyan" radius="xl">
              MK
            </Avatar>
            <Popover.Dropdown>
              Change position and offset to configure dropdown offset relative
              to target
            </Popover.Dropdown>
          </Popover.Target> */}
        </div>
      </div>
    </>
  );
};

export default NavHeader;
