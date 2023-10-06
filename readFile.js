// Fetching data from files:
document.getElementById('inputfile')
    .addEventListener('change', function () {

        var fr = new FileReader();
        fr.onload = function () {
            document.getElementById('source').textContent = fr.result;
        }

        fr.readAsText(this.files[0]);
    });

// function upload() {

//     const fileSelector = document.getElementById('myFile');
//     fileSelector.addEventListener('change', (event) => {
//         // const fileList = event.target.files;
//         // console.log(fileList);
//         // -new update
//         function getData() {
//             console.log("Started getData function...");
//             let url = event.target.textContent;
//             // fetch api returns a promise
//             fetch(url).then((response) => { //method : async
//                 console.log("Inside first then of function");
//                 return response.text(); //this one is a promise
//             }).then((data) => {
//                 console.log("Inside second then of function");
//                 console.log(data);
//             })
//         };
//         getData();
//     });
// }