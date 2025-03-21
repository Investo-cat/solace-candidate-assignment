import db from "../../../db";
import { advocates } from "../../../db/schema";
import { Advocate } from "@/types/page";
import { PAGE_PER_COUNT } from "@/constants";
import { eq, ilike, or, SQL, sql } from "drizzle-orm";

export async function POST(req: Request) {
  const body = await req.json();
  const {
    search: searchTerm,
    category: categories,
    currentPage,
  }: { search: string; category: string[]; currentPage: number } = body;

  const filters: SQL<unknown>[] = [];

  if (searchTerm) {
    const searchPattern = `%${searchTerm}%`;

    if (categories.length === 0) {
      // Apply a broad search across relevant fields
      filters.push(
        ilike(advocates.firstName, searchPattern),
        ilike(advocates.lastName, searchPattern),
        ilike(advocates.city, searchPattern),
        ilike(advocates.degree, searchPattern),
        sql`EXISTS (SELECT 1 FROM unnest(${advocates.specialties}) AS s WHERE s ILIKE ${searchPattern})`
      );
      if (!Number.isNaN(parseInt(searchTerm))) {
        filters.push(eq(advocates.yearsOfExperience, parseInt(searchTerm)));
      }
    } else {
      // Search only in specified categories
      for (const category of categories) {
        if (["firstName", "lastName", "city", "degree"].includes(category)) {
          filters.push(
            ilike(advocates[category as keyof Advocate], searchPattern)
          );
        } else if (category === "yearsOfExperience") {
          if (!Number.isNaN(parseInt(searchTerm))) {
            filters.push(eq(advocates.yearsOfExperience, parseInt(searchTerm)));
          }
        } else if (category === "specialties") {
          filters.push(
            sql`EXISTS (SELECT 1 FROM unnest(${advocates.specialties}) AS s WHERE s ILIKE ${searchPattern})`
          );
        }
      }
    }
  }

  const totalCountQuery = await db
    .select({ count: sql<number>`COUNT(*)` })
    .from(advocates)
    .where(filters.length > 0 ? or(...filters) : undefined);

  const totalCount = totalCountQuery[0]?.count ?? 0;

  const data = await db
    .select()
    .from(advocates)
    .where(filters.length > 0 ? or(...filters) : undefined)
    .limit(PAGE_PER_COUNT)
    .offset(PAGE_PER_COUNT * (currentPage - 1));

  return Response.json({ total: totalCount, data });
}
