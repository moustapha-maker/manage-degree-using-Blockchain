import React, { useState, useEffect } from 'react';
import Web3 from 'web3'; // Import web3 library
import StudentContractABI from '../contracts/StudentContract.json'; // Replace with the actual ABI file path
import Button from 'react-bootstrap/Button';
import StudentsTable from '../components/StudentsTable';
import {  useNavigate  } from 'react-router-dom';
import Navebar from '../components/navebar';



const ListStudents = () => {


    const navigate = useNavigate();
    const [web3, setWeb3] = useState(null);
    const [contract, setContract] = useState(null);
    const [account, setAccount] = useState('');
    const [students, setStudents] = useState(null);

    const initWeb3 = async () => { 
          
      //let web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:7545'));
      if (window.ethereum) {
        // use MetaMask's provider
        let web3 = new Web3(window.ethereum);
        
        try {
          const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
          setAccount(accounts[0]);
        } catch (error) {
           
            // User rejected request
          }
      setWeb3(web3);
      const id= await web3.eth.net.getId();
      const contractAddress = StudentContractABI.networks[id].address;
      const contractInstance = new web3.eth.Contract(StudentContractABI.abi, contractAddress);

      setContract(contractInstance);

     /*  const accounts = await web3.eth.getAccounts();
      setAccount(accounts[2]); */
 
}};


      useEffect(() => {
      
    initWeb3();
   
    
      }, []);

      const getAllStudents = async () => {
        try {
            if (contract) {
                let studentCount = Number(await contract.methods.getStudentsCount().call());
                console.log(studentCount);
    
                const newStudents = [];
    
                for (let studentIndex = 1; studentIndex <= studentCount; studentIndex++) {
                    const studentDetails = await contract.methods.getStudent(studentIndex).call();
    
                    const newStudent = {
                        id: Number(studentDetails[0]),
                        cin: studentDetails[1],
                        name: studentDetails[2],
                        age: Number(studentDetails[3]),
                    };
    
                    newStudents.push(newStudent);
                }
    
                console.log(newStudents);
                setStudents(newStudents);
            } else {
                console.error('Mismatch in array lengths');
                // Handle the error appropriately based on your application's requirements
            }
        } catch (error) {
            console.error('Error getting student details:', error);
            // Display a user-friendly error message
        }
    };
    
 
    useEffect(() => {
        getAllStudents();
    }, [getAllStudents]);
    

  
return (

  <div>
<div>
  <Navebar />
</div>
<div style={{ margin: '20px' }}>
 <h3>list of student</h3> 
 <StudentsTable students={students} account={account} />
 </div>


</div> 
      );
};

export default ListStudents;