import React from 'react';
import { formatPrice } from '../helpers.js';

class Order extends React.Component {

  deleteProduit(order, veggie){
  		const orders = veggie
  		var that = this
  		Object
	    .keys(orders)
	    .map(function (key){
	      if (orders[key].name == order.name && orders[key].nombreProduits > 0){
	        order.nombreProduits = orders[key].nombreProduits - 1
	        order.prixFinal = (orders[key].price * (orders[key].nombreProduits))
	        
	      }
	    })
	    orders[order.name] = order
        this.setState({ orders })
        var veggie = {orders}
        localStorage.setItem('orders', JSON.stringify(veggie));
  	}

  	render() {
  		if (typeof this.props.details != "undefined" && this.props.details != 0 ){
  			var This = this;
  			var nbProduits = 0
  			var nbProduitTot = 0
  			var prix = 0
	    	return (
		    	<div className="order-wrap">
			        <h2>Votre panier</h2>
			        	{
				            Object
			              	.keys(this.props.details)
			              	.map(function (key){
			              		prix = prix + This.props.details[key].prixFinal
			              		
				              	return(
				              		
					              		<div>
					              		    <p>{This.props.details[key].nombreProduits}Kg {This.props.details[key].name} {formatPrice(This.props.details[key].prixFinal)+"€"}</p>
					              		    <button onClick={() => This.deleteProduit(This.props.details[key], This.props.details)}>Supprimer</button>
					              		</div>
					              		
				              	)
				            })
				        }
		          		
				          		{
						            Object
					              	.keys(this.props.details)
					              	.map(function (key){
					              		nbProduitTot = nbProduitTot + This.props.details[key].nbProduits
					              	})
					            }
			            		<strong>Total : {formatPrice(prix) +"€"}</strong>
	      		</div>
	    	)
	    } 
	    else 
	    {
	    	return (
		    	<div className="order-wrap">
			        <h2>Votre panier</h2>
	      		</div>
	    	)
	    }
  	}
}

export default Order;