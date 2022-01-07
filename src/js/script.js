/* global Handlebars, utils, dataSource */ // eslint-disable-line no-unused-vars

'use strict';

const data = dataSource.books;
console.log('data', data);

const select = {
  templateOf: {
    book: '#template-book',
  },
  items: {
    booksList: '.books-list',
    bookImage: '.book__image',
    bookFilters: '.filters',
  }
};

const templates = {
  books: Handlebars.compile(document.querySelector(select.templateOf.book).innerHTML),
};

let favoriteBooks = [];

class Book {
  constructor() {
    const thisBook = this;

    thisBook.addBooks();
    thisBook.initActions();
    thisBook.determineRatingBgc();
  }

  addBooks() {
    const thisBook = this;

    for(let book of data) {
      const ratingBgc = thisBook.determineRatingBgc(book.rating);
      const ratingWidth = book.rating * 10;
      let element = {
        id: book.id,
        name: book.name,
        price: book.price,
        image: book.image,
        rating: book.rating,
        ratingWidth: ratingWidth,
        ratingBgc: ratingBgc,
      };
      const generatedHTML = templates.books(element);
      const generatedDOM = utils.createDOMFromHTML(generatedHTML);
      const bookContainer = document.querySelector(select.items.booksList);
      bookContainer.appendChild(generatedDOM);
    }
  }

  determineRatingBgc(rating) {
    let background;
    if(rating < 6) {
      background = 'linear-gradient(to bottom, #fefcea 0%, #f1da36 100%)';
    } else if(rating > 6 && rating <= 8){
      background = 'linear-gradient(to bottom, #b4df5b 0%,#b4df5b 100%)';
    } else if (rating > 8 && rating <= 9){
      background = 'linear-gradient(to bottom, #299a0b 0%, #299a0b 100%)';
    }
    else if (rating > 9){
      background = 'linear-gradient(to bottom, #ff0084 0%,#ff0084 100%)';
    }
    return background;
  }

  initActions() {
    const bookImg = document.querySelector(select.items.booksList);
    const bookFil = document.querySelector(select.items.bookFilters);
  
    bookImg.addEventListener('dblclick', function(event) {
      event.preventDefault();
      const image = event.target.offsetParent;
      const bookId = image.getAttribute('data-id');
      if(!favoriteBooks.includes(bookId)) {
        image.classList.add('favorite');
        favoriteBooks.push(bookId);
      } else {
        image.classList.remove('favorite');
        favoriteBooks.pop(bookId); 
      }
    });
  
    // there is no need to use one more function (filteredBooks)
    const filters = [];
    bookFil.addEventListener('click', function(callback){
      const clickedElement = callback.target;
      if(clickedElement.type === ('checkbox') && clickedElement.name === ('filter')) {
        console.log('con', clickedElement.value);
        if(clickedElement.checked == true) {
          filters.push(clickedElement.value);
        } else {
          const index = filters.indexOf(clickedElement.value);
          filters.splice(index, 1);
        }
      }
      console.log('tab', filters);
  
      for(const book of data) {
          
        let shouldBeHidden = false;
        for(const fil of filters) {
          if(!book.details[fil] === true) {
            shouldBeHidden = true;
            break;
          }
        }
        if(shouldBeHidden === true) {
          document.querySelector('.book__image[data-id="' + book.id + '"]').classList.add('hidden');
        } else {
          document.querySelector('.book__image[data-id="' + book.id + '"]').classList.remove('hidden');
        }
      }
    });
  }
}

const app = new Book;

app;
















































// const select = {
//   books: {
//     bookList: '.books-list',
//     bookImage: '.book__image',
//   },
//   templateOf: {
//     book: '#template-book',
//   },
// };

// const templates = {
//   book: Handlebars.compile(document.querySelector(select.templateOf.book).innerHTML),
// };

// function render() {
//   for(let book of dataSource.books) {
//     const generatedHTML = templates.book(book);
//     const element = utils.createDOMFromHTML(generatedHTML);
//     const bookContainer = document.querySelector(select.books.bookList);
//     bookContainer.appendChild(element);
//   }
// }

// const favoriteBooks = [];

// function initActions() {
//   const bookImg = document.querySelector(select.books.bookImage);

//   bookImg.addEventListener('dbclick', function() {
//     event.preventDefault();
//     bookImg.classList.add('favorite');
//     const bookId = bookImage.data-id;
//   });
  
// }

// render();
// initActions();