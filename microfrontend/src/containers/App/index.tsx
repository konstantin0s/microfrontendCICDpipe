import React, { useState, useEffect } from 'react';
import { BACK_URL } from '../../variables';

import GlobalStyle from '../../global-styles';

import { SharedData } from './types';
import UserItem from '../../components/UserItem';


const App = ({ userId }: SharedData) => {
  const [oneUser, setOneUser] = useState();

  useEffect(() => {
    fetch(`http://localhost:8080/users/${userId}`, {
      method: 'GET',
      headers: {'Content-Type': 'application/json'}
    })
    .then((response) => response.json())
    .then(data => setOneUser(Object.assign(data)))
    .catch(({ message })=> {
      console.log(message)
    })
   }, [userId]);


  //  console.log(oneUser)


  return (
    <>
      <div>
        Welcomed to this{' '}
        <a
          target="_blank"
          rel="noreferrer"
          href="https://martinfowler.com/articles/micro-frontends.html"
        >
          MFE
        </a>
        , the current user ID is {userId}.
       {oneUser &&  <UserItem oneUser={oneUser} />}
      </div>
      <GlobalStyle />
    </>
  );
};

export default App;
