import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types'
import Books from './Books';

import * as BooksAPI from './BooksAPI';

//import 'materialize-css/dist/css/materialize.min.css';

export default class SearchBooks extends Component {
    state = {
        books: []
    }
    getBookShelf = (searchBook) => {
        const book = this.props.books.find(book => book.id === searchBook.id);
        searchBook.shelf = book ? book.shelf : 'none';

        return searchBook;
    }
    search(value) {
        if (!value || value.trim().length < 3) {
            this.setState({books: []});
        } else {
            console.log(value);

            BooksAPI.search(value).then(result => {
                console.log(JSON.stringify(result));

                if (result.error)
                    this.setState({books: []})
                else
                    this.setState({books: result.map(this.getBookShelf)})
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
            console.log('enter press here! ')

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
                        books={this.state.books}
                        callback={updateShelves}/>
                </div>
            </div>);
    }
}

SearchBooks.propTypes = {
    books: PropTypes.array.isRequired,
    updateShelves: PropTypes.func.isRequired
}