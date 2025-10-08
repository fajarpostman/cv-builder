/**
 * Don't forget to pray before start coding!
 * 
 * @author Fajar Postman
 * 
 */

import { Schema, models, model } from 'mongoose';

export type SectionDoc = {
    userId: string;
    type: 'personal' | 'experience' | 'skills' | 'education' | 'interests';
    data: any;
    order?: number;
    createdAt?: Date;
    updatedAt?: Date;
};

const SectionSchema = new Schema<SectionDoc>(
    {
        userId: { type: String, required: true },
        type: { type: String, required: true, enum: ['personal', 'experience', 'skills', 'education', 'interests']},
        data: { type: Schema.Types.Mixed, required: true },
        order: { type: Number, default: 0 }
    },
    { timestamps: true }
);

const section = models.Section || model('Section', SectionSchema);
export default section;