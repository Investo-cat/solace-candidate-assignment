"use client";

import { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import MultiSelectSearch from "@/components/multiSelectSearch";
import Collapse from "@/components/collapse";
import Pagination from "@/components/pagination";
import { Advocate } from "@/types/page";
import { API_URL, PAGE_PER_COUNT } from "@/constants";

const options: Record<keyof Advocate, string> = {
  firstName: "First Name",
  lastName: "Last Name",
  city: "City",
  degree: "Degree",
  specialties: "Specialties",
  yearsOfExperience: "Years Of Experience",
  phoneNumber: "Phone Number",
};

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selected, setSelected] = useState<string[]>([]);
  const [advocates, setAdvocates] = useState<Advocate[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

  useEffect(() => {
    setIsLoading(true);
    setIsError(false);

    fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        search: searchTerm,
        category: selected,
        currentPage,
      }),
    })
      .then((response) => response.json())
      .then(({ data, total }) => {
        setAdvocates(data);
        setTotalCount(total);
      })
      .catch(() => setIsError(true))
      .finally(() => setIsLoading(false));
  }, [searchTerm, selected, currentPage]);

  const getTableBody = () => {
    if (isLoading) {
      return <caption className="text-xl">{"Loading..."}</caption>;
    }
    if (isError) {
      return (
        <caption className="text-xl">
          {
            "An error occurred while processing your request. Please try again later."
          }
        </caption>
      );
    }
    if (advocates.length === 0) {
      return (
        <caption className="text-xl">
          {"We couldn't find any results for your search."}
        </caption>
      );
    }

    return (
      <tbody>
        {advocates.map((advocate, index) => {
          if (isLoading) {
            return (
              <tr key={index}>
                <td>
                  <Skeleton key={index} />
                </td>
                <td>
                  <Skeleton key={index} />
                </td>
                <td>
                  <Skeleton key={index} />
                </td>
                <td>
                  <Skeleton key={index} />
                </td>
                <td>
                  <Skeleton key={index} />
                </td>
                <td>
                  <Skeleton key={index} />
                </td>{" "}
                <td>
                  <Skeleton key={index} />
                </td>
              </tr>
            );
          }
          return (
            <tr
              key={index}
              className={
                "text-center " + (index % 2 === 0 ? "bg-gray-100" : "bg-white")
              }
            >
              <td className="border px-4 py-2">{advocate.firstName}</td>
              <td className="border px-4 py-2">{advocate.lastName}</td>
              <td className="border px-4 py-2">{advocate.city}</td>
              <td className="border px-4 py-2">{advocate.degree}</td>
              <td className="border px-4 py-2">
                <Collapse data={advocate.specialties} />
              </td>
              <td className="border px-4 py-2">{advocate.yearsOfExperience}</td>
              <td className="border px-4 py-2">{advocate.phoneNumber}</td>
            </tr>
          );
        })}
      </tbody>
    );
  };

  return (
    <main className="overflow-hidden">
      <div className="h-screen flex flex-col p-8">
        <h1>Solace Advocates</h1>
        <MultiSelectSearch
          options={options}
          setSelected={setSelected}
          setInputValue={setSearchTerm}
        />
        <div className="flex-1 overflow-auto scrollbar-none">
          <table className="w-full border border-gray-300 shadow-md rounded-lg">
            <thead className="sticky top-0">
              <tr className="bg-gray-700 text-white text-center">
                <th className="px-4 py-2">First Name</th>
                <th className="px-4 py-2">Last Name</th>
                <th className="px-4 py-2">City</th>
                <th className="px-4 py-2">Degree</th>
                <th className="px-4 py-2">Specialties</th>
                <th className="px-4 py-2">Years of Experience</th>
                <th className="px-4 py-2">Phone Number</th>
              </tr>
            </thead>
            {getTableBody()}
          </table>
        </div>
        <Pagination
          totalCount={totalCount}
          pagePerCount={PAGE_PER_COUNT}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      </div>
    </main>
  );
}
