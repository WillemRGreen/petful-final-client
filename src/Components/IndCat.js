import React from 'react';
import Context from '../Context/Context';


export default class NextCat extends React.Component {
    static contextType = Context;

    render() {
        const nextCat = this.context.cats[0];
        const { age, breed, imageDescription, imageURL, name, sex, story } = nextCat;

        if (!name) {
            return (
                <div>
                    <label>All of our Cats have been adopted! Thank you</label>
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
                        onClick={this.props.adoptCatNow}>
                        Adopt Now
                    </button>
                ) : null}
            </div>
        );
    };
};

