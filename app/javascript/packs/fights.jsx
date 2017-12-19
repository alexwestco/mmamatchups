import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import ShowFight from './ShowFight';
import NavigationBar from './NavigationBar';

class Fights extends React.Component {
  constructor(props) {
    super(props);
    this.state = {division: 'Popular'};
    this.render = this.render.bind(this);
  }



  render() {

    console.log("State is: "+this.state.division)
    var division = this.state.division
    var fights = this.props.fights
    if (division != 'Popular'){
      fights = fights.filter(function(e){
        return e.division == division;
      })
    }

    var fighters = this.props.fighters
    var state = this.state

    //console.log(this.props.fights.length);
    return(
      <div>
        <NavigationBar fighters = { fighters } context = { this } />
        <div style={{marginTop: '100px'}}>
          <div class="container">
            <div class="row">
              <div>
                <div>
                  {fights.map(function(fight){
                    return(
                      <ShowFight
                        fighter_one = { fighters.find(function(e){ return e.id == fight.fighter_one_id; })}
                        fighter_two = { fighters.find(function(e){ return e.id == fight.fighter_two_id; })}
                        upvotes = {fight.upvotes}>
                      </ShowFight>
                    );
                  })}
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    );

  }
}


// This is to the data passed from the index.html.erb file to React. The data passed is all the fights and all the fighters.
document.addEventListener('DOMContentLoaded', () => {
  const node = document.getElementById('fights_data')
  const data = JSON.parse(node.getAttribute('data'))

  const node_two = document.getElementById('fighters_data')
  const data_two = JSON.parse(node_two.getAttribute('data'))

  ReactDOM.render(
   <Fights fights={data} fighters={data_two}/>,
   document.body.appendChild(document.createElement('div')),
  )
})
