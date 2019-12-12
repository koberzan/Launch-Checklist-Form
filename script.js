// Write your JavaScript code here!



window.addEventListener("load", function() {
      let form = document.querySelector("form");
      let faultyItems = document.getElementById("faultyItems");
      let pilotStatus = document.getElementById("pilotStatus");
      let copilotStatus = document.getElementById("copilotStatus");
      let fuelStatus = document.getElementById("fuelStatus");
      let cargoStatus = document.getElementById("cargoStatus");
      let pilotNameInput = document.querySelector("input[name=pilotName]");
      let copilotNameInput = document.querySelector("input[name=copilotName]");
      let fuelLevelInput = document.querySelector("input[name=fuelLevel]");
      let cargoMassInput = document.querySelector("input[name=cargoMass]");
      let launchStatus = document.getElementById("launchStatus");
      let fuelReady = "yes"
      let cargoReady = "yes"

      


      form.addEventListener("submit", function(event) {
         event.preventDefault();

         let fuelLevelInputNumber = parseInt(fuelLevelInput.value);
         let cargoMassInputNumber = parseInt(cargoMassInput.value);


         if (typeof pilotNameInput.value !== "string" ||
            typeof copilotNameInput.value !== "string" || 
            typeof fuelLevelInputNumber !== "number" ||
            typeof cargoMassInputNumber !== "number") {
            alert("All fields are required!");
           
         } else {
            pilotStatus.innerHTML = `${pilotNameInput.value} Ready`;
            copilotStatus.innerHTML = `${copilotNameInput.value} Ready`;

            if (fuelLevelInputNumber < 10000) {
               faultyItems.style.visibility = "visible";
               fuelStatus.innerHTML = "Not enough fuel for the journey";
               launchStatus.innerHTML = "Shuttle not ready for launch";
               launchStatus.style.color = "red";
               fuelReady = "no"
            } 

            if (cargoMassInputNumber > 10000) {
               faultyItems.style.visibility = "visible";
               cargoStatus.innerHTML = "Too much mass for shuttle to take off";
               launchStatus.innerHTML = "Shuttle not ready for launch";
               launchStatus.style.color = "red";
               cargoReady = "no"
            }

            if (fuelReady === "yes" && cargoReady === "yes") {
               faultyItems.style.visibility = "visible";
               launchStatus.innerHTML = "Shuttle is ready for launch";
               launchStatus.style.color = "green";
            }

            }
            
         }

      );
      fetch("https://handlers.education.launchcode.org/static/planets.json").then(function(response) {
         response.json().then( function(json) {

            const missionTargetTemp = document.getElementById("missionTarget");
            
            missionTargetTemp.innerHTML = 
            `<h2>Mission Destination</h2>
            <ol>
               <li>Name: ${json[0].name}</li>
               <li>Diameter: ${json[0].diameter}</li>
               <li>Star: ${json[0].star}</li>
               <li>Distance from Earth: ${json[0].distance}</li>
               <li>Number of Moons: ${json[0].moons}</li>
            </ol>
            <img src="${json[0].image}"/>`
         });

         
      } );
   });