import twilio from "twilio";

export const myProfile = (req, res, next) => {
    res.status(200).json({
        success: true,
        user: req.user,
    });
};
export const logout = (req, res, next) => {
    req.session.destroy((err) => {
        if (err) return next(err);

        res.clearCookie("connect.sid");
        res.status(200).json({
            message: "Logged Out",
        });
    });
};

export const sendOtp = (req, res, next) => {
    const accountSid = process.env.TWILIO_ACCOUNT_SID;
    const authToken = process.env.TWILIO_AUTH_TOKEN;
    const client = twilio(accountSid, authToken);

    // client.messages
    //     .create({
    //         body: "1234",
    //         messagingServiceSid: "MGeae00726dbfa456169cbab191e742d8d",
    //         to: "+919074577228",
    //     })
    //     .then((message) => console.log(message.sid));
    // const phoneNumber = req.body.phone_number;
    client.verify.v2
        .services("VA58cd69f23e720c3a96e6215556e66f42")
        .verifications.create({ to: "+919074577228", channel: "sms" })
        .then((verification) => {
            res.send("Verification code sent!");
        })
        .catch((error) => res.status(400).send(error));
};
export const verifyOtp = (req, res, next) => {
    const accountSid = process.env.TWILIO_ACCOUNT_SID;
    const authToken = process.env.TWILIO_AUTH_TOKEN;
    const client = twilio(accountSid, authToken);

    client.verify.v2
        .services("VA58cd69f23e720c3a96e6215556e66f42")
        .verificationChecks.create({ to: "+919074577228", code: "253340" })
        .then((verification_check) => console.log(verification_check.status));
};
