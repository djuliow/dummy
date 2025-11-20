import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function Invitation() {
  const { slug } = useParams();
  const [invitation, setInvitation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (slug) {
      axios.get(`http://localhost:3000/invitations?slug=${slug}`)
        .then(response => {
          if (response.data && response.data.length > 0) {
            setInvitation(response.data[0]);
          } else {
            setError('Undangan tidak ditemukan.');
          }
          setLoading(false);
        })
        .catch(err => {
          console.error("Error fetching invitation:", err);
          setError('Gagal memuat data undangan.');
          setLoading(false);
        });
    }
  }, [slug]);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Memuat undangan...</div>;
  }

  if (error) {
    return <div className="min-h-screen flex items-center justify-center">{error}</div>;
  }

  if (!invitation) {
    return <div className="min-h-screen flex items-center justify-center">Data undangan tidak tersedia.</div>;
  }

  const { generated_content: details } = invitation;

  return (
    <div className="font-serif bg-gray-100 min-h-screen p-8">
      <div className="max-w-4xl mx-auto bg-white shadow-2xl rounded-lg p-12">
        <header className="text-center border-b-2 pb-8 border-gray-200">
          <h1 className="text-5xl font-bold text-gray-800">{details.namaMempelaiPria} & {details.namaMempelaiWanita}</h1>
          <p className="text-xl text-gray-500 mt-4">Mengundang Anda ke pernikahan kami</p>
        </header>

        <section className="mt-10 text-center">
          <p className="text-lg text-gray-600">Dengan segala hormat, kami mengundang Bapak/Ibu/Saudara/i untuk hadir di acara pernikahan kami yang akan diselenggarakan pada:</p>
          <div className="mt-8">
            <p className="text-2xl font-semibold text-gray-700">{new Date(details.tanggalAcara).toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
            <p className="text-xl text-gray-600">Pukul {details.waktuAcara}</p>
            <p className="text-lg text-gray-500 mt-2">{details.lokasiAcara}</p>
          </div>
          {details.tempatResepsi && (
            <div className="mt-8">
                <h2 className="text-3xl font-semibold text-gray-800">Resepsi</h2>
                <p className="text-xl text-gray-600">Pukul {details.waktuResepsi}</p>
                <p className="text-lg text-gray-500 mt-2">{details.tempatResepsi}</p>
            </div>
          )}
        </section>
        
        <section className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="text-center">
                <img src={details.fotoMempelaiPria} alt={details.namaMempelaiPria} className="w-48 h-48 rounded-full object-cover mx-auto shadow-lg"/>
                <h3 className="text-2xl font-bold mt-4 text-gray-800">{details.namaMempelaiPria}</h3>
                <p className="text-gray-600">Putra dari Bpk. {details.namaAyahMempelaiPria} & Ibu {details.namaIbuMempelaiPria}</p>
            </div>
            <div className="text-center">
                <img src={details.fotoMempelaiWanita} alt={details.namaMempelaiWanita} className="w-48 h-48 rounded-full object-cover mx-auto shadow-lg"/>
                <h3 className="text-2xl font-bold mt-4 text-gray-800">{details.namaMempelaiWanita}</h3>
                <p className="text-gray-600">Putri dari Bpk. {details.namaAyahMempelaiWanita} & Ibu {details.namaIbuMempelaiWanita}</p>
            </div>
        </section>

        {details.galeriFoto && details.galeriFoto.length > 0 && (
            <section className="mt-12">
                <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Galeri Kami</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {details.galeriFoto.map((photo, index) => (
                        <img key={index} src={photo} alt={`Gallery photo ${index + 1}`} className="w-full h-auto rounded-lg shadow-md object-cover"/>
                    ))}
                </div>
            </section>
        )}
        
        {details.musik && (
            <section className="mt-12 text-center">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Lagu Pernikahan</h2>
                <audio controls src={details.musik} className="w-full">
                    Your browser does not support the audio element.
                </audio>
            </section>
        )}

      </div>
    </div>
  );
}

export default Invitation;
