/*
  Author: [Neha Gaddala]
    Contact: [Neha_Gaddala@student.uml.edu]
  Description: JavaScript for COMP 4610 HW4 Part 1.
  Implements form validation using jQuery Validation Plugin, generates a multiplication table,
  and includes a working reset button to return to the starting state.
  Sources:
  - jQuery Validation: https://jqueryvalidation.org/
  - Original logic from previous assignment
*/

$(document).ready(function () {
 
  console.log("jQuery version:", $.fn.jquery);
  console.log("jQuery Validation Plugin loaded:", !!$.validator);


  const validator = $("#tableForm").validate({
    rules: {
      startCol: {
        required: true,
        number: true,
        range: [-50, 50]
      },
      endCol: {
        required: true,
        number: true,
        range: [-50, 50],
        greaterThanEqual: "#startCol"
      },
      startRow: {
        required: true,
        number: true,
        range: [-50, 50]
      },
      endRow: {
        required: true,
        number: true,
        range: [-50, 50],
        greaterThanEqual: "#startRow"
      }
    },
    messages: {
      startCol: {
        required: "Please enter a start column value.",
        number: "Start column must be a number.",
        range: "Start column must be between -50 and 50."
      },
      endCol: {
        required: "Please enter an end column value.",
        number: "End column must be a number.",
        range: "End column must be between -50 and 50.",
        greaterThanEqual: "End column must be greater than or equal to start column."
      },
      startRow: {
        required: "Please enter a start row value.",
        number: "Start row must be a number.",
        range: "Start row must be between -50 and 50."
      },
      endRow: {
        required: "Please enter an end row value.",
        number: "End row must be a number.",
        range: "End row must be between -50 and 50.",
        greaterThanEqual: "End row must be greater than or equal to start row."
      }
    },
    errorPlacement: function (error, element) {
      error.insertAfter(element); 
    },
    submitHandler: function (form, event) {
      event.preventDefault(); 
      console.log("Form is valid, generating table...");
      generateTable();
    }
  });

  
  $.validator.addMethod("greaterThanEqual", function (value, element, param) {
    var target = $(param).val();
    if (value && target) {
      return parseInt(value) >= parseInt(target);
    }
    return true;
  }, "This value must be greater than or equal to the start value.");

  
  function generateTable() {
    const startCol = parseInt($("#startCol").val());
    const endCol = parseInt($("#endCol").val());
    const startRow = parseInt($("#startRow").val());
    const endRow = parseInt($("#endRow").val());
    const errorMsg = $("#errorMsg");
    const table = $("#multTable");

    console.log("Generating table with:", { startCol, endCol, startRow, endRow });

    errorMsg.text("");
    table.empty();

   
    const headerRow = $("<tr>").append($("<th>"));
    for (let col = startCol; col <= endCol; col++) {
      headerRow.append($("<th>").text(col));
    }
    table.append(headerRow);

  
    for (let row = startRow; row <= endRow; row++) {
      const tr = $("<tr>");
      tr.append($("<th>").text(row));
      for (let col = startCol; col <= endCol; col++) {
        tr.append($("<td>").text(row * col));
      }
      table.append(tr);
    }
  }

  
  function resetFormAndTable() {
    console.log("Resetting form and table...");
    $("#tableForm")[0].reset(); 
    $("#multTable").empty(); 
    $("#errorMsg").text(""); 
    validator.resetForm(); 
  }


  $("#resetButton").on("click", function () {
    resetFormAndTable();
  });

  /
  $("#tableForm").on("submit", function (event) {
    event.preventDefault(); 
    console.log("Form submit intercepted, relying on validation plugin.");
  });
});