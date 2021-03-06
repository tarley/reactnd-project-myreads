import React, {Component} from 'react'
import PropTypes from 'prop-types'

import * as BooksAPI from './BooksAPI';

export default class Books extends Component {
    getImageStyle(book) {
        const imageLink = book.imageLinks && book.imageLinks.thumbnail ?
            book.imageLinks.thumbnail : '/img/capa_nao_disponivel.jpg';
        
        return { 
            width: 128, 
            height: 193, 
            backgroundImage: `url("${imageLink}")`
        }
    }
    moveTo = (book, shelf, updateShelves) => {
        book.shelf = shelf

        BooksAPI.update(book, shelf)
            .then((result) => updateShelves(book));
    }
    render() {
        const {books, updateShelves} = this.props
        
        return (
            <ol className="books-grid">
            {
                books.map(book =>       
                    <li key={book.id}>
                        <div className="book">
                            <div className="book-top">
                                <div 
                                    className="book-cover" 
                                    style={this.getImageStyle(book)}>
                                </div>
                                <div className="book-shelf-changer">
                                    <select value={book.shelf} onChange={(e) => this.moveTo(book, e.target.value, updateShelves)}>
                                        <option key='move' value="move" disabled>Move to...</option>
                                        { 
                                            BooksAPI.bookShelves.map( option => 
                                                <option key={option.id} value={option.id}>{option.description}</option>)
                                        }
                                    </select>
                                </div>
                            </div>
                            <div className="book-title">{book.title}. {book.subtitle}</div>
                            { 
                                book.authors && book.authors.map(author => 
                                        <div key={author} className="book-authors">{author}</div>
                            )}
                        </div>
                    </li>)
            }
            </ol>)
    }
}

Books.propTypes = {
    books: PropTypes.array.isRequired,
    updateShelves: PropTypes.func.isRequired
}