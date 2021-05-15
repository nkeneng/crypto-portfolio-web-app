import React, {Fragment} from 'react';
import {reduxForm, Field} from 'redux-form';
import {connect} from 'react-redux';
import {userLoginAttempt} from "../../../actions/actions";
import {renderField} from "../../layouts/Form";
import MetaTags from "react-meta-tags";
import Content from "./Content";


const mapStateToProps = state => ({
    ...state.auth
});

const mapDispatchToProps = {
    userLoginAttempt
};

class Content2 extends React.Component {

    componentDidUpdate(prevProps) {
        if (prevProps.token !== this.props.token) {
            console.log(prevProps);
            console.log(this.props);
            this.props.history.push('/');
        }
    }

    onSubmit(values) {
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
                        <div className="text-center">
                            {error && <div className="alert alert-danger">{error}</div>}
                            <form className="mt-4" onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                                <Field name="username" label="Username" type="text" component={renderField} />
                                <Field name="password" label="Password" type="password" component={renderField} />
                                <button type="submit" className="btn btn-primary btn-big btn-block">Log in</button>
                            </form>
                        </div>
                    </main>
                </div>
            </Fragment>

        )
    }
}

export default reduxForm({
    form: 'LoginForm'
})(connect(mapStateToProps, mapDispatchToProps)(Content2));
