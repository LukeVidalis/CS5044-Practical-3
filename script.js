var dataPath = "http://localhost:8888/Desktop/Uni/CS5044%20Information%20Visualization%20and%20Visual%20Analytics/Practical%203/Part%202/Data/Premier_League_2017-2018.csv"
var uniqueTeams=[];
var teamWins=[];
var teamDraws=[];
var teamLosses=[];
var homeGoals=[];
var awayGoals=[];
var concededGoals=[];
var yellowCards=[];
var redCards=[];
var corners=[];

var WLD=[];
var dataGlobal;
d3.csv(dataPath)
    .then(function (data) {
        dataGlobal=data;
        data.forEach(function(d) {
            if(uniqueTeams.indexOf(d["HomeTeam"])==-1){
                uniqueTeams.push(d["HomeTeam"]);
            }
        });
        //console.log(uniqueTeams);
        getTeamWins();
        getTeamDraws();
        getTeamLosses();
        getHomeGoals();
        getAwayGoals();
        getConcededGoals();
        getYellowCards();
        getRedCards();
        getCorners();
        sort();
    })

function getTeamWins(){
    for (var i = 0; i < uniqueTeams.length; i++) {
        var wins =0;

        dataGlobal.forEach(function(d) {
            if((uniqueTeams[i]==d["HomeTeam"])&&(d["FTR"]=="H")){
                wins++;
            }
            if((uniqueTeams[i]==d["AwayTeam"])&&(d["FTR"]=="A")){
                wins++;
            }
        });
        teamWins.push(wins)
    }
}
function getTeamDraws(){
    for (var i = 0; i < uniqueTeams.length; i++) {
        var draws =0;

        dataGlobal.forEach(function(d) {
            if((uniqueTeams[i]==d["HomeTeam"])&&(d["FTR"]=="D")){
                draws++;
            }
            if((uniqueTeams[i]==d["AwayTeam"])&&(d["FTR"]=="D")){
                draws++;
            }
        });
        teamDraws.push(draws)
    }
}
function getTeamLosses(){
    for (var i = 0; i < uniqueTeams.length; i++) {
        var losses =0;

        dataGlobal.forEach(function(d) {
            if((uniqueTeams[i]==d["HomeTeam"])&&(d["FTR"]=="A")){
                losses++;
            }
            if((uniqueTeams[i]==d["AwayTeam"])&&(d["FTR"]=="H")){
                losses++;
            }
        });
        teamLosses.push(losses)
    }
}
function getHomeGoals(){
    for (var i = 0; i < uniqueTeams.length; i++) {
        var hg =0;

        dataGlobal.forEach(function(d) {
            if(uniqueTeams[i]==d["HomeTeam"]){
                hg=hg+parseInt(d["FTHG"]);
            }
        });
        homeGoals.push(hg)
    }
}
function getAwayGoals(){
    for (var i = 0; i < uniqueTeams.length; i++) {
        var ag =0;

        dataGlobal.forEach(function(d) {
            if(uniqueTeams[i]==d["AwayTeam"]){
                ag=ag+parseInt(d["FTAG"]);
            }
        });
        awayGoals.push(ag)
    }
}
function getConcededGoals(){
    for (var i = 0; i < uniqueTeams.length; i++) {
        var cg =0;

        dataGlobal.forEach(function(d) {
            if(uniqueTeams[i]==d["AwayTeam"]){
                cg=cg+parseInt(d["FTHG"]);
            }
            if(uniqueTeams[i]==d["HomeTeam"]){
                cg=cg+parseInt(d["FTAG"]);
            }
        });
        concededGoals.push(cg)
    }
}
function getYellowCards(){
    for (var i = 0; i < uniqueTeams.length; i++) {
        var yc =0;

        dataGlobal.forEach(function(d) {
            if(uniqueTeams[i]==d["AwayTeam"]){
                yc=yc+parseInt(d["AY"]);
            }
            if(uniqueTeams[i]==d["HomeTeam"]){
                yc=yc+parseInt(d["HY"]);
            }
        });
        yellowCards.push(yc)
    }
}
function getRedCards(){
    for (var i = 0; i < uniqueTeams.length; i++) {
        var rc =0;

        dataGlobal.forEach(function(d) {
            if(uniqueTeams[i]==d["AwayTeam"]){
                rc=rc+parseInt(d["AR"]);
            }
            if(uniqueTeams[i]==d["HomeTeam"]){
                rc=rc+parseInt(d["HR"]);
            }
        });
        redCards.push(rc)
    }
}
function getCorners(){
    for (var i = 0; i < uniqueTeams.length; i++) {
        var crn =0;

        dataGlobal.forEach(function(d) {
            if(uniqueTeams[i]==d["AwayTeam"]){
                crn=crn+parseInt(d["AR"]);
            }
            if(uniqueTeams[i]==d["HomeTeam"]){
                crn=crn+parseInt(d["HR"]);
            }
        });
        corners.push(crn)
    }
}
function sort() {
    for (var j = 0; j < uniqueTeams.length; j++)
        WLD.push({'name': uniqueTeams[j], 'wins': teamWins[j], 'draws': teamDraws[j], 'losses': teamLosses[j],
            'total_goals':homeGoals[j]+awayGoals[j],'home_goals':homeGoals[j],'away_goals':awayGoals[j],
            'conceded_goals':concededGoals[j], 'goal_difference': homeGoals[j]+awayGoals[j]-concededGoals[j] ,
            'yellow_cards': yellowCards[j],'rec_cards':redCards[j], 'booking_pts':yellowCards[j]*10+redCards[j]*25,
            'corners':corners[j],'points' :teamWins[j]*3+teamDraws[j]});


    WLD.sort(function(a, b) {
        if(a.points!=b.points) {
            return ((a.points > b.points) ? -1 : ((a.points == b.points) ? 0 : 1));
        }
        else{
            return ((a.goal_difference > b.goal_difference) ? -1 : ((a.goal_difference == b.goal_difference) ? 0 : 1));
        }
    });
console.log(WLD);
}