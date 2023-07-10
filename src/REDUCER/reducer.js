const initialState = {
    passengers: [],
    error: null,
    loading: true,
    isEdit: false
};

const rootReducer = (state = initialState, action) => {
    switch (action.type) {

        case 'FETCH_PASSENGER_SUCCESS':
            console.log('reducer', action.payload);
            return {
                ...state,
                passengers: action.payload,
                loading: false,
                error: null,
            };

        case 'FETCH_PASSENGER_FAILURE':
            return {
                ...state,
                passengers: [],
                error: action.payload,
            };

        case 'POST_PASSENGER_SUCCESS':
            console.log()
            return {
                ...state,
                passengers: [...state.passengers, action.payload],
                error: null
            }

        case 'POST_PASSENGER_FAILURE':
            return {
                ...state,
                error: action.payload
            }


        case 'UPDATE_PASSENGER_SUCCESS':
            console.log('update reducer', action.payload);
           
            return {
                ...state,
                passengers: {
                    ...state.passengers,
                    data: state.passengers.data.map((passenger) =>
                        passenger._id === action.payload._id ? action.payload : passenger
                    ),
                },
                loading: false,
                error: null,
                isEdit: false
            };

        case 'UPDATE_PASSENGER_FAILURE':
            return {
                ...state,
                error: action.payload,
            };






        case 'EDIT_PASSENGER':
            return {
                ...state,
                passengers: {
                    ...state.passengers,
                    data: state.passengers.data.map((passenger) =>
                        passenger._id === action.payload ? { ...passenger, isEdit: true } : passenger
                    ),
                },
                isEdit: true,
            };

        case 'CANCEL_EDIT':
            return {
                ...state,
                passengers: {
                    ...state.passengers,
                    data: state.passengers.data.map((passenger) =>
                        passenger._id === action.payload ? { ...passenger, isEdit: false } : passenger
                    ),
                },
                isEdit: false,
            };








        default:
            return state;

    }
}
export default rootReducer;
















