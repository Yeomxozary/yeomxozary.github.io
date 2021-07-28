const STORAGE_KEY = "BOOKSHELF_APP";
 
let bookArray = [];
 
function isStorageExist() {
    if(typeof(Storage) === undefined){
        alert("Your browser doesn't suppport local storage");
        return false
    }
    return true;
}
 
function saveData() {
    const parsed = JSON.stringify(bookArray);
    localStorage.setItem(STORAGE_KEY, parsed);
    document.dispatchEvent(new Event("ondatasaved"));
}
 
function loadDataFromStorage() {
    const serializedData = localStorage.getItem(STORAGE_KEY);
    let data = JSON.parse(serializedData);
   
    if(data !== null)
        bookArray = data;
 
    document.dispatchEvent(new Event("ondataloaded"));
}
 
function updateDataToStorage() {
    if(isStorageExist())
        saveData();
}

function refreshData() {
    const listUncompleted = document.getElementById(UNCOMPLETED_BOOK_LIST_ID);
    let listCompleted = document.getElementById(COMPLETED_BOOK_LIST_ID);
  
  
    for(book of bookArray){
        const newBook = createBook(book.title, book.author, book.year,  book.isCompleted);
        newBook[BOOK_LIST_ID] = book.id;
  
  
        if(book.isCompleted){
            listCompleted.append(newBook);
        } else {
            listUncompleted.append(newBook);
        }
    }
}
 
function composeBookObject(title, author, year, isCompleted) {
    return {
        id: +new Date(),
        title,
        author,
        year,
        isCompleted
    };
}
 
function findBook(bookId) {
    for(book of bookArray){
        if(book.id === bookId)
           return book;
    }
    return null;
}
 
 
function findBookIndex(bookId) {
    let index = 0
    for (book of bookArray) {
        if(book.id === bookId)
            return index;
            index++;
    }
    return -1;
}