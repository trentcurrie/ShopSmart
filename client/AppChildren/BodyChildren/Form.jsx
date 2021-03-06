import React, { Component } from 'react';
import { render } from 'react-dom';
import axios from 'axios';
import logo from './wholeFoods.png';
import logos from './traders.png';
import logoss from './ralphs.png';
import Footer from './Footer.jsx';
import Container from './Container.jsx';

const query = (foodName, storeName) => {
  return axios.get('/api/', {
    params: {
      store: storeName,
      food: foodName,
    },
  });
};

class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      wholeFoodsSelected: false,
      traderJoesSelected: false,
      ralphsSelected: false,
      foodsList: ['apple', 'orange', 'pear'],
      priceList: {
        wholeFoods: [1,1,1],
        traderJoes: [2,2,2],
        ralphs: [3,3,3],
      },
      wholeFoodsSubtotal: 0,
      traderJoesSubtotal: 0,
      ralphsSubtotal: 0,
      food: '',
      maxBudget: 0,
    };
    this.storeClick = this.storeClick.bind(this);
    this.onFoodInput = this.onFoodInput.bind(this);
    this.onBudgetInput = this.onBudgetInput.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.getPrices = this.getPrices.bind(this);
  }

  getPrices(foodName) {
    const promiseArray = [];
    if (this.state.traderJoesSelected) promiseArray.push(query(foodName, 'tj'));
    if (this.state.ralphsSelected) promiseArray.push(query(foodName, 'ralphs'));
    if (this.state.wholeFoodsSelected) promiseArray.push(query(foodName, 'wf'));
    Promise.all(promiseArray)
      .then((results) => {
        console.log('Results', results);
      })
      .catch((error) => {
        console.log('Error', error);
      });
  }

  //tracks user click of store to display store "card"
  storeClick(store) {
    if (!this.state[store]) {
      this.setState((prevState) => {
        return {
          ...prevState,
          [store]: true,
        };
      });
    } else {
      this.setState((prevState) => {
        return {
          ...prevState,
          [store]: false,
        };
      });
    }
  }

  // captures food input in food key
  onFoodInput(e) {
    this.setState((prevState) => {
      return {
        ...prevState,
        food: e.target.value,
      };
    })
  }

    // captures food input in food key
    onBudgetInput(e) {
      this.setState((prevState) => {
        return {
          ...prevState,
          maxBudget: e.target.value,
        };
      })
    }

  // pushes captured food key into array of foodsList
  onSubmit(e) {
    e.preventDefault();
    this.getPrices(this.state.food);
    this.setState((prevState) => {
      return {
        ...prevState,
        foodsList: this.state.foodsList.concat(this.state.food),
      };
    });
  }

  render() {
    // console.log(this.state.foodsList);
    return (
      <div>
        <div id="middle" className="TopInput">
          {/* store selection inputs */}
          <input
            onClick={() => this.storeClick('wholeFoodsSelected')}
            type="image"
            className="logos"
            src={logo}
            alt="WholeFoods"
          />
          <input
            onClick={() => this.storeClick('traderJoesSelected')}
            type="image"
            className="logos"
            src={logos}
            alt="Traders"
          />
          <input
            onClick={() => this.storeClick('ralphsSelected')}
            type="image"
            className="logos"
            src={logoss}
            alt="Ralphs"
          />
        </div>
        <div className="BottomInputs">
          <form onSubmit={this.onSubmit} id="inputs">
            {/* food search */}
            <input
              onChange={this.onFoodInput}
              className="field"
              type="text"
              placeholder="Food Item"
            />
            {/* click submit button for food */}
            <input className="btn" type="submit" value="+" />
            {/* <button onClick={this.onFoodInput} className="btn" type="submit">+</button> */}
          </form>
          <div className="budget">
            {/* budget input */}
            <input 
            onChange={this.onBudgetInput}
            className="field" 
            type="text" 
            placeholder="Max Budget" 
            />
          </div>
        </div>
        <Container props={this.state} />
        <Footer props={this.state} />
      </div>
    );
  }
}

export default Form;
