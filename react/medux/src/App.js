import React from 'react';

import {
    connect
} from './medux';

import createAction from './action.js';
import {
    CREATE_NOTE,
    UPDATE_NOTE,
    OPEN_NOTE,
    CLOSE_NOTE
} from './constants.js';

const NoteEditor = ({
    note,
    onChangeNote,
    onCloseNote
}) => (
    <div>
        <div>
            <textarea
                className="editor-content"
                autoFocus
                value={note.content}
                onChange={event => onChangeNote(note.id, event.target.value)}
                cols={80}
                rows={10}
            />
        </div>
        <button className="editor-button" onClick={onCloseNote}>Close</button>
    </div>
);

const NoteTitle = ({
    note
}) => {
    const title = note.content.split('\n')[0].replace(/^\s+|\s+$/g, '');
    
    if (title === '') {
        return <i>Untitled</i>;
    }

    return <span>{title}</span>;
};

const NoteLink = ({
    note,
    onOpenNote
}) => (
    <li className="note-list-item">
        <a href="#" onClick={() => onOpenNote(note.id)}>
            <NoteTitle note={note} />
        </a>
    </li>
);

const NoteList = ({
    notes,
    onOpenNote
}) => (
    <ul className="note-list">
    {
        Object.keys(notes).map(id =>
            <NoteLink
            key={id}
            note={notes[id]}
            onOpenNote={onOpenNote}
            />
        )
    }
    </ul>
);

const NoteApp = ({
    notes,
    openNoteId,
    onAddNote,
    onChangeNote,
    onOpenNote,
    onCloseNote
}) => (
    <div>
        {
            openNoteId ?
                <NoteEditor
                    note={notes[openNoteId]}
                    onChangeNote={onChangeNote}
                    onCloseNote={onCloseNote}
                /> :
                <div>
                    <NoteList notes={notes} onOpenNote={onOpenNote} />
                    <button className="editor-button" onClick={onAddNote}>New Note</button>
                </div>
        }
    </div>
);

const mapStateToProps = (state) => ({
    notes: state.notes,
    openNoteId: state.openNoteId
});

const mapDispatchToProps = (dispatch) => ({
    onAddNote: () => {
        dispatch(createAction(CREATE_NOTE));
    },
    onChangeNote: (id, content) => {
        dispatch(createAction(UPDATE_NOTE, id, content));
    },
    onOpenNote: (id) => {
        dispatch(createAction(OPEN_NOTE, id));
    },
    onCloseNote: () => {
        dispatch(createAction(CLOSE_NOTE));
    }
});

const App = connect(
    mapStateToProps,
    mapDispatchToProps
)(NoteApp);

export default App;