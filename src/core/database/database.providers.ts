import { Sequelize } from 'sequelize-typescript';

import { SEQUELIZE, DEVELOPMENT, TEST, PRODUCTION } from '../constants';
import { databaseConfig } from './database.config';
import { User } from '../../modules/users/user.entity';
import { Post } from '../../modules/posts/post.entity';
import getLatestMigration from './utils/isCorrectMigration';
import isCorrectMigration from './utils/isCorrectMigration';

export const databaseProviders = [
    {
        provide: SEQUELIZE,
        useFactory: async () => {
            let config;
            switch (process.env.NODE_ENV) {
                
                case DEVELOPMENT:
                    config = databaseConfig.development;
                    break;
                case TEST:
                    config = databaseConfig.test;
                    break;
                case PRODUCTION:
                    config = databaseConfig.production;
                    break;
                default:
                    console.log(process.env.NODE_ENV)
                    config = databaseConfig.development;
            }
            const sequelize = new Sequelize(config);
            sequelize.addModels([User, Post]);
            // await isCorrectMigration(sequelize, "20240113161408-users2-add-column-job-title.js")
            await sequelize.sync();
            return sequelize; 
        },
    },
];

/* 
export const databaseProviders = [
    {
        provide: 'SEQUELIZE',
        useFactory: async () => {
            const sequelize = new Sequelize({
                dialect: 'postgres',
                host: 'localhost',
                port: 5445,
                username: 'postgres',
                password: 'password123',
                database: 'easypm_db',
            });
            sequelize.addModels([]);
            await sequelize.sync();
            return sequelize;
        },
    },
]; */