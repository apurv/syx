import React, {Component} from "react";

export default class Card extends Component {
	render() {
		return (
			<div className="col-xs-6 col-lg-4">
        <h2>Card</h2>
        <p>Donec id elit non mi porta gravida at eget metus. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Etiam porta sem malesuada magna mollis euismod. Donec sed odio dui. </p>
        <p><a className="btn btn-default" href="#" role="button">Read More »</a></p>
      </div>
		)
	}
}
