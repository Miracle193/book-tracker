import { UPDATE_WANT_TO_READ, UPDATE_CURRENTLY_READING, UPDATE_READ } from "./actions";

export const CURRENTLY_READING = "Currently Reading"
export const READ = "Read"
export const WANT_TO_READ = "Want to Read"

const updateLibReducer = (state = { want_to_read: [], currently_reading: [], read: [], bookshelf: [], }, action) => {
    switch (action.type) {
      case UPDATE_WANT_TO_READ:
        action.payload.status = WANT_TO_READ
        return { ...state, want_to_read: [...state.want_to_read, action.payload], bookshelf: [...state.bookshelf, action.payload] };
      case UPDATE_READ:
        action.payload.status = READ
        return { ...state, read: [...state.read, action.payload], bookshelf: [...state.bookshelf, action.payload] };
      case UPDATE_CURRENTLY_READING:
        action.payload.status = CURRENTLY_READING
        return { ...state, currently_reading: [...state.currently_reading, action.payload], bookshelf: [...state.bookshelf, action.payload] };
      default:
        return state;
    }
  };

const reducer = updateLibReducer

export default reducer