import React, { useState } from 'react';
import { supabase } from '../supabaseClient';

function FormPengaduan() {
  const [formData, setFormData] = useState({
    name: '',
    title: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { error } = await supabase.from('reports').insert([formData]);
    if (error) {
      alert('Gagal mengirim: ' + error.message);
    } else {
      alert('Pengaduan terkirim!');
      setFormData({ name: '', title: '', message: '' });
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: '500px', marginTop: '20px' }}>
      <div>
        <label>Nama:</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Judul Pengaduan:</label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Isi Pesan:</label>
        <textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          rows={3}
        />
      </div>
      <button type="submit">Kirim Pengaduan</button>
    </form>
  );
}

export default FormPengaduan;
