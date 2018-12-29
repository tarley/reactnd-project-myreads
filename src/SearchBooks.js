import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types'
import Books from './Books';

import * as BooksAPI from './BooksAPI';

export default class SearchBooks extends Component {
    state = {
        booksResearched: []
    }
    getBookShelf = (bookResearched) => {
        const book = this.props.books.find(book => book.id === bookResearched.id);
        bookResearched.shelf = book ? book.shelf : 'none';

        return bookResearched;
    }
    search(value) {
        if (!value || value.trim().length < 3) {
            this.setState({booksResearched: []});
        } else {
            BooksAPI.search(value).then(result => {
                if (result.error)
                    this.setState({booksResearched: []})
                else
                    this.setState({booksResearched: result.map(this.getBookShelf)})
            })
        }
    }
    handleChange = (event) => {
        const value = event.target.value;
        this.search(value);
    }
    handleKeyPress = (event) => {
        const value = event.target.value

        if (event.key === 'Enter') {
            this.search(value)
        }
    }
    render() {
        const {updateShelves} = this.props;

        return(
            <div className="search-books">
                <div className='row'>
                    <div className="search-books-bar">
                        <Link to='/' className='close-search'>Close</Link>
                        <div className="search-books-input-wrapper">
                            <input onChange={this.handleChange} onKeyPress={this.handleKeyPress} type="text" placeholder="Search by title or author. At least three letters."/>
                        </div>
                    </div>
                </div>
                <div className='row'>
                    <div className="row preloader-wrapper big active">
                        <div className="spinner-layer spinner-blue-only">
                            <div className="circle-clipper left">
                                <div className="circle"></div>
                            </div>
                            <div className="gap-patch">
                                <div className="circle"></div>
                            </div>
                            <div className="circle-clipper right">
                                <div className="circle"></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="search-books-results">
                    <Books 
                        books={this.state.booksResearched}
                        updateShelves={updateShelves}/>
                </div>
            </div>);
    }
}

SearchBooks.propTypes = {
    books: PropTypes.array.isRequired,
    updateShelves: PropTypes.func.isRequired
}