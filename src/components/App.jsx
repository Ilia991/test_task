import React, { useEffect, useState } from 'react';
import { UserCard } from './UserCard';
import { PostForm } from './Form';
import { getToken, getUsers } from '../server/fetch';
import { Loader } from './Loader';
import '../App.scss';

const App = () => {
  const [users, setUsers] = useState([]);
  const [lodaer, setLoader] = useState(true);
  const [error, setError] = useState(false);
  const [countPage, setCountPage] = useState(1);

  const prevPage = () => {
    setCountPage((page) => page - 1);
    setError(false);
  };

  useEffect(() => {
    setLoader(true);
    getUsers(countPage)
      .then((res) => {
        setUsers(res.data.users);
      })
      .catch(() => {
        setError(true);
        setCountPage((page) => page - 1);
      });
    setLoader(false);

    getToken().then((res) => localStorage.setItem('Token', res.data.token));
  }, [countPage]);

  return (
    <div className="page">
      <header className="header page__section">
        <div className="container">
          <div className="header__block">
            <a href="/" className="logo">
              <img className="logo__img" src="./Logo.png" alt="logo" />
            </a>

            <div className="btn__block">
              <button className="btn" type="button">Users</button>
              <button className="btn" type="button">Sing up</button>
            </div>
          </div>
        </div>

        <div className="header__info">
          <div className="container">
            <div className="header__info--wrapper">
              <div className="header__info--block">
                <h1 className="page__section--title page__section--n-m">
                  Test assignment for front-end developer
                </h1>

                <p className="header__info--text">
                  What defines a good front-end developer is one that has
                  skilled knowledge of HTML, CSS, JS with a vast understanding
                  of User design thinking as they&apos;ll be building web interfaces
                  with accessibility in mind. They should also be excited to
                  learn, as the world of Front-End Development keeps evolving.
                </p>

                <button className="btn" type="button">Sing up</button>
              </div>
            </div>
          </div>
        </div>
      </header>

      <section className="page__section work">
        <div className="container">
          <div className="work__block">
            <h2 className="page__section--title">Working with GET request</h2>

            <ul className="work__list">
              {users
                && users.map((user) => (
                  <li className="work__item" key={user.id}>
                    <UserCard userInfo={user} />
                  </li>
                ))}
            </ul>

            {lodaer && <Loader />}

            <div className="btn__block">
              {!error && (
                <button
                  className="btn"
                  type="button"
                  onClick={() => setCountPage((page) => page + 1)}
                >
                  Show more
                </button>
              )}

              {countPage > 1 && (
                <button
                  type="button"
                  className="btn"
                  onClick={() => prevPage()}
                >
                  Show prev
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="page__section work">
        <div className="container">
          <div className="work__block">
            <h2 className="page__section--title">Working with POST request</h2>

            <PostForm setCountPage={setCountPage} />
          </div>
        </div>
      </section>
    </div>
  );
};

export default App;
