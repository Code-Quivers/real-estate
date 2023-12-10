import moment from 'moment';
import prisma from '../../../shared/prisma';

const getPPSubmissionDate = async () => {
  // Date working
  const today = new Date(moment(Date.now()).format('YYYY/MM/DD'));
  const endDay = new Date(
    moment(Date.now()).add(3, 'days').format('YYYY/MM/DD')
  );

  //   Querying on the database.
  const result = await prisma.pPSubmission.findMany({
    include: {
      Styles: {
        select: {
          styleNo: true,
          image: true,
          factory: true,
        },
      },
    },
    where: {
      factorySubmissionDate: {
        gte: today,
        lte: endDay,
      },
    },
    orderBy: {
      factorySubmissionDate: 'asc',
    },
  });

  return {
    data: result,
  };
};

export const NotificationService = {
  getPPSubmissionDate,
};
