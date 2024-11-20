const createDiv = (load, reps) => {
    const div = document.createElement('div');
    const p = document.createElement('p');
    const p2 = document.createElement('p');

    p.innerHTML = `load: ${load}`;
    p2.innerHTML = `reps: ${reps}`;
    div.append(p)
    div.append(p2)

    return div
} 

const createSecondDiv = (title) => {
    const div = document.createElement('div');
    const h4 = document.createElement('h4');

    h4.innerHTML = title;

    div.append(h4)

    return div
}

const createFirstli = (reps, load, title) => {
    const li = document.createElement('li')

    li.classList.add('list-group-item');

    li.append(createSecondDiv(title));
    li.append(createDiv(reps, load));
    

    return li
}

const ul = document.querySelector('.list-group');

const dataFetcher = async() => {
    const response = await fetch('http://localhost:5000/api/workout/')

    const result = await response.json()

    return result
}

dataFetcher().then(workoutItems => {
    workoutItems.forEach(workout => {
      ul.append(createFirstli(workout.reps, workout.load, workout.title))
    });
}).catch(error => {
    console.log(error)
})

