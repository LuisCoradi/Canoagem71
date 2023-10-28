function openNav(){
  document.getElementById("sidebarContainer").style.width = "250px"
}

function closeNav(){
  document.getElementById("sidebarContainer").style.width = "0px"
}

function openHeaderDrop() {
  let dropTrigger = document.getElementById("headerRight");
  let dropdownContainer = document.getElementById("dropdownMenuProfile");
  let arrowDrop = document.getElementById("dropdownArrow");


  dropTrigger.addEventListener("click", function() {
    // Toggle the "hidden" class to show/hide the dropdown
    dropdownContainer.classList.toggle("hidden");
  });

}
