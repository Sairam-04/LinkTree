const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const jwt = require('jsonwebtoken')
const User = require("./models/usermodel")
const Data = require("./models/datamodel")
const middleware = require('./middleware')
require("dotenv").config()

app = express();

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(
    () => console.log("DB Connected")
)

app.use(express.json());

app.get('/', (req, res) => {
    console.log('here')
    res.send('Hi')
})

app.post('/signup', async (req, res) => {
    try {
        const { username, password } = req.body;
        const exist = await User.findOne({ username });
        if (exist) {
            return res.status(400).send("User Already Registered");
        }
        let newUser = new User({
            username, password
        })
        newUser.save();
        return res.status(200).send('User Registered');
    }
    catch (err) {
        console.log(err);
        return res.status(500).send("Server Error")
    }
})

app.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        const exist = await User.findOne({ username });
        if (!exist) {
            return res.status(400).send("User Doesn't Exist");
        }
        if (exist.password != password) {
            return res.status(400).send("Password Invalid")
        }
        let payload = {
            user: {
                id: exist.id
            }
        }
        jwt.sign(payload, 'jwtPassword', { expiresIn: 360000000 },
            (err, token) => {
                if (err) throw err
                return res.json({ token })
            }
        )

    }
    catch (err) {
        console.log(err)
        return res.status(500).send("Server Error")
    }
})

app.post('/add-link', middleware, async (req, res) => {
    try {
        const { username, linkTitle, linkUrl } = req.body;
        const exist = await User.findOne({ username })
        if (!exist) {
            return res.status(400).send("User Doesn't Exist");
        }
        const newLink = new Data({
            username,
            linkTitle,
            linkUrl
        })
        const { _id } = await newLink.save()
        setTimeout(async () => {
            linkId = await Data.findOne({ "_id": _id })
            return res.status(200).json({ "linkId": linkId.linkId })
        }, 500)

    }
    catch (err) {
        console.log(err);
        return res.status(500).send("Server Error")
    }
})


app.get("/get-links", async (req, res) => {
    try {
        const username = req.query.username;
        console.log("username.......--", req);
        const exist = await User.findOne({ username })

        if (!exist) {
            return res.status(400).send("User Doesn't Exist");
        }
        const linkdata = await Data.find({ username })
        return res.status(200).json(linkdata)
    }
    catch (err) {
        console.log(err);
        return res.status(500).send("Server Error")
    }
})

app.put("/edit-link", middleware, async (req, res) => {
    try {
        const { username, linkTitle, linkUrl, linkId } = req.body;
        const userExist = await User.findOne({ username });
        const linkExist = await Data.findOne({ linkId: parseInt(linkId) });
        if (!userExist) {
            return res.status(400).send("User Doesn't Exist");
        }
        if (!linkExist) {
            return res.status(400).send("Link Doesn't Exist");
        }
        const filter = { linkId: parseInt(linkId) };
        await Data.updateOne(filter, { $set: { linkTitle: linkTitle, linkUrl: linkUrl } });
        return res.status(200).json({"linkId": linkId});
    } catch (err) {
        console.log(err);
        return res.status(500).send("Server Error");
    }
});


app.delete('/delete-link', middleware, async (req, res) => {
    try {
        const { username, linkId } = req.body;
        const userExist = await User.findOne({ username });
        const linkExist = await Data.findOne({ linkId: parseInt(linkId) });
        if (!userExist) {
            return res.status(400).send("User Doesn't Exist");
        }
        if (!linkExist) {
            return res.status(400).send("Link Doesn't Exist");
        }
        const filter = { linkId: parseInt(linkId) };
        await Data.deleteOne(filter);
        return res.status(200).send("Deleted Successfully");
    } catch (err) {
        console.log(err);
        return res.status(500).send("Server Error");
    }

})


app.get('/find-link', async (req, res) => {
    try {
        const { linkId } = req.body;
        const exist = await Data.findOne({ linkId: parseInt(linkId) })
        if (!exist) {
            return res.status(400).send("User Doesn't Exist");
        }
        const linkdata = await Data.find({ linkId: parseInt(linkId) })
        return res.status(200).json(linkdata)
    }
    catch (err) {
        console.log(err);
        return res.status(500).send("Server Error")
    }
})


app.put("/change-visibilty", async (req, res) => {
    try {
        const { username, linkId, visibility } = req.body;
        const userExist = await User.findOne({ username });
        const linkExist = await Data.findOne({ linkId: parseInt(linkId) });

        if (!userExist) {
            return res.status(400).send("User Doesn't Exist");
        }
        if (!linkExist) {
            return res.status(400).send("Link Doesn't Exist");
        }
        const filter = { linkId: parseInt(linkId) };
        await Data.updateOne(filter, { $set: { visibility: visibility } });
        return res.status(200).send("Updated Successfully");
    } catch (err) {
        console.log(err);
        return res.status(500).send("Server Error");
    }
})


app.listen(1200)