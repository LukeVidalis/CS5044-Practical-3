var dataPath = "http://localhost:8888/Desktop/Uni/CS5044%20Information%20Visualization%20and%20Visual%20Analytics/Practical%203/Part%202/Data/Premier_League_2017-2018.csv"
var uniqueTeams=[];
var SeasonInfo=[];
var dataGlobal;

d3.csv(dataPath)
    .then(function (data) {
        dataGlobal=data;
        data.forEach(function(d) {
            if(uniqueTeams.indexOf(d["HomeTeam"])===-1){
                uniqueTeams.push(d["HomeTeam"]);
            }
        });
        //console.log(uniqueTeams);
        getLeagueInfo();
    });

//Gets data about each team's performance for the whole season
function getLeagueInfo(){
    var teamWins=[];
    var teamDraws=[];
    var teamLosses=[];
    var homeGoals=[];
    var awayGoals=[];
    var concededGoals=[];
    var yellowCards=[];
    var redCards=[];
    var corners=[];
    for (var i = 0; i < uniqueTeams.length; i++) {
        var wins =0;
        var draws =0;
        var losses =0;
        var hg =0;
        var ag =0;
        var cg =0;
        var yc =0;
        var rc =0;
        var crn =0;

        dataGlobal.forEach(function(d) {
            if((uniqueTeams[i]===d["HomeTeam"])&&(d["FTR"]==="H")){
                wins++;
            }
            if((uniqueTeams[i]===d["AwayTeam"])&&(d["FTR"]==="A")){
                wins++;
            }
            if((uniqueTeams[i]===d["HomeTeam"])&&(d["FTR"]==="D")){
                draws++;
            }
            if((uniqueTeams[i]===d["AwayTeam"])&&(d["FTR"]==="D")){
                draws++;
            }
            if((uniqueTeams[i]===d["HomeTeam"])&&(d["FTR"]==="A")){
                losses++;
            }
            if((uniqueTeams[i]===d["AwayTeam"])&&(d["FTR"]==="H")){
                losses++;
            }
            if(uniqueTeams[i]===d["HomeTeam"]){
                hg=hg+parseInt(d["FTHG"]);
            }
            if(uniqueTeams[i]===d["AwayTeam"]){
                ag=ag+parseInt(d["FTAG"]);
            }
            if(uniqueTeams[i]===d["AwayTeam"]){
                cg=cg+parseInt(d["FTHG"]);
            }
            if(uniqueTeams[i]===d["HomeTeam"]){
                cg=cg+parseInt(d["FTAG"]);
            }
            if(uniqueTeams[i]===d["AwayTeam"]){
                yc=yc+parseInt(d["AY"]);
            }
            if(uniqueTeams[i]===d["HomeTeam"]){
                yc=yc+parseInt(d["HY"]);
            }
            if(uniqueTeams[i]===d["AwayTeam"]){
                rc=rc+parseInt(d["AR"]);
            }
            if(uniqueTeams[i]===d["HomeTeam"]){
                rc=rc+parseInt(d["HR"]);
            }
            if(uniqueTeams[i]===d["AwayTeam"]){
                crn=crn+parseInt(d["AR"]);
            }
            if(uniqueTeams[i]===d["HomeTeam"]){
                crn=crn+parseInt(d["HR"]);
            }
        });
        teamWins.push(wins);
        teamDraws.push(draws);
        teamLosses.push(losses);
        homeGoals.push(hg);
        awayGoals.push(ag);
        concededGoals.push(cg);
        yellowCards.push(yc);
        redCards.push(rc);
        corners.push(crn);
    }


    //Sort Data to match Premier League Rankings and merge them into one array
    for (var j = 0; j < uniqueTeams.length; j++)
        SeasonInfo.push({'name': uniqueTeams[j], 'wins': teamWins[j], 'draws': teamDraws[j], 'losses': teamLosses[j],
            'total_goals':homeGoals[j]+awayGoals[j],'home_goals':homeGoals[j],'away_goals':awayGoals[j],
            'conceded_goals':concededGoals[j], 'goal_difference': homeGoals[j]+awayGoals[j]-concededGoals[j] ,
            'yellow_cards': yellowCards[j],'rec_cards':redCards[j], 'booking_pts':yellowCards[j]*10+redCards[j]*25,
            'corners':corners[j],'points' :teamWins[j]*3+teamDraws[j]});

    SeasonInfo.sort(function(a, b) {
        if(a.points!==b.points) {
            return ((a.points > b.points) ? -1 : ((a.points === b.points) ? 0 : 1));
        }
        else{
            return ((a.goal_difference > b.goal_difference) ? -1 : ((a.goal_difference === b.goal_difference) ? 0 : 1));
        }
    });
    console.log(SeasonInfo);
}
