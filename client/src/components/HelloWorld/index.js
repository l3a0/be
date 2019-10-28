import React, { Component } from 'react';
import { Form, Button, Text } from 'rimble-ui';
import styles from './HelloWorld.module.scss';

export default class HelloWorld extends Component {
  constructor(props) {
    super(props);
    const { helloWorld } = this.props;
    this.state = { validated: false, message: "" };
    this.handleEvent = this.handleEvent.bind(this);
    helloWorld.events.Message({}, this.handleEvent);
  }

  handleEvent = (error, event) => {
    console.log(event.returnValues.message);
    console.log(this);
    this.state.message = event.returnValues.message;
  }

  handleSubmit = e => {
    e.preventDefault();
    const { helloWorld, accounts } = this.props;
    helloWorld.methods.Say(e.target.saySomething.value).send({ from: accounts[0] });
  };

  handleValidation = e => {
    e.target.parentNode.classList.add('was-validated');
  };

  render() {
    const { helloWorld } = this.props;
    return (
      <div className={styles.helloWorld}>
        <Form onSubmit={this.handleSubmit}>
          <h3> Your HelloWorld Contract Instance </h3>
          <Form.Field validated={this.state.validated} label="Say Something" name="saySomething" width={1} >
            <Form.Input type="text" placeholder="e.g. Hello World!" name="saySomething" required width={1} onChange={this.handleValidation} />
          </Form.Field>
          <div className={styles.buttons}>
            <Button type="submit" size="small" disabled={!helloWorld.methods.Say} >
              Talk
            </Button>
          </div>
        </Form>
        <Text.p>{this.state.message}</Text.p>
      </div>
    );
  }
}
