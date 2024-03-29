const nodemailer = require("nodemailer")

const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: 587,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
})

function generateOrderEmail({ order, total }) {
  return `
    <div>
      <h2>Your recent order for ${total}</h2>
      <p>Please start walking over, we will have your order ready in the next 20 minutes.</p>
      <ul>
        ${order
          .map(
            (item) => `<li>
          <img src="${item.thumbnail}" alt="${item.name}"/>
          ${item.size} ${item.name} - ${item.price}
          </li>`
          )
          .join("")}
      </ul>
      <p>Your total is <strong>${total}</strong> due at pickup</p>
      <style>
        ul {
          list-style: none;
        }
      </style>
    </div>
  `
}

function wait(ms = 0) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms)
  })
}

exports.handler = async (event) => {
  if (event.isBase64Encoded) {
    event.body = Buffer.from(event.body, "base64").toString()
  }

  const body = JSON.parse(event.body)

  if (body.maple) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: "Beep boop" }),
    }
  }

  const requiredFields = ["email", "name", "order"]

  for (const field of requiredFields) {
    if (!body[field]) {
      return {
        statusCode: 400,
        body: JSON.stringify({ message: `You are missing the ${field} field` }),
      }
    }
  }

  if (!body.order.length) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: `Why would you order nothing?!` }),
    }
  }

  await transporter.sendMail({
    from: "Slick's Slices <slick@example.com>",
    to: `${body.name} <${body.email}>, orders@example.com`,
    subject: "New order!",
    html: generateOrderEmail({ order: body.order, total: body.total }),
  })

  return {
    statusCode: 200,
    body: JSON.stringify({ message: "Success" }),
  }
}
