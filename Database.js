var queryT = require('./queryType');

class Database {

    constructor() {
        this.data = {};
    }

    addGameInfo(gameInfo, status) {
        const homeTeamQuery = new queryT(gameInfo.home_team, status);
        const awayTeamQuery = new queryT(gameInfo.away_team, status);
        const tournamentQuery = new queryT(gameInfo.tournament, status);

        this.addGameInfoToDB(JSON.stringify(homeTeamQuery), gameInfo);
        this.addGameInfoToDB(JSON.stringify(awayTeamQuery), gameInfo);
        this.addGameInfoToDB(JSON.stringify(tournamentQuery), gameInfo);
    };

    addGameInfoToDB(key, value) {
        if (key in this.data) {
            this.data[key].push(value);
        } else {
            this.data[key] = [value];
        }
    };

    getResultFromDatabase(query) {
        if (query.status === 'all') {
            const playedQuery = new queryT(query.name, 'played');
            const upcomingQuery = new queryT(query.name, 'upcoming');
            const played = this.data[JSON.stringify(playedQuery)];
            const upcoming = this.data[JSON.stringify(upcomingQuery)];
            return played.concat(upcoming);
        }
        return this.data[JSON.stringify(query)];
    }

}

var db = new Database();
module.exports = db;