"use strict"
/*
Build all of your functions for displaying and gathering information below (GUI).
*/

// app is the function called to start the entire application
function app(people){
  let searchType = prompt("How would you like to search? \n\n1. First Name\n2. Last Name\n3. Gender\n4. Date of Birth\n5. Eye Color\n6. Height\n7. Weight\n8.Occupation");
  let searchResults = selectSearch(searchType,people);
  displaySearchResults(searchResults,people);
}

function selectSearch(searchType,people){
  let searchResults;
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
  return searchResults;
}
function displaySearchResults(searchResults,people){
  if(searchResults.length==1){
    mainMenu(searchResults[0],people);
  }
  else if(searchResults.length==0)
  {
    mainMenu(null,people);
  }
  else{
    displayPeople(searchResults);
    let searchAgain=promptFor("Would you like to search from the names on this list?",yesNo)
    if(searchAgain=="yes"){
      app(searchResults);
    }
    else{
      searchAgain=promptFor("Would you like to search from the entire list?",yesNo)
      if(searchAgain="yes"){
        app(people);
      }
    }
  }
}
// Menu function to call once you find who you are looking for
function mainMenu(person, people){

  /* Here we pass in the entire person object that we found in our search, as well as the entire original dataset of people. We need people in order to find descendants and other information that the user may want. */

  if(!person||!people.includes(person)){
    alert("Could not find that individual.");
    return app(people); // restart
  }

  let displayOption = prompt("Found " + person.firstName + " " + person.lastName + " . Do you want to know their 'info', 'family', or 'descendants'? Type the option you want or 'restart' or 'quit'").toLowerCase();
  switch(displayOption){
    case "info":
    // TODO: get person's info
    displayPerson(person);
    break;
    case "family":
    // TODO: get person's family
    displayFamily(person,people);
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
    if(person[valueType].toString().toLowerCase() === value.toLowerCase()){
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

function findDescendants(person,people,descendants=[]){  
  people.filter(function(otherPerson){
    if(otherPerson["parents"].includes(person["id"])&&!descendants.includes(otherPerson)){
      descendants.push(otherPerson);
      let moreDescendants=findDescendants(otherPerson,people,descendants);
      if(moreDescendants.length>0){
        return moreDescendants;
      }
      else{
        return false;
      }
    }
    else{
      return false;
    }
  })
  return descendants;
}

function displayDescendants(person,people){
  let descendants=findDescendants(person,people);
  if(descendants.length>0){
    displayPeople(descendants);
  }
}

function findParents(person, people){
  let foundPeople = people.filter(function(otherPerson){
    if(person.parents.includes(otherPerson.id)){
      return true;
    }
    else{
      return false;
    }
  })
  return foundPeople;
}

function findSpouse(person, people){
  let foundPeople = people.filter(function(otherPerson){
    if(person.currentSpouse === otherPerson.id){
      return true;
    }
    else{
      return false;
    }
  })
  return foundPeople;
}

function findSiblings(person, people){
  var foundSiblings = people.filter(function(otherPerson){
    if(otherPerson.parents.includes(person.parents[0])||otherPerson.parents.includes(person.parents[1])&&otherPerson.id!=person.id){
      return true;
    }
    else{
      return false;  
    }
  })
  var foundSiblings2 = foundSiblings.filter(function(another){
    if(person.id!==another.id){
      return true;
    }
    else{
      return false;
    }
  })
  return foundSiblings2;
}
function displayFamily(person, people,family="No Family Found"){
  let familyInfo="";
  let parents = findParents(person, people);
  let spouse = findSpouse(person, people);
  let siblings = findSiblings(person, people);
  if (parents.length>0){
    for(let i=0;i<parents.length;i++){
      familyInfo+="Parent: ";
      familyInfo+=parents[i].firstName+" "+parents[i].lastName+"\n";
    }
  }
  else{
    familyInfo+="No parents found"+"\n";
  }
  if (spouse.length>0){
    familyInfo+="Spouse: "+spouse[0].firstName+" "+spouse[0].lastName+"\n";
  }
  else{
    familyInfo+="No Spouse found"+"\n";
  }
  if(siblings.length>0){
  
    for (let i = 0;i<siblings.length;i++){
      familyInfo+="Sibling: ";
      familyInfo+=siblings[i].firstName+" "+siblings[i].lastName+"\n";
    }
  }
  else{
    familyInfo+="No Siblings found";
  }
  alert(familyInfo);
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



