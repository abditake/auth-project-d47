'use strict';

const express = require('express');
const dataModules = require('./models');

const router = express.Router();

router.param('model', (req, res, next) => {
  const modelName = req.params.model;
  console.log('MODEL NAME: ', modelName);
  if (dataModules[modelName]) {
    req.model = dataModules[modelName];
    next();
  } else {
    next('Invalid Model');
  }
});

router.get('/:model', handleGetAll);
router.get('/:model/:id', handleGetOne);
router.post('/:model', handleCreate);
router.put('/:model/:id', handleUpdate);
router.delete('/:model/:id', handleDelete);

async function handleGetAll(req, res) {
  let allRecords = await req.model.findAll();
  res.status(200).json(allRecords);
}

async function handleGetOne(req, res) {
  const id = req.params.id;
  let theRecord = await req.model.findOne({where: {id}});
  res.status(200).json(theRecord);
}

async function handleCreate(req, res) {
  let obj = req.body;
  let newRecord = await req.model.create(obj);
  res.status(201).json(newRecord);
}

async function handleUpdate(req, res) {
  const id = req.params.id;
  const obj = req.body;
  console.log('OBJECT:', obj);
  await req.model.update(obj, {where: { id } });
  let updatedRecord = await req.model.findOne({where: {id}});
  console.log('RECORD: ', updatedRecord);
  res.status(200).json(updatedRecord);
}

async function handleDelete(req, res) {
  let id = req.params.id;
  let deletedRecord = await req.model.destroy({where: {id}});
  res.status(200).json(deletedRecord);
}

module.exports = router;
