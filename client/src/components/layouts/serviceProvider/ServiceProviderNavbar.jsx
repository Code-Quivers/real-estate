"use client";
import { useState } from "react";
import { Drawer, Button, Placeholder } from "rsuite";

const ServiceProviderNavbar = () => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };
  return (
    <div className="md:hidden">
      <Button size="xs" onClick={() => handleOpen()}>
        Menu
      </Button>
      <Drawer
        size="xs"
        placement="left"
        open={open}
        onClose={() => setOpen(false)}
      >
        <Drawer.Header>
          <Drawer.Title>Drawer Title</Drawer.Title>
          <Drawer.Actions>
            <Button onClick={() => setOpen(false)}>Cancel</Button>
            <Button onClick={() => setOpen(false)} appearance="primary">
              Confirm
            </Button>
          </Drawer.Actions>
        </Drawer.Header>
        <Drawer.Body>
          <Placeholder.Paragraph rows={8} />
        </Drawer.Body>
      </Drawer>
    </div>
  );
};

export default ServiceProviderNavbar;
