import React, { useState, useEffect } from 'react';
import Web3 from 'web3';
import StudentContractABI from '../contracts/StudentContract.json';
import 'bootstrap/dist/css/bootstrap.min.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useNavigate, useParams } from 'react-router-dom';
import Navebar from '../components/navebar';

const AddDegree = () => {
  const studentId = useParams();
  
  const navigate = useNavigate();

  const [web3, setWeb3] = useState(null);
  const [contract, setContract] = useState(null);
  const [account, setAccount] = useState('');
  const [yearOfGraduate, setYearOfGraduate] = useState(0);
  const [pathToTheDegree, setPathToTheDegree] = useState('');
  const [degreeName, setDegreeName] = useState('');
  const [diplomaMention, setDiplomaMention] = useState(0);
  const [degreeCount, setDegreeCount] = useState(0);

  

  const getDiplomaMentionValue = (mention) => {
    switch (mention) {
      case 'Pass':
        return 0;
      case 'Fair':
        return 1;
      case 'Good':
        return 2;
      case 'Very Good':
        return 3;
      case 'Excellent':
        return 4;
      default:
        return 0; 
    }
  };

  useEffect(() => {
    const initWeb3 = async () => {
      if (window.ethereum) {
        let web3 = new Web3(window.ethereum);
        try {
          const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
          setAccount(accounts[0]);
        } catch (error) {
          console.error('User rejected request');
        }
        setWeb3(web3);
        const id = await web3.eth.net.getId();
        const contractAddress = StudentContractABI.networks[id].address;
        const contractInstance = new web3.eth.Contract(StudentContractABI.abi, contractAddress);
        setContract(contractInstance);
      }
    };

    initWeb3();
  }, []);

  

  const addDegree = async () => {
    try {
      console.log('Adding degree...');
      if (contract && account) {
        await contract.methods.addDegree(studentId?.id, degreeName, yearOfGraduate, pathToTheDegree.split("\\").pop() , getDiplomaMentionValue(diplomaMention)).send({ from: account, gas: '1000000' });
        console.log('Degree added successfully!');
        setDegreeCount(degreeCount + 1);
        navigate(`/view-degrees/${studentId?.id}`);
      }
    } catch (error) {
      console.error('Error adding degree:', error);
    }
  };

  return (
    <div>
    <div>
    <Navebar />
  </div>
    <div className="container">
      <h1>Add Degree</h1>
      <Form>
        <Form.Group className="mb-2">
          <Form.Label>Degree Name:</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter degree name"
            value={degreeName}
            onChange={(e) => setDegreeName(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Year of Graduate:</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter your year of graduation"
            value={yearOfGraduate}
            onChange={(e) => setYearOfGraduate(parseInt(e.target.value, 10))}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Path to the Degree:</Form.Label>
          <Form.Control
            type="file"
            placeholder="Select your path to the degree file"
            value={pathToTheDegree}
            onChange={(e) => setPathToTheDegree(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Diploma Mention:</Form.Label>
          <Form.Control
            as="select"
            value={diplomaMention}
            onChange={(e) => setDiplomaMention(e.target.value)}
          >
            <option value="Pass">Pass</option>
            <option value="Fair">Fair</option>
            <option value="Good">Good</option>
            <option value="Very Good">Very Good</option>
            <option value="Excellent">Excellent</option>
          </Form.Control>
        </Form.Group>
        <Button variant="success" onClick={addDegree}>
          Valider
        </Button>
      </Form>
    </div>
    </div>
  );
};

export default AddDegree;
