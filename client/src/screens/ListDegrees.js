import React, { useState, useEffect } from 'react';
import Web3 from 'web3'; // Import web3 library
import StudentContractABI from '../contracts/StudentContract.json'; // Replace with the actual ABI file path
import DegreesTable from '../components/DegreesTable';
import { useNavigate, useParams} from 'react-router-dom';
import Navebar from '../components/navebar';


const ListDegrees= () => {
    const navigate = useNavigate();
    const studentId  = useParams();

    const [web3, setWeb3] = useState(null);
    const [contract, setContract] = useState(null);
    const [account, setAccount] = useState('');
    const [studentsCount, setStudentsCount] = useState(0);
    const [degrees, setDegrees] = useState(null);


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
   
const mention = ["Pass", "Fair", "Good", "VeryGood", "Excellent"]

const addDegree = (event) => {
    navigate(`/add-degree/${studentId?.id}`); // Navigate to the student's degrees page

  }

      useEffect(() => {
      
    initWeb3();
   
    
      }, []);


    const getDegreesByStudentID = async () => {
        try {
            console.log(studentId?.id)
            if (contract && studentId?.id > 0 && studentId?.id <= studentsCount + 2) {
                const degreeCount = Number(await contract.methods.getDegreesCount().call());
                console.log(degreeCount);
    
                const newDegrees = [];
    
                for (let degreeIndex = 1; degreeIndex <= degreeCount; degreeIndex++) {
                    const degreeDetails = await contract.methods.getDegree(degreeIndex).call();
    
                    if (degreeDetails[1] == studentId?.id) {
                        const newDegree = {
                            id: Number(degreeDetails[0]),
                            degreeName: degreeDetails[2],
                            yearOfGraduate: Number(degreeDetails[3]),
                            pathToTheDegree: degreeDetails[4],
                            diplomaMention: mention[Number(degreeDetails[5])],
                        };
    
                        newDegrees.push(newDegree);
                    }
                }
    
                console.log(newDegrees);
                setDegrees(newDegrees);
            } else {
                console.error('Invalid student ID');
                // Handle the error appropriately based on your application's requirements
            }
        } catch (error) {
            console.error('Error getting degree details:', error);
            // Display a user-friendly error message
        }
    };

    useEffect(() => {
        getDegreesByStudentID();
          }, [getDegreesByStudentID]);
    

return (

  <div>
    <div>
  <Navebar />
</div>
  
<div style={{margin:'20px'}}>
 <h3>list of Degree</h3> 
 <DegreesTable degrees={degrees} />
 </div>

 
 
</div>
      );
};

export default ListDegrees;