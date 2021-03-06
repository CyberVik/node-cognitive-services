const cognitive = require('../../src/index.js');
const config = require('../config.js');
const should = require('should');

describe('Web language model', () => {

    const client = new cognitive.webLanguageModel({
        apiKey: config.webLanguageModel.apiKey,
        endpoint: config.webLanguageModel.endpoint
    });

    describe('Break into words (POST)', () => {
        it('should return response', (done) => {
            const parameters = {
                "model": "body",
                "text": "hello seattle"
            };

            const headers = {};

            client.breakIntoWords({
                parameters
            }).then((response) => {
                should(response).not.be.undefined();
                should(response).have.properties(['candidates'])
                done();
            }).catch((err) => {
                done(err);
            });
        })
    })

    describe('Calculate Conditional Probability (POST)', () => {
        it('should return response', (done) => {
            const parameters = {
                "model": "body"
            };

            const body = {
                "queries": [
                    {
                        "words": "hello world wide",
                        "word": "web"
                    },
                    {
                        "words": "hello world wide",
                        "word": "range"
                    },
                    {
                        "words": "hello world wide",
                        "word": "open"
                    }
                ]
            }

            client.calculateConditionalProbability({
                parameters,
                body
            }).then((response) => {
                should(response).not.be.undefined();
                should(response).have.properties(['results'])
                done();
            }).catch((err) => {
                done(err);
            });
        })
    })

    describe('Calculate Joint Probability (POST)', () => {
        it('should return response', (done) => {
            const parameters = {
                "model": "body",
            };

            const body = {
                "queries":
                [
                    "this",
                    "is",
                    "this is"
                ]
            };

            client.calculateJointProbability({
                parameters,
                body
            }).then((response) => {
                should(response).not.be.undefined();
                should(response).have.properties(['results'])
                done();
            }).catch((err) => {
                done(err);
            });
        })
    })

    describe('Generate Next Words (POST)', () => {
        it('should return response', (done) => {
            const parameters = {
                "model": "body",
                "words": "range open angle happy"
            };

            client.generateNextWords({
                parameters
            }).then((response) => {
                should(response).not.be.undefined();
                should(response).have.properties(['candidates'])
                done();
            }).catch((err) => {
                done(err);
            });
        })
    })

    describe('List Available Models (GET)', () => {
        it('should return response', (done) => {

            client.listAvailableModels()
            .then((response) => {
                should(response).not.be.undefined();
                should(response).have.properties(['models'])
                done();
            }).catch((err) => {
                done(err);
            });
        })
    })
})