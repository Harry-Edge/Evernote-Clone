import React, { Component } from "react";
import Header from './Header'
import NoteEditor from "./NoteEditor";
import NoteList from "./NoteList";
import Box from '@material-ui/core/Box'

class NotesApp extends Component {

    state = {user: null,
             selectedNoteIndex: null,
             selectedNote: null,
             selectedNoteId: null,
             notes: null   }

    componentDidMount() {

        const requestOptions = {
            headers: {'Authorization': `JWT ${localStorage.getItem('token')}`
            }}

         fetch("http://127.0.0.1:8000/api/get-user", requestOptions)
             .then((response) => response.json())
             .then((data) => {
                 this.setState({user: data})
             })
         this.handleGetNotes()
    }

    handleGetNotes = () => {

        const requestOptions = {
            headers: {'Authorization': `JWT ${localStorage.getItem('token')}`
            }}

        fetch("http://127.0.0.1:8000/api/get-notes", requestOptions)
         .then((response) => response.json())
         .then((data) => {

             this.setState({notes: data.notes})

             //  Sets the current note selected to the last know one.
             const lastNoteSelectedIndex = this.state.notes.findIndex(i => i.id === data.last_note_selected.id)
             this.setState({selectedNote: data.last_note_selected, selectedNoteIndex: lastNoteSelectedIndex})
         })

    }

    handleSelectNote = (note, index) => {

        this.setState({selectedNoteIndex: index, selectedNote: note})
        this.handleUpdateLastNoteSelected(note)

    }

    handleUpdateLastNoteSelected = (note) => {

        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json', 'Authorization': `JWT ${localStorage.getItem('token')}` },
            body: JSON.stringify({id: note.id, note_user_id: this.state.user.id})
        }

        fetch('http://127.0.0.1:8000/api/update-last-note-selected', requestOptions)
            .then((response) => response.json()
                .then((data) => {console.log(data)}))

    }

    handleNoteUpdate = async (id, title, content) => {

        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json', 'Authorization': `JWT ${localStorage.getItem('token')}`},
            body: JSON.stringify({id: id, title: title , content: content})
        }
        await fetch('http://127.0.0.1:8000/api/update-note', requestOptions)
            .then((response) => response.json()
                .then((data) => {console.log(data)}))

        await this.handleGetNotes()

        const currentNoteIndex = this.state.notes.findIndex(i => i.id === id)
        this.setState({selectedNoteIndex: currentNoteIndex})

    }

    handleNewNote = async (title) => {

        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json', 'Authorization': `JWT ${localStorage.getItem('token')}`},
            body: JSON.stringify({title:title})
        }

         await fetch("http://127.0.0.1:8000/api/create-note", requestOptions)
            .then((response) => response.json())
            .then((data) => {
                this.setState({selectedNoteId: data.new_note_id})
            })

        this.handleGetNotes()

        const newNoteIndex = this.state.notes.findIndex(i => i.id === this.state.selectedNoteId)

        this.setState(
            {selectedNote: this.state.notes[newNoteIndex],
                   selectedNoteIndex: newNoteIndex,
                   selectedNoteId: null })

    }

    handleDeleteNote = async (note) => {

        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json', Authorization: `JWT ${localStorage.getItem('token')}`},
            body: JSON.stringify({id: note.id})
        }

        if (note.id === this.state.selectedNote.id){
            // If the current note selected is the one being deleted the below sends a request to the backend to update
            // the current note selected to the second most recently edited note
            await this.handleUpdateLastNoteSelected(note)
        }

        await fetch('http://127.0.0.1:8000/api/delete-note', requestOptions)
            .then((response) => response.json())
            .then((data) => console.log(data))

        this.handleGetNotes()

        }

    handleSearchNotes = (searchTerm) => {

        if (searchTerm){

            const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json', 'Authorization': `JWT ${localStorage.getItem('token')}`},
            body: JSON.stringify({title: searchTerm})
            }

            fetch('http://127.0.0.1:8000/api/search-notes', requestOptions)
                .then((response) => response.json())
                .then((data) => {
                    this.setState({notes: data})
                })
        } else {
            // Gets all the original notes if the search term has been deleted
            this.handleGetNotes()
        }
    }

    render() {
        return(
            <div>
                {
                    this.state.user ? <Header
                                        user={this.state.user}
                                        onSearchNotes={this.handleSearchNotes}
                                        onLogout={this.props.onLogout}/> : null
                }
                <div className='app-container'>
                    <Box  m={3}>
                         <NoteList
                            selectedNoteIndex={this.state.selectedNoteIndex}
                            notes={this.state.notes}
                            onDeleteNote={this.handleDeleteNote}
                            onSelectNote={this.handleSelectNote}
                            onNewNote={this.handleNewNote}/>
                        {
                            this.state.selectedNote ? <NoteEditor
                                selectedNote={this.state.selectedNote}
                                selectedNoteIndex={this.state.selectedNoteIndex}
                                notes={this.state.notes}
                                onNoteUpdate={this.handleNoteUpdate}/> : null
                        }
                    </Box>
                </div>
            </div>
        )
    }
}
export default NotesApp;