/* 
  Implement a button which makes a get request to https://reqres.in/ to get a list of users and display them.
  100% free reign to accomplish this goal however you wish, within the context of react.

  apiMethods.js file has already been stubbed out for you. Feel free to use it or not.

  Bonus 1: Use MUI for implementation UI.

  Bonus 2:  Add a button for each user to make a delete request to delete that user. 
          Update the displayed users excluding the deleted user.

  Bonus 3: Make a filter box to filter the displayed users by name.
*/

import { Button, Grid } from '@mui/material';
import { Container } from '@mui/system';
import React from 'react';
import ReactDOM from 'react-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import useGetUsers from './apiMethods';
import PersonCard from './PersonCard';
import './styles.css';
import UserProvider, { useUserState } from './UserProvider';
const queryClient = new QueryClient();

export function App() {
  const { status, data, error } = useGetUsers();
  const { setUsers, users } = useUserState();

  const fetchBtnHandle = () => {
    setUsers(data);
  };
  const filterUserBtn = (userId) => {
    const newUser = [...users];
    const filterUser = newUser.filter((user) => user.id === userId);
    setUsers(filterUser);
  };
  return (
    <div className="App">
      <h2>Users from API:</h2>
      <Container maxWidth="xl" className="app-container">
        <div>
          <Button variant="contained" onClick={fetchBtnHandle}>
            fetch
          </Button>

          <div className="main-content-wrapper">
            {status === 'loading' ? (
              <div>...loading</div>
            ) : status === 'error' ? (
              <span>Error: {error.message}</span>
            ) : (
              <Grid container spacing={2} sx={{ width: 800 }}>
                {users
                  ? users.map((user) => {
                      return (
                        <Grid key={user.id} item xs={4}>
                          <PersonCard
                            personId={user.id}
                            personImg={user.avatar}
                            PersonFirst={user.first_name}
                            PersonLast={user.last_name}
                            PersonEmail={user.email}
                          />
                        </Grid>
                      );
                    })
                  : null}
              </Grid>
            )}
            <div className="filter-section">
              <h3>filter name</h3>
              <div className="filter-section-wrapper">
                <ul>
                  {users
                    ? users.map((user) => {
                        return (
                          <li
                            key={user.id}
                            onClick={() => filterUserBtn(user.id)}
                          >
                            {user.first_name}
                          </li>
                        );
                      })
                    : null}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}

const rootElement = document.getElementById('root');
ReactDOM.render(
  <UserProvider>
    <QueryClientProvider client={queryClient}>
      <App />
      <ReactQueryDevtools initialIsOpen />
    </QueryClientProvider>
  </UserProvider>,
  rootElement
);
