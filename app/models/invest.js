export default (id, timestamp, userId, entry, cost, savings, risk, goal, dtSince, dtGoal, desc, advice) => ({
    id: id,
    userId: userId,
    timestamp: timestamp,
    advice: advice,
    entry: entry,
    cost: cost,
    goal: goal,
    desc: desc,
    risk: risk,
    profitSave: savings,
    dtSince: dtSince,
    dtGoal: dtGoal
})

