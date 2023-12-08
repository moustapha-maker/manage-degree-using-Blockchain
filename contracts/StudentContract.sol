// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;
pragma experimental ABIEncoderV2;

contract StudentContract {
   
    enum DiplomaMention { Pass, Fair, Good, VeryGood, Excellent }

    struct Degree {
        uint256 degreeId;
        uint256 studentId; 
        string degreeName;
        uint256 yearOfGraduate;
        string pathToTheDegree;
        DiplomaMention diplomaMention;
    }

    struct Student {
        uint256 id;
        string cin;
        string name;
        uint256 age;
    }

    mapping(uint256 => Student) public students;
    mapping(uint256 => Degree) public degrees;
    uint256 public studentsCount;
    uint256 public degreesCount;

    event EntityAdded(uint256 id,uint256 value1, string entityType, string name, uint256 value2, string value3);

    function addStudent(string memory _cin, string memory _name, uint256 _age) public {
        studentsCount++;
        students[studentsCount] = Student(studentsCount, _cin, _name, _age);
        emit EntityAdded(studentsCount, 0 , "Student", _name, _age, "");
    }

  function addDegree(
    uint256 _studentId,
    string memory _degreeName,
    uint256 _yearOfGraduate,
    string memory _pathToTheDegree,
    DiplomaMention _diplomaMention
) public {
    require(_studentId > 0 && _studentId <= studentsCount, "Invalid student ID");
    degreesCount++;
    degrees[degreesCount] = Degree(degreesCount, _studentId, _degreeName, _yearOfGraduate, _pathToTheDegree, _diplomaMention);
    emit EntityAdded(degreesCount, _studentId, "Degree", _degreeName, _yearOfGraduate, _pathToTheDegree);
}


    function getStudent(uint256 _id) public view returns (uint256, string memory, string memory, uint256) {
        require(_id > 0 && _id <= studentsCount, "Invalid student ID");
        Student memory student = students[_id];
        return (student.id, student.cin, student.name, student.age);
    }

    function getDegree(uint256 _id) public view returns (uint256, uint256, string memory, uint256, string memory, DiplomaMention) {
        require(_id > 0 && _id <= degreesCount, "Invalid degree ID");
        Degree memory degree = degrees[_id];
        return (degree.degreeId, degree.studentId, degree.degreeName, degree.yearOfGraduate, degree.pathToTheDegree, degree.diplomaMention);
    }

    function getStudentsCount() public view returns (uint256) {
        return studentsCount;
    }

    function getDegreesCount() public view returns (uint256) {
        return degreesCount;
    }
}
