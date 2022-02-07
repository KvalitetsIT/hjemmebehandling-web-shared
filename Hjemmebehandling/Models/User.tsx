export class User {

	userId!: string;
	firstName?: string;
	lastName?: string;
	fullName?: string;
	orgId?: string;
	email?: string;
	entitlements?: string[];
	autorisationsids?: string[];
	orgName?: string;

	isAdmin() : boolean {
		const adminEntitlement = "DIAS_KoMo_Administrator";
		if (!this.entitlements)
			return false;

		return this.entitlements.some(e => e == adminEntitlement);
	}
}