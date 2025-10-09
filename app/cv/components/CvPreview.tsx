/**
 * Don't forget to pray before start coding!
 * 
 * @author Fajar Postman
 * 
 */

'use client';
import React, { useEffect, useState } from 'react';
import html2pdf from 'html2pdf.js';
import CvTemplate from './CvTemplate';

interface Section {
  _id: string;
  type: string;
  data: any;
}

export default function CVPreview() {
  const [sections, setSections] = useState<Section[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch('/api/sections');
        const data = await res.json();

        if (Array.isArray(data)) {
          setSections(data);
        } else {
          console.error('Unexpected response:', data);
          setError('Unexpected response format');
        }
      } catch (err: any) {
        console.error('Error fetching sections:', err);
        setError(err.message);
      }
    };

    load();
    window.addEventListener('cv-updated', load);
    return () => window.removeEventListener('cv-updated', load);
  }, []);

  const exportPDF = () => {
    const element = document.getElementById('cv-template');
    if (element) {
      html2pdf().from(element).save('my-cv.pdf');
    }
  };
  
  const clearData = async () => {
    const confirmClear = confirm("Are you sure want to clear all CV Data?");
    if (!confirmClear) return;

    try {
      setLoading(true);
      const res = await fetch('/api/sections', { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed to clear data');
      setSections([]);
      setMessage('All data cleared successfully!');
      setTimeout(() => setMessage(null), 2000);
    } catch (err: any) {
      console.error('Error clearing data:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  if (error) return <p style={{ color: 'red' }}>Error generate: {error}</p>;

  return (
    <div style={{
      marginTop: 20,
      background: '#fff',
      padding: '2rem',
      borderRadius: '10px',
      boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
    }}>
      <h1 style={{ textAlign: 'center' }}>CV Preview</h1>

      {sections.length === 0 ? (
        <p>No sections yet.</p>
      ) : (
        <>
          <div style={{ textAlign: 'center', marginBottom: '20px' }}>
            <button
              onClick={exportPDF}
              style={{
                padding: '10px 20px',
                borderRadius: '5px',
                backgroundColor: '#333',
                color: 'white',
                cursor: 'pointer',
                border: 'none',
                marginRight: '10px'
              }}
            >
              Export to PDF
            </button>
            <button
              onClick={clearData}
              disabled={loading}
              style={{
                padding: '10px 20px',
                borderRadius: '5px',
                backgroundColor: '#b61616',
                color: 'white',
                cursor: loading ? 'not-allowed' : 'pointer',
                border: 'none',
                marginLeft: '10px',
                opacity: loading ? 0.6 : 1
              }}
            >
              Clear Data
            </button>
          </div>
          <CvTemplate sections={sections} />
        </>
      )}
    </div>
  );
}
