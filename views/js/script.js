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

  // Calcula Porcentagem
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

  $.each(attendance, function (name, days) {
      var studentRow = $('tbody .name-col:contains("' + name + '")').parent('tr');
      var dayChecks = $(studentRow).children('.attend-col').children('input');

      dayChecks.each(function (i) {
          $(this).prop('checked', days[i]);
      });
  });

  // Da update quando a checkbox Ã© clicada
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