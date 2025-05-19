import React, { useEffect } from "react";
import { useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchRentalById } from '../actions';
import RentalInfo from 'components/rental/RentalInfo';

const RentalDetail = ({ rental, isFetching, dispatch }) => {
  const { id } = useParams(); // Using useParams to get the rental ID from the URL

  useEffect(() => {
    dispatch(fetchRentalById(id)); // Fetch the rental details when component mounts
  }, [dispatch, id]);

  if (isFetching) return <p>Loading...</p>;

  return (
    <section id="rentalDetails">
      <div className="upper-section">
        <div className="row">
          <div className="col-md-6">
            <img src={rental.image} alt={rental.title} />
          </div>
          <div className="col-md-6">
            <img src={rental.image} alt={rental.title} />
          </div>
        </div>
      </div>

      <div className="details-section">
        <div className="row">
          <div className="col-md-8">
            <RentalInfo rental={rental} />
          </div>
          <div className="col-md-4">BOOKING</div>
        </div>
      </div>
    </section>
  );
};

const mapStateToProps = ({ rental }) => ({
  rental: rental.item,
  isFetching: rental.isFetching
});

export default connect(mapStateToProps)(RentalDetail);