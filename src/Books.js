import React, {Component} from 'react'
import PropTypes from 'prop-types'

class Books extends Component {
    getImageStyle(imageLink) {
        return { 
            width: 128, 
            height: 193, 
            backgroundImage: `url("${imageLink}")`
        }
    }
    render() {
        const {books, shelf, options, action} = this.props
        
        return (
            <ol className="books-grid">
            {
                books.map(book =>       
                    <li key={book.id}>
                        <div className="book">
                            <div className="book-top">
                                <div 
                                    className="book-cover" 
                                    style={this.getImageStyle(book.imageLinks.thumbnail)}>
                                </div>
                                <div className="book-shelf-changer">
                                    <select value={shelf} onChange={(e) => action(book, e.target.value)}>
                                        <option key='move' value="move" disabled>Move to...</option>
                                        { 
                                            options.map( option => 
                                                <option key={option.id} value={option.id}>{option.description}</option>)
                                        }
                                        <option key='none' value="none">None</option>
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
    shelf: PropTypes.string.isRequired, 
    options: PropTypes.array.isRequired, 
    action: PropTypes.func.isRequired
}

export default Books