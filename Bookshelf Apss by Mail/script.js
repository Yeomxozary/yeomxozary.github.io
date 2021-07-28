const UNCOMPLETED_BOOK_LIST_ID = "unfinished-list";
const COMPLETED_BOOK_LIST_ID = "finished-list";
const BOOK_LIST_ID = "buku-list";

const SEARCH_BOOK = document.querySelector("#search-book");
SEARCH_BOOK.addEventListener("keyup", bookSearch);

document.addEventListener("DOMContentLoaded", function () {

    const submitForm = document.getElementById("input-book");

    submitForm.addEventListener("submit", function (event) {
        event.preventDefault();
        setBook();
    });

    if(isStorageExist()){
        loadDataFromStorage()
    }

});

document.addEventListener("ondatasaved", () => {
    console.log("Data Saved Successfully.");
});

document.addEventListener("ondataloaded", () => {
    refreshData();
});



function setBook() {
    const uncompletedBookList = document.getElementById(UNCOMPLETED_BOOK_LIST_ID);
    const completedBookList = document.getElementById(COMPLETED_BOOK_LIST_ID);
    
    const textBook1 = document.getElementById("input-title").value;
    const textBook2 = document.getElementById("input-author").value;
    const textBook3 = document.getElementById("input-years").value;

    const checkBook = document.getElementById("input-finish");

    if(checkBook.checked == true){
        const book = createBook(textBook1, textBook2, textBook3, true);
        const bookObject = composeBookObject(textBook1, textBook2, textBook3, true);

        book[BOOK_LIST_ID] = bookObject.id;
        bookArray.push(bookObject);
        completedBookList.append(book);
        updateDataToStorage();
    } else {
        const book = createBook(textBook1, textBook2, textBook3, false);
        const bookObject = composeBookObject(textBook1, textBook2, textBook3, false);

        book[BOOK_LIST_ID] = bookObject.id;
        bookArray.push(bookObject);
        uncompletedBookList.append(book);
        updateDataToStorage();
    }  
}

function createBook(title, author, year, isCompleted) {
    const textTitle = document.createElement("h3");
    textTitle.classList.add("title-book")
    textTitle.innerText = title;

    const textAuthor = document.createElement("h4");
    textAuthor.classList.add("author-book")
    textAuthor.innerText = "Author : " + author;

    const textYear = document.createElement("p");
    textYear.classList.add("year-book")
    textYear.innerText = "Year of Publication : " + year;

    const textContainer = document.createElement("div");
    textContainer.classList.add("text-book")
    textContainer.append(textTitle, textAuthor, textYear)

    const bookContainer = document.createElement("article");
    bookContainer.classList.add("book")
    bookContainer.append(textContainer);
    
    if(isCompleted == true){
        bookContainer.append(
            createUnfinishButton(title, author, year),
            createDeleteButton()
        );
    } else {
        bookContainer.append(
            createFinishButton(title, author, year),
            createDeleteButton()
        );
    }

    return bookContainer;
}

function createFinishButton(textSend1, textSend2, textSend3) {
    return createButton("finish", function(event){
        addTaskToFinish(event.target.parentElement, textSend1, textSend2, textSend3);
    });
}

function createUnfinishButton(textSend1, textSend2, textSend3) {
    return createButton("unfinish", function(event){
        addTaskToUnfinish(event.target.parentElement, textSend1, textSend2, textSend3);
    });
}

function createDeleteButton() {
    return createButton("delete", function(event){
        deleteTask(event.target.parentElement);
    });
}

function createButton(buttonTypeClass, eventListener) {
    const button = document.createElement("button");
    button.classList.add(buttonTypeClass);
    button.addEventListener("click", function (event) {
        eventListener(event);
    });

    if(buttonTypeClass == "unfinish"){
        button.innerText = "Unfinished Reading";
    } else if(buttonTypeClass == "finish"){
        button.innerText = "Finished Reading";
    } else {
        button.innerText = "Delete Book";
    }

    return button;
}

function addTaskToFinish(taskElement, title, author, year) {
    const listCompleted = document.getElementById(COMPLETED_BOOK_LIST_ID);

    const taskTitle = title;
    const taskAuthor = author;
    const taskYear = year;

    const newBook = createBook(taskTitle, taskAuthor, taskYear, true);
    
    const book = findBook(taskElement[BOOK_LIST_ID]);
    book.isCompleted = true;
    newBook[BOOK_LIST_ID] = book.id;

    listCompleted.append(newBook);
    taskElement.remove();
    updateDataToStorage();
    //alert("The book has been moved to the finished reading section");
}

function addTaskToUnfinish(taskElement, title, author, year){
    const listUncompleted = document.getElementById(UNCOMPLETED_BOOK_LIST_ID);

    const taskTitle = title;
    const taskAuthor = author;
    const taskYear = year;

    const newBook = createBook(taskTitle, taskAuthor, taskYear, false);
    
    const book = findBook(taskElement[BOOK_LIST_ID]);
    book.isCompleted = false;
    newBook[BOOK_LIST_ID] = book.id;

    listUncompleted.append(newBook);
    taskElement.remove();
    updateDataToStorage();
    //alert("The book has been moved to the unfinished reading section");
}

function deleteTask(taskElement) {
    if (confirm("Are you sure want to delete this book?")) {
        const bookIndex = findBookIndex(taskElement[BOOK_LIST_ID]);
        bookArray.splice(bookIndex, 1);

        taskElement.remove();
        updateDataToStorage();
    } else {
        updateDataToStorage();
    }
}

function bookSearch(bookItem) {
    const searchBook = bookItem.target.value.toLowerCase();
    let itemList = document.querySelectorAll(".book");

    itemList.forEach((bookCount) =>{
        const itemContent = bookCount.firstChild;
        const itemContent2 = itemContent.firstChild.textContent.toLowerCase();

        if (itemContent2.indexOf(searchBook) != -1) {
            bookCount.setAttribute("style", "display: block;" );
        } else {
            bookCount.setAttribute("style", "display: none !important;" );
        }
    } ) ;
}