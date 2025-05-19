import React, { useState } from 'react';
import RentalForm from 'components/forms/RentalForm';
import { createRental } from 'actions';
import { useNavigate } from 'react-router-dom';

const RentalNew = () => {
  const [errors, setErrors] = useState(null);
  const navigate = useNavigate();

  const handleRentalCreate = (rentalData) => {
    createRental(rentalData)
      .then(() => navigate('/'))
      .catch(() => setErrors('Something went wrong'));
  };

  return (
    <section id="newRental">
      <div className="bwm-form">
        <div className="row">
          <div className="col-md-5">
            <h1 className="page-title">Create Rental</h1>
            <RentalForm onSubmit={handleRentalCreate} />
            {errors && <div className="alert alert-danger">{errors}</div>}
          </div>
          <div className="col-md-6 ml-auto">
            <div className="image-container">
              <h2 className="catchphrase">Hundreds of awesome places in reach of few clicks.</h2>
              <img src="/images/create-rental.jpg" alt="" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RentalNew;
