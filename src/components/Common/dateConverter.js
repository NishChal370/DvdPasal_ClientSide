
export const dateConverter=(dateStr)=>{
      const  monthsList = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
      let date = new Date(dateStr);
      const year = date.getFullYear()
      const month = monthsList[date.getMonth()];
      const day = (date.getDate()<10) ?0+""+date.getDate() :date.getDate();

      return month+" "+day+" "+year
}