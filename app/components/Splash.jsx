import React, {Component} from "react";
import CardsDisplay from './CardsDisplay';

export default class Splash extends Component {

  componentDidMount() {
    // require("../public/js/viewpanel-scroll")(window);
  }

    render() {
        return (
            <div>
                <div className="jumbotron">
                    <div className="container">
                        <h1>Syx</h1>

                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut
                            labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
                            laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
                            voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                            cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>

                        <p><a className="btn btn-default btn-lg" href="#" role="button">featured »</a></p>
                    </div>
                </div>

                <div className="row">
                    <CardsDisplay />
                </div>
            </div>
        )
    }
}
