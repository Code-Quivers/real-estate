"use client";
import Image from "next/image";
import house10 from "@/assets/tenant/units (3).jpg";
import house11 from "@/assets/tenant/units (2).jpg";
import house12 from "@/assets/tenant/units (4).jpg";
import house6 from "@/assets/tenant/units (5).jpg";
import React from "react";
import { Button, Modal } from "rsuite";

const AvailableUnitsModal = ({ open, setOpen, units }) => {
  console.log(units);

  const handleClose = () => setOpen(false);
  return (
    <div>
      <Modal size={"lg"} open={open} onClose={handleClose}>
        <Modal.Body>
          <div className="flex justify-between items-center">
            <div className="w-2/5">
              <Image
                className="h-60 object-cover"
                width="full"
                objectFit="cover"
                src={units?.image}
                alt="Tenant avialable units"
              />
              <Image
                className="h-60 object-cover"
                width="full"
                src={units?.image}
                alt="Tenant avialable units"
              />
              <Image
                className="h-60 object-cover"
                width="full"
                objectFit="cover"
                src={units?.image}
                alt="Tenant avialable units"
              />
              <Image
                className="h-60 object-cover"
                width="full"
                objectFit="cover"
                src={units?.image}
                alt="Tenant avialable units"
              />
            </div>
            <div className="w-3/5"></div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleClose} appearance="subtle">
            Cancel
          </Button>
          <Button onClick={handleClose} appearance="primary">
            Ok
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default AvailableUnitsModal;
