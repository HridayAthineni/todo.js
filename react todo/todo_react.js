function Task(props) {
    if (props.isDone) {
        return <li><p>{props.name} {props.dueDate} {props.delete} {props.mark}</p> </li>
    }
    else {
            return <li>{props.name} {props.dueDate} {props.delete} {props.mark} </li>
         }
    }



class TodoList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {list: props.list};

        this.handleAddTask = this.handleAddTask.bind(this);
        this.handleDeleteTask = this.handleDeleteTask.bind(this);
        this.handleMarkTask = this.handleMarkTask.bind(this);

    }

    handleAddTask(task) {
        console.log("add task clicked");
        const list1 = this.state.list;
        list1.push(task);
        this.setState({list: list1})
        console.log("task added");

    }

    handleDeleteTask(id) {
        console.log("handling delete function")
        const filteredTasks = this.state.list.filter(task => task.id !== id);
        this.setState({list: filteredTasks})
    }

    handleMarkTask(id) {
            console.log("mark function called")
            const markTask = this.state.list.filter((task) => {
            if (task.id === id) {
                if (task.isDone == false) task.isDone = true;
            }
            return task;
        })
        this.setState({list: markTask})
    }
    

    render() {
        return (
            <div>
                <h1>TODO List</h1>
                <ol>
                    {
                        this.state.list.map((t) =>
                            <Task key={t.id} name={t.name} dueDate={t.dueDate} isDone={t.isDone} delete={t.delete} mark={t.mark} />)
                    }
                </ol>
                <TaskNameForm onAddTask={this.handleAddTask}  onDeleteTask={this.handleDeleteTask} onMarkTask={this.handleMarkTask}/>
            </div>
        );
    }
}

class TaskNameForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {value: ''};
        this.state = {dueDate: ''};

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChangeDate = this.handleChangeDate.bind(this);
    }

    handleSubmit(event) {
        const taskList = this.props.taskList;
        // create a task object
        event.preventDefault();
        const id = Date.now();
        const task = { id:id, name: this.state.value, dueDate: this.state.dueDate, isDone: false,

        delete: <button type = "button" onClick = {() => this.handleDeleteTask(id)}>Delete</button>,
        mark: <input type = "checkbox" onClick = {() => this.handleMarkTask(id)}></input> };

        
        

        // add the task object to the task list
        this.props.onAddTask(task)

    }

    handleChange(event) {
        // code to set the state of the component
        this.setState({value: event.target.value});
    }

    handleDeleteTask(id) {
        this.props.onDeleteTask(id);
    }

    handleMarkTask(id) {
        this.props.onMarkTask(id);
    }

    handleChangeDate(event) {
        console.log("handling date")
        this.setState({dueDate: event.target.value});
    }

    render() {
        return(
            <form onSubmit={this.handleSubmit}>
                <input type="text" value={this.state.value} 
                onChange={this.handleChange}/>
                <input type="date" value={this.state.dueDate} onChange={this.handleChangeDate}/>
                <input type="submit" value="Add Task" />
            </form>
        );
    }
}

ReactDOM.render(
    <TodoList list={[]} />,
    document.getElementById('todo')
);

