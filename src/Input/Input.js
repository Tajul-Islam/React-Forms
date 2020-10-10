import React from "react";
import classes from './Input.module.css';
const input = (props) =>{
    let inputElement = null;
    const inputClasses = ['form-control'];
    let validationError = null;
    if(props.invalid && props.shouldValidate && props.touched){
        inputClasses.push(classes.Invalid);
        validationError = <p className={classes.ValidationError}>{props.errorMsg}</p>;
    }
    switch (props.inputtype) {
        case('input'):
            inputElement = <input
                {...props.elementConfig}
                value={props.value}
                className={inputClasses.join(' ')}
                onChange={props.change}
            />;
        break;
        case('select'):
            inputElement = (
                <select className={inputClasses.join('')} value={props.value} onChange={props.change}>
                    {props.elementConfig.options.map(option => (
                        <option value={option.value} key={option.value}>{option.displayValue}</option>
                    ))}
                </select>
            );
            break;
        case('textarea'):
            inputElement = <textarea
                {...props.elementConfig}
                value={props.value}
                className={inputClasses.join(' ')}
                onChange={props.change}
            />;
            break;
        default:
            inputElement = <input
                {...props.elementConfig}
                value={props.value}
                className={inputClasses.join(' ')}
                onChange={props.change}
            />;
    }
    return (
        <div className="form-group">
            <label>{props.label}</label>
            {inputElement}
            {validationError}
        </div>
    )
};

export default input;
