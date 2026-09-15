"use client";

import { useEffect, useState } from "react";
import DepartmentsGrid, { type DepartmentSummary } from "@/components/DepartmentsGrid";

export default function DepartmentsGridClient() {
  const [departments, setDepartments] = useState<DepartmentSummary[]>([]);

  useEffect(() => {
    let cancelled = false;
    fetch("/api/departments")
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (!cancelled && Array.isArray(data?.departments)) setDepartments(data.departments);
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, []);

  return <DepartmentsGrid departments={departments} />;
}
