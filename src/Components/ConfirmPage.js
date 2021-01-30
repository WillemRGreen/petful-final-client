import React from 'react';
import { Link } from 'react-router-dom';
import Context from '../Context/Context';
import config from '../config';



export default class ConfirmationPage extends React.Component {
    static contextType = Context;

    removePet = () => {
        if (this.props.petType === 'cat') {
            fetch(`${config.API_BASE_URL}/pets/api/removecat`, {
                method: 'delete',
                headers: {
                    'content-type': 'application/json',
                },
            })
                .then(res => !res.ok ? res.json().then(e => Promise.reject(e)) : res.json())
                .then(cats => {
                    this.context.setCats(cats);
                });
        } else {
            fetch(`${config.API_BASE_URL}/pets/api/removedog`, {
                method: 'delete',
                headers: {
                    'content-type': 'application/json',
                },
            })
                .then(res => !res.ok ? res.json().then(e => Promise.reject(e)) : res.json())
                .then(dogs => {
                    this.context.setDogs(dogs);
                });
        };
    };

    render() {
        const adoptedPet = this.context.adoptedPet;
        const user = this.context.currentUser;

        return (
            <div className='confirm-page'>
                <h2>Congrats {user}! You adopted {adoptedPet.name}!</h2>
                <div>
                    <img className='confirm-pet-pic' src={adoptedPet.imageURL} alt={adoptedPet.description}></img>
                </div>
                <div>
                <Link to='/'><button className='button' onClick={() => this.removePet()}>Home</button></Link>
                </div>
            </div>
        );
    };
};

