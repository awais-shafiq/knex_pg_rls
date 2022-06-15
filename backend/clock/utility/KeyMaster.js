exports.KafkaKeys = Object.freeze({

	TENANT_CREATED: 'tenant_created',
	TENANT_UPDATED: 'tenant_updated',
	TENANT_DELETED: 'tenant_deleted',
	TENANT_PROFILE_CREATED: 'tenant_profile_created',
	TENANT_PROFILE_UPDATED: 'tenant_profile_updated',

	USER_CREATED: 'user_created',
	USER_ADDED: 'user_added',
	USER_UPDATED: 'user_updated',
	USER_DELETED: 'user_deleted',
	USER_PROFILE_CREATED: 'user_profile_created',
	USER_PROFILE_UPDATED: 'user_profile_updated',
	CHARITY_USER_CREATED: 'charity_user_created',

	SUBSCRIPTION_CREATED: 'subscription_created',
	SUBSCRIPTION_UPDATED: 'subscription_updated',
	SUBSCRIPTION_PACKAGE_CHANGED: 'subscription_package_changed',
	SUBSCRIPTION_DELETED: 'subscription_deleted',

	/*NEED TO BE CHANGED*/
	CREATE_CHARITY_SITE: 'create_charity_site',
	CHARITY_SITE_CREATED: 'charity_site_created',

	UPDATE_CHARITY_SITE: 'update_charity_site',
	CHARITY_SITE_UPDATED: 'charity_site_updated',

	IMPACT_SITE_REMOVED: 'impact_site_removed',
	CHARITY_SITE_REMOVED: 'charity_site_removed',
	/****************** */

	GOAL_CREATED: 'goal_created',
	GOAL_UPDATED: 'goal_updated',
	GOAL_DELETED: 'goal_deleted',

	CAMPAIGN_CREADTED: 'campaign_created',
	CAMPAIGN_UPDATED: 'campaign_updated',
	CAMPAIGN_DELETED: 'campaign_deleted',

	DONATION_MADE: 'donation_made',

	ROLE_ASSIGNED: 'role_assigned',
	ROLE_UPDATED: 'role_updated',

	/*NEED TO BE CHANGED*/
	RESET_PASSWORD: 'reset_password',
	RESET_PASSWORD_REQUESTED: 'reset_password_requested',
	/****************** */

	/*NEED TO BE CHANGED*/
	ACTIVATION_TOKEN_GENERATED: 'activation_token_generated',
	ACTIVATION_TOKEN_REQUESTED: 'activation_token_requested',
	/****************** */

});

exports.StatusCode = Object.freeze({

	/**
	 * 200 | The request was successfully completed.
	 */
	SUCCESS: 200,

	/**
	 * 201 | A new resource was successfully created.
	 */
	CREATED: 201,

	/**
	 * 204 | The server successfully processed the request, but is not returning any content.
	 */
	NO_CONTENT: 204,

	/**
	 * 304 | Used for conditional GET calls to reduce band-width usage. 
	 * If used, must set the Date, Content-Location, ETag headers to what they would have been on a regular GET call.
	 */
	NOT_MODIFIED: 304,

	/**
	 * 400 | The request was invalid.
	 */
	BAD_REQUEST: 400,

	/**
	 * 401 | The request did not include an authentication token or the authentication token was expired.
	 */
	UNAUTHORIZED: 401,

	/**
	 * 403 | The client did not have permission to access the requested resource.
	 */
	FORBIDDEN: 403,

	/**
	 * 404 | The requested resource was not found.
	 */
	NOT_FOUND: 404,

	/**
	 * The HTTP method in the request was not supported by the resource. For example, the DELETE method cannot be used with the Agent API.
	 */
	METHOD_NOT_ALLOWED: 405,

	/**
	 * 409 | The request could not be completed due to a conflict. For example,
	 * POST ContentStore Folder API cannot complete if the given file or folder name already exists in the parent location.
	 */
	CONFLICT: 409,

	/**
	* 500 | The request was not completed due to an internal error on the server side. 
	*/
	INTERNAL_SERVER_ERROR: 500,

	/**
	 * 503 | The server was unavailable.
	 */
	SERVICE_UNAVAILABLE: 503,
});