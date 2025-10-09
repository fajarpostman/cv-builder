/**
 * Don't forget to pray before start coding!
 * 
 * @author Fajar Postman
 * 
 */

'use client';
import React from 'react';

interface Section {
  _id: string;
  type: string;
  data: any;
}

export default function CvTemplate({ sections }: { sections: Section[] }) {
  const personal = sections.find((s) => s.type === 'personal');
  const experience = sections.filter((s) => s.type === 'experience');
  const skills = sections.filter((s) => s.type === 'skills');
  const education = sections.filter((s) => s.type === 'education');
  const interests = sections.filter((s) => s.type === 'interests');

  return (
    <div
      id="cv-template"
      style={{
        fontFamily: 'Inter, sans-serif',
        color: '#222',
        background: '#fff',
        width: '210mm',
        minHeight: '297mm',
        margin: 'auto',
        padding: '2rem',
        border: '1px solid #eee',
        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
      }}
    >
      {/* PERSONAL */}
      {personal && (
        <header
          style={{
            textAlign: 'center',
            borderBottom: '2px solid #333',
            paddingBottom: '10px',
          }}
        >
          <h1 style={{ margin: 0 }}>{personal.data.name}</h1>
          <p>
            {personal.data.email}
            {personal.data.phone && ` | ${personal.data.phone}`}
          </p>
          {personal.data.summary && <p><em>{personal.data.summary}</em></p>}
        </header>
      )}

      {/* EXPERIENCE */}
      {experience.length > 0 && (
        <section style={{ marginTop: '2rem' }}>
          <h2>Professional Experience</h2>
          {experience.flatMap((exp) =>
            Array.isArray(exp.data) ? (
              exp.data.map((e: any, i: number) => (
                <div key={`${exp._id}-${i}`} style={{ marginBottom: '1rem' }}>
                  <strong>{e.title}</strong> - {e.company}
                  <div style={{ fontSize: '0.9em', color: '#555' }}>
                    {e.startDate} - {e.endDate || 'Present'}
                  </div>
                  {e.description && <p>{e.description}</p>}
                </div>
              ))
            ) : (
              <div key={exp._id} style={{ marginBottom: '1rem' }}>
                <strong>{exp.data.title}</strong> - {exp.data.company}
                <div style={{ fontSize: '0.9em', color: '#555' }}>
                  {exp.data.startDate} - {exp.data.endDate || 'Present'}
                </div>
                {exp.data.description && <p>{exp.data.description}</p>}
              </div>
            )
          )}
        </section>
      )}

      {/* SKILLS */}
      {skills.length > 0 && (
        <section style={{ marginTop: '2rem' }}>
          <h2>Skills</h2>
          <ul>
            {skills.flatMap((skill) => skill.data).map((s: any, i: number) => (
              <li key={i}>
                {s.name} {s.level && `(${s.level})`}
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* EDUCATION */}
      {education.length > 0 && (
        <section style={{ marginTop: '2rem' }}>
          <h2>Education</h2>
          {education.flatMap((edu) =>
            Array.isArray(edu.data) ? (
              edu.data.map((e: any, i: number) => (
                <div key={`${edu._id}-${i}`} style={{ marginBottom: '0.5rem' }}>
                  <strong>{e.school}</strong> — {e.degree}
                  <p style={{ fontSize: '0.9em', color: '#555' }}>
                    {e.startDate} - {e.endDate}
                  </p>
                </div>
              ))
            ) : (
              <div key={edu._id}>
                <strong>{edu.data.school}</strong> — {edu.data.degree}
                <p style={{ fontSize: '0.9em', color: '#555' }}>
                  {edu.data.startDate} - {edu.data.endDate}
                </p>
              </div>
            )
          )}
        </section>
      )}

      {/* INTERESTS */}
      {interests.length > 0 && (
        <section style={{ marginTop: '2rem' }}>
          <h2>Interests</h2>
          <ul>
            {interests.flatMap((int) => int.data).map((i: string, index: number) => (
              <li key={index}>{i}</li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}
