import React, {Component} from "react";
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import DeleteIcon from "@material-ui/icons/Delete";
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  note:{
    cursor: 'pointer'
  },
  deleteIcon: {
    position: 'absolute',
    right: '5px',
    top: 'calc(50% - 13px)',
    '&:hover': {
      color: 'red'
    }
  }
});

class Note extends Component {

    handleSelectNote = (note, index) => {
        this.props.onSelectNote(note, index)
    }

    handleDeleteNote = (note) => {
        if(window.confirm(`Are you sure you want to delete: ${note.title}?`)){
            this.props.onDeleteNote(note)
        }
    }

    handleRemoveHTMLTags(content){
        return content.replace(/<[^>]*>?/gm, '')
    }

    render() {

        const {index, note, classes, selectedNoteIndex } = this.props

        return (
            <div key={index}>
                <ListItem className={classes.note}
                          selected={selectedNoteIndex === index}
                          alignItems='flex-start' >
                    <div onClick={() => this.handleSelectNote(note, index)}>
                        <ListItemText primary={note.title}
                                      secondary={this.handleRemoveHTMLTags( note.content ? note.content.substring(0, 25) : " ") + '...'}/>
                    </div>
                    <DeleteIcon onClick={() => this.handleDeleteNote(note)} className={classes.deleteIcon}/>
                </ListItem>
            </div>
        )
    }
}
export default withStyles(styles)(Note)