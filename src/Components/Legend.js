import React from 'react';
import '../App.css';


class Legend extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
        rankLevels: []
    }
  }

  componentDidMount() {
    this.setState({rankLevels: this.props.rankLevels})
  }

  render() {
    return <div>
      <div className="RankLegendDiv">
        <h4>Rank</h4>
        <ul>
          {this.state.rankLevels.map(rank => 
            <li key={rank.id}>
              <span style={{backgroundColor: rank.color}}>
              </span>
                <p>
              {rank.id}

                </p>
            </li>
          )}
        </ul>
      </div>
    </div>

  }


}

export default Legend
