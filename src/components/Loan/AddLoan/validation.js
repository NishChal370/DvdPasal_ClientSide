const ALPHABET_REGEX = new RegExp('^[a-zA-Z\\s]*$');
const NUMBER_REGEX = new RegExp('^(\\d{1,5}\.\\d{1,})$');

export const validateData =(selectInputDetail, index)=>{
      let isValid = true;
      let {memberNumber, loanType} = selectInputDetail;
      
      if(memberNumber === '' || memberNumber === 0){
            document.getElementById(`memberNumber${index}`).focus();
            document.getElementById(`memberNumber${index}`).classList.add('error');

            isValid = false;
            setTimeout(function(){ 
                  removeValidationMessage(`memberNumber${index}`);
            }, 3000);
      }
      else if(loanType.loanTypeName === ''){
            document.getElementById(`loanType${index}`).focus();
            document.getElementById(`loanType${index}`).classList.add('error');

            isValid = false;
            setTimeout(function(){ 
                  removeValidationMessage(`loanType${index}`);
            }, 3000);
      }

      return isValid;
}

export const removeValidationMessage=(inputId)=>{
      (document.getElementById(`${inputId}`).classList.contains('error') ) &&(
            document.getElementById(`${inputId}`).classList.remove('error')
      )
}


/************************ VALIDATE LOAN TYPE ***************************************/

export const validateLoanType = (typeData) => {
      let isValid = true;
      const {typeName, duration} = typeData;

      if (typeName.trim() === ''){
            isValid = false;
            showErrorMessage({inputName: 'typeName', message : 'empty'})
      }
      else if (!ALPHABET_REGEX.test(typeName.trim())){
            isValid = false;
            showErrorMessage({inputName: 'typeName', message : 'invalid'})
      }

      else if (duration.trim() === ''){
            isValid = false;
            showErrorMessage({inputName: 'duration', message : 'empty'})
      }
      else if (NUMBER_REGEX.test(duration.trim())){
            isValid = false;
            showErrorMessage({inputName: 'duration', message : 'numberInvalid'})
      }

      return isValid;
}



const showErrorMessage= ({inputName, message}) =>{
      if(message === 'empty'){
            document.getElementById(`${inputName}-tooltip`).innerHTML = '  * should not be empty';
      }
      else if(message === 'invalid'){
            document.getElementById(`${inputName}-tooltip`).innerHTML = '  * should  be alphabet only';
      }
      else if(message === 'numberInvalid'){
            document.getElementById(`${inputName}-tooltip`).innerHTML = '  * should  be number greater than 0';
      }

      document.getElementById(`${inputName}`).focus();
      document.getElementById(`${inputName}`).classList.add('error');
      document.getElementById(`${inputName}-tooltip`).style.display ='unset';


      setTimeout(function(){ 
            removeLoanTypeValidationMessage(inputName);
      }, 1000);

      return false
}

export const removeLoanTypeValidationMessage=(inputName)=>{
      document.getElementById(`${inputName}-tooltip`).style.display ='none';

      (document.getElementById(`${inputName}`).classList.contains('error') ) &&(
            document.getElementById(`${inputName}`).classList.remove('error')
      )
}