import React from 'react';
import Header from './Header';
import Order from './Order';
import Inventory from './Inventory';
import sampleVeggies from '../sample-veggies';
import Veggie from './Veggie'

class App extends React.Component {
  constructor() {
    super();

    this.addVeggie = this.addVeggie.bind(this);
    this.loadSamples = this.loadSamples.bind(this);
    this.addOrder = this.addOrder.bind(this);

    this.state = {
      veggies: {},
      order: {}
    };
  }

  addVeggie(veggie) {
    // mise à jour du state
    // on fait une copie de notre state
    const veggies = {...this.state.veggies};
    // ajout de notre nouveau veggie
    const timestamp = Date.now();
    veggies[`veggie-${timestamp}`] = veggie;
    // mise à jour du state
    this.setState({ veggies });
  }

  loadSamples() {
    this.setState({
      veggies: sampleVeggies
    });
  }



    addOrder(order) {
    const orders = {...this.state.orders}
    Object
    .keys(orders)
    .map(function (key){
      if (orders[key].name == order.name && orders[key].nombreProduits < orders[key].nombreProduitDispo){
        order.nombreProduits = orders[key].nombreProduits + 1
        order.prixFinal = (orders[key].price * (orders[key].nombreProduits + 1))
        }
        if (orders[key].name == order.name && orders[key].nombreProduits >= orders[key].nombreProduitDispo){
          order.nombreProduits = orders[key].nombreProduits
          order.prixFinal = (orders[key].price * (orders[key].nombreProduits))
        }
        

    })
    orders[order.name] = order
    this.setState({ orders })
    var veggie = {orders}
    localStorage.setItem('orders', JSON.stringify(veggie));
  }

    componentWillMount(){

    if ((typeof JSON.parse(localStorage.getItem('orders')) !== "undefined") 
      && (JSON.parse(localStorage.getItem('orders')) !== null)){
      this.setState({
        orders: JSON.parse(localStorage.getItem('orders')).orders
      })
    } 
    else {
      this.setState({
        orders: {}
      })
      
    }
}

  render() {
    return (
      <div className="amap">
        <div className="menu">
          <Header tagline="Des bons legumes" />
          <ul className = "list-of-veggies">
            {
              Object
              .keys(this.state.veggies)
              .map(key => <Veggie addOrder={this.addOrder} key = {key}   details = {this.state.veggies[key]} />  )
            }

          </ul>
        </div>
        <Order addOrder={this.addOrder} details={this.state.orders}/>

        <Inventory addVeggie={this.addVeggie} loadSamples={this.loadSamples} />
      </div>
    )
  }
}

export default App;