import axios from 'axios';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Table, Button, Label, Input, Modal, ModalHeader, ModalBody, FormGroup } from 'reactstrap';
import '/css/style.css'

export default class Example extends Component {
  constructor() {
    super()
    this.state = {
      tasks: [],
      newTaskModal: false,
      newTaskData: {
        title: "",
        description: ""
      },
      editTaskModal: false,
      editTaskData: {
        id: "",
        title: "",
        description: ""
      }
    }
  }

  loadTask() {
    axios.get('api/tasks').then(response => {
      this.setState({
        tasks: response.data
      })
    })
  }

  addTask() {
    axios.post('api/tasks', this.state.newTaskData).then(response => {
      let { tasks } = this.state;
      this.loadTask();
      this.setState({
        tasks,
        newTaskModal: false,
        newTaskData: {
          title: "",
          description: ""
        }
      })
    })
  }

  editTask(id, title, description) {
    this.setState({
      editTaskData: {
        id,
        title,
        description
      },
      editTaskModal: !this.state.editTaskModal
    })
  }

  updateTask() {
    let { title, description } = this.state.editTaskData
    axios.put('api/tasks/' + this.state.editTaskData.id, {
      title,
      description
    }).then(response => {
      this.loadTask();

      this.setState({
        editTaskModal: false,
        editTaskData: {
          id: "",
          title: "",
          description: ""
        }
      })
    })
  }

  deleteTask(id) {
    axios.delete('api/tasks/' + id).then(response => {
      this.loadTask();
    })
  }

  handleChangeTitle(e) {
    let { newTaskData } = this.state;
    newTaskData.title = e.target.value;
    this.setState({ newTaskData });
  }

  handleChangeDescription(e) {
    let { newTaskData } = this.state;
    newTaskData.description = e.target.value;
    this.setState({ newTaskData });
  }

  componentWillMount() {
    this.loadTask();
  }

  toggleNewTaskModal() {
    this.setState({
      newTaskModal: !this.state.newTaskModal
    })
  }

  toggleEditTaskModal() {
    this.setState({
      editTaskModal: !this.state.editTaskModal
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
            <Button color="success" size="sm" className="mr-2"
              onClick={this.editTask.bind(this, task.id, task.title, task.description)}>Edit
            </Button>
            <Button color="danger" size="sm" onClick={this.deleteTask.bind(this, task.id)}>Delete</Button>
          </td>
        </tr>
      )
    })

    return (
      <div>
        <Button color="primary" className="my-3 float-right" onClick={this.toggleNewTaskModal.bind(this)}>Add Task</Button>
        <Modal isOpen={this.state.newTaskModal} toggle={this.toggleNewTaskModal.bind(this)} backdrop='static' keyboard={false}>
          <ModalHeader toggle={this.toggleNewTaskModal.bind(this)}>Add Task</ModalHeader>
          <ModalBody>
            <FormGroup className="row">
              <Label className="col-sm-3 col-form-label" for="title"><span>T</span>itle:</Label>
              <Input className="col-sm-9" id="title"
                value={this.state.newTaskData.title}
                onChange={this.handleChangeTitle.bind(this)}>
              </Input>
            </FormGroup>
            <FormGroup className="row">
              <Label className="col-sm-3 col-form-label" for="description"><span>D</span>escription:</Label>
              <Input className="col-sm-9" id="description"
                value={this.state.newTaskData.description}
                onChange={this.handleChangeDescription.bind(this)}>
              </Input>
            </FormGroup>
            <div className="modal-button">
              <Button onClick={this.addTask.bind(this)}>OK</Button>{' '}
              <Button onClick={this.toggleNewTaskModal.bind(this)}>Cancel</Button>
            </div>
          </ModalBody>
        </Modal>

        <Modal isOpen={this.state.editTaskModal} toggle={this.toggleEditTaskModal.bind(this)} backdrop='static' keyboard={false}>
          <ModalHeader toggle={this.toggleEditTaskModal.bind(this)}>Edit Task</ModalHeader>
          <ModalBody>
            <FormGroup className="row">
              <Label className="col-sm-3 col-form-label" for="title"><span>T</span>itle</Label>
              <Input className="col-sm-9" id="title"
                value={this.state.editTaskData.title}
                onChange={(e) => {
                  let { editTaskData } = this.state
                  editTaskData.title = e.target.value
                  this.setState({ editTaskData })
                }}>
              </Input>
            </FormGroup>
            <FormGroup className="row">
              <Label className="col-sm-3 col-form-label" for="description"><span>D</span>escription</Label>
              <Input className="col-sm-9" id="description"
                value={this.state.editTaskData.description}
                onChange={(e) => {
                  let { editTaskData } = this.state
                  editTaskData.description = e.target.value
                  this.setState({ editTaskData })
                }}>
              </Input>
            </FormGroup>
            <div className="modal-button">
              <Button onClick={this.updateTask.bind(this)}>OK</Button>{' '}
              <Button onClick={this.toggleEditTaskModal.bind(this)}>Cancel</Button>
            </div>
          </ModalBody>
        </Modal>

        <Table dark bordered hover striped>
          <thead>
            <tr className="text-center">
              <th width="5%">#</th>
              <th>Title</th>
              <th>Description</th>
              <th width="15%">Actions</th>
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
