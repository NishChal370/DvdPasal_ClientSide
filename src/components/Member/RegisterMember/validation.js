

const showErrorMessage= (inputId, message) =>{
      if(message === 'number'){
            if(inputId === 'inputcategorydescription'){ // if for new cateogary added
                  document.getElementById(`inputmcategoryNumber-tooltip`).innerHTML = '  * should be only alphabet';
            }
            else{
                  document.getElementById(`${inputId}-tooltip`).innerHTML = '  * should be only alphabet';
            }
            
      }
      else if(message === 'empty'){
            if(inputId === 'inputcategorydescription'){ // if for new cateogary added
                  document.getElementById(`inputmcategoryNumber-tooltip`).innerHTML = '  * should not be empty';
            }
            else{
                  document.getElementById(`${inputId}-tooltip`).innerHTML = '  * should not be empty';
            }
            
      }
      else if(message === 'limit'){
            document.getElementById(`inputmcategoryNumber-tooltip`).innerHTML = '  * should  be between 1 to 30';
      }

      document.getElementById(`${inputId}`).focus();
      document.getElementById(`${inputId}`).classList.add('error');

      if(inputId === 'inputcategorydescription'|| inputId === 'inputcategorytotalLoans'){// if for new cateogary added
            document.getElementById(`inputmcategoryNumber-tooltip`).style.display ='unset';
      }
      else{
            document.getElementById(`${inputId}-tooltip`).style.display ='unset';
      }
      
      


      setTimeout(function(){ 
            removeValidationMessage(inputId);
      }, 3000);

      return false
}

export const removeValidationMessage=(inputId)=>{

      if(inputId === 'inputcategorydescription' || inputId === 'inputcategorytotalLoans'){// if for new cateogary added
            document.getElementById(`inputmcategoryNumber-tooltip`).style.display ='none';

      }
      else{
            document.getElementById(`${inputId}-tooltip`).style.display ='none';
      }

      (document.getElementById(`${inputId}`).classList.contains('error') ) &&(
            document.getElementById(`${inputId}`).classList.remove('error')
      )

      
}

const ALPHABET_REGEX = new RegExp('^[a-zA-Z\\s]*$');

export const checkValidation=(registerDetail, isNewCateogary)=>{
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
            if(!isNewCateogary){
                   // validate if wnat to add exiting cateogary
                  showErrorMessage('inputmcategoryNumber', 'empty');
            }
            else{
                  if(description === '---'|| description===''){
                        // validate if wnat to add new cateogary
                        showErrorMessage('inputcategorydescription', 'empty');
                  }
            }
            
      }
      else if(!ALPHABET_REGEX.test(description)){
            isValid = false;

            if(!isNewCateogary){
                  // validate if wnat to add exiting cateogary
                  showErrorMessage('inputmcategoryNumber', 'number');
            }
            else{
                  // validate if wnat to add new cateogary
                  showErrorMessage('inputcategorydescription', 'number');
            }
      }

      else if(totalLoans<=0 || totalLoans>30 || totalLoans === ''){
            isValid = false;
            showErrorMessage('inputcategorytotalLoans', 'limit');
      }


      return isValid;
}