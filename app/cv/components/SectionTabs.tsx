/**
 * Don't forget to pray before start coding!
 * 
 * @author Fajar Postman
 * 
 */

'use client';
import React from 'react';

type SectionType = 'personal' | 'experience' | 'skills' | 'education' | 'interests';

interface Props {
    current: SectionType;
    onChange: (type: SectionType) => void;
}

const tabs: { label: string; value: SectionType } [] = [
    { label: 'Personal Info', value: 'personal' },
    { label: 'Experience', value: 'experience' },
    { label: 'Skills', value: 'skills' },
    { label: 'Education', value: 'education' },
    { label: 'Interests', value: 'interests' },
];

export default function SectionTabs({ current, onChange }: Props) {
    return(
        <div style={{ display: 'flex', gap: 12, marginBottom: 20 }}>
            {tabs.map((t) => (
                <button
                    key={t.value}
                    onClick={() => onChange(t.value)}
                    style={{
                        padding: '8px 16px',
                        borderRadius: 6,
                        border: '1px solid #ccc',
                        background: current === t.value ? '#111' : '#fff',
                        color: current === t.value ? '#fff' : '#111',
                        cursor: 'pointer'
                    }}
                >
                    {t.label}
                </button>
            ))}
        </div>
    )
}