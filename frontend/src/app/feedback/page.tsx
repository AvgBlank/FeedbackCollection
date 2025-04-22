import Carousel from "@/components/Carousel";
import Form from "@/components/Form";

const Page = () => {
  return (
    <div className="h-screen min-h-[800px] flex justify-center md:grid md:grid-cols-2 gap-12 lg:gap-26">
      <div className="w-full h-full py-4 pl-4 hidden md:block">
        <Carousel />
      </div>
      <div className="p-2 md:pl-0 md:py-10 md:pr-10 flex text-center items-center">
        <div className="border-l-1 border-l-[#C4A38A] hidden md:block h-2/3"></div>
        <div className="flex flex-col gap-4">
          <h1 className="text-5xl">We&apos;d love to have your feedback</h1>
          <Form />
        </div>
      </div>
    </div>
  );
};

export default Page;
