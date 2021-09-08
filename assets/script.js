//  Function to gather current time/date
function createSchedule() {

    let todayDate = getCurrentDate();
    let hourNow = getCurrentHour();
    $("#currentDay").append(todayDate);
  
    // Selected time frame array
    let timeFrame = ["9am", "10am", "11am", "12pm", "1pm", "2pm", "3pm", "4pm", "5pm"];
  
    for( let j = 0; j < 9; j++){
      if(localStorage.getItem(timeFrame[j])==null){
        localStorage.setItem(timeFrame[j], "");
      }
    }


    
    // Functionality of save planner time/description/save button in order
    for (let i = 9; i < 18; i++) {
      let timeArea = $("<textArea disabled class='time-block hour col-md-1'>" + timeFrame[i-9] + "</textArea>");
      let descriptionBox = $("<textArea class='description "+ "description" + i +" col-md-10' id='"+ timeFrame[i-9]+"'>"+localStorage.getItem(timeFrame[i-9])+"</textArea>");
      let saveButtonBox = $("<button class='saveBtn col-md-1' onclick='" +"callSaveDescriptionBox(\""+ timeFrame[i-9]+"\")'></button>");
      $(".container").append(timeArea);
      $(".container").append(descriptionBox);
      $(".container").append(saveButtonBox);
      $(".description"+i).addClass(getPastPresentFuture(i,hourNow));
    }
  }

  // Functions for text box descriptions
  function callSaveDescriptionBox(key){
    console.log("callSaveDescriptionBox " + key);
    saveDescriptionBox(key,$("#"+ key).val());
  }
  
  function saveDescriptionBox(key, value){
    console.log("saveDescriptionBox " + key + " " + value);
    localStorage.setItem(key, value);
  }
  
  
  // Reset/Save Functionality
  createSchedule();
  
  function getCurrentDate(){
    return moment().format('dddd, MMMM Do YYYY');
  }
  
  function getCurrentHour(){
    return moment().hour();
  }
  
  function getPastPresentFuture(hour,hourNow){
    
    if(hour<hourNow){
      return "past";
    }
    else if(hour>hourNow){
      return "future";
    }
    else{
      return "present";
    }
  }