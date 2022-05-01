export const validateData =(selectInputDetail, index)=>{
      let isValid = true;
      let {memberNumber, loanType} = selectInputDetail;
      
      if(memberNumber==='' || memberNumber==0){
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