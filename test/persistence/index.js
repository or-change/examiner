const mock = {
	account: require('./account.json'),
	project: require('./project.json'),
	source: require('./source.json'),
	execution: require('./execution.json')
};

const Data = {
	Account() {
		return mock.account.map(account => {
			return Object.assign({}, account);
		});
	},
	Project() {
		return mock.project.map(project => {
			project.createdAt = new Date(project.createdAt);

			return Object.assign({}, project);
		});
	},
	Source() {

	},
	Execution() {

	},
};

exports.DB = function DB() {
	const data = {
		account: Data.Account(),
		project: Data.Project(),
		source: Data.Source(),
		execution: Data.Execution()
	};

	const store = {
		getAccountById(id) {
			return data.account.find(account => account.id === id);
		},
		createAccount({ name, administrator, email, avatar }) {
			const id = Math.random().toFixed(20).substr(2, 8);
			const account = {
				id, name, administrator, email, avatar
			};

			data.account.push(account);

			return account;
		},
		destroyAccount(id) {
			const index = data.account.indexOf(id);

			if (index === -1) {
				throw new Error('No account.');
			}

			return data.account.splice(index, 1)[0];
		},
		updateAccount(id, items) {
			const account = data.account.find(account => account.id === id);

			if (!account) {
				throw new Error('No account.');
			}

			for (const key in account) {
				if (items[key] !== undefined) {
					account[key] = items[key];
				}
			}

			return account;
		},
		queryAccountByName({ name, exact = false }) {
			const pattern = exact ? new RegExp(`^${name}$`) : new RegExp(name, 'i');

			return data.account.filter(account => pattern.test(account.name));
		},
		queryAccountAll() {
			return data.account;
		},
		getProjectById(id) {
			return data.project.find(project => project.id === id) || null;
		},
		createProject({ name, ownerId }) {
			const newProject = {
				name,
				ownerId,
				id: Math.random().toFixed(20).substr(2, 8),
				createdAt: new Date()
			};

			data.project.push(newProject);

			return newProject;
		},
		updateProject(id, items) {
			const project = data.project.find(project => project.id === id);

			if (!project) {
				throw new Error('No project.');
			}

			for (const key in project) {
				if (items[key] !== undefined) {
					project[key] = items[key];
				}
			}

			return project;
		},
		destroyProject(id) {
			const index = data.project.findIndex(project => project.id === id);

			if (index === -1) {
				throw new Error('No project.');
			}

			return data.project.splice(index, 1)[0];
		},
		queryProjectByOwnerId({ ownerId }) {
			return data.project.filter(project => project.ownerId === ownerId);
		},
		queryProjectAll() {
			return data.project;
		},
		getSourceById() {

		},
		createSource() {

		},
		destroySource() {

		},
		querySourceByProjectId() {

		},
		createExecution() {

		},
		getExecutionById() {

		},
		updateExecution() {

		},
		destroyExecution() {

		},
		querExecutionBySourceId() {

		},
		createExecutionReport() {

		}
	};

	return {
		store,
		data
	};
};