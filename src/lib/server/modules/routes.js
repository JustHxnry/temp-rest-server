const express = require('express');

module.exports = (router, options) => {
    const defaults = require('./defaultConfig')(options);

    router.use(defaults.logger);
    router.use(defaults.bodyParser.json());
    router.use(defaults.cacheHeaders);
    router.use(express.json());
    router.use(defaults.bodyParser.urlencoded({ extended: true }));
    router.use(express.urlencoded({ extended: true }));

    router.disable('x-powered-by');

    let users = defaults.dbContent;

    router.get('/', (req, res) => res.status(200).json(users));

    router.get('/:id', (req, res) => {

        var user = users.find(user => user.id === Number(req.params.id));

        if (!user) return res.status(404).json([]);

        return res.status(200).json(user);

    });

    router.get('/:key/:value', (req, res) => {

        var { key, value } = req.params;

        var sortedUsers = users.filter(user => String(user[key]).toLowerCase() == value.toLowerCase());

        if (!sortedUsers) return res.status(404).json([]);

        if (sortedUsers.length == 0) return res.status(404).json([]);

        if (sortedUsers.length == 1) return res.status(200).json(sortedUsers[0]);

        return res.status(200).json(sortedUsers);

    });

    router.post('/', (req, res) => {
        if (Object.keys(req.body).length < 1) return res.status(400).send('Recieved an empty body, make sure you have "Content-Type" header specified. Recommended use: { "Content-Type": "application/json" }');

        users.push(req.body);

        return res.status(201).json(users);
    });

    router.put('/:id', (req, res) => {

        if (Object.keys(req.body).length < 1) return res.status(400).send('Recieved an empty body, make sure you have "Content-Type" header specified. Recommended use: { "Content-Type": "application/json" }');

        users = users.filter(user => user.id != req.params.id);

        users.push(req.body);

        return res.status(200).json(req.body);

    });

    router.patch('/:id', (req, res) => {

        if (Object.keys(req.body).length < 1) return res.status(400).send('Recieved an empty body, make sure you have "Content-Type" header specified. Recommended use: { "Content-Type": "application/json" }');

        let user = users.find(user => user.id == req.params.id);

        if (!user) return res.status(404).json([]);

        Object.keys(req.body).forEach(key => {

            user[key] = req.body[key];

        });

        return res.status(200).json(user);

    });

    router.delete('/:id', (req, res) => {

        users = users.filter(user => user.id != req.params.id);

        return res.status(200).json(users);

    });

};