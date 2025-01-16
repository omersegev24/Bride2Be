import React, { useEffect, useState } from "react";
import ProgressBar from "./ProgressBar";

function CheckList({ user, setUser }) {
    const [tasks, setTasks] = useState([]);
    const [progress, setProgress] = useState(0);
    const [sections, setSections] = useState({});
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);

    const userId = user._id;

    useEffect(() => {
        async function initData() {
            try {
                console.log('IN EFFECT',user);
                setLoading(true);

                const response = await fetch(`http://localhost:8080/api/checklist?userId=${user._id}`);
                if (!response.ok) {
                    throw new Error("Failed to fetch tasks");
                }
                const tasksData = await response.json();

                const groupedTasks = tasksData.reduce((acc, task) => {
                    if (!acc[task.section]) {
                        acc[task.section] = [];
                    }
                    acc[task.section].push(task);
                    return acc;
                }, {});

                setTasks(groupedTasks);

                const progress = calculateTotalProgress(groupedTasks);
                setProgress(progress);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }

        initData();
    }, [user]);

    useEffect(() => {
        setProgress(calculateTotalProgress(tasks));
    }, [tasks]);

    const calculateTotalProgress = (tasks) => {
        const allTasks = Object.values(tasks).flat();
        const totalTasks = allTasks.length;
        const completedTasks = allTasks.filter((task) => task.completed).length;
        return totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;
    };

    const toggleSection = (section) => {
        setSections((prev) => ({
            ...prev,
            [section]: !prev[section],
        }));
    };

    const toggleTaskCompletion = async (taskId, completed) => {
        try {
            const updatedTasks = { ...tasks };
            Object.keys(updatedTasks).forEach((section) => {
                updatedTasks[section] = updatedTasks[section].map((task) =>
                    task.id === taskId ? { ...task, completed: !completed } : task
                );
            });

            const updatedProgress = calculateTotalProgress(updatedTasks);

            setTasks(updatedTasks);
            setProgress(updatedProgress);

            const response = await fetch(`http://localhost:8080/api/users/${userId}/updateTask`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    userId,
                    taskId,
                    completed: !completed,
                    progress: updatedProgress
                }),
            });

            if (!response.ok) {
                throw new Error("Failed to update task");
            }

            const UpdateUser = await response.json();
            setUser(UpdateUser);

        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    const sortSections = (sections) => {
        return Object.entries(sections).sort(([sectionA, tasksA], [sectionB, tasksB]) => {
            const isCompletedA = tasksA.every((task) => task.completed);
            const isCompletedB = tasksB.every((task) => task.completed);

            if (isCompletedA && !isCompletedB) return 1;
            if (!isCompletedA && isCompletedB) return -1;
            return 0;
        });
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div>
            <div className="checklist-container">
                <h1>Checklist Tasks</h1>
                <ProgressBar progress={progress} />
                {sortSections(tasks).map(([section, sectionTasks]) => {
                    const isCompleted = sectionTasks.every((task) => task.completed);
                    return (
                        <div
                            key={section}
                            className={`section ${isCompleted ? "completed-section" : ""}`}
                        >
                            <div className="section-header" onClick={() => toggleSection(section)}>
                                <span>{section}</span>
                                <span>{sections[section] ? "▼" : "►"}</span>
                            </div>
                            {sections[section] && (
                                <ul className="task-list">
                                    {sectionTasks.map((task) => (
                                        <li
                                            key={task._id}
                                            className={`task-item ${task.completed ? "completed" : ""}`}
                                        >
                                            <span className={`task-title ${task.completed ? "completed" : ""}`}>
                                                {task.title}
                                            </span>
                                            <div className="task-actions">
                                                <input
                                                    type="checkbox"
                                                    checked={task.completed}
                                                    onChange={() =>
                                                        toggleTaskCompletion(task.id, task.completed)
                                                    }
                                                />
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default CheckList;