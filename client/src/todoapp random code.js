



  const TodoItems = ({ entries }) => (
    <ul>
      {entries.map(({heading, key}) => (
        <li key={key}>{heading}</li>
      ))}
    </ul>
  );


  class App extends React.Component {
    state = {
      items: [],
    }

  addTodo = (heading) => heading !== '' && this.setState(({ items }) => ({
    items: items.concat({ //returns a new array})
      heading,
      key: Date.now()
    })
  }));


  render() {
    return (
        <div className="app-container">
          <InputForm onSubmit={this.addTodo}></InputForm>
          <TodoItems entries={this.state.items} />
        </div>
    );
  }
  }


  class InputForm extends React.Component {
      state = {
          input: ''
      };

      onInput = e => this.setState({
        input: e.target.value
      });

      onSubmit = e => {
        e.preventDefault();
        this.props.onSubmit(this.state.input);
      }

      render(){
        return(
          <form onSubmit={this.onSubmit}>
            <input
              value={this.state.value}
              onChange={this.onInput}
              type="text"
              placeholder="Add an item"/>
              <button type="submit">Add to list</button>
          </form>

        )
      }
    }
