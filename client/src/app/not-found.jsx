"use client";
import Link from "next/link";

const NotFoundPage = () => {
  return (
    <div className="flex flex-col justify-center items-center min-h-[60vh] gap-5">
      <h2 className="text-lg font-semibold">Page Not Found</h2>
      <Link href="/" className="border rounded-full hover:bg-gray-300 duration-300 transition-all px-5 py-3">
        Go To Home
      </Link>
    </div>
  );
};

export default NotFoundPage;
