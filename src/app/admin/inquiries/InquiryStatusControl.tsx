'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Loader2 } from 'lucide-react';

import { InquiryStatus } from '@/generated/prisma/enums';
import { adminJsonHeaders } from '@/lib/admin/csrf';

const statuses = [
  InquiryStatus.NEW,
  InquiryStatus.CONTACTED,
  InquiryStatus.SCHEDULED,
  InquiryStatus.CLOSED,
  InquiryStatus.SPAM,
] as const;

export function InquiryStatusControl({
  inquiryId,
  currentStatus,
}: {
  inquiryId: string;
  currentStatus: InquiryStatus;
}) {
  const router = useRouter();
  const [status, setStatus] = useState<InquiryStatus>(currentStatus);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState('');

  async function updateStatus(nextStatus: InquiryStatus) {
    setStatus(nextStatus);
    setError('');
    setIsSaving(true);

    try {
      const response = await fetch(`/api/admin/inquiries/${inquiryId}`, {
        method: 'PATCH',
        headers: adminJsonHeaders(),
        body: JSON.stringify({ status: nextStatus }),
      });
      const result = (await response.json().catch(() => ({}))) as { error?: string };

      if (!response.ok) {
        setStatus(currentStatus);
        setError(result.error ?? 'Unable to update status.');
        return;
      }

      router.refresh();
    } catch {
      setStatus(currentStatus);
      setError('Unable to update status.');
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <div>
      <label htmlFor="inquiry-status" className="block text-sm font-semibold text-[#071625]">
        Status
      </label>
      <div className="mt-2 flex flex-col gap-3 sm:flex-row sm:items-center">
        <select
          id="inquiry-status"
          value={status}
          disabled={isSaving}
          onChange={(event) => updateStatus(event.target.value as InquiryStatus)}
          className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-[#071625] outline-none transition focus:border-[#07988D] focus:ring-4 focus:ring-[#18D6BD]/16 sm:max-w-xs"
        >
          {statuses.map((item) => (
            <option key={item} value={item}>
              {item.replaceAll('_', ' ')}
            </option>
          ))}
        </select>
        {isSaving ? (
          <span className="inline-flex items-center gap-2 text-sm text-gray-600">
            <Loader2 className="h-4 w-4 animate-spin" />
            Saving
          </span>
        ) : null}
      </div>
      {error ? <p className="mt-2 text-sm font-medium text-red-700">{error}</p> : null}
    </div>
  );
}
