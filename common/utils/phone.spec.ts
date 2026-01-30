import { normalizePhoneForUrl, getCoordinatorByPhone, getAllCoordinatorUrls } from './phone';
import { coordinators } from '@/common/data/coordinators';

describe('Phone Utils', () => {
  describe('normalizePhoneForUrl', () => {
    it('converts continuous digits with country code to canonical format', () => {
      expect(normalizePhoneForUrl('46766920097')).toBe('46-76-692-00-97');
    });

    it('converts Swedish format without country code', () => {
      expect(normalizePhoneForUrl('0766920097')).toBe('46-76-692-00-97');
    });

    it('handles already canonical format', () => {
      expect(normalizePhoneForUrl('46-76-692-00-97')).toBe('46-76-692-00-97');
    });

    it('removes spaces and converts', () => {
      expect(normalizePhoneForUrl('076 692 00 97')).toBe('46-76-692-00-97');
    });

    it('handles plus sign in phone numbers', () => {
      expect(normalizePhoneForUrl('+46766920097')).toBe('46-76-692-00-97');
    });

    it('returns empty string for empty input', () => {
      expect(normalizePhoneForUrl('')).toBe('');
    });

    it('returns malformed short number as-is', () => {
      expect(normalizePhoneForUrl('123')).toBe('123');
    });
  });

  describe('getCoordinatorByPhone', () => {
    it('finds coordinator by canonical phone', () => {
      const result = getCoordinatorByPhone('46-76-692-00-97');
      expect(result?.name).toBe('Nina Fredriksson');
    });

    it('finds coordinator by alternative phone format', () => {
      const result = getCoordinatorByPhone('0766920097');
      expect(result?.name).toBe('Nina Fredriksson');
    });

    it('finds coordinator by international format with plus sign', () => {
      const result = getCoordinatorByPhone('+46766920097');
      expect(result?.name).toBe('Nina Fredriksson');
    });

    it('returns null for non-existent phone', () => {
      const result = getCoordinatorByPhone('0701234567');
      expect(result).toBeNull();
    });
  });

  describe('getAllCoordinatorUrls', () => {
    it('returns array of canonical URLs for all coordinators', () => {
      const urls = getAllCoordinatorUrls();
      expect(urls).toContain('46-76-692-00-97');
      expect(urls.length).toBe(coordinators.length);
    });
  });
});
