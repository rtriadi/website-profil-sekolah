import { notFound } from "next/navigation";
import { getEventById } from "@/lib/content/events-service";
import { updateEventAction } from "@/lib/actions/event-actions";
import { EventForm } from "@/components/admin/event-form";

export default async function EditEventPage(props: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await props.params;
  const event = await getEventById(id);
  if (!event) notFound();

  const boundAction = updateEventAction.bind(null, event.id);

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold text-slate-900">Edit Acara</h1>
      <div className="max-w-2xl rounded-lg border border-slate-200 bg-white p-6">
        <EventForm action={boundAction} initialData={event} />
      </div>
    </div>
  );
}
