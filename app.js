const BASE_URL =
  "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";

  const dropdowns = document.querySelectorAll(".dropdown select");
  const btn = document.querySelector("form button");
  const currto = document.querySelector(".to select");
  const currfrom = document.querySelector(".from select");
  const msg = document.querySelector(".msg");


 
for (select of dropdowns){
    for(code in countryList){
       let countryoption = document.createElement("option");
       
       countryoption.innerText = code;
       countryoption.value = code;

       if(select.name === "from" && code === "USD"){
        countryoption.selected = true;
       } else if(select.name === "to" && code === "INR"){
        countryoption.selected = true;
       }

       
       select.append(countryoption);

    }
select.addEventListener("change", (evt)=>{
changeflag(evt.target);
}
)

}
  
const changeflag = (element)=>{

let elementval = element.value;

let countryname = countryList[elementval];

let newflag = `https://flagsapi.com/${countryname}/flat/64.png`
let img = element.parentElement.querySelector("img");
img.src = newflag;
}

btn.addEventListener("click", async (evt)=>{
evt.preventDefault();
let amount = document.querySelector(".amount input");
let amtval = amount.value;
console.log(amtval);
if (amtval < 1 || amtval === ""){
  amtval = 1;
  amount.value = "1"
}
const url = `${BASE_URL}/${currfrom.value.toLowerCase()}.json`;
let response = await fetch(url);
console.log(response);
let data = await response.json();
console.log(data);
let rate = data[currfrom.value.toLowerCase()][currto.value.toLowerCase()];
console.log(rate);
let finalval = amtval * rate;
console.log(finalval);
 msg.innerText = `${amtval} ${currfrom.value} = ${finalval} ${currto.value}`;

})