const express = require("express");
const app = express();
const dotenv = require("dotenv");
const nodemailer = require("nodemailer");
const cors = require("cors");

const whitelist = ["http://192.168.1.6:3000"]; // replace with the URL of your React app
const corsOptions = {
	origin: whitelist,
};

// app.use(cors(corsOptions));
app.use(cors());

dotenv.config();

app.use(express.json());

const PORT = process.env.PORT || 3000;
app.listen(PORT, function () {
	console.log(`App Listening on port ${PORT}`);
});

app.post("/enquiry", async (req, res) => {
	let body = buildEmailBody(req.body);
	console.log(body);
	sendMail("Got New Enquire", body);
	res.send("Email has sent Successfully");
});

let buildEmailBody = (details) => {
	return "name: " + details.name + "\n" + "email: " + details.email + "\n" + "message: " + details.message;
};

const sendMail = (emailSubject, emailMessage) => {
	const mailTransporter = nodemailer.createTransport({
		service: "webmail",
		auth: {
			user: process.env.EMAIL_USERNAME,
			pass: process.env.EMAIL_PASSWORD,
		},
	});

	const mailDetails = {
		from: process.env.EMAIL_USERNAME,
		to: process.env.EMAIL_USERNAME,
		subject: emailSubject,
		text: emailMessage,
	};

	mailTransporter.sendMail(mailDetails, function (err, data) {
		if (err) {
			console.log(err);
		} else {
			console.log(data);
		}
	});
};
