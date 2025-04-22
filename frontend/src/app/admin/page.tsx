"use client";
import { useEffect, useState } from "react";
import dotenv from "dotenv";
import {
  PiArrowLeft,
  PiArrowRight,
  PiSortAscending,
  PiSortDescending,
} from "react-icons/pi";

dotenv.config();

interface Data {
  id: number;
  name: string;
  email: string;
  phone: string;
  feedback: string;
  rating: number;
  timestamp: string;
}

const Page = () => {
  const [data, setData] = useState<Data[] | []>([]);
  const [loading, setLoading] = useState(1);
  const [refresh, setRefresh] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [isNewest, setIsNewest] = useState(true);
  const [pageCount, setPageCount] = useState(0);
  const itemsPerPage = 5;

  useEffect(() => {
    setLoading(1);
    const fetchData = async () => {
      try {
        const response = await fetch(
          process.env.NEXT_PUBLIC_BACKEND || "http://localhost:5269/",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: process.env.NEXT_PUBLIC_AUTH_TOKEN || "",
            },
          },
        );
        if (!response.ok) {
          window.location.href = "/error";
        }
        const responseData = await response.json();
        setData(isNewest ? responseData.reverse() : responseData);
        setLoading(0);
        setCurrentPage(1);
      } catch {
        window.location.href = "/error";
      }
    };

    fetchData();
  }, [refresh, isNewest]);

  useEffect(() => {
    setPageCount(Math.ceil(data.length / itemsPerPage));
  }, [data]);

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center text-3xl">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen p-8 flex flex-col gap-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl sm:text-5xl">Feedback Dashboard</h1>
        <div className="flex flex-col sm:flex-row gap-4">
          <button
            onClick={() => setIsNewest(!isNewest)}
            className={`flex items-center gap-2 px-6 pt-2 pb-1 text-xl sm:text-2xl border-1 border-[#C4A38A] rounded-lg hover:bg-[#C4A38A]
                        hover:text-white transition-colors cursor-pointer`}
          >
            {isNewest ? (
              <>
                Newest First <PiSortDescending />
              </>
            ) : (
              <>
                Oldest First <PiSortAscending />
              </>
            )}
          </button>
          <button
            onClick={() => setRefresh(refresh + 1)}
            className="px-6 pt-2 pb-1 text-xl sm:text-2xl border-1 border-[#C4A38A] rounded-lg hover:bg-[#C4A38A] hover:text-white transition-colors cursor-pointer"
          >
            Refresh
          </button>
        </div>
      </div>

      <div className="grid gap-6 overflow-x-auto">
        {data
          .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
          .map((item) => (
            <div
              key={item.id}
              className="border-1 border-[#C4A38A] rounded-2xl p-6 flex flex-col gap-1"
            >
              <div className="flex justify-between items-start gap-4 mb-2">
                <h2 className="text-4xl">{item.name}</h2>
                <span className="text-xl opacity-70">
                  {new Date(item.timestamp).toLocaleString()}
                </span>
              </div>
              <div className="flex gap-2">
                <p className="opacity-70 text-2xl">Email: </p>
                <p className="text-2xl">{item.email}</p>
              </div>
              <div className="flex gap-2">
                <span className="opacity-70 text-2xl">Phone: </span>
                <span className="text-2xl">{item.phone}</span>
              </div>
              <div className="flex gap-2">
                <span className="opacity-70 text-2xl">Rating:</span>
                <span className="text-2xl">{item.rating}</span>
              </div>
              {item.feedback && (
                <div className="flex gap-2">
                  <span className="opacity-70 text-2xl">Feedback:</span>
                  <span className="text-2xl">{item.feedback}</span>
                </div>
              )}
            </div>
          ))}
      </div>

      {pageCount > 1 && (
        <div className="flex justify-center items-center gap-3 mt-6">
          <button
            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
            className={`text-3xl px-2 ${
              currentPage === 1
                ? "opacity-50"
                : "hover:opacity-75 cursor-pointer"
            }`}
          >
            <PiArrowLeft />
          </button>

          <div className="flex gap-2">
            {[...Array(pageCount)].map((_, index) => (
              <button
                key={index + 1}
                onClick={() => setCurrentPage(index + 1)}
                className={`w-10 h-10 pt-1 flex items-center justify-center rounded-lg text-xl cursor-pointer
                  ${
                    currentPage === index + 1
                      ? "bg-[#C4A38A] text-white"
                      : "border-1 border-[#C4A38A] hover:bg-[#C4A38A] hover:text-white transition-colors"
                  }`}
              >
                {index + 1}
              </button>
            ))}
          </div>

          <button
            onClick={() => setCurrentPage(Math.min(pageCount, currentPage + 1))}
            disabled={currentPage === pageCount}
            className={`text-3xl px-2 ${
              currentPage === pageCount
                ? "opacity-50"
                : "cursor-pointer hover:opacity-75"
            }`}
          >
            <PiArrowRight />
          </button>
        </div>
      )}
    </div>
  );
};

export default Page;
