import ExpenseDate from './ExpenseDate';
import './ExpenseItem.css';
import {useState} from 'react';

const ExpenseItem = (props) => {
    const [title,setTitle] = useState(props.title)
    return (
        <div className="expense-item">
            <ExpenseDate date = {props.date}/>
            <div className="expense-item_description">
                <h2>{props.title}</h2>
                <div className="expense-item_price">${props.amount}</div>
            </div>
        </div>
    );
}

export default ExpenseItem;