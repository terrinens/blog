import {Request, Response} from "@google-cloud/functions-framework";
import {getAllCodeBytes} from "./github/GithubCodeByte";

if (process.env.NODE_ENV === 'development') {
    console.log("started dev mode");
    require('dotenv').config();
} else {
    console.log('started production mode');
}

const functions = require('@google-cloud/functions-framework');

functions.http('byte', async (req: Request, res: Response) => {
    try {
        const allCodeBytes = await getAllCodeBytes();
        const langByte = allCodeBytes.languagesByte;
        res.appendHeader("Content-Type", "application/json")
        res.send(JSON.stringify(langByte));
    } catch (error) {
        console.error('Error fetching code bytes:', error);
        res.status(500).send('server error');
    }
});
