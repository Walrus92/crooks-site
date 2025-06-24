import { useEffect, useState } from 'react';

type Multimedia = {
  id: number;
  filename: string;
  mimetype: string;
  path: string;
  createdAt: string;
};

const MultimediaPanel = () => {
  const [archivos, setArchivos] = useState<File[]>([]);
  const [multimedia, setMultimedia] = useState<Multimedia[]>([]);

  const cargarMultimedia = async () => {
    const res = await fetch('http://localhost:3000/api/multimedia', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    const data: Multimedia[] = await res.json();
    setMultimedia(data);
  };

  useEffect(() => {
    cargarMultimedia();
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setArchivos(Array.from(e.target.files));
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      setArchivos(Array.from(e.dataTransfer.files));
      e.dataTransfer.clearData();
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleUpload = async () => {
    if (archivos.length === 0) return;

    const formData = new FormData();

    archivos.forEach((file) => {
      formData.append('archivo', file);
    });

    await fetch('http://localhost:3000/api/multimedia', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      body: formData,
    });

    setArchivos([]);
    cargarMultimedia();
  };

  const handleDelete = async (id: number) => {
    await fetch(`http://localhost:3000/api/multimedia/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    cargarMultimedia();
  };

  return (
    <div>
      <h2>Panel de Multimedia</h2>

      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        className="border-4 border-dashed border-gray-500 rounded-lg p-6 mb-6 text-center cursor-pointer"
      >
        <p>Arrastra aquí los archivos o haz clic para seleccionar</p>
        <input
          type="file"
          onChange={handleFileChange}
          multiple
          className="hidden"
          id="fileInput"
        />
        <label htmlFor="fileInput" className="cursor-pointer text-blue-400 underline">
          Seleccionar archivos
        </label>
      </div>

      {archivos.length > 0 && (
        <div className="mb-4">
          <h3>Archivos listos para subir:</h3>
          <ul>
            {archivos.map((file, idx) => (
              <li key={idx}>{file.name}</li>
            ))}
          </ul>
          <button onClick={handleUpload} className="mt-2 px-4 py-2 bg-blue-600 text-white rounded">
            Subir archivos
          </button>
        </div>
      )}

      <ul>
        {multimedia.map((item) => (
          <li key={item.id} className="mb-6">
            <p>
              <strong>{item.filename}</strong> ({item.mimetype})
            </p>
            {item.mimetype.startsWith('image') ? (
              <img
                src={`http://localhost:3000/uploads/${item.filename}`}
                alt={item.filename}
                width={200}
              />
            ) : (
              <video width={300} controls>
                <source
                  src={`http://localhost:3000/uploads/${item.filename}`}
                  type={item.mimetype}
                />
              </video>
            )}
            <br />
            <button
              onClick={() => handleDelete(item.id)}
              className="mt-2 px-3 py-1 bg-red-600 text-white rounded"
            >
              Eliminar
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MultimediaPanel;
