// Seleções
const todoForm = document.querySelector('#to-do-form');
const formInput = document.querySelector('#to-do-input');
const todoEdit = document.querySelector('#form-edit');
const todoInput = document.querySelector('#input-edit');
const todoLista = document.querySelector('#to-do-list');
const cancelar = document.querySelector('#cancel-edit-btn');
const toolbar = document.querySelector('#toolbar');
const todo = document.querySelector('.to-do')

const limpar = document.querySelector("#limpar")
const search = document.querySelector('#search-input')

// Seleção do filtro
const filtroSelect = document.querySelector('#select-filtro');

let oldinput;


// Funções

const savetodo = (texto) =>{
    const todo = document.createElement("div")
    todo.classList.add("to-do") 

    const todotext = document.createElement("h3")

    todotext.innerText = texto

    todo.appendChild(todotext)


    const btncheck = document.createElement('button')
    btncheck.classList.add("finish-todo")
    btncheck.innerHTML = '<i class="fa-solid fa-check"></i>'
    todo.appendChild(btncheck)
    
    const btnEdit = document.createElement('button')
    btnEdit.classList.add("edit-todo")
    btnEdit.innerHTML = '<i class="fa-solid fa-pen"></i>'
    todo.appendChild(btnEdit)

    const btnExcluir = document.createElement('button')
    btnExcluir.classList.add("remove-todo")
    btnExcluir.innerHTML = '<i class="fa-solid fa-xmark"></i>'
    todo.appendChild(btnExcluir)

    todoLista.appendChild(todo);
    formInput.value = ""
    formInput.focus()

    salvarLocalStorage(texto)

}

const salvarLocalStorage = (texto) =>{
    let tarefas = JSON.parse(localStorage.getItem("tarefas")) || [] // recupera ou cria uma list
    tarefas.push({texto, done:false}) // insere dados na lista
    localStorage.setItem("tarefas", JSON.stringify(tarefas)) // insere dados na localStorage
}


const carregarLocalStorage = () => {
    let tarefas = JSON.parse(localStorage.getItem("tarefas")) || []

    tarefas.forEach((tarefa) => {
        const todo = document.createElement("div")
        todo.classList.add("to-do") 
    
        if (tarefa.done){
            todo.classList.add("done")
        }
        const todotext = document.createElement("h3")

        todotext.innerText = tarefa.texto

        todo.appendChild(todotext)


        const btncheck = document.createElement('button')
        btncheck.classList.add("finish-todo")
        btncheck.innerHTML = '<i class="fa-solid fa-check"></i>'
        todo.appendChild(btncheck)
        
        const btnEdit = document.createElement('button')
        btnEdit.classList.add("edit-todo")
        btnEdit.innerHTML = '<i class="fa-solid fa-pen"></i>'
        todo.appendChild(btnEdit)

        const btnExcluir = document.createElement('button')
        btnExcluir.classList.add("remove-todo")
        btnExcluir.innerHTML = '<i class="fa-solid fa-xmark"></i>'
        todo.appendChild(btnExcluir)

        todoLista.appendChild(todo);

    })
    
}

const removerLocalStorage = (texto) =>{
    let tarefas = JSON.parse(localStorage.getItem("tarefas")) || []
    tarefas = tarefas.filter((tarefa) => tarefa.texto !== texto)
    localStorage.setItem("tarefas", JSON.stringify(tarefas))

}

const editarLocalStorage = (oldtext, texto) => {
    let tarefas = JSON.parse(localStorage.getItem("tarefas")) || []
    tarefas = tarefas.map((tarefa) =>{
        if (tarefa.texto === oldtext){
            tarefa.texto = texto
        }
        return tarefa
    })

    localStorage.setItem("tarefas", JSON.stringify(tarefas))

}


const atualizarLocalStorage = (texto) =>{
    let tarefas = JSON.parse(localStorage.getItem("tarefas")) || []

    tarefas = tarefas.map((tarefa) => {
        if (tarefa.texto === texto){
            tarefa.done = !tarefa.done
        }

        return tarefa
    })

    localStorage.setItem("tarefas", JSON.stringify(tarefas))
    const pegartarefa = JSON.parse(localStorage.getItem("tarefas"))
    console.log(pegartarefa)
}



const toggleEdit = () =>{

    todoForm.classList.toggle('hide')
    todoEdit.classList.toggle('hide')
    todoLista.classList.toggle('hide')
}

const updateInput = (texto) =>{
    const todos = document.querySelectorAll(".to-do")

    todos.forEach((todo) =>{
        let todoTitle = todo.querySelector('h3')

        if (todoTitle.innerText === oldinput){
            todoTitle.innerText = texto
        }
    })
}


const aplicarFiltro = () => {
    const filtroValor = filtroSelect.value; // Obtém o valor selecionado no filtro
    const todos = document.querySelectorAll('.to-do'); // Seleciona todas as tarefas

    todos.forEach((todo) => {
        switch (filtroValor) {
            case 'all': // Mostrar todas as tarefas
                todo.style.display = 'flex';
                break;
            case 'done': // Mostrar apenas tarefas concluídas
                todo.classList.contains('done')
                    ? (todo.style.display = 'flex') // se for verdade
                    : (todo.style.display = 'none'); // se for falso
                break;
            case 'todo': // Mostrar apenas tarefas pendentes
                todo.classList.contains('done')
                    ? (todo.style.display = 'none')
                    : (todo.style.display = 'flex');
                break;
        }
    });
};


const buscarTarefas = () =>{
    const valor = search.value.toLowerCase();
    const todos = document.querySelectorAll('.to-do')

    todos.forEach((todo)=>{
        const texto = todo.querySelector('h3').innerText.toLowerCase()


        if (texto === "" || texto.includes(valor)){
            todo.style.display = 'flex'
        }else{
            todo.style.display = 'none'
        }
    })
}
// Eventos

todoForm.addEventListener('submit', (e)=>{
    e.preventDefault()

    const inputvalue = formInput.value

    if (inputvalue){
        savetodo(inputvalue)
    }

    
})


document.addEventListener('click', (e)=>{
    const targetE = e.target; // localiza o elemento clicado
    const parentE = targetE.closest('div') // retorna a div mais próxima do elemento ancestral
    let todoTitle;

    if (parentE && parentE.querySelector('h3')){
        todoTitle = parentE.querySelector('h3').innerText;
    }
    if (targetE.classList.contains('finish-todo')){
        parentE.classList.toggle('done');
        atualizarLocalStorage(todoTitle)
    }
    if (targetE.classList.contains('edit-todo', 'btn')){
        
        toggleEdit()
        
        todoInput.value = todoTitle
        oldinput = todoTitle
        

    }
    if (targetE.classList.contains('remove-todo')){
        removerLocalStorage(todoTitle)
        parentE.remove()
    }



})

cancelar.addEventListener('click', (e) =>{

    e.preventDefault()

    toggleEdit()
    
})

limpar.addEventListener('click', (e)=>{
    e.preventDefault()
    const todos = document.querySelectorAll('.to-do')

    search.value = ""
    todos.forEach((todo)=>{
        todo.style.display = 'flex'

    })
})

todoEdit.addEventListener('submit', (e)=>{
    e.preventDefault()

    const editInputValue = todoInput.value

    if (editInputValue){
        updateInput(editInputValue)
        editarLocalStorage(oldinput, editInputValue)
    }

    toggleEdit()
})



// Evento de mudança no filtro
filtroSelect.addEventListener('change', aplicarFiltro);

// Evento de busca no input

search.addEventListener('input', buscarTarefas);

document.addEventListener("DOMContentLoaded", carregarLocalStorage);
