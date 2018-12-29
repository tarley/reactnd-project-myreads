import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types'
import Books from './Books';

import * as BooksAPI from './BooksAPI';

export default class BookShelves extends Component {
    render() {
        const {books, updateShelves} = this.props;

        return(
            <div className="list-books">
                <div className="list-books-title">
                  <h1>MyReads</h1>
                </div>
                <div className="list-books-content">
                    <div>
                        {BooksAPI.bookShelves.filter(bookShelf => bookShelf.isShelf).map(bookShelf =>
                            <div key={bookShelf.id} className='bookshelf'>
                              <h2 className='bookshelf-title'>{bookShelf.description}</h2>
                              <div className='bookshelf-books'>
                                  <Books 
                                      books={books.filter(book => book.shelf === bookShelf.id)}
                                      callback={updateShelves}/>
                              </div>
                            </div>)}
                    </div>
                </div>
                <div className="open-search">
                    <Link to='/search'>Add a book</Link>
                </div>
            </div>);
    }
}

BookShelves.propTypes = {
    books: PropTypes.array.isRequired,
    updateShelves: PropTypes.func.isRequired
}