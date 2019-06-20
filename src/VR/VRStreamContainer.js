import React, { Component, Fragment } from "react";
import { withRouter } from "react-router-dom";
import Swal from "sweetalert2";
import VRStream from './VRStream'

class VRStreamContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    // this.validateSignIn();
  }

  validateSignIn = () => {
    if (!sessionStorage.getItem("CurrentUser")) {
      Swal.fire({
        title: "You have to sign in",
        text: "You have to sign in",
        type: "error",
        confirmButtonColor: "#e72900",
        confirmButtonText: "Ok"
      }).then(result => {
        let { history } = this.props;
        history.push({
          pathname: "/somepage"
        });
      });
    }
  };

  render() {
    return (
      <Fragment>
        <VRStream {...this.props} broadcasters={['abc']}/>
      </Fragment>
    );
  }
}
export default withRouter(VRStreamContainer);
