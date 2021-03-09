import React, {Component} from 'react'
import ReactQuill from "react-quill";
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    root: {
        backgroundColor: theme.palette.background.paper,
        height: 'calc(100% - 35px)',
        position: 'absolute',
        left: '0',
        width: '300px',
        boxShadow: '0px 0px 2px black'
    },
    editorContainer: {
        height: '100%',
        boxSizing: 'border-box',
        width: '78%',
        float: 'left'

    }
});

class NoteEditor extends Component {

    state = {content: '', title: '', id: ''}

    componentDidMount() {
        this.setState({
            content: this.props.selectedNote.content,
            title: this.props.selectedNote.title,
            id: this.props.selectedNote.id

            }
        )
    }

    componentDidUpdate(prevProps, prevState, snapshot) {

        // If a new note is selected by a user the below is called to update the note editor

        if (this.props.selectedNote.id !== this.state.id){
            this.setState({
            content: this.props.selectedNote.content,
            title: this.props.selectedNote.title,
            id: this.props.selectedNote.id

            })
        }
    }

    debounce = (func, wait, immediate) => {
        let timeout;
        return function() {
            const context = this, args = arguments;
            const later = function () {
                timeout = null;
                if (!immediate) func.apply(context, args);
            };
            const callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow) func.apply(context, args);
        };
    };

    handleNoteUpdate = this.debounce(() => {
        this.props.onNoteUpdate(this.state.id, this.state.title, this.state.content)

    }, 750)

    render (){

        const {classes} = this.props

        return (
            <div className={classes.editorContainer}>
                <ReactQuill
                    value={this.state.content}
                    theme='snow'
                    onChange={(newValue) => {
                        this.setState({content: newValue})
                        this.handleNoteUpdate()
                    }} />
            </div>
        )
    }
}
export default withStyles(styles)(NoteEditor);