import DocumentPage from "@/components/property-owner/documents/DocumentPage";

export const metadata = {
  title: "Documents",
};
const page = () => {
  return (
    <section className="max-w-[1050px]    mb-5  xl:mx-auto md:px-3 lg:px-5 px-5    2xl:px-0 ">
      <DocumentPage />
    </section>
  );
};

export default page;
