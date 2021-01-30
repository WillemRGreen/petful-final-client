import React from 'react';
import Context from '../Context/Context';

export default class NextDog extends React.Component {
    static contextType = Context;

    render() {
        const nextDog = this.context.dogs[0];
        const { age, breed, imageDescription, imageURL, name, sex, story } = nextDog;

        if (!name) {
            return (
                <div>
                    <label>All of our Dogs have been adopted! Thank you</label>
                </div>
            );
        };
        return (
            <div>
                <h2>Meet {name}!</h2>
                <img className='pet-pic' src={imageURL} alt={imageDescription}></img>
                <p>{age} year old {sex} {breed}</p>
                <p>{story}</p>
                {this.props.realPerson ? (
                    <button
                        className='button'
                        onClick={this.props.adoptDogNow}>
                        Adopt Now
                    </button>
                ) : null}
            </div>
        );
    };
};

