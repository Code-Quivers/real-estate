// "use client";

// import puppeteer from "puppeteer";
// import { Button } from "rsuite";

// const generatePDF = async (htmlContent, options) => {
//   const browser = await puppeteer.launch();
//   const page = await browser.newPage();

//   // Set content
//   await page.setContent(htmlContent);

//   // Wait for rendering
//   await new Promise((resolve) => setTimeout(resolve, 1000)); // Adjust as necessary

//   // Generate PDF
//   const pdfBuffer = await page.pdf(options);

//   // Close browser
//   await browser.close();

//   return pdfBuffer;
// };

// const GenerateMonthlyReportPdf = async ({ reportData }) => {
//   const htmlContent = `
//     <html>
//       <body >
//        <div>
//        <h2>Hello Pdf</h2>
//        </div>
//      </body>
//     </html>`;

//   const pdfBuffer = await generatePDF(htmlContent, { format: "Letter", orientation: "portrait", border: "1cm" });

//   return (
//     <div>
//       <div className="my-10 md:mt-20 flex justify-center items-center">
//         <Button type="button" size="lg" className="!bg-primary !text-white !rounded-3xl !text-xl !px-10 !py-5 ">
//           Download
//         </Button>
//       </div>
//     </div>
//   );
// };

// export default GenerateMonthlyReportPdf;
