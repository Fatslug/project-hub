import { Account } from './../account/account.model';
export class Project {
	$key?: string;
	title: string;
	description: string;
	tasks?: number[];
	updatedDate?: number;
	createdDate?: number;
	users?: Account[];
	deliveryDate: number;
}
