import React, { Component } from 'react';

const emailRegex = RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)
const formValid = ({ formErrors, ...rest }) => {
  let valid = true;
  Object.values(formErrors).forEach(val => {
    val.length > 0 && (valid = false)
  })
  Object.values(rest).find(val => {
    if (val === null){
      valid = false
    }
  })
  return valid;
}

class App extends Component {
  constructor(props){
    super(props);

    this.state = {
      firstName: null,
      lastName: null,
      email: null,
      password: null,
      formErrors: {
        firstName: "",
        lastName: "",
        email: "",
        password: ""
      }

    }
  }

  handleSubmit = e => {
    e.preventDefault();
    if(formValid(this.state)) {
      console.log(`
      ---SUBMITTING--
      First Name: ${this.state.firstName}
      Last Name: ${this.state.lastName}
      Email: ${this.state.email}
      Password: ${this.state.password}
      `)
    } else {
      console.log("Form not submitted due to errors!!")
    }
  }

  handleChange = e => {
    e.preventDefault();
    const { name, value } = e.target;
    let formErrors = this.state.formErrors;

    switch (name) {
      case 'firstName':
        formErrors.firstName = value.length < 3 ? 'Minimum 3 characters required' : '';
        break;
      case 'lastName':
        formErrors.lastName = value.length < 3 ? 'Minimum 3 characters required' : '';
        break;
      case 'email':
        formErrors.email = emailRegex.test(value) ? '' : 'Invalid email address';
        break;
      case 'password':
        formErrors.password = value.length < 6 ? 'Minimum 6 characters required' : '';
        break;
    
      default:
        break;
    }

    this.setState({formErrors, [name]: value}, () => console.log(this.state))
  }

  render(){
    const { formErrors } = this.state
    return (
      <div className="App">
        <section>
          <h1>Create an account</h1>
          <form onSubmit={this.handleSubmit} noValidate>
            <div className="firstName">
              <label htmlFor="firstName">First Name</label>
              <input
                className={formErrors.firstName.length > 0 ? "error" : null}
                placeholder="First Name"
                type="text" 
                name="firstName"
                noValidate
                onChange={this.handleChange}
                 />
                 {formErrors.firstName.length > 0 && (<span className="errorMessage">{formErrors.firstName}</span>)}
            </div>
            <div className="lastName">
              <label htmlFor="lastName">Last Name</label>
              <input 
                className={formErrors.lastName.length > 0 ? "error" : null}
                placeholder="Last Name"
                type="text" 
                name="lastName"
                noValidate 
                onChange={this.handleChange}
                />
                {formErrors.lastName.length > 0 && (<span className="errorMessage">{formErrors.lastName}</span>)}

            </div>
            <div className="email">
              <label htmlFor="email">Email</label>
              <input 
                className={formErrors.email.length > 0 ? "error" : null}
                placeholder="Email"
                type="email" 
                name="email"
                noValidate
                onChange={this.handleChange}
               />
               {formErrors.email.length > 0 && (<span className="errorMessage">{formErrors.email}</span>)}

            </div>
            <div className="password">
              <label htmlFor="password">Password</label>
              <input 
                className={formErrors.password.length > 0 ? "error" : null}
                placeholder="Password"
                type="password" 
                name="password"
                noValidate
                onChange={this.handleChange}
                 />
                 {formErrors.password.length > 0 && (<span className="errorMessage">{formErrors.password}</span>)}

            </div>
            <div className="createAccount">
              <button className="btn" type="submit">Create Account</button>
              <small>Already have an account? Login</small>
            </div>

          </form>
        </section>
      </div>
    );
    
  }
}


export default App;
