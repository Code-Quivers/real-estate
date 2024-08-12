import { Dropzone } from '@mantine/dropzone';
import { IconPhotoUp } from '@tabler/icons-react';

const VariantImage = () => {
  return (
    <>
      <Dropzone className="flex items-center" onDrop={(files) => console.log('accepted files', files)} onReject={(files) => console.log('rejected files', files)} maxSize={5 * 1024 ** 2}>
        <IconPhotoUp />
      </Dropzone>
    </>
  );
};

export default VariantImage;
