import React, { useState, useEffect } from 'react';
import * as yup from 'yup';
import axios from 'axios';
import { Route, Link } from "react-router-dom";

const schema = yup.object().shape({
    name: yup.string().required('Please enter your name').min(2, 'That\'s just your inicials.'),
    location: yup.string().required('Please enter your zip code.').matches(/^[0-9]{5}$/, 'Please enter a valid zip code.'),
    // imageOfSleep: yup.string().required('Please upload your Picture.'),
    timeToBed: yup.string().required('Please give departure time is the future')
  })
  
  const defaultFormState = {
    name: '',
    location: '',
    // imageOfSleep:'',
    sleepType: {
        1: false,
        2: false,
        3: false,
        4: false
        
        
    },
    sleepTime:'',
    
  }
  
  const defaultErrorState = {
    name: '',
    location: '',
    // imageOfSleep:'',
    sleepTime: '',
  }

function MainObject() {

    const [formState, setFormState] = useState(defaultFormState);
          const [errors, setErrors] = useState(defaultErrorState);
          const [isDisabled, setIsDisabled] = useState(true);
      
          useEffect(() => {
              schema.isValid(formState).then(valid => setIsDisabled(!valid));
          }, [formState, schema])
      
          const validate = e => {
              e.persist();
              yup.reach(schema, e.target.name).validate(e.target.value)
              .then(valid => setErrors({...errors, [e.target.name]: ''}))
              .catch(err => setErrors({...errors, [e.target.name]: err.errors[0]}));
          }
      
          const handleChange = e => {
            if (e.target.type === 'radio') {
                setFormState({
                    ...formState,
                    condiments: {
                        ...formState.condiments,
                        [e.target.value]: e.target.checked
                    }
                })
            } else {
                setFormState({
                    ...formState,
                    [e.target.name]: e.target.value
                })
            }
            if (e.target.name === 'name' || e.target.name === 'location') {
                validate(e);
            }
            if (e.target.type === 'file') {
                setFormState({
                ...formState,
                // imageOfSleep:e.target.files[0]
                })
            }
            
        }
    return (


<form>
{/* <label htlmFor="img-link">Select image:
  <input type="file" id="img" name="img" accept="image/*"/>

  </label> */}
<label>Name
                    <input type='text' name='name' onChange={handleChange} data-cy='name' value={formState.name} />
                    {errors.name.length > 0 && <p style={{color:'red'}}>{errors.name}</p>}
          </label>
          
<label>location 
                    <input type='text' name='location' onChange={handleChange} data-cy='location' value={formState.location} />
                    {errors.location.length > 0 && <p style={{color:'red'}}>{errors.location}</p>}
          </label>
<label>Time to Bed 
                    <input type='time' name='sleepTime' onChange={handleChange} data-cy='sleepTime' value={formState.sleepTime} />
                    {errors.sleepTime.length > 0 && <p style={{color:'red'}}>{errors.sleepTime}</p>}

                    <input type='date' name='sleepTime' onChange={handleChange} data-cy='sleepTime' value={formState.sleepTime} />
                    {errors.sleepTime.length > 0 && <p style={{color:'red'}}>{errors.sleepTime}</p>}
          </label>
<label>Select Type of Sleep
                <select name='type' data-cy='type' defaultValue='Great' onChange={handleChange}>
                    <option value='amazing'>Amazing</option>
                    <option value='great'>Great</option>
                    <option value='sleepless'>Sleepless</option>
                    <option value='ressless'>Ressless</option>
                    <option value='wideAwake'>Wide Awake</option>
                    <option value='tossingAndTurning'>Tossing and Turning</option>
                </select>
            </label>
<fieldset> Customer Rating Sleep
          <label>
              <input type='radio' name='sleepTypes' onChange={handleChange} data-cy='1' value='1' />
              1
          </label>
          <label>
              <input type='radio' name='sleepTypes' onChange={handleChange} data-cy='2' value='2' />
              2
          </label>
          <label>
              <input type='radio' name='sleepTypes' onChange={handleChange} data-cy='3' value='3' />
              3
          </label>
          <label>
              <input type='radio' name='sleepTypes' onChange={handleChange} data-cy='4' value='4' />
              4
          </label>
        </fieldset>
        
            <button data-cy="submit-button" type='submit'>Submit</button>
        
</form>
       
    )
};


export default MainObject;