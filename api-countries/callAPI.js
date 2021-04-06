var request = require("request");

request.get(

    "http://localhost:8000/countries",

    function (err, res, body) {
        if (err) {
            console.error(err);
            return;
        }

        var result = JSON.parse(body);

        // Methode 1
        var newResult = result.reverse();
        console.log("newResult :", newResult);
        // return newResult;

        // Methode 2 Fonctionne

        // var newResult = [];
        // for (var i = result.length - 1; i >= 0; i--) {
        //     newResult.push(result[i]);
        // }
        // console.log("newResult :", newResult);

        // Methode 3 ne Fonctionne pas

        // var newResult = result.map((elem) => {
        //     console.log(newResult[elem].push());
        //     // console.log(newResult.push(result[elem]));

        // });
        // doc internet 
        // let newArray = array.map((currentValue, index, array) => {
        //     // return element to new Array
        // });
    }
)