import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import './App.css';
import configs from './configs';

const App = () => {
  const [data, setData] = useState([]);
  const [name, setName] = useState('');
  const [nim, setNim] = useState('');
  const [birthdate, setBirthdate] = useState('');
  const [address, setAddress] = useState('');
  const navigate = useNavigate()

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.put(`${configs.HOST}/mahasiswa`);
      setData(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleAddData = async (event) => {
    const token = localStorage.getItem('token');
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      event.preventDefault()
      const newData = {
        name: name,
        nim: nim,
        birthdate: birthdate,
        address: address,
      };

      const response = await axios.post(`${configs.HOST}/mahasiswa`, newData, config);
      setData([...data, response.data]);
      setName('');
      setNim('');
      setBirthdate('');
      setAddress('');
      navigate('/daftarmhs')

    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteData = async (id) => {
    try {
      await axios.delete(`${configs.HOST}/mahasiswa/${id}`);
      const updatedData = data.filter((item) => item._id !== id);
      setData(updatedData);
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdateData = async (id) => {
    try {
      const updatedData = {
        name: name,
        nim: nim,
        birthdate: birthdate,
        address: address,
      };
      const response = await axios.put(`${configs.HOST}/mahasiswa/${id}`, updatedData);
      const updatedList = data.map((item) =>
        item._id === id ? response.data : item
      );
      setData(updatedList);
      setName('');
      setNim('');
      setBirthdate('');
      setAddress('');
    } catch (error) {
      console.error(error);
    }
  };

  const handleEditData = (item) => {
    setName(item.name);
    setNim(item.nim);
    setBirthdate(item.birthdate);
    setAddress(item.address);
  };

  return (
    <div className="form-container">
      <h1 className="title">SIMESSI</h1>
      <h2 className="subtitle">Diisi yaa SI'ers!</h2>
      <form onSubmit={handleAddData} className="form">
        <label className="form-label">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="form-input"
            placeholder='Nama Lengkap'
          />
        </label>
        <label className="form-label">
          <input
            type="text"
            value={nim}
            onChange={(e) => setNim(e.target.value)}
            required
            className="form-input"
            placeholder='Nomor Induk Mahasiswa'
          />
        </label>
        <label className="form-label">
          <input
            type="text"
            value={birthdate}
            onChange={(e) => setBirthdate(e.target.value)}
            required
            className="form-input"
            placeholder='Tanggal Lahir'
          />
        </label>
        <label className="form-label">
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
            className="form-input"
            placeholder='Alamat'
          />
        </label>
        <button type="submit" className="form-button">
          Tambah
        </button>
      </form>
    </div>
  );
};

export default App;
