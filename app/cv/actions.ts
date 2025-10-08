/**
 * Don't forget to pray before start coding!
 * 
 * @author Fajar Postman
 * 
 */

import { connectToDB } from '../../lib/mongoose';
import Section from '../../models/Section';
import { SectionInput } from '../../schemas/section';

export async function createSection(formData: FormData) {
    'use server';
    await connectToDB();

    const type = formData.get('type')?.toString();
    const rawData = formData.get('data')?.toString() ?? '{}';
    const userId = formData.get('userId')?.toString() ?? 'anon';

    let payload;
    try {
        payload = { type, data: JSON.parse(rawData), userId };
    } catch (e) {
        throw new Error('Invalid JSON in data field');
    }

    const validated = SectionInput.parse(payload);
    const doc = await Section.create(validated);
    return doc;
}

export async function listSection(userId: string) {
    'use server';
    await connectToDB();
    const docs = await Section.find({ userId }).sort({ order: 1, createdAt: 1}).lean();
    return docs;
}

