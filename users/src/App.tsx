import { useState, useEffect } from 'react';
import MFeUi from './components/MFeUi';
import UserList from './containers/Users/UserList';
import './App.css';

const App: React.FunctionComponent = (props) => {
  const [userList, setUserList] = useState([]);
  const [oneUser, setOneUser] = useState();

  useEffect(() => {
  fetch('http://localhost:8080/users', {
  method: 'GET',
  headers: {'Content-Type': 'application/json'}
})
.then((response) => response.json())
.then(data => setUserList(Object.assign(data)))
.catch(({ message })=> {
  console.log(message)
})
   }, []);

   const selectUserHandler = (userId: any) => {
     setOneUser(userId)
  };


  console.log(userList);


  return (
    <div className="App">
      <MFeUi source="http://localhost:8081/static/starter-mfe-ui.js" 
       sourceConfig="" mFeUiData={{userId: oneUser}} webComponentName="starter-mfe-ui" />
      <UserList users={userList} onClickUser={selectUserHandler} />
    </div>
  );
}

export default App;
