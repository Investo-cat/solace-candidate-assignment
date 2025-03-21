import db from "../../../db";
import { advocates } from "../../../db/schema";
import { advocateData } from "../../../db/seed/advocates";
import { Advocate } from "@/types/page";
import { PAGE_PER_COUNT } from "@/constants";

export async function POST(req: Request) {
  const body = await req.json();
  const {
    search: searchTerm,
    category: categories,
    currentPage,
  }: { search: string; category: string[]; currentPage: number } = body;

  const data = advocateData;

  let result: Advocate[];
  if (!searchTerm) {
    result = data;
  } else if (categories.length === 0) {
    result = data.filter((advocate) => {
      return (
        advocate.firstName.toLowerCase().includes(searchTerm) ||
        advocate.lastName.toLowerCase().includes(searchTerm) ||
        advocate.city.toLowerCase().includes(searchTerm) ||
        advocate.degree.toLowerCase().includes(searchTerm) ||
        advocate.specialties.some((specialty) =>
          specialty.toLowerCase().includes(searchTerm)
        ) ||
        advocate.yearsOfExperience.toString().toLowerCase().includes(searchTerm)
      );
    });
  } else {
    result = data.filter((advocate) => {
      return categories.some((category) => {
        if (category !== "specialties") {
          return advocate[category as keyof Advocate]
            .toString()
            .toLowerCase()
            .includes(searchTerm);
        } else {
          return advocate.specialties.some((specialty) =>
            specialty.toLowerCase().includes(searchTerm)
          );
        }
      });
    });
  }

  return Response.json({
    total: result.length,
    data: result.slice(
      PAGE_PER_COUNT * (currentPage - 1),
      PAGE_PER_COUNT * currentPage
    ),
  });
}
