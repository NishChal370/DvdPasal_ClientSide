
const showErrorMessage= (inputName, message) =>{
      if(message === 'empty'){
            document.getElementById(`${inputName}-tooltip`).innerHTML = '  * should not be empty';
      }
      else if(message === 'invalid'){
            document.getElementById(`${inputName}-tooltip`).innerHTML = '  * should  be number only';
      }

      document.getElementById(`${inputName}`).focus();
      document.getElementById(`${inputName}`).classList.add('error');
      document.getElementById(`${inputName}-tooltip`).style.display ='unset';


      setTimeout(function(){ 
            removeValidationMessage(inputName);
      }, 3000);

      return false
}

export const removeValidationMessage=(inputId)=>{
      document.getElementById(`${inputId}-tooltip`).style.display ='none';

      (document.getElementById(`${inputId}`).classList.contains('error') ) &&(
            document.getElementById(`${inputId}`).classList.remove('error')
      )
}


export const validateModel=(newDvdDetail)=>{
      const {dvdId, datePurchased, dvdCount} = newDvdDetail;

      let isValid = true;

      if(dvdId === ''){
            isValid = false;
            showErrorMessage('dvdId', 'empty');
      }
      else if(datePurchased === ''){
            isValid = false;
            showErrorMessage('datePurchased', 'empty');
      }
      else if(dvdCount === '' || dvdCount<=0){
            isValid = false;
            showErrorMessage('dvdCount', 'invalid');
      }

      return isValid;

}
