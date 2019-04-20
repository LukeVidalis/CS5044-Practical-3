var dataPath = "http://localhost:8888/Desktop/Uni/CS5044%20Information%20Visualization%20and%20Visual%20Analytics/Practical%203/Part%202/Data/Premier_League_2017-2018.csv"
var uniqueTeams=[];
var teamWins=[];
var teamDraws=[];
var teamLosses=[];
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
    for (var i = 0; i < uniqueTeams.length; i++) {
        //console.log(uniqueTeams[i]+" won "+ teamWins[i]+" games.");
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
    for (var i = 0; i < uniqueTeams.length; i++) {
        //console.log(uniqueTeams[i]+" won "+ teamWins[i]+" games.");
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
    for (var i = 0; i < uniqueTeams.length; i++) {
        //console.log(uniqueTeams[i]+" won "+ teamWins[i]+" games.");
    }

}
function sort() {
    for (var j = 0; j < uniqueTeams.length; j++)
        WLD.push({'name': uniqueTeams[j], 'wins': teamWins[j], 'draws': teamDraws[j], 'losses': teamLosses[j], 'points' :teamWins[j]*3+teamDraws[j]});

//2) sort:
    WLD.sort(function(a, b) {
        return ((a.points > b.points) ? -1 : ((a.points == b.points) ? 0 : 1));

    });
console.log(WLD);
}