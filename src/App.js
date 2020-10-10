import React, {Component} from 'react';
import './App.css';
import Input from "./Input/Input";

class App extends Component{
    state ={
       checkoutForm:{
           name:{
               elementType:'input',
               elementConfig:{
                  type:'text',
                   placeholder:'Enter Your Name'
               },
               value:'',
               validation:{
                   required:true
               },
               valid:false,
               touched:false,
               errorMsg:'Please Enter Your Name'
           },
           email:{
               elementType:'input',
               elementConfig:{
                   type:'email',
                   placeholder:'Enter Your Email'
               },
               value:'',
               validation:{
                   required:true
               },
               valid:false,
               touched:false,
               errorMsg:'Please Enter Valid Email'
           },
           street:{
               elementType:'input',
               elementConfig:{
                   type:'text',
                   placeholder:'Street'
               },
               value:'',
               validation:{
                   required:true
               },
               valid:false,
               touched:false,
               errorMsg:'Please Enter Street Number'
           },
           postal:{
               elementType:'input',
               elementConfig:{
                   type:'text',
                   placeholder:'Postal Code'
               },
               value:'',
               validation:{
                   required:true,
                   minlength:5,
                   maxlength:5
               },
               valid:false,
               touched:false,
               errorMsg:'Please Enter 5 digit Postal Code'
           },
           details:{
               elementType:'textarea',
               elementConfig:{
                   type:'text',
                   rows:5,
                   placeholder:'Checkout Details'
               },
               value:'',
               validation:{
                   required:true
               },
               valid:false,
               touched:false,
               errorMsg:'Please Enter Checkout Details'
           },
           deliveryMethod:{
               elementType:'select',
               elementConfig:{
                   options:[
                       {value:'fastest' ,displayValue:'Fastest'},
                       {value:'cheapest' ,displayValue:'Cheapest'}
                   ]
               },
               value:'fastest',
               validation:{},
               valid:true,
           }
       },
        formIsValid:false,
        submitted:false
    };

    checkValidity(value, rules){
        let isValid = true;
        if(rules.required){
            isValid = value.trim() !=='' && isValid;
        }
        if(rules.minlength){
            isValid = value.length >= rules.minlength && isValid;
        }
        if(rules.maxlength){
            isValid = value.length <= rules.maxlength && isValid;
        }
        return isValid;
    }
    checkOutFormHandler = (event) =>{
        event.preventDefault();
        const checkOutData = {};
        for(let indentifier in this.state.checkoutForm){
            checkOutData[indentifier] = this.state.checkoutForm[indentifier].value;
        }
        console.log(checkOutData);
        this.setState({submitted:true})
    };
    inputChangeHandler = (event,inputIdentifier) =>{
        const updatedCheckoutForm = {...this.state.checkoutForm};
        const updatedCheckoutElement = {...updatedCheckoutForm[inputIdentifier]};
        updatedCheckoutElement.value = event.target.value;
        updatedCheckoutElement.touched = true;
        updatedCheckoutElement.valid = this.checkValidity(updatedCheckoutElement.value, updatedCheckoutElement.validation);
        updatedCheckoutForm[inputIdentifier] = updatedCheckoutElement;
        let currentFormIsValid = true;
        for(let identifier in updatedCheckoutForm){
            currentFormIsValid = updatedCheckoutForm[identifier].valid && currentFormIsValid;
        }
        this.setState({checkoutForm:updatedCheckoutForm, formIsValid:currentFormIsValid});
    };
    render() {
        const formElementsArray = [];
        for (let Key in this.state.checkoutForm){
            formElementsArray.push({
                id:Key,
                config:this.state.checkoutForm[Key]
            });
        }
        return (
            <div className="container">
                <div className="row">
                    <div className="col-sm-2"/>
                    <div className="col-sm-8">
                        <h2 style={{textAlign:'center'}}>Checkout form</h2>
                        <form onSubmit={this.checkOutFormHandler}>
                            {
                                formElementsArray.map(formElement =>(
                                    <Input
                                        key = {formElement.id}
                                        inputtype ={formElement.config.elementType}
                                        elementConfig = {formElement.config.elementConfig}
                                        value={formElement.config.value}
                                        invalid={!formElement.config.valid}
                                        shouldValidate ={formElement.config.validation}
                                        touched = {formElement.config.touched}
                                        errorMsg = {formElement.config.errorMsg}
                                        change={(event)=>this.inputChangeHandler(event,formElement.id)}
                                    />
                                ))
                            }
                            <button   className="btn btn-primary" disabled={ ! this.state.formIsValid}>Submit</button>
                        </form>
                        {
                            this.state.submitted ?
                            <div>
                                <hr/>
                                <h3>Your Checkout Details:</h3>
                                <p>Name: {this.state.checkoutForm.name}</p>
                                <p>Email: {this.state.checkoutForm.email.value}</p>
                                <p>Street: {this.state.checkoutForm.street.value}</p>
                                <p>Postal Code: {this.state.checkoutForm.postal.value}</p>
                                <p>Checkout Details: {this.state.checkoutForm.details.value}</p>
                                <p>DeliveryMethod: {this.state.checkoutForm.deliveryMethod.value}</p>
                            </div>:null
                        }
                    </div>
                    <div className="col-sm-2"/>
                </div>
            </div>
        );
    }
}

export default App;
