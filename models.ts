export class Response {
	public body: string;
	constructor(public statusCode: number, message: any) {
		this.body = JSON.stringify(message);
	}
}

export interface IVideo {
	ProductoId: number;
	VideoID: string;
	Title: string;
	Description: string;
	Thumbnail: string;
	PageName: string;
}

export interface IVideoParams {
	VideoID: string;
	ProductoId: number;
	PageName: string;
	SearchText: string;
}

export namespace ANS {
	export interface Email {}

	export interface SMS {}

	export interface Whatsapp {}
}
