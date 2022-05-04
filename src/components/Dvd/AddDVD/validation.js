const ALPHABET_REGEX = new RegExp('^[a-zA-Z\\s]*$');

export const checkValidation = ({newDvdDetail, numberOfActors})=>{
      const {dvdName, dateReleased, standardCharge, penaltyCharge, dvdCategory, dvdProducer, dvdStudio, dvDimages, actors} = newDvdDetail;

      let errorInputId  = ''
      let errorType = ''
      let isValid = true;

      if (dvdName.trim() === '') {
            errorInputId = 'dvdName';
            errorType = 'empty';
            isValid = false;
      }
      else if (!ALPHABET_REGEX.test(dvdName.trim())){
            errorInputId = 'dvdName';
            errorType = 'invalid';
            isValid = false;
      }
      

      else if(dateReleased.trim() === ''){
            errorInputId = 'dateReleased';
            errorType = 'empty';
            isValid = false;
      }
      else if (new Date(dateReleased) > new Date()){
            errorInputId = 'dateReleased';
            errorType = 'limit';
            isValid = false;
      }
      

      else if(standardCharge === ''){
            errorInputId = 'standardCharge';
            errorType = 'empty';
            isValid = false;
      }
      else if(standardCharge<=0){
            errorInputId = 'standardCharge';
            errorType = 'limit';
            isValid = false;
      }

      else if(penaltyCharge === ''){
            errorInputId = 'penaltyCharge';
            errorType = 'empty';
            isValid = false;
      }
      else if(penaltyCharge >= standardCharge){
            errorInputId = 'penaltyCharge';
            errorType = 'limit';
            isValid = false;
      }

      else if(dvdProducer.producerName.trim() === ''){
            errorInputId = 'dvdProducer';
            errorType = 'empty';
            isValid = false;
      }
      else if(!ALPHABET_REGEX.test(dvdProducer.producerName.trim())){
            errorInputId = 'dvdProducer';
            errorType = 'invalid';
            isValid = false;
      }

      else if (dvdStudio.studioName.trim() === ''){
            errorInputId = 'dvdStudio';
            errorType = 'empty';
            isValid = false;
      }
      else if(!ALPHABET_REGEX.test(dvdStudio.studioName.trim())){
            errorInputId = 'dvdStudio';
            errorType = 'invalid';
            isValid = false;
      }
      else if (dvdCategory.categoryDescription.trim() === ''){
            errorInputId = 'dvdCategory';
            errorType = 'empty';
            isValid = false;
      }
      else if(!ALPHABET_REGEX.test(dvdCategory.categoryDescription.trim())){
            errorInputId = 'dvdCategory';
            errorType = 'invalid';
            isValid = false;
      }

      else if(dvDimages.length <= 0){
            errorInputId = 'dvDimages';
            errorType = 'empty';
            isValid = false;
      }
      else if (dvDimages.length > 0){

            if (dvDimages[0].image64.trim() === '') {
                  errorInputId = 'dvDimages';
                  errorType = 'empty';
                  isValid = false;
            }
      }
      if(isValid){
            isValid = validateActors(actors,numberOfActors);
      }
      

      return (isValid) ?isValid :showError({inputId: errorInputId, type:errorType})
}


const showError=({inputId, type})=>{

      switch (type) {
            case 'limit':
                  limitMessage(inputId);
                  break;
            case 'invalid':
                  invalidMessage(inputId);
                  break;
            default:
                  emptyMessage(inputId);
                  break;
      }

      document.getElementById(`${inputId}`).focus();
      document.getElementById(`${inputId}`).classList.add('error');
      document.getElementById(`${inputId}-tooltip`).style.display ='unset';
            
      setTimeout(function(){ 
            removeValidationMessage(inputId);
      }, 1000);

      return false;
}


const validateActors =(actors, numberOfActors)=>{

      for(const actorIndex in actors){

            if(numberOfActors[actorIndex]){ // if new actor is being added
                  if(actors[actorIndex].actorName.trim() === ''){
                        
                        return showActorError({actorNumber:actorIndex, inputName: 'actorName', errorType:'empty'});
                  }
                  else if(!ALPHABET_REGEX.test(actors[actorIndex].actorName.trim())){
                        
                        return showActorError({actorNumber:actorIndex, inputName: 'actorName', errorType:'invalid'});
                  }
                  else if(actors[actorIndex].actorLastName.trim() === ''){
                        
                        return showActorError({actorNumber:actorIndex, inputName: 'actorLastName', errorType:'empty'});
                  }
                  else if(!ALPHABET_REGEX.test(actors[actorIndex].actorLastName.trim())){
                        
                        return showActorError({actorNumber:actorIndex, inputName: 'actorLastName', errorType:'invalid'});
                  }
            }
            else{// if existing actor is being added
                  if(actors[actorIndex].actorName.trim() === '' || actors[actorIndex].actorName.trim() === '---'){ 
                        
                        return showActorError({actorNumber:actorIndex, inputName: 'actorNumber', errorType:'empty'})
                  }
            }
      }

      return true
}



const showActorError=({actorNumber, inputName, errorType})=>{

      switch (errorType) {
            case 'invalid':
                  document.getElementById(`actors-tooltip`).innerHTML = '  * should be only alphabet';
                  break;
            default:
                  document.getElementById(`actors-tooltip`).innerHTML = '  * should not be empty';
                  break;
      }

      document.getElementById(`actors-tooltip`).style.display ='unset';
      document.querySelector(`[title=${inputName}${actorNumber}]`).focus();
      document.querySelector(`[title=${inputName}${actorNumber}]`).classList.add('error');   

      setTimeout(function(){ 

            document.querySelector(`[title=${inputName}${actorNumber}]`).classList.remove('error');
            document.getElementById(`actors-tooltip`).style.display ='none';

      }, 1000);
      return false;
}


const invalidMessage=(inputId)=>{

      document.getElementById(`${inputId}-tooltip`).innerHTML = '  * should be only alphabet';
}


const emptyMessage = (inputId)=>{
      document.getElementById(`${inputId}-tooltip`).innerHTML = '  * should not be empty'
}

const limitMessage = (inputId)=>{
      const message = (inputId === 'standardCharge')
                        ? '  * should  greater than 0.'
                        : (inputId === 'dateReleased') ?'  * should not be greater than todays date' :'  * should be less than price'
      
      document.getElementById(`${inputId}-tooltip`).innerHTML = message;
}


export const removeValidationMessage=(inputId)=>{

      document.getElementById(`${inputId}-tooltip`).style.display ='none';

      (document.getElementById(`${inputId}`).classList.contains('error') ) &&(
            document.getElementById(`${inputId}`).classList.remove('error')
      )
}
