import React, {
    Fragment,
    useEffect,
    useState
} from 'react';
import {Link, Redirect, useHistory} from 'react-router-dom';
import {
    Form,
    InputGroup,
    Button,
    Modal
} from 'react-bootstrap';
import {connect} from 'react-redux';
import {userLoginAttempt} from "../../../reducers/actions";


const mapStateToProps = state => ({
    ...state.auth
});

const mapDispatchToProps = {
    userLoginAttempt
};


const Content = ({userLoginAttempt, }) => {
    const [validated, setValidated] = useState(false);
    const [show, setShow] = useState(false);
    const [emailValue, setEmailValue] = useState('');
    const [passwordValue, setPasswordValue] = useState('');
    const [error, setError] = useState('');
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const history = useHistory()

    const handleSubmit = async (event) => {
        setError('')
        const form = event.currentTarget;
        if (form.checkValidity() === true) {
            event.preventDefault();
            event.stopPropagation();
            // firebase call
            try {
                userLoginAttempt(emailValue, passwordValue).then(e => {
                    history.push('/');
                }).catch(e => {
                    console.log();
                    setError(e.message);
                })
            } catch (e) {
                setError(e.message);
            }
            return;
        }
        event.preventDefault();
        event.stopPropagation();
        setValidated(true);
    }


    return (
        <div
            className="ms-content-wrapper ms-auth">
            <div className="ms-auth-container">
                <div className="ms-auth-col">
                    <div className="ms-auth-bg"/>
                </div>
                <div className="ms-auth-col">
                    <div className="ms-auth-form">
                        <Form noValidate
                              validated={validated}
                              onSubmit={handleSubmit}>
                            <h1>Login to
                                Account</h1>
                            <p>Please enter your
                                email and password
                                to continue</p>
                            {error && <div
                                className="alert alert-danger">{error}</div>}
                            <Form.Group
                                className="mb-3"
                                controlId="validationCustom01">
                                <Form.Label>Email
                                    Address</Form.Label>
                                <InputGroup>
                                    <Form.Control
                                        value={emailValue}
                                        onChange={e => setEmailValue(e.target.value)}
                                        required
                                        type="text"
                                        placeholder="Email Address"
                                    />
                                    <Form.Control.Feedback
                                        type="invalid"> Please
                                        provide a
                                        valid
                                        email.</Form.Control.Feedback>
                                </InputGroup>
                            </Form.Group>
                            <Form.Group
                                className="mb-2"
                                controlId="validationCustom02">
                                <Form.Label>Password</Form.Label>
                                <InputGroup>
                                    <Form.Control
                                        required
                                        value={passwordValue}
                                        onChange={e => setPasswordValue(e.target.value)}
                                        type="password"
                                        placeholder="Password"
                                    />
                                    <Form.Control.Feedback
                                        type="invalid"> Please
                                        provide a
                                        password.</Form.Control.Feedback>
                                </InputGroup>
                            </Form.Group>
                            <Form.Group
                                controlId="validationCustom03">
                                <Form.Label
                                    className="d-block mt-3">
                                    <Link to="#"
                                          className="btn-link"
                                          onClick={handleShow}>Forgot
                                        Password?</Link>
                                </Form.Label>
                            </Form.Group>
                            <Button type="submit"
                                    className="mt-4 d-block w-100">Sign
                                In</Button>
                            <p className="mb-0 mt-3 text-center">Don't
                                have an
                                account? <Link
                                    className="btn-link"
                                    to="/register">Create
                                    Account</Link>
                            </p>
                        </Form>
                        <Modal show={show}
                               className="modal-min"
                               onHide={handleClose}
                               centered>
                            <Modal.Body
                                className="text-center">
                                <Fragment>
                                    <button
                                        type="button"
                                        className="close"
                                        onClick={handleClose}>
                                        <span
                                            aria-hidden="true">×</span>
                                    </button>
                                    <i className="flaticon-secure-shield d-block"/>
                                    <h1>Forgot
                                        Password?</h1>
                                    <p> Enter your
                                        email to
                                        recover
                                        your
                                        password </p>
                                    <form>
                                        <div
                                            className="ms-form-group has-icon">
                                            <input
                                                type="text"
                                                placeholder="Email Address"
                                                className="form-control"
                                                name="forgot-password"/>
                                            <i className="material-icons">email</i>
                                        </div>
                                        <button
                                            type="submit"
                                            className="btn btn-primary shadow-none">Reset
                                            Password
                                        </button>
                                    </form>
                                </Fragment>
                            </Modal.Body>
                        </Modal>
                    </div>
                </div>
            </div>
        </div>
    );
}


export default connect(mapStateToProps, mapDispatchToProps)(Content);
