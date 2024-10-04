const btn = document.getElementsByClassName("btn");


const btn_equals = btn[14];

const btn_plus_minus = btn[16];
const btn_percentage = btn[17];
const btn_remove_One = btn[18];
const btn_remove = btn[19];

const obj = {
    operator: ""
}

////////////////////////////////////////////////////// function for [0-9 . ( ) = ] buttons //////////////////////////////////////////////////

for (let i = 0; i < btn.length; i++) {

    btn[i].addEventListener("click", function () {
        click_btn(i);
    });
}

function click_btn(i) {
    let value_of_button = btn[i].value;                                     // this is used to fetch the value of the buttons
    document.getElementById("display").value += value_of_button;            // this is used to display the value of pressed button


    // this is for change the value of obj.operator like [ + - * / ]
    let last_value = value_of_button.slice(-1);
    if (last_value == "+") {
        obj.operator = "+";
    } else if (last_value == "-") {
        obj.operator = "-";
    } else if (last_value == "*") {
        obj.operator = "*";
    } else if (last_value == "/") {
        obj.operator = "/";
    } else if (obj.operator == "=") {
        document.getElementById("display").value = "";
        document.getElementById("display").value = value_of_button;
        obj.operator = ""
    }


    // To insert only one operator at a time
    // condition to not repeat the operator + - * / again during press multiple operator at a time

    let input_field_data = document.getElementById("display").value

    let last_digit = input_field_data.slice(-1);                            // This line will find the last digit of the display data
    let second_last_digit = input_field_data.slice(-2, -1);                 // This line will find the second last digit of the display data
    let data = input_field_data.slice(0, -2);                               // To find numbers inserted before the operators

    if ((second_last_digit == "+" || second_last_digit == "-" || second_last_digit == "*" || second_last_digit == "/") && (last_digit == "+" || last_digit == "-" || last_digit == "*" || last_digit == "/")) {
        document.getElementById("display").value = data + last_digit;

    } else if ((second_last_digit == "+" || second_last_digit == "-" || second_last_digit == "*" || second_last_digit == "/") && last_digit == "=") {
        document.getElementById("display").value = data + second_last_digit

    } else if (second_last_digit == "" && (last_digit == "+" || last_digit == "-" || last_digit == "*" || last_digit == "/")) {
        document.getElementById("display").value = "0" + last_digit

    } else if (second_last_digit == "." && last_digit == ".") {
        document.getElementById("display").value = data + last_digit
        
    } else if (second_last_digit == "." && last_digit == "=") {
        document.getElementById("display").value = input_field_data.slice(0, -3) + last_digit
    
    } else if (second_last_digit == "." && (last_digit == "+" || last_digit == "-" || last_digit == "*" || last_digit == "/")) {
        document.getElementById("display").value = input_field_data.slice(0, -3) + last_digit

    }
}





////////////////////////////////////////////////////// function for [ + - x / = ] buttons //////////////////////////////////////////////////

// code to equals
btn_equals.onclick = function solve() {
    let x = document.getElementById("display").value.slice(0, -1);
    let y = eval(x);                                                // eval is used for calculate the data of display

    if (y !== undefined) {
        document.getElementById("display").value = y;
        document.getElementById("total").innerHTML = x + "=" + y;
    } else {
        document.getElementById("display").value = "0";              // To make display empty when we click = more then two times
    }
    obj.operator = "=";

}

////////////////////////////////////////////////////// function for [ AC & << ] buttons //////////////////////////////////////////////////

// code to remove all data
btn_remove.onclick = function remove() {
    document.getElementById("display").value = "";
    document.getElementById("total").innerHTML = "Result";
    obj.operator = "";

}

// code to remove one data
btn_remove_One.onclick = function remove_One() {
    let display_value = document.getElementById("display").value;   // To fetch data from the display

    display_value = display_value.slice(0, -2);                     // To remove the << from the display
    display_value = display_value.slice(0, -1);                     // To remove only one number from the display
    document.getElementById("display").value = display_value;       // To show the data on display

}

////////////////////////////////////////////////////// function for [ +/- & % ] buttons //////////////////////////////////////////////////

// code to make number negative and positive (+/-)
btn_plus_minus.onclick = function positive_negative() {
    let display_value = document.getElementById('display').value;
    display_value = display_value.slice(0, -1);

    if (display_value !== 0 || display_value !== "") {

        display_value = -display_value;
        document.getElementById("display").value = display_value;
    }

}

// code to percentage (%)
btn_percentage.onclick = function percentage() {
    let display_value = document.getElementById("display").value;
    display_value = display_value.slice(0, -1);                     // To remove the % from the display data to perform calculation

    if (obj.operator == "+") {
        let splited_value = display_value.split("+");
        let a = Number(splited_value[0]);
        let b = Number(splited_value[1]);
        let x = (b * a) / 100;
        document.getElementById("display").value = a + "+" + x;

    } else if (obj.operator == "-") {
        let splited_value = display_value.split("-");
        let a = Number(splited_value[0]);
        let b = Number(splited_value[1]);
        let x = (b * a) / 100;
        document.getElementById("display").value = a + "-" + x;

    } else if (obj.operator == "*") {
        let splited_value = display_value.split("*");
        let a = Number(splited_value[0]);
        let b = Number(splited_value[1]);
        let x = (b * a) / 100;
        document.getElementById("display").value = a + "*" + x;

    } else if (obj.operator == "/") {
        let splited_value = display_value.split("/");
        let a = Number(splited_value[0]);
        let b = Number(splited_value[1]);
        let x = (b * a) / 100;
        document.getElementById("display").value = a + "/" + x;
    } else if (display_value == "0") {
        document.getElementById("display").value = "";

    } else {
        display_value = document.getElementById("display").value;       // To find % of single value
        display_value = display_value.slice(0, -1);
        let x = display_value / 100;

        document.getElementById("display").value = x;
        document.getElementById("total").innerHTML = x;
    }
}