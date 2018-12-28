import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import Books from './Books'

class BookShelves extends Component {
    state = {
      books: []
    }
    componentDidMount() {
      BooksAPI.getAll().then(books => {
        this.setState({books: books});  
      });
    }
    moveTo = (book, shelf) => {
      if(shelf === 'none' || shelf === 'move')
        return;
      
      book.shelf = shelf
      
      BooksAPI.update(book, shelf).then((result) => {
        this.setState(state => ({
          books: state.books.filter(b => b.id !== book.id).concat([book])
        }))
      })
    }
    render() {
      const {bookshelves} = this.props
      
      return(
        <div className="list-books">
          <div className="list-books-title">
            <h1>MyReads</h1>
          </div>
          <div className="list-books-content">
            <div>
              {bookshelves.map(bookShelf =>
                <div key={bookShelf.id} className='bookshelf'>
                  <h2 className='bookshelf-title'>{bookShelf.description}</h2>
                  <div className='bookshelf-books'>
                    <Books 
                        books={this.state.books.filter(book => book.shelf === bookShelf.id)}
                        shelf={bookShelf.id}
                        options={bookshelves}
                        action={this.moveTo}/>
                  </div>
                </div>)}
            </div>
          </div>
          <div className="open-search">
            <Link to='/search'>Add a book</Link>
          </div>
        </div>)
    }
}

export default BookShelves