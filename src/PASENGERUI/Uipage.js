import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPassenger, updatePassenger, editPassenger, cancelEdit } from "../ACTION/action";





function Uipage() {

    const [name, setName] = useState('')
    const [trips, setTrips] = useState('')
    const [airline, setAirline] = useState('')
 

    const dispatch = useDispatch();
    const passengers = useSelector((state) => state.passengers.data); // Access the data array from the passengers state


    const fetchData = async () => {
        try {
            await dispatch(fetchPassenger());
        } catch (error) {
            console.log(error.message);

        }
    };


    const handleEdit = (passengerId) => {
        dispatch(editPassenger(passengerId))
    };

    const handleCancelEdit = (passengerId) => {
        dispatch(cancelEdit(passengerId))
    };




    const handleUpdate = async (id) => {
        const data = {
            "name": name,
            "trips": trips,
            "airline": airline
        };
        console.log(id, "id from ui page");
        if (id) {
            await dispatch(updatePassenger(id, data, airline));
            setName('');
            setTrips('');
            setAirline('');
            console.log(data, "new data");
            console.log(airline, "AIRLINE new data");
            alert("DATA UPDATED SUCCESSFULLY");

            await dispatch(fetchPassenger());
        } else {
            console.log("Invalid passenger id");
        }
    };






    return (
        <div>
            <h1>PASSENGERS DETAILS LIST</h1>
            <button onClick={() => fetchData()}> FETCH PASSENGER DATA</button>
            {passengers && Array.isArray(passengers) && passengers.length > 0 ? (
                <ul>
                    {passengers.map((passenger) => (
                        <li key={passenger._id}>
                            {passenger.isEdit ? (
                                <>
                                    <input type="text" placeholder="NAME" value={name} onChange={(e) => setName(e.target.value)} />
                                    <input type="text" placeholder="TRIPS" value={trips} onChange={(e) => setTrips(e.target.value)} />
                                    <input type="text" placeholder="AIRLINE" value={airline} onChange={(e) => setAirline(e.target.value)} />

                                    <p>Name: {passenger.name}</p>
                                    <p>Trips: {passenger.trips}</p>
                                    <p>MAIN ID: {passenger._id}</p>

                                    {passenger.airline.map((airline) => (
                                        <div key={airline._id}>
                                            <p>Airline ID: {airline.id}</p>
                                            <p>Airline Name: {airline.name}</p>
                                            <p>Airline Country: {airline.country}</p>
                                            <p>Airline Country ID : {airline._id}</p>
                                        </div>
                                    ))}


                                    <button onClick={() => handleCancelEdit(passenger._id)}>CANCEL</button>
                                    <button onClick={() => handleUpdate(passenger._id)}>DONE</button>
                                    <hr />
                                </>
                            ) : (
                                <>
                                    <h3>Passenger data</h3>
                                    <p>Name: {passenger.name}</p>
                                    <p>Trips: {passenger.trips}</p>
                                    <p>MAIN ID: {passenger._id}</p>

                                    {passenger.airline.map((airline) => (
                                        <div key={airline._id}>
                                            <h3>AIRLINE DETAILS</h3>
                                            <p>Airline ID: {airline.id}</p>
                                            <p>Airline Name: {airline.name}</p>
                                            <p>Airline Country: {airline.country}</p>
                                            <p>Airline Country ID : {airline._id}</p>

                                        </div>
                                    ))}

                                    <button onClick={() => handleEdit(passenger._id)}>EDIT</button>
                                    <hr />
                                </>
                            )}
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No passengers found.</p>
            )}
         


        </div>
    );
}

export default Uipage;
