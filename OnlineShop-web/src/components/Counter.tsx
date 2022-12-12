import React from 'react';
import { RootState } from '../store';
import { useSelector, useDispatch } from 'react-redux';
import { decrement, increment } from '../store/counter/counterSlice';
import { Link } from 'react-router-dom';

export function Counter() {
    const count = useSelector((state: RootState) => state.counter.test);
    const dispatch = useDispatch();

    return (
        <div>
            <div>
                <button
                    aria-label="Increment value"
                    onClick={() => dispatch(increment())}
                >
                    Increment
                </button>
                <span>{count}</span>
                <button
                    aria-label="Decrement value"
                    onClick={() => dispatch(decrement())}
                >
                    Decrement
                </button>
                <Link to="/dashboard">Dashboard</Link>
                <Link to="/dashboard/counter">Dashboard/Counter</Link>
            </div>
        </div>
    );
}
