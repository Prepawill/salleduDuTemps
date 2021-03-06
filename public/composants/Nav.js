var React = require('react');
var Link = require('react-router-dom').Link


class Nav extends React.Component {
  constructor() {
    super();
    this.state= {rdvList : []};
  }

  componentDidMount(){
    var myComponent = this;
    fetch(serverPath+'/rdv?prenom='+this.props.prenom+"&nom="+this.props.nom, {
        method: 'get'
    }).then(function(response) {
    	//console.log("response :"+response);
        return response.json();
    }).then(function(obj) {
        //console.log(obj);
        myComponent.setState({
          rdvList: obj
         });
    });
  }

  render() {
  	var rdv = [];
	for(var i=0 ; i<this.state.rdvList.length ; i++){
    var date = new Date(this.state.rdvList[i].date);
    console.log(this.state.rdvList[i].date);
    console.log(date);
    var options={weekday: "long", year: "numeric", month: "long", day: "numeric"};
    var dateStr = date.toLocaleDateString('fr-FR', options);
    rdv.unshift(<li className="table-view-cell">{dateStr} - {this.state.rdvList[i].heure} : {this.state.rdvList[i].activite} </li>);
	}

    return (
    	<div>
			<nav className="nav">
				<div className="content-padded">
				  <ul className="ul">
				    <div>
				    	<Link id="li1" className="item-active" to="/profile">
				    		<span className="icon icon-list"></span>
				    	</Link>
				    	<Link id="li2" className="item" to="#about">
				    		<span className="icon icon-star"></span>
				    	</Link>
				    </div>
				  </ul>
				</div>
			</nav>
    			<div className="rdvList">
    	        	<ul className="table-view">
    	            {rdv}
    	          </ul>
    	    </div>
      </div>
    );
  }
}

module.exports = Nav;
