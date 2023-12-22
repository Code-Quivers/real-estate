import express from 'express';
import { PropertyController } from './property.controllers';
import { FileUploadHelper } from '../../../helpers/FileUploadHelper';

const router = express.Router();

router.post(
  '/add',
  FileUploadHelper.uploadPropertyImages.array('files'),
  PropertyController.addProperty
);
router.get('/all', PropertyController.getProperties);
router.get('/single', PropertyController.getPropertyInfo);

export const PropertyRoutes = router;
