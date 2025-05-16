import React from 'react';
import RentalCard from '../components/rental/RentalCard';
import {connect} from 'react-redux';
import { fetchRentals} from '../actions';


class RentalHome extends React.Component {
  componentDidMount() {
    this.props.dispatch(fetchRentals());
  }

  renderRentals = (rentals) => {

    if (!rentals || !Array.isArray(rentals)) {
      console.warn("No rentals available or rentals is not an array.");
      return <div>No rentals available.</div>;
    }

    return rentals.map((rental, index) => (
      <div key={rental._id || index} className="col-md-3">
        <RentalCard rental={rental} />
      </div>
    ));
  };



  render() {
    const { rentals } = this.props;

    return (
      <div className="card-list">
        <h1 className="page-title">Your Home All Around the World</h1>
        <div className="row">
          {this.renderRentals(rentals)}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    rentals: state.rentals,
  };
};

export default connect(mapStateToProps)(RentalHome);