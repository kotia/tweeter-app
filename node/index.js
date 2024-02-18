'use strict';

import { server as hapiServer } from '@hapi/hapi';
import {createClient} from 'redis';

const db = await createClient({ url: process.env.REDIS_URL })
    .on('error', err => console.log('Redis Client Error', err))
    .connect();

const getTweetChildrenDeep = (tweets, id, list) => {
    if (!list) list = [];

    const childrenIds = tweets.filter((tweet) => tweet[1] && tweet[1] === id).map((tweet) => tweet[0]);

    list = [...list, ...childrenIds];

    childrenIds.forEach((childId) => {
        list = [...list, ...getTweetChildrenDeep(tweets, childId, [])];
    })

    return list;
};

const init = async () => {

    const server = hapiServer({
        port: process.env.NODEJS_PORT,
        host: '0.0.0.0'
    });

    server.route({
        method: 'GET',
        path: '/api/getUsers',
        handler: async (request, h) => {
            const users = await db.SMEMBERS('users');

            if (!users || !users.length) {
                return JSON.stringify([]);
            } else {
                let usersResp = [];

                for (let i = 0; i < users.length; i++) {
                    const userObj = await db.HGETALL('user_' + users[i]);

                    if (userObj) {
                        delete userObj.password;
                        usersResp.push(userObj);
                    }
                }

                return JSON.stringify(usersResp);
            }
            //return h.response(JSON.stringify(request.payload)).code(400);
        }
    });

    server.route({
        method: 'GET',
        path: '/api/getTweets',
        handler: async (request, h) => {
            const tweets = await db.SMEMBERS('tweets');

            if (!tweets || !tweets.length) {
                return JSON.stringify([]);
            } else {
                let tweetsResp = [];

                for (let i = 0; i < tweets.length; i++) {
                    const tweetsObj = await db.HGETALL('tweet_' + tweets[i]);
                    tweetsResp.push(tweetsObj);
                }

                return JSON.stringify(tweetsResp);
            }
            //return h.response(JSON.stringify(request.payload)).code(400);
        }
    });

    server.route({
        method: 'POST',
        path: '/api/login',
        handler: async (request, h) => {
            let params = request.payload;
            const users = await db.SMEMBERS('users');

            for (let i = 0; i < users?.length || 0; i++) {
                const user = await db.HGETALL('user_' + users[i]);

                if (params.username === user.username && params.password === user.password) {
                    return JSON.stringify({id: user.id});
                }
            }

            return h.response('No such user').code(400);
        }
    });

    server.route({
        method: 'POST',
        path: '/api/register',
        handler: async (request, h) => {
            const params = request.payload;
            const users = await db.SMEMBERS('users');
            const hasUsers = users && users.length;

            if (hasUsers) {
                for (let i = 0; i < users?.length || 0; i++) {
                    const user = await db.HGETALL('user_' + users[i]);

                    if (params.username === user.username) {
                        return h.response('this username already exists!').code(400);
                    }
                }
            }


            const newId = hasUsers ? String(Math.max.apply(null, users.map((id) => parseFloat(id) || 0)) + 1) : '0';

            await db.HSET('user_' + newId, {...params, id: newId});
            await db.SADD('users', newId);

            return JSON.stringify({id: newId});
        }
    });

    server.route({
        method: 'POST',
        path: '/api/addTweet',
        handler: async (request, h) => {
            const params = request.payload;
            const tweets = await db.SMEMBERS('tweets');
            const hasTweets = tweets && tweets.length;

            const newId = hasTweets ? String(Math.max.apply(null, tweets.map((id) => parseFloat(id) || 0)) + 1) : '0';

            const newTweet = {
                timestamp: Date.now(),
                text: params.text,
                userId: params.userId,
                id: newId,
                tweetId: params?.tweetId || ''
            };

            await db.HSET('tweet_' + newId, newTweet);
            await db.SADD('tweets', newId);

            return JSON.stringify({id: newId});

        }
    });

    server.route({
        method: 'POST',
        path: '/api/editTweet',
        handler: async (request, h) => {
            const params = request.payload;

            const current = await db.HGETALL('tweet_' + params.id);
            await db.HSET('tweet_' + params.id, {...current, text: params.text});

            return JSON.stringify({id: params.id});
        }
    });

    server.route({
        method: 'POST',
        path: '/api/removeTweet',
        handler: async (request, h) => {
            const id = request.payload.id;
            const tweetIds = await db.SMEMBERS('tweets');
            const tweets = [];

            for (let i = 0; i < tweetIds.length; i++) {
                const tweet = await db.HMGET('tweet_' + tweetIds[i], ['id', 'tweetId']);
                tweet && tweets.push(tweet);
            }

            const children = getTweetChildrenDeep(tweets, id, []);

            for (let i = 0; i < children.length; i++) {
                await db.del('tweet_' + children[i]);
                await db.SREM('tweets', children[i]);
            }

            await db.del('tweet_' + id);
            await db.SREM('tweets', id);

            return JSON.stringify([id, ...children]);
        }
    });

    await server.start();
    console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {

    console.log(err);
    process.exit(1);
});

init();