import React, { useState, useEffect } from 'react';
import { Link, Route } from 'react-router-dom';
import ShowGithubUser from './ShowGithubUser';

const GithubUserList = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch('https://api.github.com/users');
        if (!response.ok) {
          throw new Error(`Error fetching users: ${response.statusText}`);
        }
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <Route exact path="/"> 
        {!users.length && <p>Add a user and select it to view details.</p>}
      </Route>
      <Route path="/users/:login"> 
        <ShowGithubUser />
      </Route>
      {isLoading && <p>Caricamento utenti in corso...</p>}
      {error && <p>Errore: {error}</p>}
      {users.length > 0 && (
        <ul>
          {users.map((user) => (
            <li key={user.id}>
              <Link to={`/users/${user.login}`}>{user.login}</Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default GithubUserList;