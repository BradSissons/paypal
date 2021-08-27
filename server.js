const express = require('express')
const app = express()
app.set("view engine", "ejs")
app.use(express.static("public"))

const paypal = require('@paypal/checkout-server-sdk')

const storeItems = new Map([
	[1, { price: 100, name: "Item 1" }],
	[2, { price: 200, name: "Item 2" }]
])

app.get('/', (req, res) => {
	res.render('index', { paypalClientId: 'AbX7relgVWWbg56Y7qC5-uvM0KG7lh1z_zx0xTM0KmCEMDH9bUwLDCgYPSFbYhgB1odFsk24yr7n826g'})
})

app.post('/create-order',  async (req, res) => {
	const request = new paypal.orders.OrdersCreateRequest()
	const total = req.body.items.reduce((sum, item) => {
		return sum + storeItems,get(item.id).price * item.quantity
	}, 0)
	request.prefer("return=representation")
	request.requestBody({
		intent: 'CAPTURE',
		purchase_units: [
			{
				amount: {
					currency_code: 'USD',
					value: total,
					breakdown: {
						item_total: {
							currency_code: 'USD',
							value: total
						}
					}
				},
				items: req.body.items.Map(item => {
					const storeItem = storeItems.get(item.id)
					return {
						name: storeItem.name,
						unit_amount: {
							currency_code: 'USD',
							value: storeItem.price
						},
						quantity: item.quantity
					}
				})
			}
		]
	})
})

app.listen(3000)