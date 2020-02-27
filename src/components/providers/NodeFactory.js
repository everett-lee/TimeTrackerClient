const getTaskNode = (task) => {
    console.log(task)
    if (!task) {
        return;
    }

    let time = 5;
    const minRadius = 8;
    
    time = Math.max(time, minRadius);

    return {
        "id": "-1",
        "radius": time,
        "depth": 1,
        "color": "rgb(97, 205, 187)"
    }
}

export { getTaskNode };