import { dateConverter } from "../Common/dateConverter";

const ALPHABET_REGEX = new RegExp('^[a-zA-Z\\s]*$');
const EMAIL_REGEX = new RegExp('[a-z0-9]+@[a-z]+\.[a-z]{2,3}');
const PASSWORD_REGEX = new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9_])');
const todaysDate = new Date();

export const validateRegisterUser=({newUserDetail})=>{
      let isValid = true;
      const {userName, email, password, firstName, dateOfBirth, lastName,} = newUserDetail;
      
      if(userName.trim() === ''){ 
            isValid = false;
            showErrorMessage({inputName: 'userName', errorMessage: 'empty'})
      }
      // else if(!ALPHABET_REGEX.test(userName)){
      //       isValid = false;
      //       showErrorMessage({inputName: 'userName', errorMessage: 'invalid'})
      // }

      else if(firstName.trim() === ''){ 
            isValid = false;
            showErrorMessage({inputName: 'firstName', errorMessage: 'empty'})
      }
      else if(!ALPHABET_REGEX.test(firstName)){
            isValid = false;
            showErrorMessage({inputName: 'firstName', errorMessage: 'invalid'})
      }


      else if(lastName.trim() === ''){ 
            isValid = false;
            showErrorMessage({inputName: 'lastName', errorMessage: 'empty'})
      }
      else if(!ALPHABET_REGEX.test(lastName)){
            isValid = false;
            showErrorMessage({inputName: 'lastName', errorMessage: 'invalid'})
      }

      else if(email.trim() === ''){ 
            isValid = false;
            showErrorMessage({inputName: 'email', errorMessage: 'empty'})
      }
      else if(!EMAIL_REGEX.test(email)){
            isValid = false;
            showErrorMessage({inputName: 'email', errorMessage: 'email'})
      }

      else if(password.trim() === ''){  
            isValid = false;
            showErrorMessage({inputName: 'password', errorMessage: 'empty'})
      }
      else if(!PASSWORD_REGEX.test(password)){
            isValid = false;
            showErrorMessage({inputName: 'password', errorMessage: 'password'})
      }

      else if(dateOfBirth.trim() === ''){ 
            isValid = false;
            showErrorMessage({inputName: 'dateOfBirth', errorMessage: 'empty'})
      }
      else if(new Date(dateConverter(todaysDate)) < new Date(dateConverter(dateOfBirth))){
            isValid = false;
            showErrorMessage({inputName: 'dateOfBirth', errorMessage: 'date'})
      }


      return isValid;
}

const showErrorMessage= ({inputName, errorMessage}) =>{

      if(errorMessage === 'empty'){
            document.getElementById(`input${inputName}-tooltip`).innerHTML = '  * should not be empty'
      }
      else if(errorMessage === 'invalid'){
            document.getElementById(`input${inputName}-tooltip`).innerHTML = '  * should be only alphabet'
      }
      else if(errorMessage === 'email'){
            document.getElementById(`input${inputName}-tooltip`).innerHTML = '  * check the email format'
      }
      else if(errorMessage === 'password'){
            document.getElementById(`input${inputName}-tooltip`).innerHTML = '  * should contain upper lower alphabet, number and special character.'
      }
      else if(errorMessage === 'date'){
            document.getElementById(`input${inputName}-tooltip`).innerHTML = '  * invalid date'
      }
      else if(errorMessage === 'notMatch'){
            document.getElementById(`input${inputName}-tooltip`).innerHTML = '  * password doesnot match'
      }

      document.getElementById(`input${inputName}`).focus();
      document.getElementById(`input${inputName}`).classList.add('error');
      document.getElementById(`input${inputName}-tooltip`).style.display ='unset';


      setTimeout(function(){ 
            removeValidationMessage({inputName: inputName});
      }, 2000);

}

export const removeValidationMessage=({inputName})=>{

      document.getElementById(`input${inputName}-tooltip`).style.display ='none';

      (document.getElementById(`input${inputName}`).classList.contains('error') ) &&(
            document.getElementById(`input${inputName}`).classList.remove('error')
      )
}



/*********************************CHANGE PASSWORD VALIDATION******************************************** */

export const validateNewPassword=({newPassword, newPassword2, oldPassword, checkoldPassword})=>{
      let isValid = true;

      if(oldPassword.trim() === '' && checkoldPassword){
            isValid = false;
            showErrorMessage({inputName: 'oldPassword', errorMessage: 'empty'})
      }
      else if(newPassword.trim() === ''){
            isValid = false;
            showErrorMessage({inputName: 'newPassword', errorMessage: 'empty'})
      }
      else if (!PASSWORD_REGEX.test(newPassword)){
            isValid = false;
            showErrorMessage({inputName: 'newPassword', errorMessage: 'password'})
      }
      else if(newPassword2.trim() === ''){
            isValid = false;
            showErrorMessage({inputName: 'newPassword2', errorMessage: 'empty'})
      }
      else if(newPassword2.trim() !== newPassword.trim()){
            isValid = false;
            showErrorMessage({inputName: 'newPassword2', errorMessage: 'notMatch'})
      }

      return isValid;
}