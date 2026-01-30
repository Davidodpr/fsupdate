import { coordinators } from '@/common/data/coordinators';
import { Coordinator } from '@/common/data/coordinators.types';

export function normalizePhoneForUrl(phone: string): string {
  if (!phone) return '';

  const cleaned = phone.replace(/[\s\-\+]/g, '');

  let digits = cleaned;
  if (cleaned.startsWith('0')) {
    digits = '46' + cleaned.substring(1);
  }

  if (digits.length === 11 && digits.startsWith('46')) {
    return `${digits.substring(0, 2)}-${digits.substring(2, 4)}-${digits.substring(4, 7)}-${digits.substring(7, 9)}-${digits.substring(9, 11)}`;
  }

  return digits;
}

export function getCoordinatorByPhone(phone: string): Coordinator | null {
  const normalized = normalizePhoneForUrl(phone);

  return coordinators.find(coordinator => {
    if (coordinator.phone.canonical === normalized) return true;
    if (coordinator.phone.alternatives.includes(phone)) return true;
    return coordinator.phone.alternatives.some(alt =>
      normalizePhoneForUrl(alt) === normalized
    );
  }) || null;
}

export function getAllCoordinatorUrls(): string[] {
  return coordinators.map(c => c.phone.canonical);
}

export function getAllCoordinatorUrlsWithAlternatives(): string[] {
  return coordinators.flatMap(c => [
    c.phone.canonical,
    ...c.phone.alternatives
  ]);
}
