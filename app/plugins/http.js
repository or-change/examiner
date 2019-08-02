import axios from 'axios';

export default function install(Vue) {
	const agent = axios.create({
		baseURL: '/api'
	});

	Vue.$http = Vue.prototype.$http = {
		product: {
			async get() {
				const { data: product } = await agent.get('/product');

				return product;
			}
		},
		principal: {
			async signin(credential) {
				const { type, body } = credential;

				const { data: principal } = await agent.post('/session/principal', body, {
					params: { type }
				});

				return principal;
			},
			async signout() {
				await agent.delete('/session/principal');
			},
			async get() {
				const { data: principal } = await agent.get('/session/principal');

				return principal;
			},
			update(account) {
				return agent.put('/session/principal', account);
			}
		},
		admin: {
			overview: {
				get() {
					return agent.get('/admin/overview');
				}
			},
			project: {
				query(filter) {
					return agent.get('/admin/project', { params: filter });

				},
				assign(projectId, accountId) {
					return agent.put('/admin/project/owner', {
						projectId, accountId
					});
				}
			},
			version: {

			},
			account: {
				create(payload) {
					return agent.post('/admin/account', payload);
				},
				update(payload) {
					return agent.put('/admin/account', payload);
				},
				delete(accountId) {
					return agent.delete(`/admin/account/${accountId}`);
				}
			}
		},
		account: {
			query() {
				return agent.get('/account');
			},
			update(payload) {
				return agent.put('/account', payload);
			},
			get(accountId) {
				return agent.get(`/account/${accountId}`);
			}
		},
		project: {
			create(project) {
				return agent.post('/project', project);
			},
			update(projectId, payload) {
				return agent.put(`/project/${projectId}`, payload);
			},
			delete(projectId) {
				return agent.delete(`/project/${projectId}`);
			},
			query(filter) {
				return agent.get('/project', { params: filter });
			},
			get(projectId) {
				return agent.get(`/project/${projectId}`);
			},
			source(projectId) {
				return {
					create(payload) {
						return agent.put(`/project/${projectId}/source`, payload);
					},
					query(filter) {
						return agent.get(`/project/${projectId}/source`, {
							params: filter
						});
					},
					get(sourceId) {
						return agent.get(`/project/${projectId}/source/${sourceId}`);
					},
					delete(sourceId) {
						return agent.delete(`/project/${projectId}/source/${sourceId}`);
					},
					execution(sourceId) {
						return {
							start(payload) {
								return agent.post(`/project/${projectId}/source/${sourceId}/execution`, payload);
							},
							delete(executionId) {
								return agent.delete(`/project/${projectId}/source/${sourceId}/execution/${executionId}`);
							},
							query(filter) {
								return agent.get(`/project/${projectId}/source/${sourceId}/execution`, {
									params: filter
								});
							},
							get(executionId) {
								return agent.get(`/project/${projectId}/source/${sourceId}/execution/${executionId}`);
							},
							report(executionId) {
								return {
									get(type) {
										return agent.get(`/project/${projectId}/source/${sourceId}/execution/${executionId}/report/${type}`);
									}
								};
							}
						};
					}
				};
			}
		},
	};
}