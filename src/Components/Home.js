import React from 'react';
import Header from './Header';


export default class Home extends React.Component {
    render() {
        return (
            <div className='home'>
                <Header />
                    <div>
                        <img className='home-pet-pic' src={'https://images.pexels.com/photos/33053/dog-young-dog-small-dog-maltese.jpg?auto=compress&cs=tinysrgb&dpr=1&w=500'} alt='cat'></img>
                    </div>
                <div className='home'>
                <p>
                {' '}
                FIFO is a pet adoption agency that takes a 'first-in-first-out'
                approach to adoption.
                </p>{' '}
                <p>
                {' '}
                The first animal that gets admitted to our shelter is the first one
                that gets adopted.
                </p>
                <div>
                <button className='button' onClick={() => this.props.history.push('/adopt')}>Adopt Now!</button>
                </div>
                </div>
            </div>
        );
    };
};

