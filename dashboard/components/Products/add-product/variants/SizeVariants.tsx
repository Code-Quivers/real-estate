'use client';
import { ActionIcon, Button, ColorInput, InputBase, NumberInput, Pill, TagsInput, TextInput } from '@mantine/core';
import { Dropzone } from '@mantine/dropzone';
import { IconPhotoUp, IconPlus, IconTrash } from '@tabler/icons-react';
import { useState } from 'react';

const SizeVariants = ({ form }: any) => {
  const [colorToggle, setColorToggle] = useState<boolean | null>(null);

  const handleSizeList = () => {
    form.insertListItem('sizeList', form.getValues().size);
    form.setFieldValue('size', '');
  };
  const sizeList = form.getValues().sizeList;
  return (
    <>
      <div className="flex gap-3">
        <label htmlFor="">Size</label>
        <TextInput placeholder="Red" key={form.key('size')} {...form.getInputProps('size')} />
        <Button variant="light" color="" onClick={handleSizeList}>
          Add
        </Button>
        {sizeList?.length > 0 && (
          <InputBase component="div" multiline>
            <Pill.Group>
              {sizeList?.map((color: any, idx: any) => (
                <Pill key={idx} withRemoveButton onRemove={() => form.removeListItem('sizeList', idx)}>
                  {color}
                </Pill>
              ))}
            </Pill.Group>
          </InputBase>
        )}
      </div>
    </>
  );
};

export default SizeVariants;
