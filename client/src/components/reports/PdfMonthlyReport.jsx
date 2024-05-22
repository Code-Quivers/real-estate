import { fileUrlKey } from "@/configs/envConfig";
import { Document, Image, Page, StyleSheet, Text } from "@react-pdf/renderer";

const PdfMonthlyReport = ({ reportData }) => {
  const styles = StyleSheet.create({
    body: {
      paddingTop: 35,
      paddingBottom: 65,
      paddingHorizontal: 35,
    },
  });
  console.log(reportData?.information[0]?.image);
  return (
    <>
      <Document>
        <Page size="A4" style={styles.body}>
          <Text>{reportData?.reportTitle}</Text>
          {/* <Image src={`${fileUrlKey()}/${reportData?.information[0]?.image}`} /> */}
        </Page>
      </Document>
    </>
  );
};

export default PdfMonthlyReport;
