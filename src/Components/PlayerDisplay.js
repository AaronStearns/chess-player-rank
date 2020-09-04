import React from 'react';
import '../App.css';


class PlayerDisplay extends React.Component {
  constructor(props) {
    super(props)

    // Binding all methods here in the constructor
    this.createPlayerRankPathArcs = this.createPlayerRankPathArcs.bind(this);
    this.mapDateToArcValue = this.mapDateToArcValue.bind(this);
    this.polarToCartesian = this.polarToCartesian.bind(this);
    this.describeArc = this.describeArc.bind(this);
    this.promotePlayer = this.promotePlayer.bind(this);
    this.selectPromotion = this.selectPromotion.bind(this);
    this.mapYearsToSVG = this.mapYearsToSVG.bind(this);
    this.getData = this.getData.bind(this);


    this.state = {

        // Array of 6 year values that dynamically displays to the page
        years: ['2016', '2017', '2018', '2019', '2020', '2021'],
        rankLevels: [],

        svgXCoordinate: 270, 
        svgYCoordinate: 270,

        PlayerId: '',
        PlayerTitle: '',
        PlayerRankHistory: [
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
}


// This method calculates the SVG paths for the beginning and end dates 
// of a player's tenure in a given rank
describeArc(x, y, radius, startAngle, endAngle) {
  var start = this.polarToCartesian(x, y, radius, endAngle);
  var end = this.polarToCartesian(x, y, radius, startAngle);
  
  var largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";
  
  var d = [
    "M", start.x, start.y, 
    "A", radius, radius, 0, largeArcFlag, 0, end.x, end.y
  ].join(" ");
  
  return d;       
}


polarToCartesian(centerX, centerY, radius, angleInDegrees) {
  var angleInRadians = (angleInDegrees-90) * Math.PI / 180.0;

  return {
    x: centerX + (radius * Math.cos(angleInRadians)),
    y: centerY + (radius * Math.sin(angleInRadians))
  };
}


// This method gets the min year value from 'years' in this.state, then calculates
// degrees of arc length based on the 360 degrees of the SVG circle
mapDateToArcValue(year, month) {
  const minYearValue = this.state.years[0];
  const mappedArcValue = (parseInt(year - minYearValue) * 72 + (parseInt(month - 1) * 5));

  return mappedArcValue;
}


// This method creates a separate path arc for each rank in a player's rank history
createPlayerRankPathArcs() {
  this.state.PlayerRankHistory.forEach(rank => {
    var arcPath = document.createElementNS("http://www.w3.org/2000/svg", "path");
    arcPath.setAttribute("id", rank.level);
    arcPath.setAttribute("fill", "none");

    // Setting rank colors passed in through props from <Players />
    arcPath.setAttribute("stroke", this.props.rankLevels[parseInt(rank.level) - 1].color); 
    arcPath.setAttribute("stroke-width", "23");

    // Beginning arc angle. Adding 1 to value to create small gap between arcs
    const minArcValue = this.mapDateToArcValue(rank.startYear, rank.startMonth) + 1; 
    // Ending arc angle. Subtracting 1 from value to create small gap between arcs
    const maxArcValue = this.mapDateToArcValue(rank.endYear, rank.endMonth) - 1; 

    arcPath.setAttribute("d", this.describeArc(
      this.state.svgXCoordinate, 
      this.state.svgYCoordinate, 
      240, // Radius of path
      minArcValue,
      maxArcValue
    ))
    
    document.getElementById('MainSVG').appendChild(arcPath)
    }
  )
}


mapYearsToSVG() {
  let years = this.state.years;

  // Pre-determined coordinates for a 6-year layout
  // This could be converted to a function to dynamically accept n number of years
  const yearCoordinates = [
    {id: "year1", x:"277", y:"13"},
    {id: "year2", x:"298", y:"-428"},
    {id: "year3", x:"-20", y:"650"},
    {id: "year4", x:"360", y:"302"},
    {id: "year5", x:"-157", y:"93"},
    {id: "year6", x:"233", y:"13"}
  ]

  if(years.length === 6) {
    for(let i = 0; i < years.length; i++) {
      var year = document.createElementNS("http://www.w3.org/2000/svg", "text");
      year.setAttribute("id", yearCoordinates[i].id);
      year.setAttribute("fill", "gray");
      year.setAttribute("x", yearCoordinates[i].x);
      year.setAttribute("y", yearCoordinates[i].y);

      year.innerHTML = years[i]

      document.getElementById('MainSVG').appendChild(year)
    }
  }
}


selectPromotion(e) {
    var promotionLevel = e.target.value;

    // Hard-coding a "promoted on" date value here.
    // Could be converted to current datetime with Date.getUTCMonth() and getUTCFullYear()
    var promotion = {
      level: parseInt(promotionLevel), 
      startYear: 2020,
      startMonth: 4,
      endYear: 2020,
      endMonth: 5
    }

    var promotedRank = this.state.PlayerRankHistory.concat(promotion)
 
    this.setState({PlayerRankHistory: promotedRank})   
  }
  

// On hitting the "Promote" button for a player, the createPlayerRankPathArcs
// method is called again and the new path arc is generated with the appropriate color fill
promotePlayer(e) {
  this.createPlayerRankPathArcs()
}


getData() {
  this.setState({PlayerId: this.props.id,
    PlayerTitle: this.props.title,
    rankLevels: this.props.rankLevels,

    /* Manually setting PlayerRankHistory in state here, 
    but should be pulled from props as shown below */
    // PlayerRankHistory: this.props.rankHistory
  })
}


componentDidMount() {
  this.getData()
  this.createPlayerRankPathArcs()
  this.mapYearsToSVG()
}


  render() {
    return <div className="PlayerDiv">
      <div>
      <h1>Player Rank History</h1>

      <h2>{this.state.PlayerTitle}</h2>
      <svg id="MainSVG" >
        <defs>
            <clipPath id="circleView">
                <circle cx={this.state.svgXCoordinate} cy={this.state.svgYCoordinate} r="215" fill="#FFFFFF" />            
            </clipPath>
        </defs>

        {/* Hard-coding these, but this could be converted to a function 
        to dynamically create n line elements for n number of years */}
        <line x1={this.state.svgXCoordinate} y1={this.state.svgYCoordinate} x2={this.state.svgXCoordinate} y2="0" stroke="gray" stroke-width="1" />
        <line x1={this.state.svgXCoordinate} y1={this.state.svgYCoordinate} x2="530" y2="185" stroke="gray" stroke-width="1" />
        <line x1={this.state.svgXCoordinate} y1={this.state.svgYCoordinate} x2="435" y2="497" stroke="gray" stroke-width="1" />
        <line x1={this.state.svgXCoordinate} y1={this.state.svgYCoordinate} x2="105" y2="497" stroke="gray" stroke-width="1" />
        <line x1={this.state.svgXCoordinate} y1={this.state.svgYCoordinate} x2="10" y2="186" stroke="gray" stroke-width="1" />

        <circle cx={this.state.svgXCoordinate} cy={this.state.svgYCoordinate} r="220" stroke="gray" strokeWidth="1" fill="none"/>  

        <image href={this.props.image} clipPath="url(#circleView)" />
      </svg>  
      
      <div className="PromotePlayerDiv">
        <label>Promote to:</label>
        <select onChange={this.selectPromotion}>
          {/* Generates list of numbers from 1-10 for <options> elements */}
          {this.state.rankLevels.map(rank => 
            <option value={rank.id}>level {rank.id}</option>
          )}
        </select>

        <button onClick={(e) => {this.promotePlayer(e)}}>
          PROMOTE
        </button>
        </div>
      </div>
    </div>;
  }
}

export default PlayerDisplay;





