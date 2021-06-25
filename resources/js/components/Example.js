import axios from 'axios';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Table, Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'

export default class Example extends Component {
  constructor() {
    super()
    this.state = {
      tasks: [],
      newTaskModal: false
    }
  }

  loadTask() {
    axios.get('api/tasks').then(response => {
      this.setState({
        tasks: response.data
      })
    })
  }

  componentWillMount() {
    this.loadTask();
  }

  toggleNewTaskModal() {
    this.setState({
      newTaskModal: true
    })
  }

  render() {
    let tasks = this.state.tasks.map(task => {
      return (
        <tr key={task.id}>
          <td>{task.id}</td>
          <td>{task.title}</td>
          <td>{task.description}</td>
          <td>
            <Button color="success" size="sm" className="mr-2">Edit</Button>
            <Button color="danger" size="sm">Delete</Button>
          </td>
        </tr>
      )
    })

    return (
      <div className="container">
        <Button color="danger" onClick={this.toggleNewTaskModal.bind(this)}>Open</Button>
        <Modal isOpen={this.state.newTaskModal} toggle={this.toggleNewTaskModal.bind(this)}>
          <ModalHeader toggle={this.toggleNewTaskModal.bind(this)}>Modal title</ModalHeader>
          <ModalBody>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.toggleNewTaskModal.bind(this)}>Do Something</Button>{' '}
            <Button color="secondary" onClick={this.toggleNewTaskModal.bind(this)}>Cancel</Button>
          </ModalFooter>
        </Modal>

        <Table>
          <thead>
            <tr>
              <th>#</th>
              <th>Title</th>
              <th>Description</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {tasks}
          </tbody>
        </Table>
      </div>
    );
  }
}

if (document.getElementById('example')) {
  ReactDOM.render(<Example />, document.getElementById('example'));
}
