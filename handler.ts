import { APIGatewayProxyHandler } from 'aws-lambda';
import { DynamoDB } from 'aws-sdk';
// import { v4 as uuidv4 } from 'uuid';
import 'source-map-support/register';
import { IVideo, Response } from './models'; //IVideoParams

const db = new DynamoDB.DocumentClient({ apiVersion: '2012-08-10' });
// const sesServer = new SES({ region: 'us-west-2' });
const testTable = process.env.TEST_TABLE;

export const getbycustom: APIGatewayProxyHandler = async (_, _context) => {
	// if (event.queryStringParameters == null || event.queryStringParameters.ProductoID == null) {
	// 	return new Response(400, { error: 'Debe indicar el producto' });
	// }

	try {
		const res = await db.scan({ TableName: testTable }).promise();
		return new Response(201, res.Items);
	} catch (error) {
		return new Response(error.statusCode, error);
	}
};

export const addVideo: APIGatewayProxyHandler = async (event, _context) => {
	const data: IVideo = JSON.parse(event.body);

	try {
		await db
			.put({
				TableName: testTable,
				Item: { PageName_VideoID: data.PageName + '_' + data.VideoID, ...data }
			})
			.promise();
		return new Response(201, { PageName_VideoID: data.PageName + '_' + data.VideoID, ...data });
	} catch (error) {
		return new Response(null, new Response(error.statusCode, error));
	}
};

export const deleteVideo: APIGatewayProxyHandler = async (event, _context) => {
	if (event.pathParameters == null || event.pathParameters.id == null) {
		return new Response(400, { error: 'Debe indicar el id de la asociacion a eliminar' });
	}

	const id = event.pathParameters.id;

	const params = {
		Key: {
			PageName_VideoID: id
		},
		TableName: testTable
	};

	try {
		await db.delete(params).promise();
		return new Response(200, id);
	} catch (error) {
		return new Response(null, new Response(error.statusCode, error));
	}
};
