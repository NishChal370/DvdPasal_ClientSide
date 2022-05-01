

const showErrorMessage= (inputId, message) =>{
      if(message === 'number'){
            document.getElementById(`${inputId}-tooltip`).innerHTML = '  * should be only alphabet';
      }
      else if(message === 'empty'){
            document.getElementById(`${inputId}-tooltip`).innerHTML = '  * should not be empty';
      }
      else if(message === 'limit'){
            document.getElementById(`${inputId}-tooltip`).innerHTML = '  * should  be between 1 to 30';
      }

      document.getElementById(`${inputId}`).focus();
      document.getElementById(`${inputId}`).classList.add('error');
      document.getElementById(`${inputId}-tooltip`).style.display ='unset';


      setTimeout(function(){ 
            removeValidationMessage(inputId);
      }, 3000);

      return false
}

export const removeValidationMessage=(inputId)=>{
      document.getElementById(`${inputId}-tooltip`).style.display ='none';

      (document.getElementById(`${inputId}`).classList.contains('error') ) &&(
            document.getElementById(`${inputId}`).classList.remove('error')
      )
}

const ALPHABET_REGEX = new RegExp('^[a-zA-Z\\s]*$');

export const checkValidation=(registerDetail)=>{
      const {fristName, lastName, address, membershipCategory, dateOfBirth, profileImage} = registerDetail;
      const {description, totalLoans}  = membershipCategory;

      let isValid = true;

      if(fristName === ''){
            isValid = false;
            showErrorMessage('inputfristName', 'empty');  
      }
      else if(!ALPHABET_REGEX.test(fristName)){
            isValid = false;
            showErrorMessage('inputfristName', 'number');
      }

      else if(lastName === ''){
            isValid = false;
            showErrorMessage('inputlastName', 'empty');
            
            
      }
      else if(!ALPHABET_REGEX.test(lastName)){
            isValid = false;
            showErrorMessage('inputlastName', 'number');
      }

      else if(address === ''){
            isValid = false;
            showErrorMessage('inputaddress', 'empty');
      }
      else if(!ALPHABET_REGEX.test(address)){
            isValid = false;
            showErrorMessage('inputaddress', 'number');
      }

      else if(dateOfBirth === ''){
            isValid = false;
            showErrorMessage('inputdateOfBirth', 'empty');
      }

      else if(profileImage === ''){
            isValid = false;
            showErrorMessage('inputprofileImage', 'empty');
      }

      else if(description === '---'|| description===''){
            isValid = false;
            showErrorMessage('inputmcategoryNumber', 'empty');
      }
      else if(!ALPHABET_REGEX.test(description)){
            isValid = false;
            showErrorMessage('inputmcategoryNumber', 'number');
      }

      else if(totalLoans<=0 || totalLoans>30 || totalLoans === ''){
            isValid = false;
            showErrorMessage('inputcategorytotalLoans', 'limit');
      }


      return isValid;
}