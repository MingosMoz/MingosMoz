// Global Variables
const countriesList = document.getElementById("countries");
let countries; // will contain "fetched" data

// Event Listeners
// countriesList.addEventListener("change", event => displayCountryInfo(event.target.value));

countriesList.addEventListener("change", newCountrySelection);

function newCountrySelection(event) {
  displayCountryInfo(event.target.value);
}

// fetch("https://restcountries.eu/rest/v2/all")
// .then(function(res){
//   // console.log(res);
//   return res.json();
// })
// .then(function(data){
//   // console.log(data);
//   initialize(data);
// })
// .catch(function(err){
//   console.log("Error:", err);
// });

fetch("https://restcountries.eu/rest/v2/all")
.then(res => res.json())
.then(data => initialize(data))
.catch(err => console.log("Error:", err));


function initialize(countriesData) {
  countries = countriesData;
  let options = "";
  var j=0;
   for(let i=0; i<countries.length; i++) {
  //   options += `<option value="${countries[i].alpha3Code}">${countries[i].name}</option>`;
  //   // options += `<option value="${countries[i].alpha3Code}">${countries[i].name} (+${countries[i].callingCodes[0]})</option>`;
 //j=i;
 }
//console.log("Tolat: "+j);

  countries.forEach(country => options+=`<option value="${country.alpha3Code}">${country.name}</option>`);
  // document.getElementById("countries").innerHTML = options;
  // document.querySelector("#countries").innerHTML = options;
  countriesList.innerHTML = options;
  // console.log(countriesList);
  // console.log(countriesList.value);
  // console.log(countriesList.length);
  // console.log(countriesList.selectedIndex);
  // console.log(countriesList[10]);
  // console.log(countriesList[10].value);
  // console.log(countriesList[10].text);
  countriesList.selectedIndex = Math.floor(Math.random()*countriesList.length);
  displayCountryInfo(countriesList[countriesList.selectedIndex].value);


}

function displayCountryInfo(countryByAlpha3Code) {
  const countryData = countries.find(country => country.alpha3Code === countryByAlpha3Code);
  document.querySelector("#flag-container img").src = countryData.flag;
  document.querySelector("#flag-container img").alt = `Flag of ${countryData.name}`; 
  document.getElementById("cname").innerHTML = countryData.name;
  document.getElementById("nativeName").innerHTML = countryData.nativeName;
  document.getElementById("region").innerHTML = countryData.region;
  document.getElementById("capital").innerHTML = countryData.capital;
  document.getElementById("dialing-code").innerHTML = `+${countryData.callingCodes[0]}`;
  document.getElementById("population").innerHTML = countryData.population.toLocaleString("en-US");
  document.getElementById("currencies").innerHTML = countryData.currencies.filter(c => c.name).map(c => `${c.name} (${c.code})`).join(", ");
  document.getElementById("subregion").innerHTML = countryData.subregion;
  document.getElementById("area").innerHTML = countryData.area;
  document.getElementById("Timezone").innerHTML = countryData.timezones;

  //document.getElementById("pnome").innerHTML = countryData.name;
  //document.getElementById("pcapital").innerHTML = countryData.capital;

  document.getElementById("tabledata").innerHTML="<tr>"+
  " <td>"+countryData.name+"</td> "+
  "<td>"+countryData.capital+"</td>"+
  "<td>"+countryData.region+"</td>"+
  "<td>"+countryData.subregion+"</td>"+
  " <td>"+countryData.population+"</td> "+
  "<td>"+countryData.callingCodes[0]+"</td>"+
  "<td>"+countryData.currencies.filter(c => c.name).map(c => `${c.name} (${c.code})`).join(", ")+"</td>"+
  "<td>"+countryData.area+"</td>"+
  "<td>"+countryData.timezones+"</td>"+
  "<td>"+countryData.nativeName+"</td>"+
  "</tr>";


  
  //console.log(countryData.capital + " - Timezone: "+countryData.timezones);
  //console.log("Name: "+countryData.name);
  
}
//function display_c(){
 //var refresh=1000; // Refresh rate in milli seconds
  //mytime=setTimeout('display_ct()',refresh)
 // }
  
  //function display_ct() {
  //var x = new Date()
 // document.getElementById('ct').innerHTML = x;
  //display_c();
  // }
  function download_csv(csv, filename) {
    var csvFile;
    var downloadLink;

    // CSV FILE
    csvFile = new Blob([csv], {type: "text/csv"});

    // Download link
    downloadLink = document.createElement("a");

    // File name
    downloadLink.download = filename;

    // We have to create a link to the file
    downloadLink.href = window.URL.createObjectURL(csvFile);

    // Make sure that the link is not displayed
    downloadLink.style.display = "none";

    // Add the link to your DOM
    document.body.appendChild(downloadLink);

    // Lanzamos
    downloadLink.click();
}

function export_table_to_csv(html, filename) {
	var csv = [];
	var rows = document.querySelectorAll("table tr");
	
    for (var i = 0; i < rows.length; i++) {
		var row = [], cols = rows[i].querySelectorAll("td, th");
		
        for (var j = 0; j < cols.length; j++) 
            row.push(cols[j].innerText);
        
		csv.push(row.join(","));		
	}

    // Download CSV
    download_csv(csv.join("\n"), filename);
}

document.querySelector("#csv").addEventListener("click", function () {
    var html = document.querySelector("table").outerHTML;
	export_table_to_csv(html, "table.csv");
});
