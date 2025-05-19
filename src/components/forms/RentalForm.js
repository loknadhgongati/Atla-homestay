import React from 'react';
import { useForm } from 'react-hook-form';

const rentalOptions = ['apartment', 'condo', 'house'];

const RentalForm = ({ onSubmit }) => {
  const { register, handleSubmit } = useForm();

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="form-group">
        <label htmlFor="title">Title</label>
        <input
          {...register("title")}
          type="text"
          className="form-control"
          id="title"
        />
      </div>

      <div className="form-group">
        <label htmlFor="city">City</label>
        <input
          {...register("city")}
          type="text"
          className="form-control"
          id="city"
        />
      </div>

      <div className="form-group">
        <label htmlFor="street">Street</label>
        <input
          {...register("street")}
          type="text"
          className="form-control"
          id="street"
        />
      </div>

      <div className="form-group">
        <label htmlFor="category">Category</label>
        <select
          {...register("category")}
          className="form-control"
          id="category"
        >
          {rentalOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="image">Image Url</label>
        <input
          {...register("image")}
          type="text"
          className="form-control"
          id="image"
        />
      </div>

      <div className="form-group">
        <label htmlFor="numOfRooms">Rooms</label>
        <input
          {...register("numOfRooms")}
          type="number"
          className="form-control"
          id="numOfRooms"
        />
      </div>

      <div className="form-group">
        <label htmlFor="description">Description</label>
        <textarea
          {...register("description")}
          rows="5"
          className="form-control"
          id="description"
        />
      </div>

      <div className="form-group">
        <label htmlFor="dailyPrice">Daily Price</label>
        <div className="input-group">
          <div className="input-group-prepend">
            <div className="input-group-text">$</div>
          </div>
          <input
            {...register("dailyPrice")}
            type="number"
            className="form-control"
            id="dailyPrice"
          />
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="shared">Shared</label>
        <input
          {...register("shared")}
          type="checkbox"
          className="form-check-input"
          id="shared"
        />
      </div>

      <button type="submit" className="btn btn-bwm-main">
        Create
      </button>
    </form>
  );
};

export default RentalForm;
