/**
 * Don't forget to pray before start coding!
 * 
 * @author Fajar Postman
 * 
 */

'use client';
import React, { useState } from 'react';
import SectionTabs from './components/SectionTabs';
import SectionForm from './components/SectionForm';
import CvPreview from './components/CvPreview';

export default function CVPage() {
  const [currentSection, setCurrentSection] = useState<'personal' | 'experience' | 'skills' | 'education' | 'interests'>('personal');

  return (
    <div style={{ padding: 20 }}>
      <h1>CV Builder</h1>
      <SectionTabs current={currentSection} onChange={setCurrentSection} />
      <SectionForm currentSection={currentSection} />
      <CvPreview />
    </div>
  );
}
