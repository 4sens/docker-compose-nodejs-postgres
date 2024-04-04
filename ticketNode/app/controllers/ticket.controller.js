const db = require("../models");
const Ticket = db.tickets;
const Op = db.Sequelize.Op;

// Create and Save a new Ticket
exports.create = (req, res) => {
  // Validate request
  if (!req.body.qr) {
    res.status(400).send({
      message: "QR code can not be empty!"
    });
    return;
  }

  // Create a Ticket
  const ticket = {
    qr: req.body.qr,
    status: req.body.status,
    mail: req.body.mail,
    mobile: req.body.mobile,
    scantime: req.body.scantime
  };

  // Save Ticket in the database
  Ticket.create(ticket)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
              err.message || "Some error occurred while creating the Ticket."
        });
      });
};

// Retrieve all Tickets from the database.
exports.findAll = (req, res) => {
  const qr = req.query.qr;
  var condition = qr ? { qr: { [Op.iLike]: `%${qr}%` } } : null;

  Ticket.findAll({ where: condition })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
              err.message || "Some error occurred while retrieving tickets."
        });
      });
};

// Find a single Ticket with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Ticket.findByPk(id)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message: "Error retrieving Ticket with id=" + id
        });
      });
};

// Update a Ticket by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Ticket.update(req.body, {
    where: { id: id }
  })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Ticket was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update Ticket with id=${id}. Maybe Ticket was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating Ticket with id=" + id
        });
      });
};

// Delete a Ticket with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Ticket.destroy({
    where: { id: id }
  })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Ticket was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete Ticket with id=${id}. Maybe Ticket was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete Ticket with id=" + id
        });
      });
};
