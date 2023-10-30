function operateNav(){
    let navbar = document.getElementById("mySidebar");

    if (navbar.style.width == "0px" || navbar.style.width == "") {
        navbar.style.visibility = "visible";
        navbar.style.width = "30vh";
    } else {
        navbar.style.visibility = "hidden";
        navbar.style.width = "0px";
    }
}

function operateDrop(){
    let dropdown = document.getElementById("dropdownMenuProfile");
    let dropdownElement = document.getElementById("dropdownElement");
    let dropArrow = document.getElementById("dropdownArrow");

    if (dropArrow.style.transform === 'rotate(-180deg)') {
        dropArrow.style.transform = 'none';
    } else {
        dropArrow.style.transform = 'rotate(-180deg)';
    }
    

    if (dropdown.style.height == "0px" || dropdown.style.height == "") {
        dropdownElement.style.visibility = "visible";
        dropdown.style.visibility = "visible";
        dropdown.style.height = "20vh";
    } else {
        dropdownElement.style.visibility = "hidden"
        dropdown.style.visibility = "hidden"
        dropdown.style.height = "0px";
    }
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