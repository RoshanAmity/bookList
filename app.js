let tbody = document.querySelector("#book-list")

document.querySelector("#book-form").addEventListener("submit", (e) => {
    e.preventDefault()
    const title = getValueByIdName("title");
    const author = getValueByIdName("author");
    const isbn = getValueByIdName("isbn");

    let dupicate = isbnChecker(isbn);

    if (title === "" || author === "" || isbn === "") {
        alert("Please fill the all input")
    }
    else {

        if (dupicate.length !== 0) {
            alterBar("Please Enter Valid ISBN Code.", "danger")
            document.querySelector("#isbn").value = ""
        }
        else {
            addItems(title, author, isbn)
            addBookStore(title, author, isbn);
            alterBar("Add Book in List Successfully", "success");


            document.querySelector("#title").value = "";
            document.querySelector("#author").value = "";
            document.querySelector("#isbn").value = "";
        }
    }
})


tbody.addEventListener("click", e => {
    let deleteButton = e.target.classList.contains("delete");

    if (deleteButton) {
        let permission = confirm("Are You Sure For Delete this Item.");

        if (permission) {
            let parent = e.target.parentElement.parentElement;
            let sibling = e.target.parentElement.previousElementSibling.textContent;
            tbody.removeChild(parent);
            deletefromStore(sibling)
        }
    }
})

document.querySelector("#search").addEventListener("click", () => {
    tbody.replaceChildren();
    let searchValue = getValueByIdName("searchInput")

    searchArray = isbnChecker(searchValue)

    searchArray.forEach(item => addItems(item.title, item.author, item.isbn))
})


function isbnChecker(isbnCode) {
    let searchBook = JSON.parse(localStorage.getItem("bookArray"));

    searchBook = searchBook.filter((item) => item.isbn == isbnCode);
    return searchBook;
}


function getValueByIdName(id) {
    value = document.querySelector(`#${id}`).value;
    return value
}

function deletefromStore(isbn) {
    let bookList = JSON.parse(localStorage.getItem("bookArray"));

    bookList = bookList.filter(item => item.isbn !== isbn);

    localStorage.setItem("bookArray", JSON.stringify(bookList));
    alterBar("Item Delete SuccessFully", "danger")
}


function BookfromStore() {
    let books = JSON.parse(localStorage.getItem("bookArray"));
    return books;
}


function addBookStore(title, author, isbn) {
    let old = BookfromStore();

    if (old !== null) {

        old.push({ title, author, isbn })

        localStorage.setItem("bookArray", JSON.stringify(old))
    }
    else {
        let bookArray = [{ title, author, isbn }];
        localStorage.setItem("bookArray", JSON.stringify(bookArray));
    }
}



function addItems(title, author, isbn) {

    let tr = document.createElement("tr");

    let td1 = document.createElement("td")
    let td2 = document.createElement("td")
    let td3 = document.createElement("td")
    let td4 = document.createElement("td")
    let deleteBtn = document.createElement("button")


    deleteBtn.classList = ("btn btn-danger btn-sm danger delete")

    td1.appendChild(document.createTextNode(title));
    td2.appendChild(document.createTextNode(author));
    td3.appendChild(document.createTextNode(isbn));
    deleteBtn.appendChild(document.createTextNode("X"))
    td4.appendChild(deleteBtn)


    tr.appendChild(td1)
    tr.appendChild(td2)
    tr.appendChild(td3)
    tr.appendChild(td4)
    tbody.appendChild(tr)
}



function alterBar(msg, color) {
    let alterBarDiv = document.createElement("div");
    let container = document.querySelector(".container");
    let form = document.querySelector("#book-form")

    alterBarDiv.style.height = "50px"
    alterBarDiv.style.textAlign = "center"
    alterBarDiv.style.alignContent = "center"
    alterBarDiv.style.fontSize = "23px"

    alterBarDiv.appendChild(document.createTextNode(msg))
    alterBarDiv.classList = (`bg-${color}`)

    container.insertBefore(alterBarDiv, form)

    setTimeout(() => {
        alterBarDiv.remove()
    }, 5000);
}


window.addEventListener("DOMContentLoaded", function () {
    let book = JSON.parse(localStorage.getItem("bookArray"));

    book.forEach(item => addItems(item.title, item.author, item.isbn))
})


