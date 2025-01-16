const ChecklistTask = require("../models/Checklist");
const User = require("../models/User"); 


async function getChecklistTasks(req, res) {
    const { userId } = req.query;

    if(!userId) {
        return res.status(400).json({ message: "Missing user ID" });
    }

    try {
        const tasks = await ChecklistTask.find(); 
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const userTasks = user.completedTasks.tasks || [];
        const tasksWithStatus = tasks.map((task) => ({
            ...task._doc,
            completed: userTasks.some((id) => id.toString() === task.id.toString()),
        }));

        res.status(200).json(tasksWithStatus);
    } catch (error) {
        console.error("Error fetching checklist tasks:", error);
        res.status(500).json({ message: "Error fetching checklist tasks" });
    }
}

exports.checklistTasksController = { getChecklistTasks };