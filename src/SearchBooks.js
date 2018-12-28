import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import Books from './Books'

//import 'materialize-css/dist/css/materialize.min.css';

class SearchBooks extends Component {
    state = {
        books: []   
    }
    search(value) {
        BooksAPI.search(value).then(result => {
            console.log(JSON.stringify(result))
            
            if(result.error) {
                this.setState({books: []})
            } else
                this.setState({books: result})
        })
    }
    handleChange = (event) => {
        const value = event.target.value
        
        if(value && value.length > 2) {
            console.log(value)
            
            this.search(value)
        }
    }
    handleKeyPress = (event) => {
        const value = event.target.value
        
        if(event.key === 'Enter'){
            console.log('enter press here! ')
            
            this.search(value)
        }
    }
    add = (book, shelf) => {
        if(shelf === 'none')
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
                        <input onChange={this.handleChange} onKeyPress={this.handleKeyPress} type="text" placeholder="Search by title or author"/>
                      </div>
                    </div>
                </div>
                <div className='row'>
                    <div class="row preloader-wrapper big active">
                        <div class="spinner-layer spinner-blue-only">
                            <div class="circle-clipper left">
                                <div class="circle"></div>
                            </div>
                            <div class="gap-patch">
                                <div class="circle"></div>
                            </div>
                            <div class="circle-clipper right">
                                <div class="circle"></div>
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
            </div>)
    }
}

export default SearchBooks