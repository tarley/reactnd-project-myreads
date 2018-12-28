import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import * as BooksAPI from './BooksAPI';
import Books from './Books';

//import 'materialize-css/dist/css/materialize.min.css';

class SearchBooks extends Component {
    state = {
        books: []
    }
    search(value) {
        if (!value || value.trim().length < 3) {
            this.setState({books: []});
        } else {
            console.log(value);

            BooksAPI.search(value).then(result => {
                console.log(JSON.stringify(result))

                if (result.error) {
                    this.setState({books: []})
                } else
                    this.setState({books: result})
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
    add = (book, shelf) => {
        if (shelf === 'none')
            return
        BooksAPI.update(book, 'wantToRead').then((result) => {
            console.log(JSON.stringify(result))

            this.setState(state => ({books: state.books.filter(b => b.id !== book.id)}))
        })
    }
    render() {
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
                        shelf='none'
                        options={[{id: "add", description: "Add"}]}
                        action={this.add}/>
                </div>
            </div>);
    }
}

export default SearchBooks