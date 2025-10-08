/**
 * Don't forget to pray before start coding!
 * 
 * @author Fajar Postman
 * 
 */

'use client';
import React, { useState } from 'react';

export default function SectionForm() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');

    return (
        <form action={async (formData: FormData) => {

        }}
        onSubmit={async (e) => {
            e.preventDefault();
            const form = new FormData();
            form.set('type', 'personal');
            form.set('data', JSON.stringify({ name, email}));
            form.set('userId', 'user-123');

            await fetch('/api/sections', { method: 'POST', body: form });
            alert('Submitted refresh to see preview');
        }}
        >
            <div>
                <label>Name</label><br />
                <input value={name} onChange={(e) => setName(e.target.value)} required />
            </div>
            <div>
                <label>Email</label><br />
                <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" required />
            </div>
            <button type="submit">Add Peronsal</button>
        </form>
    )
}