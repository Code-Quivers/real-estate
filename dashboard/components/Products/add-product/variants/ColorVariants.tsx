'use client';
import { ActionIcon, Button, ColorInput, InputBase, NumberInput, Pill, TagsInput, TextInput } from '@mantine/core';
import { Dropzone } from '@mantine/dropzone';
import { IconPhotoUp, IconPlus, IconTrash } from '@tabler/icons-react';
import { useState } from 'react';

const ColorVariants = ({ form }: any) => {
  const [sizeToggle, setSizeToggle] = useState<boolean | null>(null);
  const [colorName, setColorName] = useState<string>('');
  // const [colorList, setColorList] = useState<string[]>([]);

  // console.log('color', form.getValues().color);
  // console.log('colorList', form.getValues().colorList);
  const colorList = form.getValues().colorList;
  console.log('colorList', colorList);
  const handleColorList = () => {
    // form.setFieldValue('color', '');
    form.insertListItem('colorList', form.getValues().color);
    // form.insertListItem('variantList', { color: form.getValues().color });
    form.setFieldValue('color', '');
    // console.log('variantList', form.getValues().variantList);
    // if (colorList?.length > 0) {
    //   console.log('colorList', colorList);
    // }
  };

  return (
    <>
      <div className="flex gap-3">
        <label htmlFor="">Color</label>
        <TextInput placeholder="Red" key={form.key('color')} {...form.getInputProps('color')} />
        <Button variant="light" color="" onClick={handleColorList}>
          Add
        </Button>
        {colorList?.length > 0 && (
          <InputBase component="div" multiline>
            <Pill.Group>
              {colorList?.map((color: any, idx: any) => (
                <Pill key={idx} withRemoveButton onRemove={() => form.removeListItem('colorList', idx)}>
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

export default ColorVariants;
