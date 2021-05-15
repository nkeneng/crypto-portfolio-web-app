import React, { Component, Fragment } from 'react';
import MetaTags from "react-meta-tags";
import Content from '../../sections/defaultlogin/Content';
import {userLoginAttempt} from "../../../actions/actions";
import {Field, reduxForm} from "redux-form";
import {connect} from "react-redux";
import {
    Button,
    Form,
    InputGroup, Modal
} from "react-bootstrap";
import {Link} from "react-router-dom";
import {renderField} from "../../layouts/Form";


const mapStateToProps = state => ({
    ...state.auth
});

const mapDispatchToProps = {
    userLoginAttempt
};

class Defaultlogin extends Component {


    componentDidUpdate(prevProps) {
        if (prevProps.token !== this.props.token) {
            this.props.history.push('/');
        }
    }

    constructor(props) {
        super(props);
        this.state = {
            show: false,
            validate:false
        };
    }

    handleShow(){
        this.setState({show:true})
    }


    handleClose(){
        this.setState({show:false})
    }

    onSubmit(values) {
        console.log(values);
        return this.props.userLoginAttempt(
            values.username,
            values.password
        );
    }

    render() {
        const {handleSubmit, error} = this.props;
        return (
            <Fragment>
                <MetaTags> 
                    <title>Mystic | Default Login</title>
                    <meta
                        name="description"
                        content="#"
                    />
                </MetaTags>
                <div className="body ms-body ms-dark-theme ms-logged-out" id="body">
                    <main className="body-content">
                        <div className="ms-content-wrapper ms-auth">
                            <div className="ms-auth-container">
                                <div className="ms-auth-col">
                                    <div className="ms-auth-bg" />
                                </div>
                                <div className="ms-auth-col">
                                    <div className="ms-auth-form">
                                        <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                                            <h1>Login to
                                                Account</h1>
                                            <p>Please enter
                                                your email and
                                                password to
                                                continue</p>
                                            {error && <div className="alert alert-danger">{error}</div>}
                                            <Form.Group
                                                className="mb-3"
                                                controlId="validationCustom01">
                                                <Field name="username" label="Username" type="text" component={renderField} />
                                            </Form.Group>
                                            <Form.Group
                                                className="mb-2"
                                                controlId="validationCustom02">
                                                <Field name="password" label="Password" type="password" component={renderField} />
                                            </Form.Group>
                                            <Button
                                                type="submit"
                                                className="mt-4 d-block w-100">Sign
                                                In</Button>
                                            {/*<span className="d-block text-center my-4">Or</span>*/}
                                            {/*<button type="button" className="btn mt-4 d-block w-100 btn-social-login"> <img src={facebook} alt="" /> <span>Login with Facebook</span> </button>*/}
                                            {/*<button type="button" className="btn mt-4 d-block w-100 btn-social-login"> <img src={google} alt="" /> <span>Login with Google</span> </button>*/}
                                            <p className="mb-0 mt-3 text-center">Don't
                                                have an
                                                account? <Link
                                                    className="btn-link"
                                                    to="/prebuilt-pages/default-register">Create
                                                    Account</Link>
                                            </p>
                                        </form>

                                        <Modal show={this.state.show} className="modal-min" onHide={this.handleClose} centered>
                                            <Modal.Body className="text-center">
                                                <Fragment>
                                                    <button type="button" className="close" onClick={this.handleClose}><span aria-hidden="true">×</span></button>
                                                    <i className="flaticon-secure-shield d-block" />
                                                    <h1>Forgot Password?</h1>
                                                    <p> Enter your email to recover your password </p>
                                                    <form>
                                                        <div className="ms-form-group has-icon">
                                                            <input type="text" placeholder="Email Address" className="form-control" name="forgot-password" />
                                                            <i className="material-icons">email</i>
                                                        </div>
                                                        <button type="submit" className="btn btn-primary shadow-none">Reset Password</button>
                                                    </form>
                                                </Fragment>
                                            </Modal.Body>
                                        </Modal>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/*<Content me={this} onSubmit={this.onSubmit} handleSubmit={handleSubmit}/>*/}
                    </main>
                </div>
            </Fragment>
        );
    }
}

export default reduxForm({
    form: 'LoginForm'
})(connect(mapStateToProps, mapDispatchToProps)(Defaultlogin));