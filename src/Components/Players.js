import React from 'react';
import '../App.css';

// With a working back-end, the image would be pulled from file storage, rather than imported here
import Player from '../playerPics/chess1.png'

// Components
import PlayerDisplay from './PlayerDisplay';
import Legend from './Legend';


class Players extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
        rankLevels: [
          { id: 1, color: "gray" },
          { id: 2, color: "red" },
          { id: 3, color: "lightgreen" },
          { id: 4, color: "orange" },
          { id: 5, color: "green" },
          { id: 6, color: "gold" },
          { id: 7, color: "navy" },
          { id: 8, color: "forestgreen" },
          { id: 9, color: "peachpuff" },
          { id: 10, color: "purple" },
        ],
        playerData: [
        {
          id: 1,
          title: 'Player1',
          image: Player,
          playerRankHistory: [
            {
              level: 3, 
              startYear: 2016,
              startMonth: 1,
              endYear: 2017,
              endMonth: 6
            },
            {
              level: 4, 
              startYear: 2017,
              startMonth: 6,
              endYear: 2018,
              endMonth: 9
            },
            {
              level: 5, 
              startYear: 2018,
              startMonth: 9,
              endYear: 2019,
              endMonth: 2
            },
            {
              level: 6, 
              startYear: 2019,
              startMonth: 2,
              endYear: 2020,
              endMonth: 4
            },
          ]
        }
      ]
    }
  }

  componentDidMount() {
    /*
      With a working back-end, the API GET request for data on two or more Players would take place here, 
      set this.state with the appropriate values, and then based on the length of that array, 
      would map to separate <playerDisplay /> components.
    */
  }

  render() {
    return <div id="PlayersDisplay">
            <Legend rankLevels={this.state.rankLevels}/>
            <PlayerDisplay id={this.state.playerData.id} 
                            title={this.state.playerData.title} 
                            image={Player} 
                            playerRankHistory={this.state.playerData.playerRankHistory} 
                            rankLevels={this.state.rankLevels}
            />
          </div>
  }
}

export default Players
