import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function View1() {
  const [filiere, setFiliere] = useState({
    _id: '',
    filiere: {
      Nom_F: '',
      desc: '',
    },
    classes: '',
    total_etudiants: '',
  });

  const { _id } = useParams();

  useEffect(() => {
    if (!_id) return;
    const fetchFiliere = async () => {
      const { data } = await axios.get(`http://localhost:3002/filieres/${_id}`);
      setFiliere(data);
    };
    fetchFiliere();
  }, [_id]);




  return (
    <>
    
      <Form >
      <input
          type="text"
          placeholder="ID"
          autoFocus
          className="oppp"
          value={filiere?._id}
          
          required
        />
        <br />
        <input
          type="text"
          placeholder="name"
          autoFocus
          name="Nom_F"
          value={filiere?.filiere?.Nom_F}
         
          required
        />
        <input
          type="text"
          placeholder="desc"
          autoFocus
          name="desc"
          value={filiere?.filiere?.desc}
       
          required
        />
          <input
          type="text"
          placeholder="classes"
          autoFocus
          name="classes"
          value={filiere?.classes}
       
          required
        />
          <input
          type="text"
          placeholder="total_etudiants"
          autoFocus
          name="total_etudiants"
          value={filiere?.total_etudiants}
         
          required
        />
        <Button type="submit" variant="primary"   className="hj">
          Ajouter
        </Button>
      </Form>
    </>
  );
}

export default View1;

