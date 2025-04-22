"use client";
const Page = () => {
  return (
    <div className="h-screen flex flex-col items-center justify-center gap-6">
      <h1 className="text-5xl text-center">Access Denied</h1>
      <p className="text-2xl opacity-70">
        You do not have permission to access this page.
      </p>
      <button
        onClick={() => (window.location.href = "/")}
        className="px-6 pt-2 pb-1 text-2xl border-1 border-[#C4A38A] rounded-lg mt-4 transition-colors"
      >
        Return Home
      </button>
    </div>
  );
};

export default Page;
