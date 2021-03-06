import React, { Component } from 'react'
import { render } from 'react-dom'

function Overall(props) {
  const priceList = props.props.priceList;
  console.log(props.props.priceList)

//find best average price
let averages = {}
for(let key in priceList){
  averages[key] = priceList[key].reduce((a,b)=> a+b, 0)
}
let bestAveragePrice = Math.min(...Object.values(averages))
const bestStore = Object.keys(averages).find(key => averages[key] === bestAveragePrice);

//show best average price

function showMeTheMoney() {
  let x = document.getElementById("showMeTheMoney");
  if(x.style.display==="none"){
    x.style.display = ""
  }
  else{
    x.style.display = "none"
  }
}

  console.log(priceList)
    return (
      <div className="foot">
        <div className="inline">
        <h3 className="oneShop">Only Have Time For One Trip? See Which Store is Cheapest</h3>
        </div>
        <button onClick={showMeTheMoney} className="lets" type="submit">Let me see!</button>
        <div style={{display: "none"}} id="showMeTheMoney">
          <h1>{bestStore} has the best average price of ${bestAveragePrice}</h1>
        </div>
      </div>
    )
  
}
export default Overall