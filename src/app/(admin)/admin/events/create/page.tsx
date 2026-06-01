import { createEventAction } from "@/lib/actions/event-actions";
import { EventForm } from "@/components/admin/event-form";

export default function CreateEventPage() {
  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold text-slate-900">Buat Acara</h1>
      <div className="max-w-2xl rounded-lg border border-slate-200 bg-white p-6">
        <EventForm action={createEventAction} />
      </div>
    </div>
  );
}
