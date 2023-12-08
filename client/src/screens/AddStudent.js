import React, { useState, useEffect } from 'react';
import Web3 from 'web3'; // Import web3 library
import StudentContractABI from '../contracts/StudentContract.json'; // Replace with the actual ABI file path
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate  } from 'react-router-dom';
import Navebar from '../components/navebar';
import {
  MDBValidation,
  MDBValidationItem,
  MDBInput,
  MDBInputGroup,
  MDBBtn,
  MDBCheckbox
} from 'mdb-react-ui-kit';


const AddStudent = () => {

  const navigate = useNavigate();

    const [web3, setWeb3] = useState(null);
    const [contract, setContract] = useState(null);
    const [account, setAccount] = useState('');
    const [name, setName] = useState('');
    const [age, setAge] = useState(0);
    const [cin,setCin] = useState('');
    const [formValue, setFormValue] = useState({
      cin: '',
      name: '',
      age: '',
    });
  

    const [studentsCount, setStudentsCount] = useState(0);


    useEffect(() => {
        const initWeb3 = async () => { 
          
              //let web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:7545'));
              if (window.ethereum) {
                // use MetaMask's provider
                let web3 = new Web3(window.ethereum);
                
                try {
                  const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
                  console.log(accounts)
                  setAccount(accounts[0]);
                } catch (error) {
                   
                    // User rejected request
                  }
              setWeb3(web3);
              const id= await web3.eth.net.getId();
              const contractAddress = StudentContractABI.networks[id].address;
              const contractInstance = new web3.eth.Contract(StudentContractABI.abi, contractAddress);
      
              setContract(contractInstance);
         
        }};
      
        initWeb3(); 
      }, []);

    const addStudent = async () => {
        try {
          console.log('Adding student...');
          if (!cin || !name || !age) {
            console.error('Please fill out all fields.');
            return;
          }

          if (contract && account) {
            await contract.methods.addStudent(cin , name , age).send({ from: account, gas: '1000000' });
            console.log('Student added successfully!');
            setStudentsCount(studentsCount + 1);
            navigate('/');
          }
        } catch (error) {
          console.error('Error adding student:', error);
        }
      };

return (
 

      <div>
         <div>
  <Navebar />
</div>
<div class="card">
  <div class="card-body" style={{alignContent:'center'}}>
      <h1 style={{margin:'10px'}}>Add Student</h1>
      <MDBValidation style={{alignItems:'center', alignContent:'center'}}>
        <MDBValidationItem className='col-md-4' feedback={''} style={{margin:'10px'}}>
          <MDBInput
            defaultValue={formValue.cin}
            name='cin'
            onChange={(e) => setCin(e.target.value)}
            required
            placeholder='cin'
          />
        </MDBValidationItem>
        <MDBValidationItem className='col-md-4' feedback={''} style={{margin:'10px'}}>
          <MDBInput
            defaultValue={formValue.name}
            name='name'
            onChange={(e) => setName(e.target.value)}
            id='validationName'
            required
            placeholder='Name'
          />
        </MDBValidationItem>
        <MDBValidationItem className='col-md-4' feedback={''} style={{margin:'10px'}}>
          <MDBInput
            defaultValue={formValue.age}
            name='age'
            onChange={(e) => setAge(e.target.value)}
            id='validationAge'
            type='number'
            required
            placeholder='Age'
          />
        </MDBValidationItem>
        <div className='col-12'>
          <MDBBtn class="btn btn-success" onClick={addStudent} style={{margin:'10px'}}>Valider</MDBBtn>
        </div>
      </MDBValidation>
    </div>
    </div>
</div>
      );
};

export default AddStudent;