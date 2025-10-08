/**
 * Don't forget to pray before start coding!
 * 
 * @author Fajar Postman
 * 
 */

import React from 'react';

type Props = { sections: any[] };

export default function CvPreview({ sections }: Props) {
  return (
    <div>
      <h2>Preview</h2>
      {sections?.length ? (
        sections.map((s) => (
          <div key={s._id} style={{ border: '1px solid #eee', padding: 8, marginBottom: 8 }}>
            <strong>{s.type}</strong>
            <pre style={{ whiteSpace: 'pre-wrap' }}>{JSON.stringify(s.data, null, 2)}</pre>
          </div>
        ))
      ) : (
        <p>No sections yet.</p>
      )}
    </div>
  );
}