import {
    CREATE_NOTE,
    UPDATE_NOTE,
    OPEN_NOTE,
    CLOSE_NOTE
} from './constants.js';

const initialState = {
    nextNoteId: 1,
    openNoteId: null,
    notes: {}
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case CREATE_NOTE: {
            const id = state.nextNoteId;
            const newNote = {
                id,
                content: ''
            };

            return {
                ...state,
                nextNoteId: id + 1,
                openNoteId: id,
                notes: {
                    ...state.notes,
                    [id]: newNote
                }
            };
        }
        case UPDATE_NOTE: {
            const { id, content } = action.payload;
            const editedNote = {
                ...state.notes[id],
                content
            };

            return {
                ...state,
                notes: {
                    ...state.notes,
                    [id]: editedNote
                }
            };
        }
        case OPEN_NOTE: {
            return {
                ...state,
                openNoteId: action.payload.id
            };
        }
        case CLOSE_NOTE: {
            return {
                ...state,
                openNoteId: null
            };
        }
        default:
            return state;
    }
};

export default reducer;