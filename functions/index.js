"use strict";
const crypto = require("crypto");

const functions = require("firebase-functions");
const express = require("express");

// The Firebase Admin SDK to access Firestore.
const admin = require("firebase-admin");
admin.initializeApp();

const app = express();

app.use(express.json());

app.get("*", (req, res) => {
  res.status(404).send("404, Not Found");
});

exports.api = functions.https.onRequest(app);

exports.prepareOrder = functions.https.onCall(async (data) => {
  try {
    const live = process.env.LIVE;
    const vid = process.env.VID;
    const hashKey = process.env.KEY;
    const curr = process.env.CURR;
    const cst = process.env.CST;
    const invoice = admin.firestore().collection("rand").doc().id;
    const {name, total, mobile, email, cbk, items} = data;

    const orderRequest = await admin.firestore().collection("orders").add({
      name,
      total,
      mobile,
      email,
      items,
    });

    functions.logger.log(`We have added this doc ${orderRequest.id}`);

    const dataString = `${
      live +
      orderRequest.id +
      invoice +
      total +
      mobile +
      email +
      vid +
      curr +
      cbk +
      cst
    }`;
    const datahash = crypto
        .createHmac("sha1", hashKey)
        .update(dataString)
        .digest("hex");
    return {
      live,
      oid: orderRequest.id,
      inv: invoice,
      ttl: total,
      tel: mobile,
      eml: email,
      vid,
      curr,
      cbk,
      cst,
      hsh: datahash,
      items,
    };
  } catch (err) {
    functions.logger.log(err);
    throw new functions.https.HttpsError(err);
  }
});

exports.updateOrder = functions.https.onCall((data) => {
  try {
    const {status, id, ivm, mc} = data;
    const orderRef = admin.firestore().collection("orders").doc(id);
    orderRef.get().then((orderSnap) => {
      if (orderSnap.exists) {
        let paymentStatus;
        switch (status) {
          case "aei7p7yrx4ae34":
            paymentStatus = "success";
            break;
          default:
            paymentStatus = "failed";
        }
        orderRef.update({paymentStatus})
            .then((order) => {
              return order;
            })
            .catch((err) => {
              functions.logger.error(err);
              throw new functions.https.HttpsError(err);
            });
      }
    });
  } catch (err) {
    functions.logger.log(err);
    throw new functions.https.HttpsError(err);
  }
});
