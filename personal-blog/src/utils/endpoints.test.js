import { test, expect, describe } from 'vitest';
import { endPoints } from './endpoints.js';

describe('Endpoints Coverage', () => {
    test('всички експортирани ендпоинти трябва да са валидни', () => {
        const keys = Object.keys(endPoints);

        keys.forEach(key => {
            const value = endPoints[key];
            const type = typeof value;

            expect(['string', 'function']).toContain(type);

            if (type === 'function') {
                expect(typeof value('test-id')).toBe('string');
            } else {
                expect(value.length).toBeGreaterThan(0);
            }
        });
    });
});