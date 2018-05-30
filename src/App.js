import { Query, Mutation } from 'react-apollo'
import gql from 'graphql-tag'
import React, { Component } from 'react'

import './App.css'

class App extends Component {
  state = {
    createUserInput: {
      id: 0,
      firstName: '',
      lastName: '',
      email: '',
    },
  }
  handleChange = (e) => {
    this.setState({
      createUserInput: {
        ...this.state.createUserInput,
        [e.target.name]: e.target.value,
      },
    })
  }

  async createUser() {
    await this.props.createUser({ variables: { createUserInput: this.state.createUserInput } })
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <span>FiveBook</span>
        </header>
        <div className="App-body">
          <div className="input-group">

            <span>firstName</span>
            <input
              className="text-input"
              name="firstName"
              onChange={e => this.handleChange(e)}
              value={this.state.createUserInput.firstName}
            />

            <span>lastName</span>
            <input
              className="text-input"
              name="lastName"
              onChange={e => this.handleChange(e)}
              value={this.state.createUserInput.lastName}
            />

            <span>email</span>
            <input
              className="text-input"
              name="email"
              onChange={e => this.handleChange(e)}
              value={this.state.createUserInput.email}
            />

            <button className="button-input" onClick={() => this.createUser()}>CREATE</button>
          </div>
          <div className="nameCardGroup">
            {
              this.props.data.users.map(user => (
                <div key={user.id} className="nameCard">
                  {user.fullName}<br />
                  <div className="smallBlock">

                    ID: {user.id}<br />
                    fullName: {user.fullName}<br />
                    LastName: {user.lastName} <br />
                    Email: {user.email} <br />
                  </div>
                </div>
              ))
            }
          </div>
        </div>
      </div>
    )
  }
}

const getCurrentUser = gql`
query GetCurrentUser {
      users{
        id
        firstName
        lastName
        fullName
        email
        company{
          id
          name
        }
      }
    }
  `

const createUser = gql`
  mutation createUser($createUserInput : CreateUserInput){
        createUser(createUserInput : $createUserInput){
            id
            firstName
            lastName
            fullName
            email
            company{
              id
              name
            }
          }
        }
  `

const AppBindQuery = () => (
  <Mutation
    mutation={createUser}
    update={(cache, { data: { createUser } }) => {
      const { users } = cache.readQuery({ query: getCurrentUser })
      cache.writeQuery({
        query: getCurrentUser,
        data: { users: users.concat([createUser]) },
      })
    }}
  >
    {
      (createUser, data) => (
        <Query query={getCurrentUser}>
          {
            ({
              loading, data, subscribeToMore,
            }) => (
                !loading ? (
                  <App
                    data={data}
                    createUser={createUser}
                  />
                ) : null)
          }
        </Query>
      )
    }
  </Mutation>
)

export default AppBindQuery
