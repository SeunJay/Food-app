const { Order, CartItem } = require("../models/Order");
const { errorHandler } = require("../helpers/dbErrorHandler");
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SEND_GRID_KEY);

exports.orderById = (req, res, next, id) => {
  Order.findById(id)
    .populate("foods.food", "name price")
    .exec((err, order) => {
      if (err || !order) {
        return res.status(400).json({
          error: errorHandler(err)
        });
      }
      req.order = order;
    });
  next();
};

exports.create = (req, res) => {
  //console.log("CREATE ORDER: ", req.body);
  req.body.order.user = req.profile;
  const order = new Order(req.body.order);
  order.save((error, data) => {
    if (error) {
      return res.status(400).json({
        error: errorHandler(error)
      });
    }
    const emailData = {
      to: "seunjay92@gmail.com",
      from: "noreply@paystand.com",
      subject: `A new order received`,
      html: `
            <p>Total products: ${order.foods.length}</p>
            <p>Total cost: ${order.amount}</p>
            <p>Delivery Address: ${order.address}</p>
            <p>Login to dashboard to view the order details.</p>
        `
    };
    sgMail.send(emailData).then(sent=>{
      console.log(`email sent ${sent}`)
    });
    res.json(data);
  });
};

exports.listOrders = (req, res) => {
  Order.find()
    .populate({ path: "user", select: "name email" })
    .sort("-created")
    .exec((err, orders) => {
      if (err) {
        return res.status(400).json({
          error: errorHandler(err)
        });
      }
      res.json(orders);
    });
};

exports.getStatusValues = (req, res) => {
  res.json(Order.schema.path("status").enumValues);
};

exports.updateOrderStatus = (req, res) => {
  Order.update(
    { _id: req.body.orderId },
    { $set: { status: req.body.status } },
    (err, order) => {
      if (err) {
        return res.status(400).json({
          error: errorHandler(err)
        });
      }
      res.json(order);
    }
  );
};

exports.purchaseHistory = (req, res) => {
  Order.find({ user: req.profile._id })
    .populate("user", "name")
    .sort("-created")
    .exec((err, orders) => {
      if (err) {
        return res.status(400).json({
          error: errorHandler(err)
        });
      }
      res.json(orders);
    });
};
