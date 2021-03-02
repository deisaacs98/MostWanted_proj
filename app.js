"use strict"
/*
Build all of your functions for displaying and gathering information below (GUI).
*/

// app is the function called to start the entire application
function app(people){
  let searchType = prompt("How would you like to search? \n\n1. First Name\n2. Last Name\n3. Gender\n4. Date of Birth\n5. Eye Color\n6. Height\n7. Weight\n8.Occupation");
  let searchResults;
  let searchAgain
  switch(searchType){
    case "1":
      searchResults=searchByValue(people, "firstName", "first name");
      break;
    case "2":
      searchResults=searchByValue(people, "lastName", "last name");
      break;
    case "3":
      searchResults=searchByValue(people, "gender", "gender");
      break;
    case "4":
      searchResults=searchByValue(people, "dob", "date of birth");
      break;
    case "5":
      searchResults=searchByValue(people, "eyeColor", "eye color");
      break;
    case "6":
      searchResults=searchByValue(people, "height", "height");
      break;
    case "7":
      searchResults=searchByValue(people, "weight", "weight");
      break;
    case "8":
      searchResults=searchByValue(people, "occupation", "occupation");
      break;
    default:
      app(people); // restart app
      break;
      
  }
  if(searchResults.length==1){
    mainMenu(searchResults[0],people);
  }
  else{
    searchAgain=promptFor("Would you like to search again?",yesNo)
    if(searchAgain=="yes"){
      app(searchResults);
    }
    else{
      displayPeople(searchResults);
    }

  }
  
}

// Menu function to call once you find who you are looking for
function mainMenu(person, people){

  /* Here we pass in the entire person object that we found in our search, as well as the entire original dataset of people. We need people in order to find descendants and other information that the user may want. */

  if(!person){
    alert("Could not find that individual.");
    return app(people); // restart
  }

  let displayOption = prompt("Found " + person.firstName + " " + person.lastName + " . Do you want to know their 'info', 'family', or 'descendants'? Type the option you want or 'restart' or 'quit'");

  switch(displayOption){
    case "info":
    // TODO: get person's info
    displayPerson(person);
    break;
    case "family":
    // TODO: get person's family
    break;
    case "descendants":
    // TODO: get person's descendants
    displayDescendants(person,people)
    break;
    case "restart":
    app(people); // restart
    break;
    case "quit":
    return; // stop execution
    default:
    return mainMenu(person, people); // ask again
  }
}

function searchByValue(people,valueType,valueName){
  
  let value = promptFor("What is the person's "+valueName+"?", chars);
  let foundPerson = people.filter(function(person){
    if(person[valueType] === value){
      return true;
    }
    else{
      return false;
    }
  })
  
  // TODO: find the person using the name they entered
  return foundPerson;
}

// alerts a list of people
function displayPeople(people){
  alert(people.map(function(person){
    return person.firstName + " " + person.lastName;
  }).join("\n"));
}

function displayPerson(person){
  // print all of the information about a person:
  // height, weight, age, name, occupation, eye color.
  let personInfo = "First Name: " + person.firstName + "\n";
  personInfo += "Last Name: " + person.lastName + "\n";
  personInfo += "Gender: " + person.gender + "\n";
  personInfo += "Date of Birth: " + person.dob + "\n";
  personInfo += "Height: " + person.height + "\n";
  personInfo += "Weight: " + person.weight + "\n";
  personInfo += "Eye Color: " + person.eyeColor + "\n";
  personInfo += "Occupation: " + person.occupation + "\n";
  // TODO: finish getting the rest of the information to display
  alert(personInfo);
}

function findDescendants(person,people){  
  let foundPerson = people.filter(function(otherPerson){
    if(otherPerson["parent"] === person["id"]&&otherPerson!=person){
      return true;
    }
    else{
      return false;
    }
  })
  return foundPerson;
}

function displayDescendants(person,people,descendants=[]){
  let newDescendants=findDescendants(person,people);
  descendants.push(newDescendants);
  if(newDescendants.length>0){
    for(let i=0;i<newDescendants.length;i++){
      displayDescendants(newDescendants[i],people,descendants);
    }
  }
  else{
    displayPeople(descendants);
  }
}
// function that prompts and validates user input
function promptFor(question, valid){
  do{
    var response = prompt(question).trim();
  } while(!response || !valid(response));
  return response;
}

// helper function to pass into promptFor to validate yes/no answers
function yesNo(input){
  return input.toLowerCase() == "yes" || input.toLowerCase() == "no";
}



// helper function to pass in as default promptFor validation
function chars(input){
  return true; // default validation only
}

