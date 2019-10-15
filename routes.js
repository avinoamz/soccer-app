var express = require('express');
var createError = require('http-errors');
var db = require('./database');
var query = require('./queryType');

module.exports = function (app) {

    // localhost:3000/teams/Arsenal
    app.get('/teams/:team', function (req, res, next) {
        const myQuery = new query(req.params.team, 'all');
        console.log('fix query for all');
        res.send(db.getResultFromDatabase(myQuery));
    });

    // localhost:3000/teams/Arsenal/status/played
    app.get('/teams/:team/status/:status', function (req, res, next) {
        if (req.params.status === 'upcoming' || req.params.status === 'played') {
            const myQuery = new query(req.params.team, req.params.status);
            res.send(db.getResultFromDatabase(myQuery));
        }
        else {
            next(createError(400, 'invalid status'));
        }
    });

    // localhost:3000/tournaments/fa
    app.get('/tournaments/:tournament', function (req, res, next) {
        const myQuery = new query(req.params.tournament, 'all');
        res.send(db.getResultFromDatabase(myQuery));
    });

    // localhost:3000/tournaments/fa/status/played
    app.get('/tournaments/:tournament/status/:status', function (req, res, next) {
        if (req.params.status === 'upcoming' || req.params.status === 'played') {
            const myQuery = new query(req.params.tournament, req.params.status);
            res.send(db.getResultFromDatabase(myQuery));
        }
        else {
            next(createError(400, 'invalid status'));
        }
    });

}