import React from 'react';
import {Route} from 'react-router-dom';
import BookShelves from './BookShelves';
import SearchBooks from './SearchBooks';
import './App.css';

import * as BooksAPI from './BooksAPI';

export default class BooksApp extends React.Component {
    state = {
        books: []
    }
    componentDidMount() {
        BooksAPI.getAll().then(books => {
            this.setState({books: books});
        });
    }
    updateShelves = (book) => {
        this.setState(state => ({
            books: state.books.filter(b => b.id !== book.id).concat([book])
        }))
    }
    render() {
        return (
            <div className="app">
                <Route exact path='/' render={() => (
                    <BookShelves 
                        books={this.state.books}
                        updateShelves={this.updateShelves}/>
                )} />

                <Route path='/search' render={() => (
                    <SearchBooks 
                        books={this.state.books}
                        updateShelves={this.updateShelves}/>
                )} />
            </div>
        )
    }
}