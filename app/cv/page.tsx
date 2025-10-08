/**
 * Don't forget to pray before start coding!
 * 
 * @author Fajar Postman
 * 
 */

import React from 'react';
import SectionForm from './components/SectionForm';
import CvPreview from './components/CvPreview';
import { listSection } from './actions';

export default async function CVPage() {
    const userId = 'user-123';
    const sections = await listSection(userId);

    return (
        <div style={{ padding: 24}}>
            <h1>CV Builder</h1>
            <div style={{ display: 'flex', gap: 24}}>
                <div style={{ flex: 1 }}>
                    <SectionForm />
                </div>
                <div style={{ flex: 2 }}>
                    <CvPreview sections={sections} />
                </div>
            </div>
        </div>
    );
}