import React from 'react';

export const UserCard = ({ userInfo }) => {
  const {
    email, name, phone, photo, position,
  } = userInfo;

  return (
    <div className="card">
      <div className="card__block">
        <img className="card__img" src={photo} alt="User img" />

        <div className="card__name" title={`${name}`}>
          {name.length > 25 ? `${name.slice(0, 25)}...` : name}
        </div>

        <div className="card__info">
          <div>{position}</div>

          <a
            href={`mailto:${email}`}
            className="card__info--hover"
            title={`${email}`}
          >
            {email.length > 25 ? `${email.slice(0, 25)}...` : email}
          </a>

          <a href={`tel:${phone}`} className="card__info--hover">
            {phone}
          </a>
        </div>
      </div>
    </div>
  );
};
