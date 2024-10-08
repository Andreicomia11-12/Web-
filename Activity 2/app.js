const title = document.getElementById('title');
const author = document.getElementById('author');
const button = document.getElementById('submit');
const ul = document.getElementById('ul-list')

s
button.addEventListener('click', ()=>{
    const newTitle = title.value 
    const newAuthor = author.value 

    const div0 = document.createElement('div')
    const button = document.createElement('button')
    const h3 = document.createElement('h3')
    const p = document.createElement('p')
    const div = document.createElement('div')
    const div2 = document.createElement('div')
    const li = document.createElement('li')

  
    button.classList.add('pricebutton', 'btn' , 'btn-dark')
    div0.classList.add('col-6', 'd-flex', 'justify-content-end' )
    h3.classList.add('title')
    p.classList.add()
    div.classList.add('text', 'col-6')
    div2.classList.add('row', 'mx-1')
    li.classList.add('mt-4')

    h3.innerHTML = newTitle
    p.innerHTML = newAuthor
    button.innerHTML = "Delete+"

    // p.classList.add('songname')

    div.append(h3)
    div.append(p)
    div0.append(button)
    div2.append(div)
    div2.append(div0)
    li.append(div2)
    ul.append(li)



    
})


// console.log(title, author, button)