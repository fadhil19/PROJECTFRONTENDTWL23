import { useState, useEffect } from "react"
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { Button, TextField } from '@mui/material';


export default function EditComponent() {
    const navigate = useNavigate()
    const {nim} = useParams()
    const [data, setData]  = useState({})
    const [name, setName] = useState('');
    const [birthdate, setBirthdate] = useState('');
    const [id, setId] = useState('');
    const [address, setAddress] = useState('');
    const [formData, setFormData] = useState({
      name: '',
      nim: '',
      birthdate: '',
      address: '',
    });
    useEffect(() => {
      fetchData();
    }, []);
  
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
    
        if (token) {
          const config = {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          };
    
          const response = await axios.get('https://fair-jade-cormorant-cape.cyclic.app/mahasiswa/' + nim, config);
          const responseData = response.data[0]
          setData({name: response.data[0].name, birthdate:  response.data[0].birthdate, address:  response.data[0].address});
          setAddress(responseData.address)
          setBirthdate(responseData.birthdate)
          setName(responseData.name)
          setId(responseData._id)
          console.log('formData', formData)

        } else {
          console.log('Token not found');
        }
      } catch (error) {
        console.error(error);
      }
    };



    const handleInputChange = (e) => {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value,
      });
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      const updateData =  {
        address,
        name, 
        birthdate
      };

      const token = localStorage.getItem('token');
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      try {
        const updatedData = {
          name: name,
          birthdate: birthdate,
          address: address,
        };
        console.log('nim request', nim)
        const response = await axios.put(`https://fair-jade-cormorant-cape.cyclic.app/mahasiswa/${nim}`, updatedData, config);
        navigate('/daftarmhs') 
  
      } catch (error) {
        console.error(error);
      }

    };


    return (
      <form onSubmit={handleSubmit}>
        <div>
          <TextField
            label="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            variant="outlined"
            fullWidth
            margin="normal"
          />
        </div>
        <div>
          <TextField
            label="Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            variant="outlined"
            fullWidth
            margin="normal"
          />
        </div>
        <div>
          <TextField
            label="Birth Date"
            value={birthdate}
            onChange={(e) => setBirthdate(e.target.value)}
            variant="outlined"
            fullWidth
            margin="normal"
            type="date"
          />
        </div>
        <Button type="submit" variant="contained" color="primary">
          Update
        </Button>
      </form>
    );
}