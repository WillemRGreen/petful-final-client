import React from 'react';
import Context from '../Context/Context';
import config from '../config';

export default class PersonQueue extends React.Component {
    static contextType = Context;

    state = {
        name: '',
        currentUser: '',
        nextUp: false,
        signedUp: false,
        intervalId: 0
    };

    handleNameChange = e => {
        this.setState({
            name: e.currentTarget.value,
        });
    };

    submitForm = (e) => {
        e.preventDefault();
        const name = this.state.name;
        fetch(`${config.API_BASE_URL}/people`, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: name
            })
        }).then(res => res.json())
            .then(res => {
                this.context.setCurrentUser(name)
                this.context.setPeople(res);
                this.setState({
                    signedUp: true,
                    currentUser: name,
                })
            })
            .catch(error => {
                alert(`Something went wrong! ${error.message}`)
            });
        e.currentTarget.reset();

        this.startTimer();
    };

    startTimer = () => {
        const fakeUsers = ['Dwight', 'Jim', 'Pam', 'Michael', 'Andy', 'Angela', 'Oscar'];

        let newIntervalId = setInterval(() => {
            if (this.context.currentUser === this.props.peopleList[0]) {
                this.props.setNextUp();
                return clearInterval(this.state.intervalId);
            } else if (this.context.currentUser !== this.props.peopleList[0]) {
                if (this.props.peopleList.length <= 5) {

                    let index = Math.floor(Math.random() * 6) + 1;
                    fetch(`${config.API_BASE_URL}/people`, {
                        method: 'post',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            name: fakeUsers[index]
                        })
                    }).then(res => res.json())
                        .then(res => this.context.setPeople(res));
                };

                // adopt next cat or dog up in Queue
                let random = Math.floor(Math.random() * 2);
                if (random % 2 === 0) {
                    this.props.adoptCatNow();
                } else {
                    this.props.adoptDogNow();
                };
            };
        }, 5000);
        //set interval in state using above function
        this.setState({ intervalId: newIntervalId})
    };

    componentWillUnmount() {
        return clearInterval(this.state.intervalId);
    };

    render() {
        return (
            <>
                <div className='person-queue'>
                    <h3>Waiting In Line</h3>
                    <ul>
                        {this.context.people.map((names) => {
                            return names.map((name, i) => {
                                return (
                                    <li key={i}>{name}</li>
                                )
                            })
                        })}
                    </ul>

                    <form className='add-person-form' onSubmit={this.submitForm}>
                        <input
                            className='name-textbox'
                            type='text'
                            name='name'
                            onChange={e => { this.handleNameChange(e) }}
                            placeholder='Your Name'
                            required
                        />
                        <button
                            className='button'
                            disabled={this.state.signedUp}
                        >Get In Line!</button>
                    </form>
                </div>
            </>
        );
    };
};

