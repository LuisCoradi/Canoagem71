function openNav(){
  document.getElementById("sidebarContainer").style.width = "250px"
}

function closeNav(){
  document.getElementById("sidebarContainer").style.width = "0px"
}

function openHeaderDrop() {
  let dropTrigger = document.getElementById("headerRight");
  let dropdownContainer = document.getElementById("dropdownMenuProfile");

  dropTrigger.addEventListener("click", function() {
    if (dropdownContainer.style.display === "" || dropdownContainer.style.display === "none") {
      dropdownContainer.style.display = "flex";
    } else {
      dropdownContainer.style.display = "none";
    }
  });

  window.addEventListener("click", function(event) {
    if (event.target !== dropTrigger && event.target !== dropdownContainer) {
      dropdownContainer.style.display = "none";
    }
  });
}