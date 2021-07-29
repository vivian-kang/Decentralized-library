//import LibraryABI from './libraryABI'

let account = null
let libraryContract
let libraryContractAddress = 'TMH1jAzAjCp2GdWm7hXSmhYyD3iKdpExoZ' // Paste Contract address here
let bookRentContract = null


export const accountAddress = () => {
  return account
}


export async function setLibraryContract() {
  // TODO: abtain contract Object
  bookRentContract = await window.tronWeb.contract().at(libraryContractAddress);
}


export async function postBookInfo(name, description, price) {
  // TODO: call addBook func of library contract
  
  const result = await bookRentContract.addBook(name,description,price).send({
    feeLimit:100_000_000,
    callValue:0,
    shouldPollResponse:true
  });

  alert('Book Posted Successfully')

}

export async function borrowBook(spaceId, checkInDate, checkOutDate, totalPrice) {
  // TODO: call borrowBook func of library contract
 
  const result = await bookRentContract.borrowBook(spaceId,checkInDate,checkOutDate).send({
    feeLimit:100_000_000,
    callValue:totalPrice,
    shouldPollResponse:true
  });

  alert('Property Booked Successfully')
}

export async function fetchAllBooks() {
  // TODO: call bookId func of library contract to abtain total books number
  // iterate till book Id
  // push each object to books array
  const books = [];

  const bookId  = await bookRentContract.bookId().call();
  //iterate from 0 till bookId
  for (let i = 0; i < bookId; i++){
    const book = await bookRentContract.books(i).call()
    if(book.name!="") // filter the deleted books
    {
      books.push(
        {id: i,name: book.name,description: book.description,price: tronWeb.fromSun(book.price)}
      )
    }
    
  }
  return books

}
