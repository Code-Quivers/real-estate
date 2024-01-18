"use client";
import { useState } from "react";
import { Drawer, Placeholder, IconButton } from "rsuite";
import { GiHamburgerMenu } from "react-icons/gi";
import { useGetPropertyOwnerMyProfileQuery } from "@/redux/features/propertyOwner/propertyOwnerApi";

const PropertyOwnerDrawer = () => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const { data } = useGetPropertyOwnerMyProfileQuery(null);
  const { data: myProfileData } = data || {};
  return (
    <div>
      <div className="border-b py-1 shadow-lg flex justify-between items-center pr-3">
        <div>
          <IconButton
            circle
            icon={<GiHamburgerMenu size={30} />}
            size="xs"
            onClick={() => handleOpen()}
          />
        </div>
        <div>
          <p className="font-semibold">
            {myProfileData?.firstName} {myProfileData?.lastName}
          </p>
        </div>
      </div>
      <div>
        <Drawer
          size="xs"
          placement="left"
          open={open}
          onClose={() => setOpen(false)}
        >
          <Drawer.Header>
            <Drawer.Title>Menu</Drawer.Title>
            {/* <Drawer.Actions>
              <Button onClick={() => setOpen(false)}>Cancel</Button>
              <Button onClick={() => setOpen(false)} appearance="primary">
                Confirm
              </Button>
            </Drawer.Actions> */}
          </Drawer.Header>
          <Drawer.Body>
            <Placeholder.Paragraph rows={8} />
          </Drawer.Body>
        </Drawer>
      </div>
    </div>
  );
};

export default PropertyOwnerDrawer;
