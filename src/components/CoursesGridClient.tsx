"use client";

import { useEffect, useState } from "react";
import CoursesGrid, { type CourseSummary } from "@/components/CoursesGrid";

export default function CoursesGridClient() {
  const [courses, setCourses] = useState<CourseSummary[]>([]);

  useEffect(() => {
    let cancelled = false;
    fetch("/api/courses")
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (!cancelled && Array.isArray(data?.courses)) setCourses(data.courses);
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, []);

  return <CoursesGrid courses={courses} />;
}
