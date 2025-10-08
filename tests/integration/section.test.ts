/**
 * Don't forget to pray before start coding!
 * 
 * @author Fajar Postman
 * 
 */

import { beforeAll, afterAll, describe, it, expect } from 'vitest';
import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import Section from '../../models/Section';

let mongod: MongoMemoryServer;

beforeAll(async () => {
    mongod = await MongoMemoryServer.create();
    await mongoose.connect(mongod.getUri());
});

afterAll(async () => {
    await mongoose.disconnect();
    await mongod.stop();
});

describe('Section model', () => {
    it('creates and reads section', async () => {
        const s = await Section.create({ userId: 'u1', type: 'personal', data: { name: 'Fajar', email: 'fajardwirianto3@gmail.com'} });
        expect(s._id).toBeDefined();
        const found = await Section.findOne({ userId: 'u1' }).lean();
        expect((found as any)?.data?.name).toBe('Fajar');
    });
});