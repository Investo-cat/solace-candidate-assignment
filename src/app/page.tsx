"use client";

import { useEffect, useState } from "react";
import MultiSelectSearch from "@/components/multiSelectSearch";
import { Advocate } from "@/types/page";

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
  const [searchTerm, setSearchTerm] = useState("");
  const [selected, setSelected] = useState<string[]>([]);
  const [advocates, setAdvocates] = useState<Advocate[]>([]);
  // remove filtered advocate -> TODO: implement search on backend side

  useEffect(() => {
    console.log("fetching advocates...");
    fetch("/api/advocates").then((response) => {
      response.json().then((jsonResponse) => {
        setAdvocates(jsonResponse.data);
      });
    });
  }, []);

  return (
    <main className="overflow-hidden">
      <div className="h-screen flex flex-col p-8">
        <h1>Solace Advocates</h1>
        <MultiSelectSearch // TODO: debounced search
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
            <tbody>
              {advocates.map((advocate, index) => {
                return (
                  <tr
                    key={index}
                    className={
                      "text-center " +
                      (index % 2 === 0 ? "bg-gray-100" : "bg-white")
                    }
                  >
                    <td className="border px-4 py-2">{advocate.firstName}</td>
                    <td className="border px-4 py-2">{advocate.lastName}</td>
                    <td className="border px-4 py-2">{advocate.city}</td>
                    <td className="border px-4 py-2">{advocate.degree}</td>
                    <td className="border px-4 py-2">
                      {advocate.specialties.map((s, index) => (
                        <div key={index}>{s}</div>
                      ))}
                    </td>
                    <td className="border px-4 py-2">
                      {advocate.yearsOfExperience}
                    </td>
                    <td className="border px-4 py-2">{advocate.phoneNumber}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}
