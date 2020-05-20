import React from 'react';
import { Text, View, Button, ScrollView, TextInput} from 'react-native';
import DatePicker from 'react-native-datepicker';


function Task(props) {
    
    if (props.isDone == true) {
        return <View style={{padding:15}}>
        <Text style={{color:'red'}}>
            {props.name} {props.dueDate} 
        </Text>
        {props.delete}
        {props.mark}
         </View>
    }
    else{
        return <View style={{padding:15}}>
        <Text>
            {props.name} {props.dueDate} 
        </Text>
        {props.delete} 
        {props.mark}
         </View>
    }

    
}


export default class TodoList extends React.Component {
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
        <View>
            <Text>TODO List</Text>
            <ScrollView>
                {
                    this.state.list.map((t) =>
                        <Task key={t.id} name={t.name} dueDate={t.dueDate} isDone={t.isDone} delete={t.delete} mark={t.mark} />)
                }
            </ScrollView>
            <TaskNameForm onAddTask={this.handleAddTask}  onDeleteTask={this.handleDeleteTask} onMarkTask={this.handleMarkTask}/>
        </View>
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

    delete: <Button type = "Button" onPress = {() => this.handleDeleteTask(id)} title="Delete"></Button>,
    mark: <Button type = "Button" onPress = {() => this.handleMarkTask(id)} title="Mark"></Button> };

    
    

    // add the task object to the task list
    this.props.onAddTask(task)
    this.state.value="";
    this.state.dueDate="";

}

handleChange(event) {
    // code to set the state of the component
    this.setState({value: event.nativeEvent.text});
}

handleDeleteTask(id) {
    this.props.onDeleteTask(id);
}

handleMarkTask(id) {
    this.props.onMarkTask(id);
}

handleChangeDate(event) {
    console.log("handling date")
    this.setState({dueDate: event.nativeEvent.text});
}

render() {
    return(
        <View style={{padding:15}}>
            <TextInput placeholder='enter task' value={this.state.value} 
            onChange={this.handleChange}/>
        <DatePicker
        dueDate = {this.state.dueDate}
        style={{width: 200}}
        mode="date"
        placeholder="select date"
        format="YYYY-MM-DD"
        confirmBtnText="Confirm"
        cancelBtnText="Cancel"
        onDateChange={(dueDate) => {this.setState({dueDate})}}
      />
            <Button onPress={this.handleSubmit} title="Add Task" />
      
        </View>
    );
}
}


