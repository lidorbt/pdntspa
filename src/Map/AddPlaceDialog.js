import React, {Component} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

export default class FormDialog extends Component {
  constructor(){
    super();
    this.state = {
      uploadFile: {}
    };
  }

  handleClose() {
    this.props.onClose();
  }

  handleSave(){
    this.props.onSave(document.getElementById("name").value, this.state.uploadFile);
  }

  filesUpload = (e) => {
    let files = e.target.files;
  //   let reader = new FileReader();

  //  let storageRef = firebase.storage().ref().child(files[0].name);
  //  storageRef.put(files[0]);

   this.setState({uploadFile: files[0]})
  };

  render(){
    return (
      <div>
        <Dialog open={this.props.isShown} onClose={this.handleClose} aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">Add Place</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Title"
              type="name"
              fullWidth
            />
            <input
              accept="image/*"
              style={{ display: 'none' }}
              id="raised-button-file"
              multiple
              type="file"
              onChange={(e) =>this.filesUpload(e)}
            />
            <label htmlFor="raised-button-file">
              <Button variant="raised" component="span">
                Upload
              </Button>
            </label> 
          </DialogContent>
          <DialogActions>
            <Button onClick={() => this.handleClose()}>
              Cancel
            </Button>
            <Button onClick={() => this.handleSave()}>
              Save
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
}
}