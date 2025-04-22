"use client";

const Page = () => {
  return (
    <div className="h-screen flex flex-col items-center justify-center gap-6">
      <h1 className="text-5xl text-center">Welcome</h1>
      <div className="flex gap-4">
        <button
          onClick={() => (window.location.href = "/feedback")}
          className="px-6 pt-2 pb-1 text-2xl border-1 border-[#C4A38A] rounded-lg transition-colors"
        >
          Feedback Form
        </button>
        <button
          onClick={() => (window.location.href = "/admin")}
          className="px-6 pt-2 pb-1 text-2xl border-1 border-[#C4A38A] rounded-lg transition-colors"
        >
          Admin Dashboard
        </button>
      </div>
    </div>
  );
};

export default Page;
