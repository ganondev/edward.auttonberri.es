import { API_URL } from './request';
import axios from "axios";

const shitlistUrl: string = `${API_URL}/links`;

export function getShit(callback: (result: ScheissDaten[]) => void): void {

	// get<DynamoShit[]>(shitlistUrl,
	// 	result => {
	// 		callback(result.map(
	// 			scheiss => new ScheissDaten(scheiss.description.S,
	// 										scheiss.link.S,
	// 										scheiss.name && scheiss.name.S,
	// 										scheiss.tags && scheiss.tags.SS))
	// 		);
	// 	}
	// );

	axios.get(shitlistUrl)
		.catch(e => e)
		.then(result => {
			callback(result.map(
				(scheiss: DynamoShit) => new ScheissDaten(scheiss.description.S,
					scheiss.link.S,
					scheiss.name && scheiss.name.S,
					scheiss.tags && scheiss.tags.SS))
			);
		})
	
}

interface DynamoShit {

	description: { S: string };
	link: { S: string };
	name?: { S: string };
	tags?: { SS: string[] };

}

export class ScheissDaten {

	public get name(): string {
		return this.echtName || this.link;
	}

	constructor(public readonly description: string,
				public readonly link: string,
				public readonly echtName?: string,
				public readonly tags?: string[] ) {}

}