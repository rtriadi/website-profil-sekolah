"use client";

import { useActionState, useState } from "react";
import { ToastStateWatcher } from "@/components/ui/toast";
import type { AcademicCalendar, AcademicCalendarPeriod, AcademicCalendarEvent } from "@/lib/content/schema";
import { saveAcademicCalendarAction } from "@/lib/actions/academic-calendar-actions";

interface Props {
  calendar: AcademicCalendar;
}

let _eventCounter = 0;
function nextId(prefix: string) {
  _eventCounter++;
  return `${prefix}-${_eventCounter}`;
}

const typeLabels: Record<string, string> = {
  semester: "Semester",
  libur: "Libur",
  ujian: "Ujian",
  rapot: "Pembagian Rapot",
  kegiatan: "Kegiatan",
};

const typeColors: Record<string, string> = {
  semester: "bg-blue-100 text-blue-700",
  libur: "bg-yellow-100 text-yellow-700",
  ujian: "bg-purple-100 text-purple-700",
  rapot: "bg-green-100 text-green-700",
  kegiatan: "bg-orange-100 text-orange-700",
};

export function AdminAcademicCalendarClient({ calendar }: Props) {
  const [state, action, pending] = useActionState(saveAcademicCalendarAction, undefined);

  const [periods, setPeriods] = useState<AcademicCalendarPeriod[]>(
    calendar.periods.length > 0 ? calendar.periods : [],
  );

  function addPeriod() {
    setPeriods((prev) => [
      ...prev,
      {
        id: nextId("per"),
        label: "",
        startDate: "",
        endDate: "",
        events: [],
        sortOrder: prev.length + 1,
      },
    ]);
  }

  function removePeriod(id: string) {
    setPeriods((prev) => prev.filter((p) => p.id !== id));
  }

  function updatePeriod(id: string, field: string, value: string) {
    setPeriods((prev) =>
      prev.map((p) => (p.id === id ? { ...p, [field]: value } : p)),
    );
  }

  function addEvent(periodId: string) {
    setPeriods((prev) =>
      prev.map((p) =>
        p.id === periodId
          ? {
              ...p,
              events: [
                ...p.events,
                {
                  id: nextId("evt"),
                  title: "",
                  date: "",
                  description: "",
                  type: "kegiatan",
                },
              ],
            }
          : p,
      ),
    );
  }

  function removeEvent(periodId: string, eventId: string) {
    setPeriods((prev) =>
      prev.map((p) =>
        p.id === periodId
          ? { ...p, events: p.events.filter((e) => e.id !== eventId) }
          : p,
      ),
    );
  }

  function updateEvent(periodId: string, eventId: string, field: string, value: string) {
    setPeriods((prev) =>
      prev.map((p) =>
        p.id === periodId
          ? {
              ...p,
              events: p.events.map((e) =>
                e.id === eventId ? { ...e, [field]: value } : e,
              ),
            }
          : p,
      ),
    );
  }

  return (
    <form
      action={action}
      onSubmit={() => {
        const hidden = document.querySelector<HTMLInputElement>("input[name='periods']");
        if (hidden) hidden.value = JSON.stringify(periods);
      }}
      className="space-y-6"
    >
      <ToastStateWatcher state={state} successMessage="Kalender berhasil disimpan!" />
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="title" className="mb-1 block text-sm font-medium text-slate-700">Judul</label>
          <input id="title" name="title" defaultValue={calendar.title} className="block w-full rounded-md border border-slate-300 px-3 py-2 text-sm" />
          {state?.fieldErrors?.title && <p className="mt-1 text-xs text-red-500">{state.fieldErrors.title}</p>}
        </div>
        <div>
          <label htmlFor="academicYear" className="mb-1 block text-sm font-medium text-slate-700">Tahun Ajaran</label>
          <input id="academicYear" name="academicYear" defaultValue={calendar.academicYear} placeholder="2026/2027" className="block w-full rounded-md border border-slate-300 px-3 py-2 text-sm" />
          {state?.fieldErrors?.academicYear && <p className="mt-1 text-xs text-red-500">{state.fieldErrors.academicYear}</p>}
        </div>
      </div>

      <input type="hidden" name="periods" />

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-semibold text-slate-900">Periode</h2>
          <button
            type="button"
            onClick={addPeriod}
            className="rounded-md bg-slate-100 px-3 py-1.5 text-sm font-medium text-slate-700 hover:bg-slate-200"
          >
            + Tambah Periode
          </button>
        </div>

        {periods.length === 0 && (
          <p className="text-sm text-slate-400">Belum ada periode. Klik &quot;Tambah Periode&quot; untuk mulai.</p>
        )}

        {periods.map((period) => (
          <div key={period.id} className="rounded-lg border border-slate-200 p-4">
            <div className="mb-3 flex items-start justify-between gap-2">
              <div className="flex-1 space-y-2">
                <div className="grid grid-cols-3 gap-2">
                  <input
                    value={period.label}
                    onChange={(e) => updatePeriod(period.id, "label", e.target.value)}
                    placeholder="Label periode (cth: Semester 1)"
                    className="block rounded-md border border-slate-300 px-3 py-1.5 text-sm"
                  />
                  <div>
                    <span className="text-xs text-slate-500">Mulai</span>
                    <input
                      type="date"
                      value={period.startDate}
                      onChange={(e) => updatePeriod(period.id, "startDate", e.target.value)}
                      className="block w-full rounded-md border border-slate-300 px-3 py-1.5 text-sm"
                    />
                  </div>
                  <div>
                    <span className="text-xs text-slate-500">Selesai</span>
                    <input
                      type="date"
                      value={period.endDate}
                      onChange={(e) => updatePeriod(period.id, "endDate", e.target.value)}
                      className="block w-full rounded-md border border-slate-300 px-3 py-1.5 text-sm"
                    />
                  </div>
                </div>
              </div>
              <button
                type="button"
                onClick={() => removePeriod(period.id)}
                className="shrink-0 rounded-md p-1.5 text-slate-400 hover:bg-red-50 hover:text-red-600"
              >
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>

            <div className="ml-2 space-y-2">
              {period.events.map((evt) => (
                <div key={evt.id} className="flex items-start gap-2 rounded-md bg-slate-50 p-2">
                  <div className="flex-1 grid grid-cols-5 gap-2">
                    <input
                      value={evt.title}
                      onChange={(e) => updateEvent(period.id, evt.id, "title", e.target.value)}
                      placeholder="Nama event"
                      className="col-span-2 block rounded-md border border-slate-300 px-2 py-1 text-sm"
                    />
                    <input
                      type="date"
                      value={evt.date}
                      onChange={(e) => updateEvent(period.id, evt.id, "date", e.target.value)}
                      className="block rounded-md border border-slate-300 px-2 py-1 text-sm"
                    />
                    <select
                      value={evt.type}
                      onChange={(e) => updateEvent(period.id, evt.id, "type", e.target.value)}
                      className="block rounded-md border border-slate-300 px-2 py-1 text-sm"
                    >
                      {Object.entries(typeLabels).map(([k, v]) => (
                        <option key={k} value={k}>{v}</option>
                      ))}
                    </select>
                    <button
                      type="button"
                      onClick={() => removeEvent(period.id, evt.id)}
                      className="rounded-md p-1 text-slate-400 hover:bg-red-50 hover:text-red-600"
                    >
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
                    </button>
                  </div>
                </div>
              ))}
              <button
                type="button"
                onClick={() => addEvent(period.id)}
                className="text-xs font-medium text-blue-600 hover:text-blue-800"
              >
                + Tambah Event
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={pending}
          className="rounded-md bg-slate-900 px-6 py-2 text-sm font-medium text-white hover:bg-slate-800 disabled:opacity-50"
        >
          {pending ? "Menyimpan..." : "Simpan"}
        </button>
      </div>
    </form>
  );
}
