/**
 * Don't forget to pray before start coding!
 * 
 * @author Fajar Postman
 */


import React, { useState } from 'react';
import { ZodError } from 'zod';
import {
  SectionInput,
  SectionInputType,
} from '../../../schemas/section';

type SectionType = SectionInputType['type'];

export default function SectionForm({ currentSection }: { currentSection: SectionType }) {
  const [formData, setFormData] = useState<any>({});
  const [skills, setSkills] = useState<{ name: string; level: string }[]>([]);
  const [interests, setInterests] = useState<string[]>([]);
  const [experiences, setExperiences] = useState<any[]>([]);
  const [educations, setEducations] = useState<any[]>([]);

  const handleChange = (key: string, value: string) => {
    setFormData((prev: any) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    let finalData: any = formData;

    if (currentSection === 'skills') {
      finalData = skills.map((s) => ({
        name: s.name,
        level: s.level || 'beginer',
      }));
    }

    if (currentSection === 'interests') {
      finalData = interests.filter((i) => i.trim() !== '');
    }

    if (currentSection === 'experience') {
      finalData = experiences.filter(
        (exp) => exp.title && exp.company
      );
    }

    if (currentSection === 'education') {
      finalData = educations.filter(
        (edu) => edu.school
      );
    }


    try {
      const validated = SectionInput.parse({
        type: currentSection,
        data: finalData,
      });

      const form = new FormData();
      form.set('type', validated.type);
      form.set('data', JSON.stringify(validated.data));
      form.set('userId', 'user-123');

      await fetch('/api/sections', { method: 'POST', body: form });
      window.dispatchEvent(new Event('cv-updated'));
      alert(`${currentSection} section saved successfully`);
    } catch (err: any) {
      if (err instanceof ZodError) {
        const message = Object.values(err.flatten().fieldErrors).flat().join(', ');
        alert(`Validation error: ${message}`);
      } else {
        console.error(err);
      }
    }
  };

  const fieldContainer: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    marginBottom: '15px',
  };

  const inputStyle: React.CSSProperties = {
    padding: '8px 12px',
    borderRadius: '6px',
    border: '1px solid #ccc',
    outline: 'none',
    fontSize: '14px',
    transition: 'border 0.2s',
  };

  const labelStyle: React.CSSProperties = {
    fontWeight: 500,
    fontSize: '14px',
    color: '#333',
  };

  const sectionTitle: React.CSSProperties = {
    fontSize: '18px',
    fontWeight: '600',
    color: '#222',
    marginBottom: '10px',
    textTransform: 'capitalize',
  };

  const renderFields = () => {
    switch (currentSection) {
      case 'personal':
        return (
          <div style={fieldContainer}>
            <h3 style={sectionTitle}>Personal Information</h3>
            <label style={labelStyle}>Name</label>
            <input type="text" required style={inputStyle} onChange={(e) => handleChange('name', e.target.value)} />
            <label style={labelStyle}>Email</label>
            <input type="email" required style={inputStyle} onChange={(e) => handleChange('email', e.target.value)} />
            <label style={labelStyle}>Phone</label>
            <input type="text" style={inputStyle} onChange={(e) => handleChange('phone', e.target.value)} />
            <label style={labelStyle}>Summary</label>
            <textarea style={{ ...inputStyle, minHeight: '80px' }} onChange={(e) => handleChange('summary', e.target.value)} />
          </div>
        );
    case 'experience':
    return (
        <div style={fieldContainer}>
        <h3 style={sectionTitle}>Experience</h3>
        {experiences.map((exp, idx) => (
            <div
            key={idx}
            style={{
                border: '1px solid #ddd',
                borderRadius: '10px',
                padding: '20px',
                marginBottom: '16px',
                background: '#fafafa',
                boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
            }}
            >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                <h4 style={{ margin: 0, fontWeight: 600, color: '#333' }}>Experience #{idx + 1}</h4>
                <button
                type="button"
                onClick={() => setExperiences((prev) => prev.filter((_, i) => i !== idx))}
                style={{
                    background: 'none',
                    border: 'none',
                    color: '#dc3545',
                    fontSize: '18px',
                    cursor: 'pointer',
                    lineHeight: 1,
                }}
                >
                ✕
                </button>
            </div>
            <div style={{ display: 'flex', gap: '12px', marginBottom: '10px' }}>
                <div style={{ flex: 1 }}>
                    <label style={labelStyle}>Title</label>
                    <input
                        value={exp.title}
                        required
                        style={{ ...inputStyle, minWidth: '95%'}}
                        onChange={(e) =>
                        setExperiences((prev) =>
                            prev.map((v, i) => (i === idx ? { ...v, title: e.target.value } : v))
                        )
                        }
                    />
                </div>
                <br />
                <div style={{ flex: 1 }}>
                    <label style={labelStyle}>Company</label>
                    <input
                        value={exp.company}
                        required
                        style={{ ...inputStyle, minWidth: '95%'}}
                        onChange={(e) =>
                        setExperiences((prev) =>
                            prev.map((v, i) => (i === idx ? { ...v, company: e.target.value } : v))
                        )
                        }
                    />
                </div>
            </div>
            <div style={{ display: 'flex', gap: '12px', marginBottom: '10px' }}>
                <div style={{ flex: 1 }}>
                <label style={labelStyle}>Start Date</label>
                <input
                    type="date"
                    value={exp.startDate}
                    style={{ ...inputStyle, minWidth: '90%'}}
                    onChange={(e) =>
                    setExperiences((prev) =>
                        prev.map((v, i) => (i === idx ? { ...v, startDate: e.target.value } : v))
                    )
                    }
                />
                </div>
                <div style={{ flex: 1 }}>
                <label style={labelStyle}>End Date</label>
                <input
                    type="date"
                    value={exp.endDate}
                    style={{ ...inputStyle, minWidth: '90%'}}
                    onChange={(e) =>
                    setExperiences((prev) =>
                        prev.map((v, i) => (i === idx ? { ...v, endDate: e.target.value } : v))
                    )
                    }
                />
                </div>
            </div>

            <div>
                <label style={labelStyle}>Description</label><br />
                <br />
                <textarea
                value={exp.description}
                style={{ ...inputStyle, minHeight: '80px', minWidth: '95%' }}
                onChange={(e) =>
                    setExperiences((prev) =>
                    prev.map((v, i) => (i === idx ? { ...v, description: e.target.value } : v))
                    )
                }
                />
            </div>
            </div>
        ))}

        <button
            type="button"
            onClick={() =>
            setExperiences([...experiences, { title: '', company: '', startDate: '', endDate: '', description: '' }])
            }
            style={{
            background: '#007bff',
            color: '#fff',
            border: 'none',
            padding: '10px 14px',
            borderRadius: '8px',
            cursor: 'pointer',
            fontWeight: 500,
            width: '100%',
            marginTop: '8px',
            }}
        >
            + Add Experience
        </button>
        </div>
    );
      case 'skills':
        return (
          <div style={fieldContainer}>
            <h3 style={sectionTitle}>Skills</h3>
            {skills.map((s, idx) => (
              <div key={idx} style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                <input
                  placeholder="Skill name"
                  value={s.name}
                  style={{ ...inputStyle, flex: 2 }}
                  onChange={(e) =>
                    setSkills((prev) =>
                      prev.map((v, i) => (i === idx ? { ...v, name: e.target.value } : v))
                    )
                  }
                />
                <select
                  value={s.level}
                  style={{ ...inputStyle, flex: 1 }}
                  onChange={(e) =>
                    setSkills((prev) =>
                      prev.map((v, i) => (i === idx ? { ...v, level: e.target.value } : v))
                    )
                  }
                >
                  <option value="beginer">Beginner</option>
                  <option value="intermediate">Intermediate</option>
                  <option value="advance">Advanced</option>
                </select>
              </div>
            ))}
            <button
              type="button"
              onClick={() => setSkills([...skills, { name: '', level: 'beginer' }])}
              style={{
                background: '#007bff',
                color: '#fff',
                border: 'none',
                padding: '8px 12px',
                borderRadius: '5px',
                cursor: 'pointer',
              }}
            >
              + Add Skill
            </button>
          </div>
        );
      case 'education':
        return (
          <div style={fieldContainer}>
            <h3 style={sectionTitle}>Education</h3>
            {educations.map((edu, idx) => (
              <div
                key={idx}
                style={{
                    border: '1px solid #ddd',
                    borderRadius: '10px',
                    padding: '20px',
                    marginBottom: '16px',
                    background: '#fafafa',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                    <h4 style={{ margin: 0, fontWeight: 600, color: '#333' }}>Experience #{idx + 1}</h4>
                        <button
                            type="button"
                            onClick={() => setEducations((prev) => prev.filter((_, i) => i !== idx))}
                            style={{
                                background: 'none',
                                border: 'none',
                                color: '#dc3545',
                                fontSize: '18px',
                                cursor: 'pointer',
                                lineHeight: 1,
                            }}
                        >
                            ✕
                        </button>
                </div>
                <div style={{ display: 'flex', gap: '12px', marginBottom: '10px' }}>
                    <div style={{ flex: 1}}>
                        <label style={labelStyle}>School</label>
                        <input
                            value={edu.school}
                            required
                            style={{ ...inputStyle, minWidth: '90%' }}
                            onChange={(e) =>
                                setEducations((prev) =>
                                prev.map((v, i) => (i === idx ? { ...v, school: e.target.value } : v))
                            )
                        }
                        />
                    </div>
                    <div style={{ flex: 1}}>
                        <label style={labelStyle}>Degree</label>
                        <input
                        value={edu.degree}
                        style={{ ...inputStyle, minWidth: '90%' }}
                        onChange={(e) =>
                            setEducations((prev) =>
                            prev.map((v, i) => (i === idx ? { ...v, degree: e.target.value } : v))
                            )
                        }
                        />
                    </div>
                </div>
                <div style={{ display: 'flex', gap: '12px', marginBottom: '10px' }}>
                    <div style={{ flex: 1 }}>
                        <label style={labelStyle}>Start Date</label>
                        <input
                        type="date"
                        value={edu.startDate}
                        style={{ ...inputStyle, minWidth: '90%' }}
                        onChange={(e) =>
                            setEducations((prev) =>
                            prev.map((v, i) => (i === idx ? { ...v, startDate: e.target.value } : v))
                            )
                        }
                        />
                    </div>
                    <div style={{ flex: 1 }}>
                        <label style={labelStyle}>End Date</label>
                        <input
                        type="date"
                        value={edu.endDate}
                        style={{ ...inputStyle, minWidth: '90%' }}
                        onChange={(e) =>
                            setEducations((prev) =>
                            prev.map((v, i) => (i === idx ? { ...v, endDate: e.target.value } : v))
                            )
                        }
                        />
                    </div>
                </div>  
            </div>
            ))}
            <button
              type="button"
              onClick={() =>
                setEducations([...educations, { school: '', degree: '', startDate: '', endDate: '' }])
              }
              style={{
                background: '#007bff',
                color: '#fff',
                border: 'none',
                padding: '8px 12px',
                borderRadius: '5px',
                cursor: 'pointer',
              }}
            >
              + Add Education
            </button>
          </div>
        );
      case 'interests':
        return (
          <div style={fieldContainer}>
            <h3 style={sectionTitle}>Interests</h3>
            {interests.map((i, idx) => (
              <input
                key={idx}
                placeholder="Interest"
                value={i}
                style={inputStyle}
                onChange={(e) =>
                  setInterests((prev) => prev.map((v, i2) => (i2 === idx ? e.target.value : v)))
                }
              />
            ))}
            <button
              type="button"
              onClick={() => setInterests([...interests, ''])}
              style={{
                background: '#007bff',
                color: '#fff',
                border: 'none',
                padding: '8px 12px',
                borderRadius: '5px',
                cursor: 'pointer',
              }}
            >
              + Add Interest
            </button>
          </div>
        );
      default:
        return null;
    }
  };
  return (
    <form
      onSubmit={handleSubmit}
      style={{
        background: '#fff',
        padding: '1.5rem',
        borderRadius: '10px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.08)',
        maxWidth: '600px',
        margin: '0 auto',
      }}
    >
      {renderFields()}
      <div style={{ marginTop: '20px', textAlign: 'center' }}>
        <button
          type="submit"
          style={{
            background: '#28a745',
            color: '#fff',
            border: 'none',
            padding: '10px 20px',
            borderRadius: '8px',
            cursor: 'pointer',
            fontSize: '15px',
          }}
        >
          Save {currentSection}
        </button>
      </div>
    </form>
  );
}
