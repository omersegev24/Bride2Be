const { Schema, model } = require('mongoose');

const checklistTaskSchema = new Schema({
    id: { type: Number, required: true },
    title: { type: String, required: true },
    section: { type: String, required: true },
}, { collection: 'checklistTasks' });

const ChecklistTask = model('ChecklistTask', checklistTaskSchema);

module.exports = ChecklistTask;