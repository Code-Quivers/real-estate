"use client";

import { useState } from "react";
import { Button, Drawer } from "rsuite";

const DigitalSignatureDocumentDrawer = ({ field }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <div>
        <Button onClick={() => setIsOpen(true)}>Pdf Modal</Button>
      </div>
      <div>
        <Drawer placement="bottom" size="full" open={isOpen} onClose={() => setIsOpen(false)}>
          <Drawer.Header>
            <Drawer.Title>Drawer Title</Drawer.Title>
            <Drawer.Actions>
              <Button onClick={() => setIsOpen(false)}>Cancel</Button>
              <Button onClick={() => setIsOpen(false)} appearance="primary">
                Confirm
              </Button>
            </Drawer.Actions>
          </Drawer.Header>
          <Drawer.Body>
            <div>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Accusantium est culpa numquam error ab inventore atque corrupti mollitia nihil
              quis!
            </div>
          </Drawer.Body>
        </Drawer>
      </div>
    </div>
  );
};

export default DigitalSignatureDocumentDrawer;
