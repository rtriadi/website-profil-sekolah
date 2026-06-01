import { getAcademicCalendar } from "@/lib/content/academic-calendar-service";
import { AdminAcademicCalendarClient } from "@/components/admin/admin-academic-calendar-client";

export default async function AdminAcademicCalendarPage() {
  const calendar = getAcademicCalendar();

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold text-slate-900">
        Kalender Akademik
      </h1>
      <div className="max-w-2xl rounded-lg border border-slate-200 bg-white p-6">
        <AdminAcademicCalendarClient calendar={calendar} />
      </div>
    </div>
  );
}
