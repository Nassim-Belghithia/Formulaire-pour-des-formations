document.getElementById("validateButton").addEventListener("click", function () {
    var checkboxes = document.querySelectorAll('input[type="checkbox"]:checked');
     var startDate = new Date(document.getElementById("startDate").value);
     var recap = document.getElementById("recap");
    var recapDetails = document.getElementById("recapDetails");
     if (checkboxes.length < 2 || checkboxes.length > 3) {
         alert("Veuillez choisir entre 2 et 3 formations.");
         return;
     }
     const today = new Date();
     const oneWeekLater = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);
     if (startDate < oneWeekLater) {
         alert("La première formation doit commencer au moins une semaine après la date actuelle.");
         return;
     }
     var totalPrice = 0;
     var currentDate = startDate;
     const formationsDetails = [];
 
     checkboxes.forEach((checkbox) => {
         const duration = parseInt(checkbox.dataset.duration);
         const price = parseInt(checkbox.dataset.price);
         const formationName = checkbox.value;
 
         totalPrice += price;
 
         const start = new Date(currentDate);
         const end = new Date(start.getTime() + duration * 24 * 60 * 60 * 1000);
 
         formationsDetails.push(`${formationName} : ${start.toDateString()} - ${end.toDateString()}`);
 
         currentDate = new Date(end.getTime() + 2 * 24 * 60 * 60 * 1000); 
     });
     if (totalPrice > 1500) {
         totalPrice *= 0.9; 
     }
     recapDetails.innerHTML = `
         <strong>Nom :</strong> ${document.getElementById("nom").value}<br>
         <strong>Prénom :</strong> ${document.getElementById("prenom").value}<br>
          <strong>Adresse :</strong> ${document.getElementById("adresse").value}<br>
         <strong>Numéro de téléphone :</strong> ${document.getElementById("telephone").value}<br>
          <strong>Email :</strong> ${document.getElementById("email").value}<br>
           <strong>Niveau :</strong> ${document.getElementById("niveau").value}<br>
         <strong>Formations choisies :</strong><br>${formationsDetails.join("<br>")}<br>
         <strong>Prix total :</strong> ${totalPrice.toFixed(2)} DT
     `;
     recap.classList.remove("hidden");
 });
 