const Booking = require('../models/bookings');

const moment = require('moment');

exports.createBooking = async (req, res) => {
    const bookingData = req.body;
    const booking = new Booking({ ...bookingData, user: res.locals.user });

    if (!checkIfBookingDatesAreValid(booking)) {
        return res.sendApiError(
            {
                title: 'Invalid Booking',
                detail: 'Dates are invalid!'
            });
    }

    try {
        const rentalBookings = await Booking.find({ rental: booking.rental });
        const isBookingValid = checkIfBookingIsValid(booking, rentalBookings);

        if (isBookingValid) {
            const savedBooking = await booking.save();
            return res.json({ startAt: savedBooking.startAt, endAt: savedBooking.endAt })
        } else {
            return res.sendApiError(
                {
                    title: 'Invalid Booking',
                    detail: 'Choosen dates are already taken!'
                });
        }
    } catch (error) {
        return res.mongoError(error);
    }
}

function checkIfBookingDatesAreValid(booking) {
    let isValid = true;

    if (!booking.startAt || !booking.endAt) {
        isValid = false;
    }

    if (moment(booking.startAt) > moment(booking.endAt)) {
        isValid = false;
    }

    return isValid;
}

function checkIfBookingIsValid(pendingBooking, rentalBookings) {
    let isValid = true;

    if (rentalBookings && rentalBookings.length > 0) {

        isValid = rentalBookings.every(booking => {
            const pendingStart = moment(pendingBooking.startAt);
            const pendingEnd = moment(pendingBooking.endAt);

            const bookingStart = moment(booking.startAt);
            const bookingEnd = moment(booking.endAt);

            return ((bookingStart < pendingStart) && bookingEnd < pendingStart ||
                (pendingEnd < bookingEnd && pendingEnd < bookingStart));

        })
    }

    return isValid
}