
import path from 'path';

export default {
	development: {
		username: 'root',
		password: '12345678',
		database: 'shopify',
		host: 'localhost',
		dialect: 'mysql',
		migrationStorageTableName: 'sequelize_meta',
		seederStorage: 'sequelize',
		seederStorageTableName: 'sequelize_data',
		modelsDir: path.resolve('models'),
		migrationsDir: path.resolve('migrations'),
		seedersDir: path.resolve('seeders'),
	},
};

