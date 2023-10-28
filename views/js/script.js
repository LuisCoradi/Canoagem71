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
///////////////////////////////////////////////////////////////////////////////////////


////////////////////////////////////////chamada////////////////////////////////////////
(function () {
  if (!localStorage.attendance) {
      console.log('Creating attendance records...');
      function getRandom() {
          return (Math.random() >= 0.5);
      }

      var nameColumns = $('tbody .name-col'),
          attendance = {};

      nameColumns.each(function () {
          var name = this.innerText;
          attendance[name] = [];

          for (var i = 0; i <= 11; i++) {
              attendance[name].push(getRandom());
          }
      });

      localStorage.attendance = JSON.stringify(attendance);
  }
}());

/* STUDENT APPLICATION */
$(function () {
  var attendance = JSON.parse(localStorage.attendance),
      $allMissed = $('tbody .missed-col'),
      $allCheckboxes = $('tbody input');

  // Count a student's missed days
  function countMissing() {
      $allMissed.each(function () {
          var studentRow = $(this).parent('tr'),
              dayChecks = $(studentRow).children('td').children('input'),
              numMissed = 0;

          dayChecks.each(function () {
              if (!$(this).prop('checked')) {
                  numMissed++;
              }
          });

          $(this).text(numMissed);
      });
  }

  // Calculate and display percentage of presence
  function calculatePercentage() {
      $allMissed.each(function () {
          var studentRow = $(this).parent('tr');
          var dayChecks = studentRow.children('td').children('input');
          var totalDays = dayChecks.length;
          var numMissed = 0;

          dayChecks.each(function () {
              if (!$(this).prop('checked')) {
                  numMissed++;
              }
          });

          var percentage = ((totalDays - numMissed) / totalDays) * 100;
          $(this).next('.percentage-col').text(percentage.toFixed(2) + "%");
      });
  }

  // Check boxes, based on attendace records
  $.each(attendance, function (name, days) {
      var studentRow = $('tbody .name-col:contains("' + name + '")').parent('tr');
      var dayChecks = $(studentRow).children('.attend-col').children('input');

      dayChecks.each(function (i) {
          $(this).prop('checked', days[i]);
      });
  });

  // When a checkbox is clicked, update localStorage
  $allCheckboxes.on('click', function () {
      var studentRows = $('tbody .student');
      var newAttendance = {};

      studentRows.each(function () {
          var name = $(this).children('.name-col').text();
          var $allCheckboxes = $(this).children('td').children('input');

          newAttendance[name] = [];

          $allCheckboxes.each(function () {
              newAttendance[name].push($(this).prop('checked'));
          });
      });

      countMissing();
      calculatePercentage();
      localStorage.attendance = JSON.stringify(newAttendance);
  });

  countMissing();
  calculatePercentage();
}());
///////////////////////////////////////////////////////////////////////////////////////