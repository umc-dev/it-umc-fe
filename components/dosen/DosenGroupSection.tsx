"use client";

import { useState } from "react";
import { Dosen } from "@/types/dosen";
import DosenGrid from "@/components/dosen/DosenGrid";
import Pagination from "@/components/Pagination";

export default function DosenGroupSection({
  groupName,
  members,
}: {
  groupName: string;
  members: Dosen[];
}) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9; // Adjust based on layout preferences
  const totalPages = Math.ceil(members.length / itemsPerPage);

  const paginatedMembers = members.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div>
      <div className="mb-6 border-b border-border pb-2">
        <h3 className="text-2xl font-bold text-primary">{groupName}</h3>
      </div>
      
      <DosenGrid members={paginatedMembers} />

      {totalPages > 1 && (
        <div className="mt-8">
          <Pagination
            meta={{
              total: members.length,
              page: currentPage,
              limit: itemsPerPage,
              totalPages,
            }}
            onPageChange={setCurrentPage}
          />
        </div>
      )}
    </div>
  );
}
