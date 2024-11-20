import createAction from './action.js'

import { CLOSE_NOTE, CREATE_NOTE, OPEN_NOTE, UPDATE_NOTE } from './constants.js'
import { connect } from './medux'

function NoteEditor({ note, onChangeNote, onCloseNote }) {
  return (
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
      <button className="editor-button" onClick={onCloseNote} type="button">
        Close
      </button>
    </div>
  )
}

function NoteTitle({ note }) {
  const title = note.content.split('\n')[0].replace(/^\s+|\s+$/g, '')

  if (title === '')
    return <i>Untitled</i>

  return <span>{title}</span>
}

function NoteLink({ note, onOpenNote }) {
  return (
    <li className="note-list-item">
      <a href="#" onClick={() => onOpenNote(note.id)}>
        <NoteTitle note={note} />
      </a>
    </li>
  )
}

function NoteList({ notes, onOpenNote }) {
  return (
    <ul className="note-list">
      {Object.keys(notes).map(id => (
        <NoteLink key={id} note={notes[id]} onOpenNote={onOpenNote} />
      ))}
    </ul>
  )
}

function NoteApp({
  notes,
  openNoteId,
  onAddNote,
  onChangeNote,
  onOpenNote,
  onCloseNote,
}) {
  return (
    <div>
      {openNoteId
        ? (
            <NoteEditor
              note={notes[openNoteId]}
              onChangeNote={onChangeNote}
              onCloseNote={onCloseNote}
            />
          )
        : (
            <div>
              <NoteList notes={notes} onOpenNote={onOpenNote} />
              <button className="editor-button" onClick={onAddNote} type="button">
                New Note
              </button>
            </div>
          )}
    </div>
  )
}

function mapStateToProps(state) {
  return {
    notes: state.notes,
    openNoteId: state.openNoteId,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    onAddNote: () => {
      dispatch(createAction(CREATE_NOTE))
    },
    onChangeNote: (id, content) => {
      dispatch(createAction(UPDATE_NOTE, id, content))
    },
    onOpenNote: (id) => {
      dispatch(createAction(OPEN_NOTE, id))
    },
    onCloseNote: () => {
      dispatch(createAction(CLOSE_NOTE))
    },
  }
}

const App = connect(mapStateToProps, mapDispatchToProps)(NoteApp)

export default App
