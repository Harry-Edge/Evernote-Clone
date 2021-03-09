import React, {Component} from "react";
import {Button, Divider} from "@material-ui/core/";
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import TextField from '@material-ui/core/TextField'
import Note from './Note';

const styles = theme => ({
    addNoteButton: {
        backgroundColor: '#008000',
        width: '100%',
        height: '30px',
        color: 'white',
        borderBottom: '1px solid black',
        fontWeight: 600,
        '&:hover': {
            backgroundColor: '#009900'
        }
    },
    cancelAddNoteButton: {
        backgroundColor: '#ff0000',
        width: '100%',
        height: '30px',
        color: 'white',
        borderBottom: '1px solid black',
        fontWeight: 600,
        '&:hover': {
            backgroundColor: '#ff4d4d'
        }
    },
    newNoteInput: {
      width: '100%'
    },
    sidebarContainer: {
        marginTop: '0px',
        width: '20%',
        height: '100%',
        boxSizing: 'border-box',
        float: 'right',
        overflowY: 'scroll',
        overflowX: 'hidden'
    },
});

class NoteList extends Component {

    state = {
        addingNote: false,
        title: null
    }

    handleNewNoteClick = () => {
        // Flips the current state of addingNote so the title text field can shown/hidden
        this.setState({title: null, addingNote: !this.state.addingNote})
    }

    handleCreateNewNote = () => {
        this.props.onNewNote(this.state.title)
        this.setState({addingNote: false, title: null})
    }

    render() {

        const {notes, classes, selectedNoteIndex} = this.props

        return (
            <div className={classes.sidebarContainer}>
                <Button className={this.state.addingNote ? classes.cancelAddNoteButton : classes.addNoteButton}
                        onClick={this.handleNewNoteClick}> {this.state.addingNote ? 'Cancel' : 'Create a Note'}
                </Button>
                {
                    this.state.addingNote ?
                        <div>
                            <br/>
                            <TextField  className={classes.newNoteInput} variant="outlined" label='Enter Note Title' size='small'
                             onKeyUp={(e) => this.setState({title: e.target.value})}/>
                             <div>
                                 <br/>
                             </div>
                            <Button className={classes.addNoteButton} onClick={this.handleCreateNewNote}>Add</Button>
                        </div> : null
                }
                <div>
                    <br/>
                    <Divider/>
                </div>
                {
                    notes ?
                    <List>
                        {
                            notes.map((note, index) => {
                                return (
                                    <div key={index}>
                                        <Note
                                            note={note}
                                            index={index}
                                            selectedNoteIndex={selectedNoteIndex}
                                            onSelectNote={this.props.onSelectNote}
                                            onDeleteNote={this.props.onDeleteNote}>
                                        </Note>
                                        <Divider/>
                                    </div>
                                )
                            })
                        }
                    </List> : null
                }
            </div>
        )
    };
}
export default withStyles(styles)(NoteList)
