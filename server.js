const express = require('express')

const app = express()
app.set("view engine", "ejs")
app.use(express.static("public"))

app.get('/', (req, res) => {
	res.render('index', { paypalClientId: 'AbX7relgVWWbg56Y7qC5-uvM0KG7lh1z_zx0xTM0KmCEMDH9bUwLDCgYPSFbYhgB1odFsk24yr7n826g'})
})

app.listen(3000)