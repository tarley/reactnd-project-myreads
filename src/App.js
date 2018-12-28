import React from 'react'
import {Route} from 'react-router-dom'
import BookShelves from './BookShelves'
import SearchBooks from './SearchBooks'
import './App.css'


class BooksApp extends React.Component {
  state = {
    a : {id: 1, nome: 2, teste: 3, x: 4, y: 5},
    
    bookshelves : [
      {id: "currentlyReading", description: "Currently Reading"}, 
      {id: "wantToRead", description: "Want to Read"}, 
      {id: "read", description: "Read"}
    ]
  }
  render() {
    return (
      <div className="app">
        
        <Route exact path='/' render={() => (
          <BookShelves 
              bookshelves={this.state.bookshelves}
          />
        )} />
        
        <Route path='/search' render={() => (
          <SearchBooks />
        )} />
      </div>
    )
  }
}

export default BooksApp
