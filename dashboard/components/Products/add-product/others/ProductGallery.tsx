/* eslint-disable @next/next/no-img-element */
import { Dropzone } from '@mantine/dropzone';
import { useRef, useState } from 'react';
import AddImageFromGalleryModal from '../image-gallery/AddImageFromGalleryModal';
import { useDisclosure } from '@mantine/hooks';
import { IconPlus } from '@tabler/icons-react';
import { Checkbox } from '@mantine/core';

const ProductGallery = () => {
  const openRef = useRef<() => void>(null);
  const [opened, { open, close }] = useDisclosure(false);
  const [files, setFiles] = useState<File[]>([]);

  const handleDrop = (droppedFiles: File[]) => {
    setFiles((prevFiles) => [...prevFiles, ...droppedFiles]);
    console.log('files', files);
  };
  const [checkedIndexes, setCheckedIndexes] = useState<number[]>([]);

  const handleCheckboxChange = (index: number) => {
    if (checkedIndexes.includes(index)) {
      // If index is already in checkedIndexes, remove it
      setCheckedIndexes(checkedIndexes.filter((i) => i !== index));
    } else {
      // If index is not in checkedIndexes, add it
      setCheckedIndexes([...checkedIndexes, index]);
    }
  };
  const handleRemoveCheckedFiles = () => {
    setFiles((prevFiles) => prevFiles.filter((file, index) => !checkedIndexes.includes(index)));
    setCheckedIndexes([]);
  };
  return (
    <section>
      {/* section title */}
      <div className="h-[30px]">
        {!checkedIndexes?.length ? (
          <h2 className="font-semibold">Media</h2>
        ) : (
          <div className="flex items-center  justify-between">
            <Checkbox label={`${checkedIndexes?.length} files selected`} checked={!!checkedIndexes?.length} indeterminate={checkedIndexes?.length !== files?.length} />
            <button type="button" onClick={handleRemoveCheckedFiles} className="font-semibold text-red-600 hover:underline">
              Remove
            </button>
          </div>
        )}
      </div>
      <div>
        {!files?.length ? (
          <section
            onClick={() => open()}
            className="flex h-[150px] cursor-pointer items-center justify-center rounded-lg border
    border-dashed border-[#a8a8a8] bg-white transition-all duration-300 hover:bg-[#f1f1f1]"
          >
            <div>
              <div className="flex items-center justify-center gap-3">
                <button
                  onClick={(event) => {
                    event.stopPropagation();
                    openRef.current?.();
                  }}
                  type="button"
                  className="rounded-md border border-[#ffff] bg-[#fff] px-4 py-0.5 text-base font-semibold shadow-inner ring-1 ring-[#e7e7e7] hover:bg-[#e7e7e7b2]"
                >
                  Upload new
                </button>

                <button onClick={() => open()} className="text-base font-semibold hover:underline" type="button">
                  Select existing
                </button>
              </div>
              <div className="flex items-center justify-center pt-2">
                <p className="text-base text-[#767676]">Drag and drop images or videos and files</p>
              </div>
            </div>
          </section>
        ) : (
          <div className="mt-4 grid grid-cols-6 gap-4">
            {files?.map((file, index) =>
              index < 7 ? (
                <div key={index} className={`group relative w-full overflow-hidden rounded-lg border border-[#dfdfdf]  ${index === 0 ? 'col-span-2 row-span-2' : ''}`}>
                  <img
                    src={URL.createObjectURL(file)}
                    alt={`Uploaded ${file.name}`}
                    className="h-full w-full object-cover transition-all duration-300 group-hover:brightness-50"
                    style={{ opacity: checkedIndexes.includes(index) ? 0.65 : 1 }}
                    onLoad={() => URL.revokeObjectURL(file as any)}
                  />
                  <div className={`absolute left-4 top-4 flex items-center justify-center ${!checkedIndexes?.length ? 'opacity-0 group-hover:opacity-100' : 'opacity-100'}`}>
                    <Checkbox checked={checkedIndexes.includes(index)} onChange={() => handleCheckboxChange(index)} aria-label={`Checkbox for image ${index}`} />
                  </div>
                </div>
              ) : index === 7 ? (
                <div key={index} className="relative w-full overflow-hidden rounded-lg shadow-lg">
                  <img src={URL.createObjectURL(file)} alt={`Uploaded ${file.name}`} className="h-full w-full object-cover blur" onLoad={() => URL.revokeObjectURL(file as any)} />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <p className="text-lg font-bold text-white">+{files?.length - 7}</p>
                  </div>
                </div>
              ) : null
            )}
            <div className="flex h-full w-full items-center justify-center  ">
              <button
                onClick={(event) => {
                  event.stopPropagation();
                  openRef.current?.();
                }}
                type="button"
                className="flex h-full  w-full items-center justify-center rounded-lg border border-dashed bg-white p-10"
              >
                <IconPlus />
              </button>
            </div>
          </div>
        )}
        {/* dropzone */}
        <Dropzone openRef={openRef} onDrop={handleDrop} activateOnClick={false} style={{ display: 'none' }} />
        {/* Dropzone content is hidden */}
        {/* modal */}
        <AddImageFromGalleryModal opened={opened} close={close} open={open} />
      </div>
    </section>
  );
};

export default ProductGallery;
