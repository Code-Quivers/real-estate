import fs from 'fs';
import { logger } from '../shared/logger';

const create_required_directories = () => {
  /**
   *   create required directories if they are not already exist during the application starup.
   **/

  // create data directory
  if (!fs.existsSync('./data')) {
    fs.mkdirSync('./data');
  }

  // create uploads directory
  if (!fs.existsSync('./data/uploads')) {
    fs.mkdirSync('./data/uploads');
  }

  // Create user directory
  if (!fs.existsSync('./data/uploads/users')) {
    fs.mkdirSync('./data/uploads/users');
  }

  // Create tack pack directory
  if (!fs.existsSync('./data/uploads/tackpack')) {
    fs.mkdirSync('./data/uploads/tackpack');
  }

  // Create styles directory
  if (!fs.existsSync('./data/uploads/styles')) {
    fs.mkdirSync('./data/uploads/styles');
  }

  // Create orders directory
  if (!fs.existsSync('./data/uploads/orders')) {
    fs.mkdirSync('./data/uploads/orders');
  }

  // Create backup directory where database backup file will be stored.
  if (!fs.existsSync('./data/backup')) {
    fs.mkdirSync('./data/backup');
  }

  logger.info('Directories Successfully Created!!!');
};

export default create_required_directories;
