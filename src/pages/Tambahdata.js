import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import './tambahData.css';
import { useNavigate } from 'react-router-dom';
import LogOutComponent from '../component/LogoutComponent';
const Tambahdata = () => {
  const navigate = useNavigate();

  const [data, setData] = useState([]);
  const [name, setName] = useState('');
  const [nim, setNim] = useState('');
  const [birthdate, setBirthdate] = useState('');
  const [address, setAddress] = useState('');
  const [editItemId, setEditItemId] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const token = localStorage.getItem('token');

      if (!token) {
        navigate('/login')
      }

      if (token) {
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
  
        const response = await axios.get('https://fair-jade-cormorant-cape.cyclic.app/mahasiswa', config);
        setData(response.data);
      } else {
        // Handle case when token is not available
        console.log('Token not found');
      }
    } catch (error) {
      console.error(error);
    }
  };
  

  const handleDeleteData = async (id) => {
    try {
      const token = localStorage.getItem('token');
  
      if (token) {
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
  
        await axios.delete(`https://fair-jade-cormorant-cape.cyclic.app/mahasiswa/${id}`, config);
        const updatedData = data.filter((item) => item.nim !== id);
        setData(updatedData);
      } else {
        // Handle case when token is not available
        console.log('Token not found');
      }
    } catch (error) {
      console.error(error);
    }
  };
  

  const handleEditData = (item) => {
    // setName(item.name);
    // setNim(item.nim);
    // setBirthdate(item.birthdate);
    // setAddress(item.address);
    // setEditItemId(item._id);
    return navigate('/edit/' + item.nim)
  };

  const handleUpdateData = async () => {
    try {
      const token = localStorage.getItem('token');
  
      if (token) {
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
  
        const updatedData = {
          name: name,
          nim: nim,
          birthdate: birthdate,
          address: address,
        };
  
        await axios.put(`https://fair-jade-cormorant-cape.cyclic.app/mahasiswa/${editItemId}`, updatedData, config);
        fetchData();
        setName('');
        setNim('');
        setBirthdate('');
        setAddress('');
        setEditItemId('');
      } else {
        // Handle case when token is not available
        console.log('Token not found');
      }
    } catch (error) {
      console.error(error);
    }
  };
  

  const handleCancelEdit = () => {
    setName('');
    setNim('');
    setBirthdate('');
    setAddress('');
    setEditItemId('');
  };

  return (
    <div>
      <LogOutComponent/>

      {/* <h1>SIMESSI</h1>
      <h3>Sistem Informasi Mahasiswa Sistem Informasi</h3> */}


      <button onClick={() => { navigate('/tambah') }} id='btn-tambah' style={{marginTop: '1em'}}>Tambah Data Mahasiswa</button>

      <table>
        <thead>
          <tr>
            <th>Nama</th>
            <th>NIM</th>
            <th>Tanggal Lahir</th>
            <th>Alamat</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item._id}>
              <td>{item.name}</td>
              <td>{item.nim}</td>
              <td>{item.birthdate}</td>
              <td>{item.address}</td>
              <td>
                {editItemId === item._id ? (
                  <>
                    <button onClick={handleUpdateData}>Simpan</button>
                    <button onClick={handleCancelEdit}>Batal</button>
                  </>
                ) : (
                  <>
                    <button onClick={() => handleEditData(item)}>Edit</button>
                    <button onClick={() => handleDeleteData(item.nim)}>Hapus</button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Tambahdata;
