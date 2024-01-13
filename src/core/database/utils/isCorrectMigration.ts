import { Sequelize, QueryTypes } from 'sequelize';


export default async function isCorrectMigration(sequelize: Sequelize, reqMigration: String, migrationStorageTableName= "SequelizeMeta") {

    // Find the running migration

    const migrations = await sequelize.query<{name : String}>(
        `SELECT name FROM "${migrationStorageTableName}" ORDER BY name DESC LIMIT 1`,
        {
            type: QueryTypes.SELECT,
        }
    );

    if (!migrations) {
        throw new Error('No migrations found.')
    }

    const runningMigration = migrations[0]

    if (runningMigration.name === reqMigration) {
        console.log('Running migration:', runningMigration.name);
    } else {
        throw new Error(`migration does not match. Running migration is ${runningMigration.name}`)
    }
}
